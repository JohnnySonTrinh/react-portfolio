import SettingsMenu from "./SettingsMenu";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";
import usePageVisit from "../../hooks/achievements/usePageVisit";
import "../../styles/settings.css";

const Settings = () => {
  useMetaTitle(pageTitles.settings);
  usePageVisit();

  return <SettingsMenu />;
};

export default Settings;
