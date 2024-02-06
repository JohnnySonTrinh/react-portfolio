// Importing necessary assets
import React, { Component } from "react" // React library for building UI
import classNames from "classnames" // Classnames library for conditionally joining class names together
import hackathons from "./hackathonsData" // Data for the hackathons
import "../styles/hackathonsMenu.css" // Styles for the hackathons menu

// HackathonsMenu component
export default class HackathonsMenu extends Component {
  // Constructor method for initializing state and binding event handlers
  constructor(props) {
    super(props)
    this.state = {
      activeHackathon: 1,
    }
  }

  // Event handler for clicking a hackathon item
  handleHackathonClick = (hackathon) => {
    this.setState({
      activeHackathon: hackathon,
    })
  }

  // Method for rendering the content of the hackathons
  renderContent = (hackathons) => {
    return hackathons.map((hackathon, index) => (
      <div key={index} className={`hackathon-sub-container-${index + 1}`}>
        <h3>{hackathon.title}</h3>
        <img src={hackathon.image} alt={hackathon.title}></img>
        <div>{hackathon.description}</div>
        <div className="link-container">
          <a href={hackathon.github} target="_blank" rel="noopener noreferrer">
            GITHUB
          </a>
          <a href={hackathon.Demo} target="_blank" rel="noopener noreferrer">
            DEMO
          </a>
        </div>
      </div>
    ))
  }

  // Method for rendering the hackathons menu
  render() {
    const { activeHackathon } = this.state // Destructuring state variables
    const hackathonItems = ["DEC 2023", "JAN 2024"] // Array of hackathon items

    // Return the hackathons menu
    return (
      <div className="hackathon-menu">
        <div className="hackathon-items-container">
          {hackathonItems.map((item, index) => (
            <div
              key={index}
              className={classNames("hackathon-item", {
                activeHackathon: activeHackathon === index + 1,
              })}
              onClick={() => this.handleHackathonClick(index + 1)}
            >
              <h2 className="title">{item}</h2>
            </div>
          ))}
        </div>
        <div className="hackathon-sub-container">
          {this.renderContent([hackathons[activeHackathon]])}
        </div>
      </div>
    )
  }
}
