import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserById, updateProfile, getUserLinks} from '../services/api';
import Swal from 'sweetalert2';
import { LayoutDashboard, User2, BarChart3, Settings } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    password: '',
    theme: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      fontFamily: 'Inter',
      buttonStyle: 'rounded',
      backgroundImage: '',
      logo: '',
      gradient: {
        enabled: false,
        startColor: '#ffffff',
        endColor: '#000000',
        direction: 'to right'
      }
    }
  });
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfile(user.id);
      loadLinks(user.id);
    }
  }, [user]);

  const loadProfile = async (userId) => {
    try {
      const response = await getUserById(userId);
      setProfile({
        ...response.data,
        theme: {
          backgroundColor: response.data.theme?.backgroundColor || '#ffffff',
          textColor: response.data.theme?.textColor || '#000000',
          fontFamily: response.data.theme?.fontFamily || 'Inter',
          buttonStyle: response.data.theme?.buttonStyle || 'rounded',
          backgroundImage: response.data.theme?.backgroundImage || '',
          logo: response.data.theme?.logo || '',
          gradient: response.data.theme?.gradient || {
            enabled: false,
            startColor: '#ffffff',
            endColor: '#000000',
            direction: 'to right'
          }
        }
      });
    } catch (error) {
      Swal.fire('Error', 'Failed to load profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadLinks = async (userId) => {
    try {
      const response = await getUserLinks(userId);
      setLinks(response.data || []);
    } catch (error) {
      Swal.fire('Error', 'Failed to load links', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(profile);
      Swal.fire('Success', 'Profile updated successfully', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>
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
          <RouterLink to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Settings className="inline-block w-5 h-5 mr-2" />
            Settings
          </RouterLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Section */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <h2 className="text-xl font-bold mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={profile.password}
                    onChange={(e) => setProfile({...profile, password: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </motion.div>

            {/* Theme Section */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-bold mb-4">Theme Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Background Color</label>
                  <input
                    type="color"
                    value={profile.theme.backgroundColor}
                    onChange={(e) => setProfile({
                      ...profile,
                      theme: {...profile.theme, backgroundColor: e.target.value}
                    })}
                    className="mt-1 block w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Text Color</label>
                  <input
                    type="color"
                    value={profile.theme.textColor}
                    onChange={(e) => setProfile({
                      ...profile,
                      theme: {...profile.theme, textColor: e.target.value}
                    })}
                    className="mt-1 block w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Font Family</label>
                  <select
                    value={profile.theme.fontFamily}
                    onChange={(e) => setProfile({
                      ...profile,
                      theme: {...profile.theme, fontFamily: e.target.value}
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Montserrat">Montserrat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Button Style</label>
                  <select
                    value={profile.theme.buttonStyle}
                    onChange={(e) => setProfile({
                      ...profile,
                      theme: {...profile.theme, buttonStyle: e.target.value}
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="rounded">Rounded</option>
                    <option value="square">Square</option>
                    <option value="pill">Pill</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Background Image URL</label>
                  <input
                    type="text"
                    value={profile.theme.backgroundImage}
                    onChange={(e) => setProfile({
                      ...profile,
                      theme: {...profile.theme, backgroundImage: e.target.value}
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Logo URL</label>
                  <input
                    type="text"
                    value={profile.theme.logo}
                    onChange={(e) => setProfile({
                      ...profile,
                      theme: {...profile.theme, logo: e.target.value}
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Enable Gradient</label>
                  <input
                    type="checkbox"
                    checked={profile.theme.gradient.enabled}
                    onChange={(e) => setProfile({
                      ...profile,
                      theme: {...profile.theme, gradient: {...profile.theme.gradient, enabled: e.target.checked}}
                    })}
                    className="mt-1 block"
                  />
                </div>
                {profile.theme.gradient.enabled && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gradient Start Color</label>
                      <input
                        type="color"
                        value={profile.theme.gradient.startColor}
                        onChange={(e) => setProfile({
                          ...profile,
                          theme: {...profile.theme, gradient: {...profile.theme.gradient, startColor: e.target.value}}
                        })}
                        className="mt-1 block w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gradient End Color</label>
                      <input
                        type="color"
                        value={profile.theme.gradient.endColor}
                        onChange={(e) => setProfile({
                          ...profile,
                          theme: {...profile.theme, gradient: {...profile.theme.gradient, endColor: e.target.value}}
                        })}
                        className="mt-1 block w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gradient Direction</label>
                      <select
                        value={profile.theme.gradient.direction}
                        onChange={(e) => setProfile({
                          ...profile,
                          theme: {...profile.theme, gradient: {...profile.theme.gradient, direction: e.target.value}}
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="to right">To Right</option>
                        <option value="to left">To Left</option>
                        <option value="to top">To Top</option>
                        <option value="to bottom">To Bottom</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Social Links Section */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4">Social Links</h2>
              <div className="space-y-4">
                {Array.isArray(links) && links.map((link) => (
                  <div key={link.id}>
                    <label className="block text-sm font-medium text-gray-700">{link.name}</label>
                    <input
                      type="text"
                      value={link.url}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Preview Section */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">Preview</h2>
              <div 
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: profile.theme.gradient.enabled ? `linear-gradient(${profile.theme.gradient.direction}, ${profile.theme.gradient.startColor}, ${profile.theme.gradient.endColor})` : profile.theme.backgroundColor,
                  color: profile.theme.textColor,
                  fontFamily: profile.theme.fontFamily,
                  backgroundImage: `url(${profile.theme.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  textAlign: 'center'
                }}
              >
                {profile.theme.logo && (
                  <img src={profile.theme.logo} alt="Logo" className="h-16 w-16 mb-4 mx-auto" />
                )}
                <h3 className="font-bold">{profile.username}</h3>
                <p className="mt-2">{profile.bio}</p>
                <div className="mt-4 space-y-2">
                  {Array.isArray(links) && links.map((link) => (
                    <a 
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block px-4 py-2 bg-blue-500 text-white ${
                        profile.theme.buttonStyle === 'rounded' ? 'rounded-lg' :
                        profile.theme.buttonStyle === 'pill' ? 'rounded-full' :
                        ''
                      }`}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Save Button */}
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;