import { useState } from "react";

const useAboutState = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(1);
  const [activeSubheading, setActiveSubheading] = useState(1);

  // Handle menu item click and reset subheading
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    setActiveSubheading(1);
  };

  // Handle subheading click
  const handleSubheadingClick = (subheading) => {
    setActiveSubheading(subheading);
  };

  return {
    activeMenuItem,
    activeSubheading,
    handleMenuItemClick,
    handleSubheadingClick,
  };
};

export default useAboutState;
