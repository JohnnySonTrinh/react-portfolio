import React, { Component } from "react";
import Avatar from "../../avatar/Avatar";
import AboutMenu from "./AboutMenu";
import { AboutProvider } from "../../context/AboutContext"; // Import AboutProvider

export default class About extends Component {
  render() {
    return (
      <AboutProvider>
        <Avatar page="about" />
        <AboutMenu />
      </AboutProvider>
    );
  }
}
