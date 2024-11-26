// Desc: Handle wheel scroll event
const handleWheelScroll = (e, options) => {
  // Destructure options object
  const { currentIndex, setIndex, maxIndex } = options;

  // Check if the wheel event is up or down
  if (e.deltaY > 0 && currentIndex < maxIndex) {
    setIndex(currentIndex + 1);
  } else if (e.deltaY < 0 && currentIndex > 0) {
    setIndex(currentIndex - 1);
  }
};

export default handleWheelScroll;
