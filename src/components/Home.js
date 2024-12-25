import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaChevronDown } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const navigateToLogin = () => navigate('/login');
  const navigateToRegister = () => navigate('/register');

  const headerVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  const gradientBg = "bg-gradient-to-br from-primary via-secondary to-accent1";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <motion.header 
        className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-accent4 to-accent2 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Biolink
            </motion.div>
            <div className="flex space-x-4">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-6 py-2 text-accent4 border-2 border-accent4 rounded-full font-medium hover:bg-accent4 hover:text-white transition-all duration-300"
                onClick={navigateToLogin}
              >
                Đăng nhập
              </motion.button>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-6 py-2 bg-accent4 text-white rounded-full font-medium hover:bg-accent3 transition-all duration-300"
                onClick={navigateToRegister}
              >
                Đăng ký
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className={`${gradientBg} min-h-screen relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold text-white mb-6">
              One Link for
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-accent2">
                Everything You Create
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join millions of creators using Biolink to share everything they create, curate, and sell from their social media platforms.
            </p>

            <motion.div 
              className="max-w-md mx-auto space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="yourname"
                  className="w-full px-6 py-4 rounded-full text-lg focus:ring-2 focus:ring-accent4 transition-shadow duration-300"
                  onFocus={() => setIsHovered(true)}
                  onBlur={() => setIsHovered(false)}
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  .biolink.com
                </span>
              </div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full py-4 bg-accent4 text-white rounded-full font-medium text-lg hover:bg-accent3 transition-all duration-300"
              >
                Claim your Biolink
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              {
                title: "Easy to Setup",
                description: "Create your Biolink profile in minutes and start sharing your content."
              },
              {
                title: "Customize Everything",
                description: "Choose from beautiful themes or create your own unique style."
              },
              {
                title: "Track Performance",
                description: "Get detailed analytics about your links and audience engagement."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
            <p className="text-gray-400">&copy; 2024 Biolink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;