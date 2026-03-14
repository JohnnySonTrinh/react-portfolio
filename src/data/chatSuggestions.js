export const defaultSuggestions = [
  "What projects has Johnny built?",
  "What technologies does Johnny use?",
  "What's Johnny's background before becoming a developer?",
];

export const routeSuggestions = {
  "/": [
    "What's Johnny's background before becoming a developer?",
    "What kind of developer is Johnny?",
    "What makes Johnny different from other developers?",
  ],
  "/skills": [
    "What frontend technologies does Johnny use most?",
    "How strong is Johnny on backend development?",
    "Which tools best represent Johnny's fullstack skills?",
  ],
  "/projects": [
    "Which project best shows Johnny's fullstack ability?",
    "What projects has Johnny built with AI features?",
    "Which project should a recruiter look at first?",
  ],
  "/hackathons": [
    "What hackathons has Johnny joined?",
    "What role does Johnny usually take in hackathons?",
    "Which hackathon project shows the best teamwork?",
  ],
  "/chatbot": [
    "What projects has Johnny built?",
    "What technologies does Johnny use?",
    "How can I contact Johnny?",
  ],
  "/contact": [
    "What's the best reason to reach out to Johnny?",
    "What kind of roles is Johnny a good fit for?",
    "Which project should I mention when contacting Johnny?",
  ],
  "/settings": [
    "What can Johnny build with React?",
    "Which project shows Johnny's best UI work?",
    "What makes Johnny stand out as a developer?",
  ],
  "/achievements": [
    "What should I explore first on Johnny's portfolio?",
    "Which project best represents Johnny's skills?",
    "What's Johnny's strongest technical area?",
  ],
};

export const getSuggestionsByRoute = (pathname) =>
  routeSuggestions[pathname] || defaultSuggestions;
