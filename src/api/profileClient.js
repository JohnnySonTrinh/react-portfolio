export async function fetchProfile() {
  const response = await fetch("/profile.json");

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(`Bad response from profile file (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(data.error || `Request failed with ${response.status}`);
  }

  return data;
}
