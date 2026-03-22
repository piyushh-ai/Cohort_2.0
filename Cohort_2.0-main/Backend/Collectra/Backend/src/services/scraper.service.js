import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeLink = async (url) => {
  try {
    const { data: html } = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      $("title").text() ||
      "Untitled";

    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      "";

    const image =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      "";

    const siteName = $('meta[property="og:site_name"]').attr("content") || "";

    const ogType = $('meta[property="og:type"]').attr("content") || "";

    const type = detectType(url, ogType);

    return {
      title: title.trim(),
      description: description.trim(),
      image,
      siteName,
      type,
      url,
    };
  } catch (error) {
    console.error("Scrape failed for URL:", url, error.message);
    return {
      title: "Untitled",
      description: "",
      image: "",
      siteName: "",
      type: "article",
      url,
    };
  }
};

const detectType = (url, ogType) => {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be") || ogType === "video")
    return "video";
  if (u.endsWith(".pdf") || u.includes("/pdf/")) return "pdf";
  if (u.includes("twitter.com") || u.includes("x.com")) return "tweet";
  if (u.endsWith(".jpg") || u.endsWith(".png") || u.endsWith(".webp"))
    return "image";
  return "article";
};
