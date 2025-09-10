import fs from "fs";
import path from "path";

// Read and parse profile.json
function readProfile() {
  const file = path.join(process.cwd(), "shared", "profile.json");
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw);
}

// Helper to format lists and sections
const list = arr => Array.isArray(arr) && arr.length ? arr.join(", ") : "N/A";

// Convert array of {title, content} to markdown section
function sectionFromPairs(arr = []) {
  return arr
    .map(item => `- ${item.title || ""}: ${item.content || ""}`)
    .join("\n");
}

// Format projects into markdown
function projectsBlock(projects = []) {
  return projects
    .map(p => {
      const stack = Array.isArray(p.techStack) && p.techStack.length ? p.techStack.join(", ") : "N/A";
      const git = p.github ? `[GitHub](${p.github})` : "";
      const live = p.live ? ` · [Live](${p.live})` : "";
      return `**${p.title}** — ${p.description} Tech: ${stack}. ${git}${live}`;
    })
    .join("\n\n");
}

// Format hackathons into markdown
function hackathonsBlock(items = []) {
  return items
    .map(h => {
      const git = h.github ? `[GitHub](${h.github})` : "";
      const demo = h.demo ? ` · [Demo](${h.demo})` : "";
      return `**${h.title}** (${h.team}) — ${h.description} ${git}${demo}`;
    })
    .join("\n\n");
}

// Build the comprehensive system message for the AI
export default function buildSystemMessage() {
  const profile = readProfile();

  // Extract and format profile sections
  const about = sectionFromPairs(profile.about || []);
  const education = sectionFromPairs(profile.education || []);
  const experience = sectionFromPairs(profile.experience || []);

  // Format skills
  const frontend = list(profile.skills?.frontend || []);
  const backend = list(profile.skills?.backend || []);
  const fullstack = list(profile.skills?.fullstack || []);

  // Format projects and hackathons
  const projects = projectsBlock(profile.projects || []);
  const hackathons = hackathonsBlock(profile.hackathons || []);

  // Format contact info
  const c = profile.contact || {};
  const contact = [
    c.github ? `- **GitHub**: ${c.github}` : null,
    c.linkedin ? `- **LinkedIn**: ${c.linkedin}` : null,
    c.email ? `- **Email**: ${c.email}` : null,
    `- Or head to the Contact page at /contact.`
  ].filter(Boolean).join("\n");

  // Construct the full prompt
  const prompt = `
You are Johnny's site assistant. Speak in third person about Johnny.
Keep answers concise, friendly and practical. Focus on his skills, projects, hackathons and ways he works.
If users drift off topic, steer back to Johnny's work. Never say you're an AI.

Site awareness
- You are embedded in Johnny's portfolio at johnnytrinh.se.
- Do not suggest visiting the site. The user is already here.
- When useful, point to sections like /projects, /hackathons or /contact.

Personality
- Confident, sharp and to the point.
- Comfortable with gaming and coding metaphors.
- Skip fluff and stock phrases. Give clear, direct answers.

Formatting
- Prefer full sentences over bullet points in replies.
- Use short, natural transitions.
- For links, plain URLs are fine.

About Johnny
${about}

Education
${education}

Experience
${experience}

Technical Skills
Frontend: ${frontend}
Backend: ${backend}
Fullstack and DevOps: ${fullstack}

Projects
${projects}

Hackathons
${hackathons}

Contact
${contact}
  `.trim();

  return prompt;
}
