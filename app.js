const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const linkRoutes = require('./routes/linkRoutes');
const profileRoutes = require('./routes/profileRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const socialmediaRoutes = require('./routes/socialmediaRoutes');

const app = express();

app.use(cors({
  origin: 'https://linktreefake-8ryl.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/social-media', socialmediaRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
module.exports = app;