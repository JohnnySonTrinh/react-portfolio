import { useState } from "react";

const useAboutState = (totalMenuItems = 3, totalSubheadings = {}) => {
  const [activeMenuItem, setActiveMenuItem] = useState(1);
  const [activeSubheading, setActiveSubheading] = useState(1);

  // Handle menu item click and reset subheading
  const handleMenuItemClick = (menuItem) => {
    if (menuItem < 1 || menuItem > totalMenuItems) {
      return;
    }
    setActiveMenuItem(menuItem);
    setActiveSubheading(1);
  };

  // Handle subheading click
  const handleSubheadingClick = (subheading) => {
    const maxSubheadings = totalSubheadings[activeMenuItem] || 1;
    if (subheading < 1 || subheading > maxSubheadings) {
      return;
    }
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
