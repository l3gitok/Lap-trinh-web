// filepath: /server/controllers/userController.js
const userModel = require('../models/userModel');
const profileModel = require('../models/profileModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sessionModel = require('../models/sessionModel');
const { sendResetPasswordEmail } = require('../services/emailService');

const generateOtp = () => {
  return crypto.randomBytes(3).toString('hex'); // Generates a 6-character OTP
};
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser(username, email, hashedPassword);
    await profileModel.createProfile(userId);

    const otp = generateOtp();
    await userModel.storeOtp(userId, otp); // Store OTP in the database with an expiration time
    await sendOtpEmail(email, otp);

    res.status(201).json({ message: 'User created successfully. Please check your email for the OTP.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const isValid = await userModel.verifyOtp(userId, otp);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    const user = await userModel.getUserByEmailOrUsername(emailOrUsername);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    await sessionModel.createSession(user.id, token, new Date(Date.now() + 24*60*60*1000));

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      await sessionModel.deleteSession(token);
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userModel.getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { username, email, password, biolink } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    await userModel.updateUser(userId, { username, email, password, biolink });
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await userModel.verifyEmail(decoded.id);
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await sendResetPasswordEmail(email, resetToken);
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  const userId = req.user.id;
  try {
    await userModel.deleteUser(userId);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    await sessionModel.createSession(user.id, newToken, new Date(Date.now() + 24*60*60*1000));

    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const profile = await profileModel.getProfileByUserId(user.id);
    res.json({ user: { username: user.username, email: user.email, emailVerified: user.email_verified }, profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await userModel.getUserById(userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userModel.updatePassword(userId, hashedPassword);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  logoutUser,
  getUserProfile,
  resetPassword,
  deleteAccount,
  refreshToken,
  getUserByUsername,
  updatePassword,
  getUserById,
  verifyOtp,
  verifyEmail
};