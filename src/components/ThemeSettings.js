import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../services/api';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

const ThemeSettings = () => {
  const { user } = useAuth();
  const [theme, setTheme] = useState({
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    fontFamily: 'Arial',
    buttonStyle: 'rounded',
    backgroundImage: '',
    logo: '',
    gradient: {
      enabled: false,
      startColor: '#FFFFFF',
      endColor: '#000000',
      direction: 'to right',
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      loadProfile(user.id);
    }
  }, [user]);

  const loadProfile = async (userId) => {
    try {
      const response = await getProfile(userId);
      const data = response.data;

      setTheme({
        backgroundColor: data.background_color || '#FFFFFF',
        textColor: data.font_color || '#000000',
        fontFamily: data.font_family || 'Arial',
        buttonStyle: data.button_style || 'rounded',
        backgroundImage: data.background_image || '',
        logo: data.logo || '',
        gradient: {
          enabled: Boolean(data.gradient_enabled),
          startColor: data.gradient_start_color || '#FFFFFF',
          endColor: data.gradient_end_color || '#000000',
          direction: data.gradient_direction || 'to right',
        },
      });
    } catch (error) {
      Swal.fire('Error', 'Failed to load theme settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheme((prevTheme) => ({
      ...prevTheme,
      [name]: value,
    }));
  };

  const handleGradientChange = (e) => {
    const { name, value } = e.target;
    setTheme((prevTheme) => ({
      ...prevTheme,
      gradient: {
        ...prevTheme.gradient,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Chuẩn bị dữ liệu gửi lên API
      const dataToSend = {
        user_id: user.id,
        background_color: theme.backgroundColor,
        font_color: theme.textColor,
        font_family: theme.fontFamily,
        button_style: theme.buttonStyle,
        background_image: theme.backgroundImage || null,
        logo: theme.logo || null,
        gradient_enabled: theme.gradient.enabled ? 1 : 0,
        gradient_start_color: theme.gradient.startColor,
        gradient_end_color: theme.gradient.endColor,
        gradient_direction: theme.gradient.direction,
      };

      await updateProfile(dataToSend);
      Swal.fire('Success', 'Theme settings updated successfully', 'success');
    } catch (error) {
      console.error('Error updating theme settings:', error.response ? error.response.data : error.message);
      Swal.fire(
        'Error',
        `Failed to update theme settings: ${
          error.response ? error.response.data.error : error.message
        }`,
        'error'
      );
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

  const previewStyle = {
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    backgroundImage: theme.backgroundImage ? `url(${theme.backgroundImage})` : 'none',
    background: theme.gradient.enabled
      ? `linear-gradient(${theme.gradient.direction}, ${theme.gradient.startColor}, ${theme.gradient.endColor})`
      : theme.backgroundColor,
    padding: '40px', // Increase padding for larger preview
    borderRadius: theme.buttonStyle === 'rounded' ? '12px' : '0px',
    width: '80%', // Set width for larger preview
    margin: '0 auto', // Center the preview box
    textAlign: 'center', // Center text inside the preview box
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Theme Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Background Color</label>
          <input
            type="color"
            name="backgroundColor"
            value={theme.backgroundColor}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Text Color</label>
          <input
            type="color"
            name="textColor"
            value={theme.textColor}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Font Family</label>
          <input
            type="text"
            name="fontFamily"
            value={theme.fontFamily}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Button Style</label>
          <input
            type="text"
            name="buttonStyle"
            value={theme.buttonStyle}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Background Image</label>
          <input
            type="text"
            name="backgroundImage"
            value={theme.backgroundImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Logo</label>
          <input
            type="text"
            name="logo"
            value={theme.logo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gradient Enabled</label>
          <input
            type="checkbox"
            name="enabled"
            checked={theme.gradient.enabled}
            onChange={(e) => handleGradientChange({ target: { name: 'enabled', value: e.target.checked ? 1 : 0 } })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {theme.gradient.enabled && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Gradient Start Color</label>
              <input
                type="color"
                name="startColor"
                value={theme.gradient.startColor}
                onChange={handleGradientChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Gradient End Color</label>
              <input
                type="color"
                name="endColor"
                value={theme.gradient.endColor}
                onChange={handleGradientChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Gradient Direction</label>
              <input
                type="text"
                name="direction"
                value={theme.gradient.direction}
                onChange={handleGradientChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </>
        )}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Update Theme
        </button>
      </form>

      {/* Preview Section */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Preview</h2>
        <div style={previewStyle}>
          <h3 style={{ fontFamily: theme.fontFamily }}>This is a preview</h3>
          <p style={{ fontFamily: theme.fontFamily }}>
            Background color, text color, font family, and other styles will be applied here.
          </p>
          <button
            style={{
              fontFamily: theme.fontFamily,
              borderRadius: theme.buttonStyle === 'rounded' ? '12px' : '0px',
            }}
            className="px-4 py-2 bg-blue-500 text-white"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
