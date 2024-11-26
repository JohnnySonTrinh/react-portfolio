import { useEffect } from "react";

const useMetaTitle = (title) => {
  useEffect(() => {
    if (typeof title === "string" && title.trim().length > 0) {
      document.title = title;
    } else {
      console.warn("Meta title must be a non-empty string");
    }
  }, [title]);
};

export default useMetaTitle;
