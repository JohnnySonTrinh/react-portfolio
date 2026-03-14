const routeMap = [
  {
    route: "/projects",
    label: "View Projects",
    patterns: ["/projects", "projects page", "project page", "projects section"],
  },
  {
    route: "/hackathons",
    label: "View Hackathons",
    patterns: ["/hackathons", "hackathons page", "hackathon page", "hackathons section"],
  },
  {
    route: "/skills",
    label: "View Skills",
    patterns: ["/skills", "skills page", "skills section"],
  },
  {
    route: "/contact",
    label: "Open Contact",
    patterns: ["/contact", "contact page", "contact section"],
  },
  {
    route: "/achievements",
    label: "Open Achievements",
    patterns: ["/achievements", "achievements page", "achievements section"],
  },
  {
    route: "/settings",
    label: "Open Settings",
    patterns: ["/settings", "settings page", "settings section"],
  },
  {
    route: "/chatbot",
    label: "Open Chatbot",
    patterns: ["/chatbot", "chatbot page", "chat page"],
  },
  {
    route: "/",
    label: "Go To About",
    patterns: ["/", "about page", "about section", "landing page"],
  },
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function extractChatCtas(text = "") {
  const normalized = text.trim();
  const matches = [];

  for (const item of routeMap) {
    const matchesRoute = item.patterns.some((patternValue) => {
      const pattern = new RegExp(
        `(^|\\s|\\()${escapeRegExp(patternValue)}(?=\\s|$|[).,!?])`,
        "i"
      );

      return pattern.test(normalized);
    });

    if (matchesRoute) {
      matches.push({
        label: item.label,
        route: item.route,
      });
    }
  }

  return matches;
}
