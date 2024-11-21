const debouce = (func, delay) => {
  let timeout;
  return (...args) => {
    // Clear the previous timeout
    clearTimeout(timeout);

    // Set a new timeout
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default debouce;
