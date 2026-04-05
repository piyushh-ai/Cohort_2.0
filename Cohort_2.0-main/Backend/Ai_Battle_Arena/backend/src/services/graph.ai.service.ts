import {
  StateSchema,
  StateGraph,
  START,
  END,
  type GraphNode,
} from "@langchain/langgraph";
import * as z from "zod";
import { cohereModel, geminiModel, mistralModel } from "./model.service.js";
import { createAgent, HumanMessage, providerStrategy } from "langchain";

const state = new StateSchema({
  problem: z.string().default(""),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  judge: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    solution_1_reasoning: z.string().default(""),
    solution_2_reasoning: z.string().default(""),
  }),
});

const solutionNode: GraphNode<typeof state> = async (state) => {
  console.log("solution node running");

  const [mistralResponse, cohereResponse] = await Promise.all([
    mistralModel.invoke(state.problem),
    cohereModel.invoke(state.problem),
  ]);

  return {
    solution_1: mistralResponse?.text || mistralResponse?.content || "",
    solution_2: cohereResponse.text,
  };
};

const judgeNode: GraphNode<typeof state> = async (state) => {
  console.log("judge node running");
  const { problem, solution_1, solution_2 } = state;

  const judgeAgent = createAgent({
    model: geminiModel,
    responseFormat: providerStrategy(
      z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
        solution_1_reasoning: z.string(),
        solution_2_reasoning: z.string(),
      }),
    ),
    systemPrompt: `You are a judge in an AI battle arena. Your task is to evaluate two solutions to a given problem and score them based on their quality, creativity, and effectiveness. Provide a score between 0 and 10 for each solution, along with a detailed reasoning for your scores.`,
  });

  const judgeResponse = await judgeAgent.invoke({
    messages: [
      new HumanMessage(
        `Problem: ${problem}

Solution 1:
${solution_1}

Solution 2:
${solution_2}

Evaluate both solutions fairly.
Give score (0–10) and reasoning for each.`,
      ),
    ],
  });

  if (!judgeResponse.structuredResponse) {
    throw new Error("Judge failed to return structured response");
  }

  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
  } = judgeResponse.structuredResponse;

  return {
    judge: {
      solution_1_score,
      solution_2_score,
      solution_1_reasoning,
      solution_2_reasoning,
    },
  };
};

const graph = new StateGraph(state)
  .addNode("solutionNode", solutionNode)
  .addNode("judgeNode", judgeNode)
  .addEdge(START, "solutionNode")
  .addEdge("solutionNode", "judgeNode")
  .addEdge("judgeNode", END)
  .compile();

export default async function (problem: string) {
  try {
    const result = await graph.invoke({
      problem: problem,
    });

    return result;
  } catch (error) {
    console.error("Error occurred while running graph:", error);
    throw error;
  }
}
