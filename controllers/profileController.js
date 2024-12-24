const profileModel = require('../models/profileModel');

const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { theme, background_color, font_color, font_family, button_style, background_image, logo, gradient_enabled, gradient_start_color, gradient_end_color, gradient_direction } = req.body;

  try {
    await profileModel.updateProfileByUserId(userId, { theme, background_color, font_color, font_family, button_style, background_image, logo, gradient_enabled, gradient_start_color, gradient_end_color, gradient_direction });
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const profile = await profileModel.getProfileByUserId(userId);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  updateProfile,
  getProfile
};