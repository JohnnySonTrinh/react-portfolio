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

  return {
    text: data.text,
    ctas: data.ctas || [],
  };
}

export async function askAssistantStream(userText, { signal, onText, onDone } = {}) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/x-ndjson",
    },
    body: JSON.stringify({ userText }),
    signal,
  });

  if (!res.ok) {
    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error(`Bad response from API (${res.status})`);
    }

    throw new Error(data.error || `Request failed with ${res.status}`);
  }

  if (!res.body) {
    throw new Error("Streaming is not supported in this browser.");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.trim()) {
        continue;
      }

      const event = JSON.parse(line);

      if (event.type === "text") {
        onText?.(event.chunk);
      }

      if (event.type === "done") {
        onDone?.({
          text: event.text || "",
          ctas: event.ctas || [],
        });
      }

      if (event.type === "error") {
        throw new Error(event.error || "Streaming request failed");
      }
    }
  }
}
