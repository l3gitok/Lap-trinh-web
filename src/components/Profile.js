import React, { useState, useEffect } from 'react';
import { getUserLinks } from '../services/api';
import Swal from 'sweetalert2';
import { LayoutDashboard, User2, BarChart3 } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProfileInformation from './ProfileInformation';
import ThemeSettings from './ThemeSettings';

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadLinks(user.id);
    }
  }, [user]);

  const loadLinks = async (userId) => {
    try {
      const response = await getUserLinks(userId);
      setLinks(response.data || []);
    } catch (error) {
      Swal.fire('Error', 'Failed to load links', 'error');
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white/90 backdrop-blur-sm shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-accent1 to-accent4 bg-clip-text text-transparent">
            Dashboard
          </h2>
        </div>
        <nav className="mt-4">
          <RouterLink to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            <LayoutDashboard className="inline-block w-5 h-5 mr-2" />
            Dashboard
          </RouterLink>
          <RouterLink to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            <User2 className="inline-block w-5 h-5 mr-2" />
            Profile
          </RouterLink>
          <RouterLink to="/analytics" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            <BarChart3 className="inline-block w-5 h-5 mr-2" />
            Analytics
          </RouterLink>
        </nav>
      </div>

      {/* Profile Information and Theme Settings */}
      <div className="flex-1 p-8">
        <ProfileInformation />
        <ThemeSettings />
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">Social Links</h2>
          {/* Render social links here */}
        </div>
      </div>
    </div>
  );
};

export default Profile;