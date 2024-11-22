import { useState } from "react";

const useAboutState = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(1);
  const [activeSubheading, setActiveSubheading] = useState(1);

  // Define the total number of menu items and subheadings
  const totalMenuItems = 3;
  const totalSubheadings = {
    1: 1, // Replace with actual number of subheadings for "PERSONAL"
    2: 2, // Replace with actual number of subheadings for "EDUCATION"
    3: 5, // Replace with actual number of subheadings for "CAREER"
  };

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
    const maxSubheadings = totalSubheadings[activeMenuItem] || 0;
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
