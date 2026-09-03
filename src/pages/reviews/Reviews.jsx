import ReviewsMenu from "./ReviewsMenu";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";

const Reviews = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.reviews);

  return (
    <>
      <ReviewsMenu />
    </>
  );
};

export default Reviews;
