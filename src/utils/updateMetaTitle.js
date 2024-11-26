// This function updates the title of the page
const updateMetaTitle = (title) => {
  // Check if the title is a non-empty string
  if (typeof title === "string" && title.trim().length > 0) {
    document.title = title;
  } else {
    throw new Error("Meta title must be a non-empty string");
  }
};

export default updateMetaTitle;
