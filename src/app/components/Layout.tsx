'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = (value: boolean) => {
    setIsOpen(value);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {!pathname.includes('signin') && (
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      )}
      <main className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-[250px]' : 'ml-0'}`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;