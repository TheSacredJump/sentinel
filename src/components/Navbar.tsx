"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  // Add state to control the animation
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the animation after component mounts
  useEffect(() => {
    // Small delay to ensure smooth animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    try {
      // Get the auth URL from your backend
      const response = await fetch('http://localhost:3003/api/auth/google', {
        credentials: 'include'  // Important for cookies
      });
      const { authUrl } = await response.json();
      
      // Redirect to Google's consent screen
      window.location.href = authUrl;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <nav className={`
      fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50
      transition-all duration-700 ease-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
    `}>
      <div className={`
        bg-neutral-600/20 backdrop-blur-md rounded-full px-6 py-3 
        flex items-center justify-between border border-neutral-600/20 shadow-sm
        transition-transform duration-700 ease-out
        ${isVisible ? 'scale-100' : 'scale-95'}
      `}>
        {/* Logo and Title - Fade in from left */}
        <div className={`
          flex items-center gap-2
          transition-all duration-700 delay-200
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
        `}>
          <Image src="/logo.png" alt="Sentinel Logo" width={30} height={30} />
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
            Sentinel
          </h1>
        </div>

        {/* Navigation Links - Fade in from bottom */}
        <div className={`
          flex items-center gap-6
          transition-all duration-700 delay-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <a href="#features" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">Pricing</a>
          <a href="#about" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">About</a>
        </div>
        
        {/* Sign In Button - Fade in from right */}
        <Link href="/sign-in" className={`
          flex items-center gap-6
          transition-all duration-700 delay-400
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
        `}>
          <button className="
            bg-emerald-400 text-neutral-950 px-4 py-2 rounded-full text-sm 
            shadow-md font-medium transition-all hover:bg-emerald-500 
            hover:shadow-lg active:scale-95
          ">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;