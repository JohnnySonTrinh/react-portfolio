import Avatar from "../../components/avatar/Avatar";
import AboutMenu from "./AboutMenu";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";

const About = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.about);

  return (
    <>
      <Avatar page="about" />
      <AboutMenu />
    </>
  );
};

export default About;
