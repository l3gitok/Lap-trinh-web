import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, updatePassword } from '../services/api';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

const ProfileInformation = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    biolink: ''
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setProfile(response.data);
    } catch (error) {
      Swal.fire('Error', 'Failed to load profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile(profile);
      if (currentPassword && newPassword) {
        await updatePassword(currentPassword, newPassword);
      }
      Swal.fire('Success', 'Profile updated successfully', 'success');
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Profile Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Biolink</label>
          <input
            type="text"
            name="biolink"
            value={profile.biolink}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileInformation;