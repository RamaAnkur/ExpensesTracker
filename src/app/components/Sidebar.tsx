import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaChartLine, FaTimes, FaArrowRight } from 'react-icons/fa';
import { useEffect } from 'react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const target = event.target as Node;
      if (sidebar && !sidebar.contains(target) && isOpen) {
        toggleSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleSidebar, isOpen]);

  return (
    <div className="relative">
      <motion.div
        id="sidebar"
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-md z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        initial={{ x: 0 }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 100 }}
        style={{ width: '250px' }}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col items-center">
              <motion.div
                className="text-3xl mb-2"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaChartLine />
              </motion.div>
              <h2 className="text-2xl font-bold">Expense Tracker</h2>
            </div>
          </div>
          <nav className="mt-4 flex-grow">
            <ul>
              <li className="py-2 px-4 flex items-center hover:bg-gray-700 rounded transition-colors">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="mr-3"
                >
                  <FaHome />
                </motion.div>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className="py-2 px-4 flex items-center hover:bg-gray-700 rounded transition-colors">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="mr-3"
                >
                  <FaUser />
                </motion.div>
                <Link href="/profile">Profile</Link>
              </li>
              <li className="py-2 px-4 flex items-center hover:bg-gray-700 rounded transition-colors">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="mr-3"
                >
                  <FaCog />
                </motion.div>
                <Link href="/settings">Settings</Link>
              </li>
            </ul>
          </nav>
          <div className="mt-auto">
            <li className="py-2 px-4 flex items-center hover:bg-gray-700 rounded transition-colors mt-4">
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mr-3"
              >
                <FaSignOutAlt />
              </motion.div>
              <Link href="/logout">Logout</Link>
            </li>
          </div>
        </div>
        <motion.button
          onClick={() => toggleSidebar(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-2.5 rounded-lg shadow-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <FaTimes className="w-4 h-4" /> : <FaArrowRight className="w-4 h-4" />}
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Sidebar; 