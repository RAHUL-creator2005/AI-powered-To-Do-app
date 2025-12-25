import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatBox from "../components/Chat/ChatBox";

function ChatPage() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header/Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-linear-to-r from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L19 6.6C18.8 6 18.5 5.4 18.1 4.9L19 3L17 1L15.4 1.9C14.9 1.5 14.3 1.2 13.7 1L13 0H11L10.3 1C9.7 1.2 9.1 1.5 8.6 1.9L7 1L5 3L5.9 4.9C5.5 5.4 5.2 6 5 6.6L3 7V9L5 9.4C5.2 10 5.5 10.6 5.9 11.1L5 13L7 15L8.6 14.1C9.1 14.5 9.7 14.8 10.3 15L11 16H13L13.7 15C14.3 14.8 14.9 14.5 15.4 14.1L17 15L19 13L18.1 11.1C18.5 10.6 18.8 10 19 9.4L21 9ZM12 8C13.66 8 15 9.34 15 11C15 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11C9 9.34 10.34 8 12 8Z"/>
                <circle cx="12" cy="11" r="2" className="animate-pulse"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-linear-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                AI Powered To Do App
              </h1>
              <p className="text-xs text-gray-400">Manage your tasks with AI</p>
            </div>
          </div>

          {/* Right Side - Login/User Info */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 text-sm">Welcome, {user.name}</span>
                <div className="w-8 h-8 bg-linear-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg shadow-emerald-500/30">
                  {(user.name || 'U').charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="text-gray-400 hover:text-white text-sm px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-300 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-linear-to-r from-emerald-500 to-cyan-500 text-white text-sm px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl shadow-emerald-500/30"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Chat Content */}
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-2xl">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;

