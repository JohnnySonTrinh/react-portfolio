const CHAT_API_PATH = "/api/chat";

// Keep the shared request setup in one place so both chat modes stay aligned.
async function requestAssistant(userText, { signal, stream = false } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (stream) {
    headers.Accept = "application/x-ndjson";
  }

  return fetch(CHAT_API_PATH, {
    method: "POST",
    headers,
    body: JSON.stringify({ userText }),
    signal,
  });
}

// Surface a consistent fallback when the API returns a non-JSON response.
async function parseJsonResponse(res) {
  try {
    return await res.json();
  } catch {
    throw new Error(`Bad response from API (${res.status})`);
  }
}

async function assertOkResponse(res) {
  if (res.ok) {
    return;
  }

  const data = await parseJsonResponse(res);
  throw new Error(data.error || `Request failed with ${res.status}`);
}

// Normalize reply payloads so the rest of the UI can rely on one shape.
function normalizeAssistantPayload(data = {}) {
  return {
    text: data.text || "",
    ctas: data.ctas || [],
  };
}

export async function askAssistant(userText) {
  // Call the backend API
  const res = await requestAssistant(userText);
  const data = await parseJsonResponse(res);

  if (!res.ok) {
    throw new Error(data.error || `Request failed with ${res.status}`);
  }

  return normalizeAssistantPayload(data);
}

export async function askAssistantStream(
  userText,
  { signal, onText, onDone } = {}
) {
  const res = await requestAssistant(userText, { signal, stream: true });

  await assertOkResponse(res);

  if (!res.body) {
    throw new Error("Streaming is not supported in this browser.");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  // The stream sends newline-delimited JSON events, so keep partial chunks buffered.
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
        onDone?.(normalizeAssistantPayload(event));
      }

      if (event.type === "error") {
        throw new Error(event.error || "Streaming request failed");
      }
    }
  }
}
