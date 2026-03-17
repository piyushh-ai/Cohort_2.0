import { createRequire } from "module";

const require = createRequire(import.meta.url);
const mammoth = require("mammoth");

// fileUrl nahi — seedha buffer aayega ab
export const extractFileContent = async (buffer, mimeType, originalName) => {
  try {
    if (mimeType.startsWith("image/")) {
      return extractImageInfo(originalName);
    }
    if (mimeType === "application/pdf") {
      return await extractPdfContent(buffer, originalName);
    }
    if (mimeType.includes("word")) {
      return await extractDocContent(buffer, originalName);
    }
    if (mimeType.includes("sheet") || mimeType.includes("excel")) {
      return await extractExcelContent(buffer, originalName);
    }
    if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) {
      return basicInfo(originalName, "presentation");
    }
    return basicInfo(originalName, "document");
  } catch (error) {
    console.error("File read error:", error.message);
    return basicInfo(originalName, "document");
  }
};

// Word
const extractDocContent = async (buffer, originalName) => {
  try {
    const result = await mammoth.extractRawText({ buffer });
    const description = result.value.replace(/\s+/g, " ").trim().slice(0, 500);
    return {
      title: originalName.replace(/\.[^/.]+$/, ""),
      description,
      type: "document",
    };
  } catch (err) {
    console.error("Doc parse error:", err.message);
    return basicInfo(originalName, "document");
  }
};

// PDF
const extractPdfContent = async (buffer, originalName) => {
  try {
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

    // ✅ Buffer ko Uint8Array mein convert karo
    const uint8Array = new Uint8Array(buffer);

    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdfDoc = await loadingTask.promise;

    let fullText = "";
    for (let i = 1; i <= Math.min(pdfDoc.numPages, 5); i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      fullText += content.items.map((item) => item.str).join(" ") + " ";
    }

    return {
      title: originalName.replace(".pdf", ""),
      description: fullText.replace(/\s+/g, " ").trim().slice(0, 500),
      type: "pdf",
      pageCount: pdfDoc.numPages,
    };
  } catch (err) {
    console.error("PDF parse error:", err.message);
    return basicInfo(originalName, "pdf");
  }
};

// Excel
const extractExcelContent = async (buffer, originalName) => {
  try {
    const XLSX = require("xlsx");
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const text = XLSX.utils.sheet_to_txt(firstSheet);
    return {
      title: originalName.replace(/\.[^/.]+$/, ""),
      description: text.replace(/\s+/g, " ").trim().slice(0, 500),
      type: "document",
    };
  } catch (err) {
    return basicInfo(originalName, "document");
  }
};

const extractImageInfo = (originalName) => ({
  title: originalName.replace(/\.[^/.]+$/, ""),
  description: "Image file",
  type: "image",
});

const basicInfo = (originalName, type = "document") => ({
  title: originalName.replace(/\.[^/.]+$/, ""),
  description: "",
  type,
});

// ─── File type se preview image decide karo ───────────────
export const getFilePreviewImage = (mimeType, uploadedUrl) => {
  // Image — khud ki URL
  if (mimeType.startsWith("image/")) {
    return uploadedUrl;
  }

  // PDF — Cloudinary khud thumbnail banata hai
  if (mimeType === "application/pdf") {
    return "https://cdn-icons-png.flaticon.com/512/4208/4208479.png";
  }

  // Word
  if (mimeType.includes("word")) {
    return "https://cdn-icons-png.flaticon.com/512/888/888883.png";
  }

  // Excel
  if (mimeType.includes("sheet") || mimeType.includes("excel")) {
    return "https://cdn-icons-png.flaticon.com/512/888/888850.png";
  }

  // PowerPoint
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) {
    return "https://cdn-icons-png.flaticon.com/512/888/888874.png";
  }

  // Default
  return "https://cdn-icons-png.flaticon.com/512/2965/2965335.png";
};
