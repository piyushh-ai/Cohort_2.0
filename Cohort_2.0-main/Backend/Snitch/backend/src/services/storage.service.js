import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
  privateKey: config.imagekitPrivateKey, // This is the default and can be omitted
});

export const uploadFile = async ({ buffer, fileName, folder = "Snitch" }) => {
  const result = await client.files.upload({
    file: await ImageKit.toFile(buffer),
    fileName,
    folder,
  });

  return result;
};
