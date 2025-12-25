const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Send a chat message to the AI backend
 * @param {string} message - The user's message/command
 * @param {string} token - JWT token for authentication
 * @returns {Promise<Object>} - AI response data
 */
const sendChatMessage = async (message, token) => {
  try {
    console.log('Sending chat message:', message);

    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle API errors
      throw new Error(data.message || 'Failed to send message');
    }

    console.log('Chat response received:', data);
    return data;

  } catch (error) {
    console.error('Chat service error:', error);

    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to AI service. Please check if the backend is running.');
    }

    // Re-throw other errors
    throw error;
  }
};

/**
 * Validate if a message looks like a valid command
 * @param {string} message - The message to validate
 * @returns {boolean} - True if message looks like a command
 */
const validateCommand = (message) => {
  if (!message || typeof message !== 'string') return false;

  const trimmed = message.trim().toLowerCase();

  // Check for known command patterns
  if (trimmed.startsWith('/add ') && trimmed.length > 5) return true;
  if (trimmed === '/show') return true;
  if (trimmed.startsWith('/delete ') && trimmed.length > 8) return true;

  return false;
};

/**
 * Get help text for available commands
 * @returns {string} - Help message
 */
const getHelpText = () => {
  return `Available commands:\n• /add <todo> - Add a new todo\n• /show - Show all your todos\n• /delete <todo> - Delete a todo by text`;
};

export const chatService = {
  sendChatMessage,
  validateCommand,
  getHelpText,
};
