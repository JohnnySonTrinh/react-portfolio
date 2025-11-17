import AchievementMenu from "./AchievementMenu";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";



const Achievement = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.achievements);

  return (
    <AchievementMenu />
  )
}

export default Achievement