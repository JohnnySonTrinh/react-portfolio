import React, { Component } from "react";
import classNames from "classnames";
import "../styles/skillsMenu.css";
import frontendIcon from "../assets/eagle-emblem.png";
import backendIcon from "../assets/hawk-emblem.png";

export default class SkillsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenuItem: 1,
      showNote: true,
    };
  }

  handleMenuItemClick = (menuItem) => {
    this.setState({
      activeMenuItem: menuItem,
    });
    this.props.onCategoryChange(menuItem);
  };

  handleCloseNote = () => {
    this.setState({ showNote: false });
  };

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
              style={{ animationDelay: `${i * 0.2}s` }} // Add delay to each bar
            />
          ))}
        </div>
      </div>
    ));
  };

  // Render the SkillsMenu component
  render() {
    const { activeMenuItem, showNote } = this.state;
    const menuItems = ["FRONT-END", "BACK-END"];
    const currentIcon = activeMenuItem === 1 ? frontendIcon : backendIcon;

    return (
      <div className="skill-menu" key={activeMenuItem}>
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
        {showNote && (
          <div className="note">
            <p>
              This does not represent my actual skill level in each stack.
              <button className="close-note" onClick={this.handleCloseNote}>
                &times;
              </button>
            </p>
          </div>
        )}
        <div className="skill-sub-container">
          {this.renderContent(this.props.skills)}
        </div>
      </div>
    );
  }
}
