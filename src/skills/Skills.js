// Importing necessary modules and assets
import React, { Component } from "react"; // React library for building user interfaces
import Avatar from "../avatar/Avatar.js"; // Avatar component
import SkillsMenu from "./SkillsMenu.js"; // SkillsMenu component
import skillsData from "./skillsData.js"; // Skills data

// Function to shuffle skill levels
const shuffleLevels = (skills) => {
  const shuffledSkills = JSON.parse(JSON.stringify(skills)); // Deep copy to avoid mutating original data
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

// Skills component
export default class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: 1,
      skills: shuffleLevels(skillsData)[1],
    };
  }

  handleCategoryChange = (category) => {
    this.setState({
      currentCategory: category,
      skills: shuffleLevels(skillsData)[category],
    });
  };

  render() {
    const { currentCategory, skills } = this.state;
    return (
      <>
        <Avatar page="skills" />
        <SkillsMenu
          skills={skills}
          currentCategory={currentCategory}
          onCategoryChange={this.handleCategoryChange}
        />
      </>
    );
  }
}
