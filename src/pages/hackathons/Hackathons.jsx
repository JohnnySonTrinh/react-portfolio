import HackathonsMenu from "./HackathonsMenu";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";
import usePageVisit from "../../hooks/achievements/usePageVisit";

const Hackathons = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.hackathons);
  
  // Track page visit for achievements
  usePageVisit(); // For visit_all_pages
  usePageVisit("hackathon_curious"); // For hackathon_curious achievement

  return (
    <>
      <HackathonsMenu />
    </>
  );
};

export default Hackathons;
