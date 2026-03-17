import mongoose from "mongoose";

export const conntectToDb = async () => [
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to db");
  }),
];
