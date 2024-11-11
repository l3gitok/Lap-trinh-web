const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = '1208'; 

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await User.create(username, email, password);
    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi đăng ký người dùng', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {

    let user;


    const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

    if (isEmail) {

      user = await User.findByEmail(email);
    } else {
      user = await User.findByUsername(email);
    }

    if (!user) {
      return res.status(401).json({ message: 'Không tìm thấy người dùng' });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mật khẩu không chính xác' });
    }


    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Đăng nhập thành công', token });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi đăng nhập', error });
  }
};
