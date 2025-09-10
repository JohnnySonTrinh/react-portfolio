export async function askAssistant(userText) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userText })
  });

  let data;
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