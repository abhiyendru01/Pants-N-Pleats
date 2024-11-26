import { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import Cropper from 'cropperjs';
import './getCroppedImg';
import 'cropperjs/dist/cropper.min.css';
import './Navbar';
import { ShopContext } from '../context/ShopContext';

const ProfilePopup = ({ isOpen, onClose }) => {
  const { token, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const fileInputRef = useRef(null);
  const cropperRef = useRef(null);

  useEffect(() => {
    if (avatar && cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = new Cropper(fileInputRef.current, {
        aspectRatio: 1,
        viewMode: 1,
        responsive: true,
        autoCropArea: 1,
        zoomable: false,
        scalable: false,
        crop(event) {
          const canvas = cropperRef.current.getCroppedCanvas();
          if (canvas) {
            setCroppedImage(canvas.toDataURL());
          }
        }
      });
    }
  }, [avatar]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('birthDate', birthDate);
    formData.append('avatar', croppedImage ? croppedImage : avatar);

    try {
      await axios.post(`${backendUrl}/models/userModel.js`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      alert("Profile saved successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">My Profile</h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="flex flex-col">
            <label className="text-gray-700">Upload your avatar:</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {avatar && (
              <div className="mt-4 flex justify-center">
                <img
                  src={croppedImage || avatar}
                  alt="Cropped Avatar Preview"
                  className="rounded-full w-24 h-24 object-cover"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 hover:bg-gray-800 transition duration-300"
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
