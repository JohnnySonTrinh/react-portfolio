const ambiguousTitles = new Set(["Portfolio"]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createTitlePattern(title) {
  return new RegExp(`(^|\\b)${escapeRegExp(title)}(?=\\b|[.,!?])`, "i");
}

function itemSortByTitleLength(a, b) {
  return b.title.length - a.title.length;
}

function getUniqueItems(items) {
  const seen = new Set();

  return items.filter((item) => {
    const key = `${item.type}:${item.title}`;
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function toProjectCard(project) {
  return {
    type: "project",
    title: project.title,
    image: project.image,
    description: project.description,
    techStack: project.techStack || [],
    primaryLink: project.live,
    primaryLabel: "LIVE",
    secondaryLink: project.github,
    secondaryLabel: "GITHUB",
  };
}

function toHackathonCard(hackathon) {
  return {
    type: "hackathon",
    title: hackathon.title,
    subtitle: hackathon.team,
    image: hackathon.image,
    description: hackathon.projectSummary || hackathon.description,
    techStack: [],
    primaryLink: hackathon.demo,
    primaryLabel: "DEMO",
    secondaryLink: hackathon.github,
    secondaryLabel: "GITHUB",
  };
}

export function matchChatPortfolioItems(
  text,
  projects = [],
  hackathons = []
) {
  if (!text) {
    return [];
  }

  const orderedProjects = [...projects].sort(itemSortByTitleLength);
  const orderedHackathons = [...hackathons].sort(itemSortByTitleLength);

  const matchedProjects = orderedProjects
    .filter((project) => !ambiguousTitles.has(project.title))
    .filter((project) => createTitlePattern(project.title).test(text))
    .map(toProjectCard);

  const matchedHackathons = orderedHackathons
    .filter((hackathon) => createTitlePattern(hackathon.title).test(text))
    .map(toHackathonCard);

  return getUniqueItems([...matchedProjects, ...matchedHackathons]).slice(0, 2);
}
