import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { getUserLinks, getProfileByUserIdController } from '../services/api';

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [theme, setTheme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const profileResponse = await getProfileByUserIdController(userId);
      const linksResponse = await getUserLinks(userId);
      setUser(profileResponse.data.user);
      setLinks(linksResponse.data);
      setSocialLinks(profileResponse.data.socialLinks || []); // Assuming socialLinks is returned by the API
      setTheme(profileResponse.data.theme || {}); // Assuming theme is returned by the API
      setLoading(false);
    } catch (error) {
      Swal.fire('Error', 'Failed to load user data', 'error');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>User not found</p>
      </div>
    );
  }

  const backgroundStyle = theme.gradient?.enabled
    ? { background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.startColor}, ${theme.gradient.endColor})` }
    : { backgroundColor: theme.backgroundColor };

  return (
    <div className="min-h-screen" style={{ ...backgroundStyle, color: theme.textColor, fontFamily: theme.fontFamily }}>
      <div className="p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl w-full bg-white p-6 rounded-lg shadow"
          style={{ backgroundImage: `url(${theme.backgroundImage})` }}
        >
          <div className="text-center">
            {theme.logo && (
              <img src={theme.logo} alt="Logo" className="h-16 w-16 mb-4 mx-auto" />
            )}
            <h1 className="text-2xl font-bold mb-4">{user.username}</h1>
            <p className="mb-6">{user.bio}</p>
          </div>
          <div className="space-y-4">
            {links.map((link) => (
              <motion.a
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${theme.buttonStyle === 'rounded' ? 'rounded-lg' : 'rounded-none'} bg-blue-500 text-white px-4 py-2 text-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.title}
              </motion.a>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-center">Follow me on</h2>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-700 hover:text-blue-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.platform === 'facebook' && <FaFacebook />}
                  {social.platform === 'twitter' && <FaTwitter />}
                  {social.platform === 'instagram' && <FaInstagram />}
                  {social.platform === 'linkedin' && <FaLinkedin />}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserPage;