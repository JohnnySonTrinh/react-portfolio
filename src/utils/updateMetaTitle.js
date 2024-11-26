const updateMetaTitle = (title) => {
  if (typeof title === "string" && title.trim().length > 0) {
    document.title = title;
  } else {
    throw new Error("Meta title must be a non-empty string");
  }
};

export default updateMetaTitle;
