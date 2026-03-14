const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "..", "shared", "profile.json");
const destination = path.join(__dirname, "..", "public", "profile.json");

fs.copyFileSync(source, destination);
console.log("Synced shared/profile.json to public/profile.json");
