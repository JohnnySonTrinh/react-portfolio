const skillIconMap = {
  JavaScript: "devicon-javascript-plain",
  React: "devicon-react-original",
  HTML: "devicon-html5-plain",
  CSS: "devicon-css3-plain",
  Bootstrap: "devicon-bootstrap-plain",
  TailwindCSS: "devicon-tailwindcss-plain",
  "Tailwind CSS": "devicon-tailwindcss-plain",
  TypeScript: "devicon-typescript-plain",
  Figma: "devicon-figma-plain",
  Postman: "devicon-postman-plain",
  Redux: "devicon-redux-plain",
  "C#": "devicon-csharp-plain",
  ".NET": "devicon-dot-net-plain",
  Python: "devicon-python-plain",
  Django: "devicon-django-plain",
  DjangoREST: "devicon-djangorest-plain",
  "Django REST Framework": "devicon-djangorest-plain",
  "Node.js": "devicon-nodejs-plain",
  "Next.js": "devicon-nextjs-plain",
  PostgreSQL: "devicon-postgresql-plain",
  MongoDB: "devicon-mongodb-plain",
  Supabase: "devicon-supabase-plain",
  Git: "devicon-git-plain",
  GitHub: "devicon-github-original",
  Heroku: "devicon-heroku-original",
  Vercel: "devicon-vercel-plain",
  Docker: "devicon-docker-plain",
  npm: "devicon-npm-original-wordmark",
};

export const aboutMenuItems = ["PERSONAL", "EDUCATION", "CAREER"];

export const skillCategories = [
  { id: 1, key: "frontend", label: "Frontend" },
  { id: 2, key: "backend", label: "Backend" },
  { id: 3, key: "fullstack", label: "Fullstack" },
];

function toSkill(name) {
  return {
    title: name,
    icon: skillIconMap[name] || "",
    ariaLabel: `Skill: ${name}`,
  };
}

export function transformProfile(profile) {
  const aboutSections = {
    1: profile.about || [],
    2: profile.education || [],
    3: profile.experience || [],
  };

  const skillsByCategory = skillCategories.reduce((accumulator, category) => {
    accumulator[category.id] = (profile.skills?.[category.key] || []).map(toSkill);
    return accumulator;
  }, {});

  const projects = (profile.projects || []).map((project) => ({
    ...project,
    techStack: (project.techStack || []).map(toSkill),
  }));

  const hackathons = (profile.hackathons || []).map((hackathon) => ({
    ...hackathon,
    roleSummary: hackathon.roleSummary || hackathon.description || "",
    projectSummary: hackathon.projectSummary || hackathon.description || "",
  }));

  return {
    aboutSections,
    skillsByCategory,
    projects,
    hackathons,
  };
}
