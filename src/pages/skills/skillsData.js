// Skills data for the skills section
const skills = {
  1: [
    { title: "HTML", level: 6 },
    { title: "CSS", level: 5 },
    { title: "Bootstrap", level: 6 },
    { title: "TailwindCSS", level: 3 },
    { title: "JavaScript", level: 5 },
    { title: "React", level: 4 },
    { title: "TypeScript", level: 4 },
    { title: "Figma", level: 1 },
  ],
  2: [
    { title: "Python", level: 6 },
    { title: "Django", level: 4 },
    { title: "Node.js", level: 5 },
    { title: "Next.js", level: 4 },
    { title: "Git", level: 5 },
    { title: "SQL", level: 3 },
    { title: "MongoDB", level: 4 },
    { title: "Express.js", level: 3 },
  ],
};

// Function to shuffle skill levels
export const shuffleLevels = (skills) => {
  const shuffledSkills = JSON.parse(JSON.stringify(skills));
  Object.keys(shuffledSkills).forEach((category) => {
    const levels = shuffledSkills[category].map((skill) => skill.level);
    for (let i = levels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [levels[i], levels[j]] = [levels[j], levels[i]];
    }
    shuffledSkills[category].forEach((skill, index) => {
      skill.level = levels[index];
    });
  });
  return shuffledSkills;
};

// Export the shuffled skills data
const shuffledSkills = shuffleLevels(skills);
export default shuffledSkills;
