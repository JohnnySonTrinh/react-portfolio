export const BIRTHDAY = new Date(1996, 8, 28);

// Function to calculate age
export const calculateAge = (birthday) => {
  // Get the current date
  const today = new Date();
  // Get the difference between the current date and the birthday
  let age = today.getFullYear() - birthday.getFullYear();
  // Check if the birthday has already occurred this year
  const m = today.getMonth() - birthday.getMonth();
  // If the birthday has not occurred, subtract one year from the age
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
};

export default calculateAge;
