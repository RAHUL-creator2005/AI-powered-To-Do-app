const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    // If the response is not ok, throw an error with the message from backend
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Helper function to make API calls with error handling
const makeApiCall = async (url, options = {}) => {
  try {
    console.log('Making API call to:', url);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('API call failed:', error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server. Please check if the backend is running.');
    }
    throw error;
  }
};

// Authentication service functions
export const authService = {
  // Login with email and password
  login: async (email, password) => {
    const data = await makeApiCall(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Store token and user data in localStorage
    localStorage.setItem('authToken', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));

    return data.data;
  },

  // Signup with user data
  signup: async (email, password) => {
    const data = await makeApiCall(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Store token and user data in localStorage
    localStorage.setItem('authToken', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));

    return data.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  // Get authorization headers for API calls
  getAuthHeaders: () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // Test backend connectivity
  testConnection: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Backend connection test failed:', error);
      return { success: false, error: error.message };
    }
  },
};
