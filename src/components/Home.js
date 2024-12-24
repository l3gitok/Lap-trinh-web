import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* Section with rounded corners, sticky and increased height */}
      <section className="sticky top-0 bg-blue-500 rounded-t-lg py-8 px-12 shadow-lg w-full rounded-md z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div
            className="header-title text-4xl font-bold"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Biolink
          </motion.div>
          <motion.div
            className="header-buttons space-x-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.9 }}
              className="header-button header-button-login bg-white text-primary hover:bg-gray-200 px-4 py-2 font-semibold rounded"
              onClick={navigateToLogin}
            >
              Đăng nhập
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: -2 }}
              whileTap={{ scale: 0.9 }}
              className="header-button header-button-register bg-accent1 hover:bg-accent2 px-4 py-2 font-semibold rounded"
              onClick={navigateToRegister}
            >
              Đăng ký
            </motion.button>
          </motion.div>
        </div>
      </section>
      {/* Main Content */}
      <main className="flex-grow">
        {/* First Section */}
        <div className="flex flex-col items-center justify-center bg-primary text-white py-16 min-h-screen">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Everything you are. <br /> In one, simple link.
          </motion.h1>
          <motion.p
            className="text-lg mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Join 50M+ people using Biolink for their link in bio. Share everything you create, curate, and sell from your Instagram, TikTok, YouTube, and more.
          </motion.p>
          <div className="space-y-2">
            <motion.input
              type="text"
              placeholder="http://localhost:3000//yourbiolink"
              className="input-field w-full px-4 py-2 rounded text-black"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.button
              className="claim-button w-full px-4 py-2 bg-accent3 text-white font-semibold rounded hover:bg-accent4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Claim your Biolink
            </motion.button>
          </div>
        </div>

        {/* Second Section */}
        <div className="bg-accent1 py-16 min-h-screen">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              className="text-3xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Create your link in bio
            </motion.h2>
            <motion.p
              className="text-lg text-white mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              With your Linktree, you can easily showcase everything you do across all your platforms.
            </motion.p>
            <motion.img
              src="https://via.placeholder.com/400"
              alt="Linktree Image"
              className="rounded-lg shadow-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>
        </div>

        {/* Third Section */}
        <div className="bg-accent2 py-16 min-h-screen">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              className="text-3xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Get Started in Minutes
            </motion.h2>
            <motion.p
              className="text-lg text-white mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Signing up is quick and easy. Join the millions of creators using Linktree today.
            </motion.p>
            <motion.img
              src="https://via.placeholder.com/400"
              alt="Linktree Image"
              className="rounded-lg shadow-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>
        </div>

        {/* Fourth Section */}
        <div className="bg-accent3 py-16 min-h-screen">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              className="text-3xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Customize Your Linktree
            </motion.h2>
            <motion.p
              className="text-lg text-white mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Add custom themes and design your Linktree to match your personal or brand style.
            </motion.p>
            <motion.img
              src="https://via.placeholder.com/400"
              alt="Linktree Image"
              className="rounded-lg shadow-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="bg-blue-500"> {/* Đổi màu nền của div chứa section */}
        <section className="bg-white text-black py-16 rounded-lg m-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul>
                <li>Linktree Blog</li>
                <li>Engineering Blog</li>
                <li>Marketplace</li>
                <li>What's New</li>
                <li>About</li>
                <li>Press</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Link in Bio</h4>
              <ul>
                <li>Social Good</li>
                <li>Contact</li>
                <li>Community</li>
                <li>Linktree for Enterprise</li>
                <li>2023 Creator Report</li>
                <li>2022 Creator Report</li>
                <li>Charities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">What's Trending</h4>
              <ul>
                <li>Creator Profile Directory</li>
                <li>Explore Templates</li>
                <li>Support</li>
                <li>Help Topics</li>
                <li>Getting Started</li>
                <li>Linktree Pro</li>
                <li>Features & How-Tos</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Trust & Legal</h4>
              <ul>
                <li>Terms & Conditions</li>
                <li>Privacy Notice</li>
                <li>Cookie Notice</li>
                <li>Trust Center</li>
                <li>Cookie Preferences</li>
              </ul>
            </div>
          </div>

            <div className="flex justify-between items-center px-4 max-w-6xl mx-auto mt-8">
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-xl">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com" className="text-xl">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" className="text-xl">
                  <FaInstagram />
                </a>
                <a href="https://linkedin.com" className="text-xl">
                  <FaLinkedin />
                </a>
              </div>
              <div className="space-x-4">
                <motion.button
                  className="px-4 py-2 bg-primary text-white rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={navigateToLogin}
                >
                  Log In
                </motion.button>
                <motion.button
                  className="px-4 py-2 bg-accent1 text-white rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={navigateToRegister}
                >
                  Get Started
                </motion.button>
              </div>
            </div>
        </section>
      </div>
    </div>
  );
}
export default Home;
