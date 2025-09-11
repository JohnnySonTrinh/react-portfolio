import HackathonsMenu from "./HackathonsMenu";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";

const Hackathons = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.hackathons);

  return (
    <>
      <HackathonsMenu />
    </>
  );
};

export default Hackathons;
