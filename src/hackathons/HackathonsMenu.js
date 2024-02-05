import React, { Component } from "react"
import classNames from "classnames"
import hackathons from "./hackathonsData"
import "../styles/hackathonsMenu.css"

export default class HackathonsMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeHackathon: 1,
    }
  }

  handleHackathonClick = (hackathon) => {
    this.setState({
      activeHackathon: hackathon,
    })
  }

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
          <a href={hackathon.live} target="_blank" rel="noopener noreferrer">
            LIVE
          </a>
        </div>
      </div>
    ))
  }

  render() {
    const { activeHackathon } = this.state
    const hackathonItems = ["DEC 2023", "JAN 2024"]

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
