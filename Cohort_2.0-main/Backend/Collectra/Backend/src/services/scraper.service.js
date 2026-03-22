import axios from "axios";
import * as cheerio from "cheerio";

// ─── Better headers — production par sites block karti hain bots ko ──
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Encoding": "gzip, deflate, br",
  "Connection": "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Cache-Control": "max-age=0",
};

// ─── YouTube special handling — oEmbed API use karo ──────────────
const scrapeYoutube = async (url) => {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const { data } = await axios.get(oembedUrl, { timeout: 8000 });

    // Video ID nikalo thumbnail ke liye
    const videoIdMatch = url.match(/(?:v=|youtu\.be\/)([^&\s?]+)/);
    const videoId = videoIdMatch?.[1];
    const thumbnail = videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : "";

    return {
      title: data.title || "Untitled",
      description: `${data.author_name} — YouTube video`,
      image: thumbnail,
      siteName: "YouTube",
      type: "video",
      url,
    };
  } catch {
    // oEmbed fail hua — normal scrape try karo
    return null;
  }
};

export const scrapeLink = async (url) => {
  try {
    // YouTube ke liye special handling
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const ytResult = await scrapeYoutube(url);
      if (ytResult) return ytResult;
    }

    const { data: html } = await axios.get(url, {
      timeout: 15000,
      headers: HEADERS,
      // Redirect follow karo
      maxRedirects: 5,
    });

    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      $("title").text()?.trim() ||
      "Untitled";

    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      $('meta[name="twitter:description"]').attr("content") ||
      "";

    const image =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      $('meta[name="twitter:image:src"]').attr("content") ||
      "";

    const siteName =
      $('meta[property="og:site_name"]').attr("content") ||
      new URL(url).hostname.replace("www.", "") ||
      "";

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

    // ─── Fallback — URL se hi kuch info nikalo ───────────────
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.replace("www.", "");
      const pathParts = urlObj.pathname.split("/").filter(Boolean);
      const lastPart = pathParts[pathParts.length - 1] || "";
      const guessedTitle = lastPart
        .replace(/[-_]/g, " ")
        .replace(/\.\w+$/, "")
        .trim() || hostname;

      return {
        title: guessedTitle || "Untitled",
        description: "",
        image: "",
        siteName: hostname,
        type: detectType(url, ""),
        url,
      };
    } catch {
      return {
        title: "Untitled",
        description: "",
        image: "",
        siteName: "",
        type: "article",
        url,
      };
    }
  }
};

const detectType = (url, ogType) => {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be") || ogType === "video") return "video";
  if (u.endsWith(".pdf") || u.includes("/pdf/")) return "pdf";
  if (u.includes("twitter.com") || u.includes("x.com")) return "tweet";
  if (u.endsWith(".jpg") || u.endsWith(".png") || u.endsWith(".webp")) return "image";
  return "article";
};