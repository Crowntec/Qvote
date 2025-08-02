'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VoterLogin = () => {
  const [formData, setFormData] = useState({
    voterId: '',
    pin: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call for authentication
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Redirect to voter dashboard after successful login
    console.log('Login successful:', formData);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  // Floating vote icons animation
  const floatingIcons = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-green-200 opacity-10"
      initial={{ x: 0, y: 0, rotate: 0 }}
      animate={{
        x: [0, 60, -40, 0],
        y: [0, -80, 40, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.3, 0.7, 1],
      }}
      transition={{
        duration: 6 + i * 1.5,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        left: `${15 + i * 12}%`,
        top: `${25 + i * 8}%`,
        fontSize: `${1 + (i % 3) * 0.5}rem`
      }}
    >
      <i className={`ri-${['vote-line', 'checkbox-circle-line', 'medal-line'][i % 3]}`}></i>
    </motion.div>
  ));

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements - Similar to Homepage */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main background floating elements */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-xl"
          animate={{ 
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-100/40 to-purple-100/40 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* 3D Voting Elements */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-2xl flex items-center justify-center"
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'linear-gradient(145deg, #4ade80, #16a34a)',
            boxShadow: '0 25px 50px -12px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          }}
        >
          <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-md"></div>
          <i className="ri-vote-line text-white text-2xl"></i>
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-1/5 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-2xl flex items-center justify-center"
          animate={{
            x: [0, 15, 0],
            y: [0, -15, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'linear-gradient(145deg, #60a5fa, #3b82f6)',
            boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          }}
        >
          <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
          <i className="ri-checkbox-circle-line text-white text-lg"></i>
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-1/4 w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center"
          animate={{
            y: [0, 25, 0],
            rotateX: [0, 180, 360],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'linear-gradient(145deg, #a855f7, #9333ea)',
            boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          }}
        >
          <div className="absolute inset-2 bg-gradient-to-br from-white/25 to-transparent rounded-md"></div>
          <i className="ri-shield-check-line text-white text-xl"></i>
        </motion.div>

        <motion.div
          className="absolute top-2/3 right-1/4 w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full shadow-2xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'linear-gradient(145deg, #22d3ee, #0891b2)',
            boxShadow: '0 20px 40px -12px rgba(34, 211, 238, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
          }}
        >
          <div className="absolute inset-1 bg-gradient-to-br from-white/40 to-transparent rounded-full"></div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/6 w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg shadow-2xl flex items-center justify-center"
          animate={{
            rotate: [0, -15, 15, 0],
            scale: [1, 1.1, 1],
            y: [0, -10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'linear-gradient(145deg, #6366f1, #4f46e5)',
            boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          }}
        >
          <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-md"></div>
          <i className="ri-medal-line text-white text-sm"></i>
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/12 w-12 h-16 bg-gradient-to-br from-orange-300 to-orange-500 rounded-md shadow-2xl"
          animate={{
            x: [0, 20, 0],
            rotateZ: [0, 10, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'linear-gradient(145deg, #fdba74, #f97316)',
            boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          }}
        >
          <div className="absolute inset-1 bg-gradient-to-br from-white/25 to-transparent rounded-sm"></div>
          <div className="absolute top-2 left-1 right-1 h-1 bg-white/40 rounded-full"></div>
          <div className="absolute top-4 left-1 w-3/4 h-0.5 bg-white/30 rounded-full"></div>
          <div className="absolute top-6 left-1 w-1/2 h-0.5 bg-white/30 rounded-full"></div>
        </motion.div>
      </div>

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <motion.div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <motion.div 
              variants={itemVariants}
              className="px-8 pt-8 pb-6 text-center"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(145deg, #16a34a, #3b82f6)',
                  boxShadow: '0 25px 50px -12px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
              >
                <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                <i className="ri-vote-line text-2xl text-white"></i>
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Voter Login
              </h1>
              <p className="text-gray-600 text-sm">
                Enter your credentials to access your voting dashboard
              </p>
            </motion.div>

            {/* Form */}
            <motion.form 
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="px-8 pb-8 space-y-6"
            >
              {/* Voter ID Field */}
              <motion.div
                className="space-y-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-sm font-medium text-gray-700">
                  Voter ID
                </label>
                <div className="relative">
                  <motion.input
                    type="text"
                    name="voterId"
                    value={formData.voterId}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('voterId')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="Enter your voter ID"
                    required
                    animate={{
                      scale: focusedField === 'voterId' ? 1.02 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-blue-500 opacity-0 pointer-events-none"
                    animate={{
                      opacity: focusedField === 'voterId' ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <i className="ri-user-line absolute right-3 top-3 text-gray-500"></i>
                </div>
              </motion.div>

              {/* PIN Field */}
              <motion.div
                className="space-y-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="block text-sm font-medium text-gray-700">
                  Security PIN
                </label>
                <div className="relative">
                  <motion.input
                    type={showPin ? "text" : "password"}
                    name="pin"
                    value={formData.pin}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('pin')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="Enter your PIN"
                    required
                    maxLength="6"
                    animate={{
                      scale: focusedField === 'pin' ? 1.02 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-blue-500 opacity-0 pointer-events-none"
                    animate={{
                      opacity: focusedField === 'pin' ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <i className={showPin ? "ri-eye-off-line" : "ri-eye-line"}></i>
                  </button>
                </div>
              </motion.div>

              {/* Login Button */}
              <motion.button
                type="submit"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                disabled={isLoading || !formData.voterId || !formData.pin}
                className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span className="ml-2">Authenticating...</span>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <i className="ri-login-box-line mr-2"></i>
                      Login to Dashboard
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>

              {/* Security Notice */}
              <motion.div 
                variants={itemVariants}
                className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6"
              >
                <div className="flex items-start">
                  <i className="ri-shield-check-line text-blue-600 text-lg mr-3 mt-0.5"></i>
                  <div>
                    <p className="text-blue-800 text-sm font-medium mb-1">Secure Authentication</p>
                    <p className="text-blue-600 text-xs">
                      Your credentials are encrypted and secure. Access your personalized voting dashboard.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoterLogin;
