export const BIRTHDAY = new Date(1996, 8, 28);

// Function to calculate age
export const calculateAge = (birthday) => {
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
};

export default calculateAge;
