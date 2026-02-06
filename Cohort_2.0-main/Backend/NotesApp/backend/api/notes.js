export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      message: "Notes fetched successfully",
      notes: []
    });
  }

  if (req.method === "POST") {
    const note = req.body;
    return res.status(201).json({
      message: "Note created",
      note
    });
  }

  res.status(405).json({ message: "Method not allowed" });
}
