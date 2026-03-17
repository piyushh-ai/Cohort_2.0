import multer from "multer";

// Cloudinary pe nahi — pehle memory mein rakho
const storage = multer.memoryStorage();

const limits = { fileSize: 10 * 1024 * 1024 };

const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type is not allowed"), false);
  }
};

export const upload = multer({ storage, limits, fileFilter });
