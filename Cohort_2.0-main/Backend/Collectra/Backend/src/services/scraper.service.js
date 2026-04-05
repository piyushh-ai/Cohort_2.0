import axios from "axios";
import * as cheerio from "cheerio";

// ─── Better headers — production par sites block karti hain bots ko ──
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Encoding": "gzip, deflate, br",
  "Connection": "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Cache-Control": "max-age=0",
};

// ─── Type detection ───────────────────────────────────────
const detectType = (url, ogType = "") => {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be") || ogType === "video.other" || ogType === "video") return "video";
  if (u.endsWith(".pdf") || u.includes("/pdf/")) return "pdf";
  if (u.includes("twitter.com") || u.includes("x.com")) return "tweet";
  if (u.endsWith(".jpg") || u.endsWith(".png") || u.endsWith(".webp") || u.endsWith(".gif")) return "image";
  if (u.includes("spotify.com")) return "article";
  return "article";
};

// ─── YouTube special handling — oEmbed API ─────────────────
const scrapeYoutube = async (url) => {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const { data } = await axios.get(oembedUrl, { timeout: 8000 });

    const videoIdMatch = url.match(/(?:v=|youtu\.be\/)([^&\s?]+)/);
    const videoId = videoIdMatch?.[1];
    const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";

    return {
      title: data.title || "Untitled",
      description: `${data.author_name} — YouTube`,
      image: thumbnail,
      siteName: "YouTube",
      type: "video",
      url,
    };
  } catch {
    return null;
  }
};

// ─── Jina AI reader fallback — full page content extraction ──
// Free, no API key needed — returns clean Markdown text from any URL
const scrapeViaJina = async (url) => {
  try {
    const jinaUrl = `https://r.jina.ai/${url}`;
    const { data: markdown } = await axios.get(jinaUrl, {
      timeout: 15000,
      headers: {
        "Accept": "application/json",
        "X-Timeout": "10",
      },
    });

    if (!markdown || typeof markdown !== "string" || markdown.length < 50) return null;

    // Extract title from first # heading
    const titleMatch = markdown.match(/^#\s+(.+)/m);
    const title = titleMatch?.[1]?.trim() || "Untitled";

    // Description = first non-empty paragraph after title
    const lines = markdown.split("\n").filter((l) => l.trim() && !l.startsWith("#")).slice(0, 5);
    const description = lines.join(" ").slice(0, 300);

    return {
      title,
      description,
      image: "",
      siteName: new URL(url).hostname.replace("www.", ""),
      type: detectType(url, ""),
      url,
    };
  } catch {
    return null;
  }
};

// ─── Main scraper ─────────────────────────────────────────
export const scrapeLink = async (url) => {
  try {
    // YouTube special handling
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const ytResult = await scrapeYoutube(url);
      if (ytResult) return ytResult;
    }

    // Standard HTML scraping
    const { data: html } = await axios.get(url, {
      timeout: 12000,
      headers: HEADERS,
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

    // If title is empty or generic, try Jina as enhancement
    if (!title || title === "Untitled" || !description) {
      const jinaResult = await scrapeViaJina(url);
      if (jinaResult) {
        return {
          title: title && title !== "Untitled" ? title : jinaResult.title,
          description: description || jinaResult.description,
          image,
          siteName,
          type,
          url,
        };
      }
    }

    return {
      title: title.trim(),
      description: description.trim(),
      image,
      siteName,
      type,
      url,
    };
  } catch (error) {
    console.warn("⚠️ Standard scrape failed for:", url, "—", error.message);

    // Try Jina AI as primary fallback
    const jinaResult = await scrapeViaJina(url);
    if (jinaResult) {
      console.log("✅ Jina AI fallback succeeded for:", url);
      return jinaResult;
    }

    // Final fallback — URL-based guess
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