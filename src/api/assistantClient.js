export async function askAssistant(userText) {
  // Call the backend API
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userText })
  });

  // Parse the response
  let data;
  // Handle non-JSON responses
  try {
    data = await res.json();
  } catch {
    throw new Error(`Bad response from API (${res.status})`);
  }

  if (!res.ok) {
    throw new Error(data.error || `Request failed with ${res.status}`);
  }

  return data.text;
}