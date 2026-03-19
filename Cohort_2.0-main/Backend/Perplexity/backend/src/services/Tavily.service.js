import { tavily } from "@tavily/core";

const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });

/**
 * Web search using Tavily official SDK
 * @param {string} query
 * @param {"basic"|"advanced"} searchDepth - basic = faster, advanced = more results
 * @returns {object} { results, answer, query }
 */
export async function searchWeb(query, searchDepth = "basic") {
  const response = await tavilyClient.search(query, {
    searchDepth,
    maxResults: 5,
    includeAnswer: true,       // Tavily gives a quick AI summary too
    includeRawContent: false,
  });

  return {
    query: response.query,
    answer: response.answer,
    results: response.results.map((r) => ({
      title: r.title,
      url: r.url,
      content: r.content,
      score: r.score,
    })),
  };
}

/**
 * Formats search results as a string to inject into AI prompt as context
 */
export async function getSearchContext(query) {
  const { results, answer } = await searchWeb(query);

  const context = results
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.content}\nSource: ${r.url}`)
    .join("\n\n");

  return { context, answer };
}