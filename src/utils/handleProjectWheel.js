// Desc: Handle project wheel event
const handleProjectWheel = (e, changeProject) => {
  // Check if the wheel event is up or down
  if (e.deltaY > 0) {
    changeProject(1);
  } else {
    changeProject(-1);
  }
};

export default handleProjectWheel;
