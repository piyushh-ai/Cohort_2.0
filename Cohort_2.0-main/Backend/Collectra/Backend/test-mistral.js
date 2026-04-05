import { MistralAIEmbeddings } from "@langchain/mistralai";
import { config } from "./src/config/config.js";

async function run() {
  try {
    const embeddings = new MistralAIEmbeddings({
      apiKey: config.mistralApiKey,
      model: "mistral-embed"
    });
    const res = await embeddings.embedQuery("hello world");
    console.log("Mistral embed success! Dimension:", res.length);
  } catch (e) {
    console.error(e);
  }
}
run();
