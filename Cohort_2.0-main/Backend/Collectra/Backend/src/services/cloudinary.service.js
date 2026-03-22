import cloudinary from "../config/cloudinary.js";

// ─── Upload options by mimetype ───────────────────────
export const getUploadOptions = (mimetype, originalname) => {
  const publicId = `${Date.now()}-${originalname.split(".")[0]}`;

  if (mimetype.startsWith("image/")) {
    return {
      folder: "collectra/images",
      resource_type: "image",
      public_id: publicId,
    };
  }
  if (mimetype === "application/pdf") {
    return {
      folder: "collectra/pdfs",
      resource_type: "raw",
      public_id: publicId,
    };
  }
  return {
    folder: "collectra/docs",
    resource_type: "raw",
    public_id: publicId,
  };
};

// ─── Resource type from mimetype ─────────────────────
export const getResourceType = (mimeType) => {
  if (!mimeType) return "raw";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType === "application/pdf") return "raw";
  return "raw";
};

// ─── Public ID from Cloudinary URL ───────────────────
export const getPublicIdFromUrl = (url, mimeType) => {
  try {
    const resourceType = getResourceType(mimeType);
    const marker = `/${resourceType}/upload/`;
    const urlParts = url.split(marker);
    if (urlParts.length < 2) return null;
    return urlParts[1].replace(/^v\d+\//, "");
  } catch {
    return null;
  }
};

// ─── Upload buffer to Cloudinary ─────────────────────
export const uploadToCloudinary = (buffer, mimetype, originalname) => {
  return new Promise((resolve, reject) => {
    const options = getUploadOptions(mimetype, originalname);
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    stream.end(buffer);
  });
};

// ─── Delete file from Cloudinary ─────────────────────
export const deleteFromCloudinary = async (url, mimeType) => {
  try {
    const resourceType = getResourceType(mimeType);
    const publicId = getPublicIdFromUrl(url, mimeType);
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    console.log("Cloudinary deleted:", publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
  }
};
