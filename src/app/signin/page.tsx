'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { HiMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaChartLine } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

// Add this SVG background component
const BackgroundPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute w-full h-full opacity-[0.03] transform scale-150"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="money-pattern"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#money-pattern)" />
    </svg>
    
    {/* Animated floating elements */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.3, 0.5, 0.3],
        y: [-10, 10, -10],
        x: [-5, 5, -5]
      }}
      transition={{ 
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute inset-0"
    >
      <div className="absolute top-1/4 left-1/4 text-4xl">💰</div>
      <div className="absolute top-1/3 right-1/4 text-4xl">📊</div>
      <div className="absolute bottom-1/4 left-1/3 text-4xl">💳</div>
      <div className="absolute top-1/2 right-1/3 text-4xl">📈</div>
      <div className="absolute bottom-1/3 right-1/2 text-4xl">🏦</div>
    </motion.div>
  </div>
);

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your authentication logic here
    setTimeout(() => setIsLoading(false), 1000); // Simulate API call
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center relative">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
        <div className="absolute inset-0 bg-[linear-gradient(40deg,#0000004d,#0000)] opacity-50" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <BackgroundPattern />
      
      {/* Subtle overlay for better readability */}
      <div className="absolute inset-0 backdrop-blur-[1px] bg-black/5" />
      
      {/* Main content */}
      <div className="flex gap-4 w-full max-w-6xl relative z-10 p-4">
        {/* Features Section - Left Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex flex-col justify-center items-center bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-1/3"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="bg-purple-600 p-4 rounded-full mb-4"
          >
            <FaChartLine className="text-4xl text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">ExpenseTracker</h2>
          <div className="grid grid-cols-1 gap-3 w-full">
            <motion.div
              variants={itemVariants}
              className="p-3 rounded-lg bg-purple-50"
            >
              <div className="font-medium text-purple-700">
                ✨ Real-time Tracking
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="p-3 rounded-lg bg-purple-50"
            >
              <div className="font-medium text-purple-700">
                📊 Smart Reports
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="p-3 rounded-lg bg-purple-50"
            >
              <div className="font-medium text-purple-700">
                🎯 Budget Goals
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="p-3 rounded-lg bg-purple-50"
            >
              <div className="font-medium text-purple-700">
                📱 Mobile App
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Sign In Form - Right Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full md:w-2/3 lg:w-1/2 mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-6">
            <div className="md:hidden flex justify-center mb-4">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="bg-purple-600 p-4 rounded-full"
              >
                <FaChartLine className="text-3xl text-white" />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Please sign in to continue</p>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 transition-colors mb-4"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </motion.button>

          <motion.div variants={itemVariants} className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </motion.div>

          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-purple-600 hover:text-purple-500">
                Forgot password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full bg-purple-600 text-white rounded-lg px-4 py-2.5 font-medium hover:bg-purple-700 transition-colors
                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                />
              ) : (
                'Sign In'
              )}
            </motion.button>
          </motion.form>

          <motion.p variants={itemVariants} className="mt-4 text-center text-sm text-gray-600">
            New to ExpenseTracker?{' '}
            <a href="#" className="text-purple-600 hover:text-purple-500 font-medium">
              Create an account
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

// Add these animations to your global CSS file (globals.css)
const styles = `
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
`; 