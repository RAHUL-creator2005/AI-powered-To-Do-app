import { useState, useRef } from "react";

function MessageInput({ onSend, disabled = false }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-700 bg-gray-800 p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? "AI is thinking..." : "Type a command..."}
            rows={1}
            disabled={disabled}
            className="w-full resize-none rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 pr-12 text-sm text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed max-h-32 overflow-y-auto"
            style={{ minHeight: "44px" }}
          />
          {message && !disabled && (
            <button
              type="button"
              onClick={() => setMessage("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="shrink-0 bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {disabled ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
