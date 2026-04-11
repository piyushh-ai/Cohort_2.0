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

export const config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};
