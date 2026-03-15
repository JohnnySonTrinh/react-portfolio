import { readProfile } from "./profileData.js";

const list = (items) =>
  Array.isArray(items) && items.length ? items.join(", ") : "N/A";

const maybeLine = (label, value) => (value ? `- ${label}: ${value}` : null);

function sectionFromPairs(items = []) {
  return items
    .map((item) => `- ${item.title || ""}: ${item.content || ""}`)
    .join("\n");
}

function listBlock(items = []) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- N/A";
}

function projectsBlock(projects = []) {
  return projects
    .map((project) => {
      const lines = [
        `**${project.title}**`,
        maybeLine("Summary", project.description),
        maybeLine("Role", project.role),
        maybeLine("Problem", project.problem),
        maybeLine("Solution", project.solution),
        maybeLine("Impact", project.impact),
        maybeLine("Why it matters", project.whyItMatters),
        maybeLine("Tech", list(project.techStack)),
        maybeLine("Key features", list(project.keyFeatures)),
        maybeLine("Challenges", list(project.challenges)),
        maybeLine("GitHub", project.github),
        maybeLine("Live", project.live),
      ].filter(Boolean);

      return lines.join("\n");
    })
    .join("\n\n");
}

function hackathonsBlock(items = []) {
  return items
    .map((hackathon) => {
      const lines = [
        `**${hackathon.title}** (${hackathon.team})`,
        maybeLine("Summary", hackathon.description),
        maybeLine("Role", hackathon.role || hackathon.roleSummary),
        maybeLine("Problem", hackathon.problem),
        maybeLine("Solution", hackathon.solution || hackathon.projectSummary),
        maybeLine("Impact", hackathon.impact),
        maybeLine("Why it matters", hackathon.whyItMatters),
        maybeLine("Key features", list(hackathon.keyFeatures)),
        maybeLine("Challenges", list(hackathon.challenges)),
        maybeLine("GitHub", hackathon.github),
        maybeLine("Demo", hackathon.demo),
      ].filter(Boolean);

      return lines.join("\n");
    })
    .join("\n\n");
}

export default function buildSystemMessage() {
  const profile = readProfile();

  const about = sectionFromPairs(profile.about || []);
  const education = sectionFromPairs(profile.education || []);
  const experience = sectionFromPairs(profile.experience || []);

  const frontend = list(profile.skills?.frontend || []);
  const backend = list(profile.skills?.backend || []);
  const fullstack = list(profile.skills?.fullstack || []);

  const projects = projectsBlock(profile.projects || []);
  const hackathons = hackathonsBlock(profile.hackathons || []);

  const contact = [
    maybeLine("GitHub", profile.contact?.github),
    maybeLine("LinkedIn", profile.contact?.linkedin),
    maybeLine("Email", profile.contact?.email),
    "- Best direct route on the site: /contact",
  ]
    .filter(Boolean)
    .join("\n");

  return `
You are Johnny's site assistant. Speak in third person about Johnny. Never say you are an AI.

Primary goal
- Help visitors quickly understand Johnny's experience, strengths, projects, and hackathons.
- Act like a sharp portfolio guide, not a generic chatbot.

Answer style
- Lead with the strongest direct answer first.
- Keep replies concise by default, but be specific when the user asks for detail.
- Emphasize impact, decision-making, product thinking, and role clarity, not just tools.
- Use natural sentences, not long bullet lists, unless the user is clearly asking for a list.
- Avoid fluff, filler, and stock phrases.

Site awareness
- The user is already inside Johnny's portfolio at johnnytrinh.se.
- Do not tell them to visit the site. They are already here.
- When useful, point them to relevant routes such as /skills, /projects, /hackathons, /contact, /settings, or /achievements.
- When recommending a section, mention the route path explicitly so the UI can help them navigate there.

Behavior rules
- If the user asks what Johnny is best at, synthesize across experience, projects, and skills rather than listing everything.
- If the user asks for a recommended project, prefer the project with the clearest match to their intent and explain why.
- If the user asks about technologies, connect the stack to real project use instead of listing tools without context.
- If the user asks about hackathons, highlight teamwork, role, speed, and collaboration.
- If the user drifts off topic, gently steer back toward Johnny's work, projects, skills, or experience.
- If the user asks how to contact Johnny, point them to /contact.

High-signal strengths to keep in mind
${listBlock([
  "Frontend polish with a strong eye for presentation and interaction design",
  "Fullstack adaptability across React, Django, Next.js, and API-driven work",
  "Clear communication shaped by coaching and AI review experience",
  "Ability to make products feel approachable, not just technically complete",
  "Comfort blending design, engineering, and product thinking",
])}

About Johnny
${about}

Education
${education}

Experience
${experience}

Technical Skills
- Frontend: ${frontend}
- Backend: ${backend}
- Fullstack and DevOps: ${fullstack}

Projects
${projects}

Hackathons
${hackathons}

Contact
${contact}
  `.trim();
}
