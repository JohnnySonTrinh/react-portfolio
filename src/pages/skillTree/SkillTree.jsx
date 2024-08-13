import React from "react";
import skillsData from "./skillsData";
import "../../styles/skillTree.css";

const SkillTree = () => {
  return (
    <div className="skill-tree-container fade-in">
      <div className="skill-tree-content">
        <div className="skill-tree-column">
          <h2>Frontend</h2>
          {skillsData.frontend.map((skill, index) => (
            <div key={index} className="skill-node">
              <i className={skill.icon}></i>
              <div className="skill-node-title">{skill.title}</div>
            </div>
          ))}
        </div>
        <div className="skill-tree-column">
          <h2>Backend</h2>
          {skillsData.backend.map((skill, index) => (
            <div key={index} className="skill-node">
              <i className={skill.icon}></i>
              <div className="skill-node-title">{skill.title}</div>
            </div>
          ))}
        </div>
        <div className="skill-tree-column">
          <h2>Fullstack</h2>
          {skillsData.fullstack.map((skill, index) => (
            <div key={index} className="skill-node">
              <i className={skill.icon}></i>
              <div className="skill-node-title">{skill.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillTree;
