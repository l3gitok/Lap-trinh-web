import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile, getUserLinks } from '../services/api';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const UserPage = () => {
  const { biolink } = useParams();
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (biolink) {
      loadProfileAndLinks(biolink);
    } else {
      setLoading(false);
    }
  }, [biolink]);

  const loadProfileAndLinks = async (biolink) => {
    try {
      const profileResponse = await getProfile(biolink);
      const linksResponse = await getUserLinks(biolink);
      
      // Log the profile data to debug
      console.log('Profile data:', profileResponse.data);
      
      setProfile(profileResponse.data);
      setLinks(linksResponse.data);
    } catch (error) {
      console.error('Error loading user data:', error);
      Swal.fire('Error', 'Failed to load user data', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">User not found</div>
      </div>
    );
  }

  // Kiểm tra và xử lý gradient
  const getBackgroundStyle = () => {
    // Log để debug gradient settings
    console.log('Gradient settings:', {
      enabled: profile.theme?.gradient_enabled,
      direction: profile.theme?.gradient_direction,
      startColor: profile.theme?.gradient_start_color,
      endColor: profile.theme?.gradient_end_color
    });

    if (profile.theme?.gradient_enabled) {
      return {
        background: `linear-gradient(${profile.theme.gradient_direction || 'to right'}, 
                    ${profile.theme.gradient_start_color || '#FFFFFF'}, 
                    ${profile.theme.gradient_end_color || '#000000'})`
      };
    }

    return {
      backgroundColor: profile.theme?.background_color || '#ffffff',
      backgroundImage: profile.theme?.background_image ? `url(${profile.theme.background_image})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  };

  const containerStyle = {
    minHeight: '100vh',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    ...getBackgroundStyle()
  };

  const contentStyle = {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  };

  const profileStyle = {
    marginBottom: '2rem',
    textAlign: 'center',
    color: profile.theme?.font_color || '#000000',
    fontFamily: profile.theme?.font_family || 'Arial, sans-serif',
  };

  return (
    <div style={containerStyle}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={contentStyle}
      >
        {profile.logo && (
          <motion.div 
            className="mb-6 flex justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={profile.logo} 
              alt="Profile Logo" 
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
          </motion.div>
        )}

        <div style={profileStyle}>
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: profile.theme?.font_family }}
          >
            {profile.username}Link
          </motion.h1>
        </div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {links.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center transition-all duration-200 shadow-md hover:shadow-lg"
                style={{ 
                  padding: '12px 24px',
                  fontFamily: profile.theme?.font_family,
                  borderRadius: profile.theme?.button_style === 'rounded' ? '12px' : '0px',
                  backgroundColor: profile.theme?.button_background_color || '#007bff',
                  color: profile.theme?.button_text_color || '#ffffff',
                }}
              >
                {link.title}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserPage;