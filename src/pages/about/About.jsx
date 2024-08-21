import Avatar from "../../components/avatar/Avatar";
import AboutMenu from "./AboutMenu";
import { AboutProvider } from "../../context/AboutContext";

const About = () => {
  return (
    <AboutProvider>
      <Avatar page="about" />
      <AboutMenu />
    </AboutProvider>
  );
};

export default About;
