import React from "react";
import Avatar from "../../components/avatar/Avatar"; // Correct path to Avatar.jsx
import AboutMenu from "./AboutMenu";
import { AboutProvider } from "../../context/AboutContext"; // Import AboutProvider

const About = () => {
  return (
    <AboutProvider>
      <Avatar page="about" />
      <AboutMenu />
    </AboutProvider>
  );
};

export default About;
