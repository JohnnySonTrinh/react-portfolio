import { useState } from "react";

const useActiveProject = (initialProject = 1, totalProjects = 0) => {
  const [activeProject, setActiveProject] = useState(initialProject);

  const changeProject = (direction) => {
    const newProject = activeProject + direction;
    if (newProject > 0 && newProject <= totalProjects) {
      setActiveProject(newProject);
    }
  };

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
