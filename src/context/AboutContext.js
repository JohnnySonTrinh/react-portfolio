import { createContext, useContext, useState } from "react";

const AboutContext = createContext();

export const useAbout = () => {
  return useContext(AboutContext);
};

export const AboutProvider = ({ children }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(1);
  const [activeSubheading, setActiveSubheading] = useState(1);

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    setActiveSubheading(1);
  };

  const handleSubheadingClick = (subheading) => {
    setActiveSubheading(subheading);
  };

  return (
    <AboutContext.Provider
      value={{
        activeMenuItem,
        activeSubheading,
        handleMenuItemClick,
        handleSubheadingClick,
      }}
    >
      {children}
    </AboutContext.Provider>
  );
};
