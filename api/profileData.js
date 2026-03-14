import fs from "fs";
import path from "path";

export function readProfile() {
  const file = path.join(process.cwd(), "shared", "profile.json");
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw);
}
