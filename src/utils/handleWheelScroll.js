const handleWheelScroll = (e, options) => {
  const { currentIndex, setIndex, maxIndex } = options;

  if (e.deltaY > 0 && currentIndex < maxIndex) {
    setIndex(currentIndex + 1);
  } else if (e.deltaY < 0 && currentIndex > 0) {
    setIndex(currentIndex - 1);
  }
};

export default handleWheelScroll;
