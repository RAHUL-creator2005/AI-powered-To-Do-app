import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { chatService } from "../../services/chatService";

function ChatBox() {
  const { user, getToken } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello! I'm your AI Powered To Do App assistant. I can help you manage your tasks!\n\nTry these commands:\n• /add <todo> - Add a new todo\n• /show - Show all your todos\n• /delete <todo> - Delete a todo by text`,
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text) => {
    if (!user || !getToken()) {
      // Add error message if not authenticated
      const errorMessage = {
        id: messages.length + 1,
        text: "Please log in to use the AI assistant.",
        sender: "bot",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    // Add user message to chat
    const newMessage = {
      id: messages.length + 1,
      text: text,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Send message to AI backend
      const response = await chatService.sendChatMessage(text, getToken());

      // Add AI response to chat
      const botMessage = {
        id: messages.length + 2,
        text: response.message,
        sender: "bot",
        timestamp: new Date(),
        data: response.data // Include any additional data from the response
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Chat error:', error);

      // Add error message to chat
      const errorMessage = {
        id: messages.length + 2,
        text: `Error: ${error.message}`,
        sender: "bot",
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl h-[500px] bg-gray-900 rounded-lg shadow-lg border border-gray-700 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L19 6.6C18.8 6 18.5 5.4 18.1 4.9L19 3L17 1L15.4 1.9C14.9 1.5 14.3 1.2 13.7 1L13 0H11L10.3 1C9.7 1.2 9.1 1.5 8.6 1.9L7 1L5 3L5.9 4.9C5.5 5.4 5.2 6 5 6.6L3 7V9L5 9.4C5.2 10 5.5 10.6 5.9 11.1L5 13L7 15L8.6 14.1C9.1 14.5 9.7 14.8 10.3 15L11 16H13L13.7 15C14.3 14.8 14.9 14.5 15.4 14.1L17 15L19 13L18.1 11.1C18.5 10.6 18.8 10 19 9.4L21 9ZM12 8C13.66 8 15 9.34 15 11C15 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11C9 9.34 10.34 8 12 8Z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">AI Powered To Do App</h2>
            <p className="text-sm text-gray-400">Task Management Assistant</p>
          </div>
          {/* Loading indicator */}
          {isLoading && (
            <div className="ml-auto flex items-center space-x-2 text-sm text-gray-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-400"></div>
              <span>AI thinking...</span>
            </div>
          )}
        </div>
      </div>

      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}

export default ChatBox;
