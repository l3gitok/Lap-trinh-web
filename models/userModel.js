const db = require('../config/db');

const createUser = async (username, email, password, biolink = '', googleId = null) => {
  const query = `
    INSERT INTO users (username, email, password, biolink, google_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(query, [username, email, password, biolink, googleId]);
  return result.insertId;
};

const storeOtp = async (userId, otp) => {
  const query = `
    UPDATE users SET otp = ? WHERE id = ?
  `;
  await db.query(query, [otp, userId]);
};

const verifyOtp = async (userId, otp) => {
  const query = `
    SELECT * FROM users WHERE id = ? AND otp = ?
  `;
  const [rows] = await db.query(query, [userId, otp]);
  return rows.length > 0;
};

const updateUser = async (id, data) => {
  const query = `
    UPDATE users 
    SET username = ?, email = ?, password = ?, biolink = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  await db.query(query, [data.username, data.email, data.password, data.biolink, id]);
};

const verifyEmail = async (id) => {
  const query = `UPDATE users SET email_verified = true WHERE id = ?`;
  await db.query(query, [id]);
};

const getUserByEmailOrUsername = async (emailOrUsername) => {
  const query = `SELECT * FROM users WHERE email = ? OR username = ?`;
  const [rows] = await db.query(query, [emailOrUsername, emailOrUsername]);
  return rows[0];
};

const updateUserPassword = async (id, password) => {
  const query = `UPDATE users SET password = ? WHERE id = ?`;
  await db.query(query, [password, id]);
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUser,
  getUserByEmailOrUsername,
  updateUserPassword,
  verifyEmail,
  storeOtp,
  verifyOtp
};