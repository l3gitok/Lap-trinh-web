const db = require('../configs/database');
const bcrypt = require('bcryptjs');

const User = {
  // Tạo người dùng mới
  create: async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO User (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  },

  // Tìm người dùng theo email
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM User WHERE email = ?', [email], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  },

  // Tìm người dùng theo username
  findByUsername: (username) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM User WHERE username = ?', [username], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }
};

module.exports = User;
