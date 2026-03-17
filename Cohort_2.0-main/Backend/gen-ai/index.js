import "dotenv/config";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from "langchain";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});

const agent = createAgent({
  model,
});

const messages = [];

while (true) {
  const userInput = await rl.question("\x1b[32mYou:\x1b[0m ");

  messages.push(new HumanMessage(userInput));

  const response = await agent.invoke({
    messages,
  });

  messages.push(response.messages[response.messages.length - 1]);

  console.log(
    `\x1b[34m[AI]\x1b[0m ${response.messages[response.messages.length - 1].content}`,
  );
}
