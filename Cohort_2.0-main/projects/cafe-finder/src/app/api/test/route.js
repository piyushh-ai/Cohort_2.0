import { connectDB } from "@/lib/mongodb";
import Cafe from "@/models/Cafe";

export async function GET() {
  await connectDB();

  const cafes = await Cafe.find();

  return Response.json(cafes);
}