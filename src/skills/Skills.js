// Importing necessary modules and assets
import React, { Component } from "react" // React library for building user interfaces
import Avatar from "../avatar/Avatar.js" // Avatar component
import SkillsMenu from "./SkillsMenu.js" // SkillsMenu component

// About component
export default class About extends Component {
  // Render the About component
  render() {
    return (
      <>
        <Avatar page="skills" />
        <SkillsMenu />
      </>
    )
  }
}
