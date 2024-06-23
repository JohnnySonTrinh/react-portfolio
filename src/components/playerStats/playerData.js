export const LINKEDIN_URL = "https://www.linkedin.com/in/johnny-trinh-dev/";
export const GITHUB_URL = "https://github.com/JohnnySonTrinh/";
export const BIRTHDAY = new Date(1996, 8, 28); // September is month 8 (0-indexed)

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
