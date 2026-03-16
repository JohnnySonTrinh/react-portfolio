import { fireEvent, render, screen } from "@testing-library/react";
import ChatAssistant from "./ChatAssistant";
import useChatbot from "../../hooks/useChatbot";

const mockNavigate = jest.fn();
const mockHandleSendMessage = jest.fn();
const mockClearChat = jest.fn();
const mockSendMessage = jest.fn();
const mockSetInput = jest.fn();
const mockUpdateProgress = jest.fn();

jest.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/chatbot" }),
  useNavigate: () => mockNavigate,
}));
jest.mock("react-markdown", () => ({ children }) => <>{children}</>);

jest.mock("../../hooks/useChatbot", () => jest.fn());
jest.mock("../../hooks/achievements/useAchievement", () => ({
  useAchievements: () => ({
    updateProgress: mockUpdateProgress,
  }),
}));
jest.mock("../../hooks/useProfileData", () => () => ({
  projects: [],
  hackathons: [],
}));
jest.mock("../../utils/matchChatPortfolioItems", () => ({
  matchChatPortfolioItems: jest.fn(() => []),
}));
jest.mock("./ChatPortfolioCard", () => () => <div>Portfolio Card</div>);

describe("ChatAssistant", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useChatbot.mockReturnValue({
      messages: [
        {
          id: 1,
          sender: "ai",
          text: "Hello",
          ctas: [{ label: "View Projects", route: "/projects" }],
          isStreaming: false,
        },
      ],
      loading: false,
      input: "Tell me more",
      setInput: mockSetInput,
      handleSendMessage: mockHandleSendMessage,
      clearChat: mockClearChat,
      chatEndRef: { current: null },
      sendMessage: mockSendMessage,
    });
  });

  it("tracks achievements when sending a typed message", () => {
    render(<ChatAssistant />);

    fireEvent.click(screen.getByRole("button", { name: "Send message" }));

    expect(mockHandleSendMessage).toHaveBeenCalled();
    expect(mockUpdateProgress).toHaveBeenCalledWith("chat_messages");
    expect(mockUpdateProgress).toHaveBeenCalledWith("conversation_starter");
  });

  it("navigates when a CTA button is clicked", () => {
    render(<ChatAssistant />);

    fireEvent.click(screen.getByRole("button", { name: "View Projects" }));

    expect(mockNavigate).toHaveBeenCalledWith("/projects");
  });

  it("sends suggestion prompts and tracks achievements", () => {
    useChatbot.mockReturnValue({
      messages: [
        {
          id: 1,
          sender: "ai",
          text: "Hello",
          ctas: [],
          isStreaming: false,
        },
        {
          id: 2,
          sender: "ai",
          text: "Try a suggestion",
          ctas: [],
          isStreaming: false,
        },
      ],
      loading: false,
      input: "",
      setInput: mockSetInput,
      handleSendMessage: mockHandleSendMessage,
      clearChat: mockClearChat,
      chatEndRef: { current: null },
      sendMessage: mockSendMessage,
    });

    render(<ChatAssistant />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Send suggested message: What projects has Johnny built?",
      })
    );

    expect(mockSendMessage).toHaveBeenCalledWith(
      "What projects has Johnny built?"
    );
    expect(mockUpdateProgress).toHaveBeenCalledWith("chat_messages");
    expect(mockUpdateProgress).toHaveBeenCalledWith("conversation_starter");
  });
});
