import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile, getUserLinks } from '../services/api';
import Swal from 'sweetalert2';

const UserPage = () => {
  const { biolink } = useParams();
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (biolink) {
      console.log('Biolink:', biolink);
      loadProfileAndLinks(biolink);
    } else {
      console.log('Biolink not found');
      setLoading(false);
    }
  }, [biolink]);

  const loadProfileAndLinks = async (biolink) => {
    try {
      console.log('Fetching profile and links for biolink:', biolink);
      const profileResponse = await getProfile(biolink);
      const linksResponse = await getUserLinks(biolink);
      console.log('Profile data:', profileResponse.data);
      console.log('Links data:', linksResponse.data);
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!profile) {
    return <div>User not found</div>;
  }

  const previewStyle = {
    backgroundColor: profile.theme?.backgroundColor ,
    color: profile.theme?.textColor ,
    fontFamily: profile.theme?.fontFamily ,
    backgroundImage: profile.theme?.backgroundImage ? `url(${profile.theme.backgroundImage})` : 'none',
    background: profile.theme?.gradient?.enabled
      ? `linear-gradient(${profile.theme.gradient.direction}, ${profile.theme.gradient.startColor}, ${profile.theme.gradient.endColor})`
      : profile.theme?.backgroundColor ,
    padding: '40px', // Increase padding for larger preview
    borderRadius: profile.theme?.buttonStyle === 'rounded' ? '12px' : '0px',
    width: '80%', // Set width for larger preview
    margin: '0 auto', // Center the preview box
    textAlign: 'center', // Center text inside the preview box
  };

  return (
      <div className="min-h-screen flex items-center justify-center" style={{ ...previewStyle, backgroundColor: profile.theme?.backgroundColor, color: profile.theme?.textColor }}>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: profile.theme?.fontFamily }}>{profile.username}Link</h1>
        <div className="space-y-4">
          {links.map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 bg-blue-500 text-white rounded"
              style={{ 
                fontFamily: profile.theme?.fontFamily, 
                borderRadius: profile.theme?.buttonStyle === 'rounded' ? '12px' : '0px',
                backgroundColor: profile.theme?.buttonBackgroundColor,
                color: profile.theme?.buttonTextColor
              }}
            >
              {link.title} - {link.url}
            </a>
          ))}
        </div>
      </div>
  </div>
  );
};

export default UserPage;