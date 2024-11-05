import React from 'react';

const ProfilePopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">My Profile</h2>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="date"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="flex flex-col">
            <label className="text-gray-700">Upload your avatar:</label>
            <input
              type="file"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white rounded-md py-2 hover:bg-gray-800 transition duration-300"
          >
            Save
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:text-gray-800 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;
