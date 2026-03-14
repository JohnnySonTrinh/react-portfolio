import { readProfile } from "./profileData.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET requests allowed" });
  }

  try {
    return res.status(200).json(readProfile());
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server error" });
  }
}
