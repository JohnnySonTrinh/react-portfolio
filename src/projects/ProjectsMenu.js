// Importing necessary modules and assets
import React, { Component } from "react" // React library for building user interfaces
import classNames from "classnames" // A simple utility for conditionally joining classNames together
import projects from "./projectsData" // Projects data
import "../styles/projectsMenu.css" // CSS styles for the ProjectsMenu component

// ProjectsMenu component
export default class ProjectsMenu extends Component {
  // Constructor for the ProjectsMenu component
  constructor(props) {
    super(props)
    this.state = {
      activeProject: 1,
    }
  }

  // Function to handle the project click
  handleProjectClick = (project) => {
    this.setState({
      activeProject: project,
    })
  }

  // Function to render the content
  renderContent = (projects) => {
    return projects.map((project, index) => (
      <div key={index} className={`project-sub-container-${index + 1}`}>
        <h3>{project.title}</h3>
        <img src={project.image} alt={project.title}></img>
        <div>{project.description}</div>
        <div className="link-container">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            GITHUB
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            LIVE
          </a>
        </div>
      </div>
    ))
  }

  // Render the ProjectsMenu component
  render() {
    const { activeProject } = this.state // Destructure the activeProject from the state
    const projectItems = ["PROJECT ONE", "PROJECT TWO", "PROJECT THREE"]

    // Return the ProjectsMenu component
    return (
      <div className="project-menu">
        <div className="project-items-container">
          {projectItems.map((item, index) => (
            <div
              key={index}
              className={classNames("project-item", {
                activeProject: activeProject === index + 1,
              })}
              onClick={() => this.handleProjectClick(index + 1)}
            >
              <h2 className="title">{item}</h2>
            </div>
          ))}
        </div>
        <div className="project-sub-container">
          {this.renderContent([projects[activeProject]])}
        </div>
      </div>
    )
  }
}
