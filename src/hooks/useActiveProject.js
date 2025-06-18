import { useState } from "react";

// Custom hook to manage the active project state
// It allows changing the active project by direction or selecting a specific project index
const useActiveProject = (initialProject = 1, totalProjects = 0) => {
  const [activeProject, setActiveProject] = useState(initialProject);

  // Ensure the initial project is within the valid range
  const changeProject = (direction) => {
    const newProject = activeProject + direction;
    if (newProject > 0 && newProject <= totalProjects) {
      setActiveProject(newProject);
    }
  };

  // Select a specific project by index, ensuring it's within the valid range
  const selectProject = (projectIndex) => {
    if (projectIndex > 0 && projectIndex <= totalProjects) {
      setActiveProject(projectIndex);
    }
  };

  return {
    activeProject,
    changeProject,
    selectProject,
  };
};

export default useActiveProject;
