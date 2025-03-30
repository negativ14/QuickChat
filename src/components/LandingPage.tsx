import { useState } from 'react';
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom';
import { Video, Users, UserPlus, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const generatedRoomId = uuid();
    console.log("the generated uuid ", generatedRoomId)
    navigate(`/home/${generatedRoomId}`);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      navigate(`/home/${roomId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Hero section */}
          <div className="bg-indigo-600 text-white p-8 md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center mb-6">
              <Video className="h-10 w-10 mr-2" />
              <h1 className="text-3xl font-bold">QuickC</h1>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Instant Video Conferences</h2>
            <p className="text-indigo-100 mb-6">
              Connect with anyone, anywhere with just a few clicks. No downloads required.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="bg-indigo-500 rounded-full p-1 mr-2">
                  <Users size={16} />
                </div>
                <span>Crystal clear HD audio & video</span>
              </li>
              <li className="flex items-center">
                <div className="bg-indigo-500 rounded-full p-1 mr-2">
                  <Users size={16} />
                </div>
                <span>Secure, encrypted connections</span>
              </li>
              <li className="flex items-center">
                <div className="bg-indigo-500 rounded-full p-1 mr-2">
                  <Users size={16} />
                </div>
                <span>No account needed</span>
              </li>
            </ul>
          </div>

          {/* Right side - Action buttons */}
          <div className="p-8 md:w-1/2 flex flex-col justify-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Join a Meeting</h2>
            <div className="space-y-4">
              <button
                onClick={handleCreateRoom}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
              >
                <UserPlus size={20} />
                <span>Create New Room</span>
              </button>
              
              <div className="relative">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter Room ID"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {/* <button
                  onClick={handleJoinRoom}
                  disabled={!roomId.trim()}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                    roomId.trim() ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <ArrowRight size={18} />
                </button> */}
              </div>
              
              <button
                onClick={handleJoinRoom}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-all"
              >
                <span>Join via Shared Link</span>
              </button>
            </div>
            
            <div className="text-center mt-4 text-gray-500 text-sm">
              Connect Fast, Connect Now.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;