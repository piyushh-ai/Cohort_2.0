import dotenv from "dotenv";

dotenv.config();

type Config = {
  readonly googleApiKey: string;
  readonly mistralApiKey?: string;
  readonly cohereApiKey?: string;
};

export const config: Config = {
  googleApiKey: process.env.GOOGLE_API_KEY || "",
  mistralApiKey: process.env.MISTRAL_API_KEY || "",
  cohereApiKey: process.env.COHERE_API_KEY || "",
};
