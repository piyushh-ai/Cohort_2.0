import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is not define in environment variable");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not define in environment variable");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not define in environment variable");
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID is not define in environment variable");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET is not define in environment variable");
}

if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV is not define in environment variable");
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error("IMAGEKIT_PRIVATE_KEY is not define in environment variable");
}

export const config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  nodeEnv: process.env.NODE_ENV,
  imagekitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
};
