"use client";

import Image from 'next/image';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  // Create a stagger effect for child elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  // Shared animation variant for text elements
  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smooth acceleration
      }
    }
  };

  // Fancy background grid animation
  const gridVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.98,
    },
    visible: {
      opacity: 0.03,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  // Animated arrow variants with drawing effect
  const arrowVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        delay: 1
      }
    }
  };

  // Button container variants with hover effect
  const buttonContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  // Dynamic scroll-based animations for the dashboard preview
  const { scrollYProgress } = useScroll();
  const dashboardY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);

  return (
    <main className="bg-gradient-to-b from-neutral-950 to-black relative">
      {/* Grid Background */}
      {/* <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 
            'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      /> */}
      
      <section className="min-h-screen mx-auto flex flex-col items-center justify-center pt-48 relative">
        {/* Layered Ethereal Glow Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Left Side Glow (Neon Pink) */}
          <div className="absolute -left-1/4 top-1/4 w-96 h-full">
            <div className="absolute inset-0 bg-pink-400/50 blur-[140px] rounded-full mix-blend-screen" />
            <div className="absolute inset-0 bg-violet-400/30 blur-[160px] rounded-full mix-blend-screen transform translate-y-1/4" />
          </div>

          {/* Right Side Glow (Soft Purple) */}
          <div className="absolute -right-1/4 top-1/3 w-96 h-full">
            <div className="absolute inset-0 bg-violet-400/50 blur-[160px] rounded-full mix-blend-screen" />
            <div className="absolute inset-0 bg-sky-400/30 blur-[140px] rounded-full mix-blend-screen transform -translate-y-1/4" />
          </div>

          {/* Center Glow (Ethereal Blue) */}
          <div className="absolute left-1/2 top-1/2 -translate-y-1/5 -translate-x-1/2 w-full max-w-4xl h-96">
            <div className="absolute inset-0 bg-sky-400/30 blur-[180px] rounded-full mix-blend-screen" />
            <div className="absolute inset-0 bg-pink-400/40 blur-[160px] rounded-full mix-blend-screen" />
          </div>
        </div>



        <motion.div 
          className="max-w-6xl mx-auto text-center space-y-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-8xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 via-neutral-50 to-neutral-300"
            variants={textVariants}
          >
            Your Inbox, Your Control
          </motion.h1>
          
          <motion.p 
            className="text-neutral-500 max-w-2xl mx-auto leading-relaxed text-lg"
            variants={textVariants}
          >
            Introducing Sentinel: Your Personalized Inbox Manager. Simplify your inbox and boost productivity with our user-friendly web app.
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex items-center gap-4 relative mt-10 z-10"
          variants={buttonContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button 
            className="shadow-md bg-gradient-to-b from-neutral-800 to-neutral-900 text-neutral-50 px-8 py-2 rounded-full"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.button>

          {/* Enhanced Animated Arrow */}
          <motion.svg 
            className="absolute top-24 left-0 transform translate-x-[-120px] translate-y-[-60px] rotate-[120deg] scale-y-[-1]" 
            width="100" 
            height="100" 
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path 
              d="M10,80 Q40,20 90,80" 
              fill="none" 
              stroke="#F4F4F4" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              variants={arrowVariants}
              initial="hidden"
              animate="visible"
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker 
                id="arrowhead" 
                markerWidth="6" 
                markerHeight="6" 
                refX="5" 
                refY="3" 
                orient="auto"
              >
                <polygon points="0 0, 6 3, 0 6" fill="#F4F4F4" />
              </marker>
            </defs>
          </motion.svg>
        </motion.div>

        <motion.p 
          className="mt-3 text-neutral-500 text-sm relative z-10"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          No credit card required.
        </motion.p>

        {/* Enhanced Dashboard Preview with Scroll Animation */}
        <div className="relative w-full mt-24 z-10">
          <motion.section 
            className="relative max-w-7xl w-full h-full bg-neutral-950 border-t border-r border-l border-neutral-800 rounded-t-xl mx-auto overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
          >
            <Image src="/dashboard.png" alt="Dashboard" width={1920} height={1080} className="mx-auto -mt-1" />
          </motion.section>
        </div>
      </section>
    </main>
  );
};

export default Hero;