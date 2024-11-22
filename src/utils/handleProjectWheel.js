const handleProjectWheel = (e, changeProject) => {
  if (e.deltaY > 0) {
    changeProject(1);
  } else {
    changeProject(-1);
  }
};

export default handleProjectWheel;
