import Avatar from "../../components/avatar/Avatar";
import AboutMenu from "./AboutMenu";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";
import usePageVisit from "../../hooks/achievements/usePageVisit";

const About = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.about);
  
  // Track page visit for achievements
  usePageVisit();

  return (
    <>
      <Avatar page="about" />
      <AboutMenu />
    </>
  );
};

export default About;
