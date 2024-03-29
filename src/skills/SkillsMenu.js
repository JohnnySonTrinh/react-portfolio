// Importing necessary modules and assets
import React, { Component } from "react" // React library for building user interfaces
import classNames from "classnames" // A simple utility for conditionally joining classNames together
import "../styles/skillsMenu.css" // CSS styles for the SkillsMenu component
import skills from "./skillsData.js" // Skills data
import frontendIcon from "../assets/eagle-emblem.png" // Frontend icon
import backendIcon from "../assets/hawk-emblem.png" // Backend icon

// SkillsMenu component
export default class SkillsMenu extends Component {
  // Constructor for the SkillsMenu component
  constructor(props) {
    super(props)
    this.state = {
      activeMenuItem: 1,
    }
  }

  // Function to handle the menu item click
  handleMenuItemClick = (menuItem) => {
    this.setState({
      activeMenuItem: menuItem,
    })
  }

  // Function to render the content
  renderContent = (skills) => {
    return skills.map((skill, index) => (
      <div
        key={index}
        className={`skill-sub-container-${this.state.activeMenuItem}`}
      >
        <h3>{skill.title}</h3>
        <div className="level-container">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`level-point ${
                i < skill.level ? "filled" : "unfilled"
              }`}
            />
          ))}
        </div>
      </div>
    ))
  }

  // Render the SkillsMenu component
  render() {
    const { activeMenuItem } = this.state
    const menuItems = ["FRONT-END", "BACK-END"]

    const currentIcon = activeMenuItem === 1 ? frontendIcon : backendIcon

    // Return the SkillsMenu component
    return (
      <div className="skill-menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={classNames("skill-item", {
              activeSkill: activeMenuItem === index + 1,
            })}
            onClick={() => this.handleMenuItemClick(index + 1)}
          >
            <h2 className="skill-title">{item}</h2>
          </div>
        ))}
        <img className="skill-icon" src={currentIcon} alt="current skill" />
        <div className="skill-sub-container">
          {this.renderContent(skills[activeMenuItem])}
        </div>
      </div>
    )
  }
}
