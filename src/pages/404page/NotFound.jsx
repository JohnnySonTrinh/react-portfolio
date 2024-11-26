import NotFoundMenu from "./NotFoundMenu";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";

const NotFound = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.notFound);

  return (
    <>
      <NotFoundMenu />
    </>
  );
};

export default NotFound;
