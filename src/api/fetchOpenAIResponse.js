export const fetchOpenAIResponse = async (userText) => {
  const res = await fetch("../../api/fetchOpenAIResponse", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userText }),
  });

  const data = await res.json();
  return data.text;
};
