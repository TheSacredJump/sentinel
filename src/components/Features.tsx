"use client";

import { BarChart2Icon, CheckSquare2Icon, FolderIcon, Lightbulb, LightbulbIcon, PieChartIcon, PlusIcon, SortAsc, Sparkles, SparklesIcon, TrendingUpIcon, WandSparklesIcon, XIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const FeatureShowcase = () => {
  // Animation variants
  const textContentVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const featureCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      step: "Step-01",
      icon: <SortAsc className="text-violet-400 w-8 h-8" />,
      title: "AI-Powered Sorting",
      description: "Take control of your inbox with our intelligent sorting system. Our AI automatically categorizes and prioritizes your emails, ensuring you never miss important messages while filtering out the noise.",
      card: <Card1 />
    },
    {
      step: "Step-02",
      icon: <Sparkles className="text-violet-400 w-8 h-8" />,
      title: "Bulk Unsubscribe",
      description: "Clean up your inbox effortlessly with our one-click bulk unsubscribe feature. Quickly identify and remove yourself from unwanted newsletters and promotional emails, keeping your inbox clean and organized.",
      card: <Card2 />
    },
    {
      step: "Step-03",
      icon: <WandSparklesIcon className="text-violet-400 w-8 h-8" />,
      title: "Custom Filters",
      description: "Create personalized email filtering rules that work for you. Set up sophisticated filters based on sender, content, or custom criteria to automatically organize incoming messages exactly how you want them.",
      card: <Card3 />
    },
  ];

  return (
    <section id="features" className="bg-neutral-950 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6">
        {/* Animated Text Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={textContentVariants}
        >
          <motion.span 
            className="bg-violet-100 text-violet-800 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4"
            variants={badgeVariants}
          >
            New Feature
          </motion.span>
          <motion.h1 
            className="text-4xl font-bold text-gray-200"
            variants={textContentVariants}
          >
            The modern tool for smarter inbox management.
          </motion.h1>
          <motion.p 
            className="mt-6 text-gray-400"
            variants={textContentVariants}
          >
            Take full control of your email experience. Organize, prioritize, and manage your inbox seamlessly 
            with AI-powered tools. No heavy lifting, no chaos—just productivity.
          </motion.p>
          <motion.button 
            className="mt-8 bg-gray-200 text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition"
            variants={textContentVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started →
          </motion.button>
        </motion.div>

        {/* Animated Product Screenshot */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={imageVariants}
          whileHover={{ x: 20, transition: { duration: 0.4 } }}
          className="relative"
        >
          <Image
            src="/feature.png"
            alt="Product Screenshot"
            width={600}
            height={600}
            className="rounded-xl shadow-md"
          />
        </motion.div>
      </div>

      <div className="mt-24 max-w-7xl mx-auto px-6">
        <motion.div 
          className="grid grid-cols-1 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative bg-neutral-950 p-8 rounded-xl flex gap-6 lg:px-20"
              variants={featureCardVariants}
              whileHover="hover"
            >
              <div className="flex-1 flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <span className="text-violet-400 text-sm font-medium">
                    {feature.step}
                  </span>
                  <div className="mt-2">
                    {feature.icon}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-4xl font-semibold text-neutral-100">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-neutral-400 leading-relaxed pr-24">
                    {feature.description}
                  </p>
                </div>
              </div>
      
              {/* Feature Card */}
              <div className="hidden lg:block flex-shrink-0 w-2/5 rounded-xl">
                <div className={`bg-pink-400 rounded-xl p-6 min-h-64 ${index == 1 ? "h-64" : "h-full"} relative overflow-hidden flex justify-center items-center`}
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                      boxShadow: `
                        inset 0 0 30px rgba(0,0,0,0.2),
                        inset 0 0 20px rgba(0,0,0,0.2),
                        inset 0 0 10px rgba(0,0,0,0.2)
                      `
                    }}>
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"/>

                  <div className="z-10">
                    <div className="">
                      {/* White Info Cards */}
                      <div className="">
                        {feature.card}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureShowcase;

const Card1 = () => (
  <div className="rounded-full text-center bg-gradient-to-b from-neutral-950 to-neutral-900 p-3 px-14 shadow-lg hover:cursor-pointer hover:scale-105 transition-all duration-300">
      <h1 className="text-xl font-medium">Sort Emails</h1>
  </div>
);

const Card2 = () => (
  <div className="bg-none rounded-xl h-full px-4 w-full flex flex-col items-center">
    <div className="absolute flex top-8 items-center gap-2 bg-gradient-to-r from-blue-500 to-sky-400 p-3 px-5 rounded-full shadow-lg hover:scale-105 transition duration-300 hover:cursor-pointer">
      <SparklesIcon className="w-5 h-5 text-white"/>
      <h1 className="text-white font-medium">Unsubscribe</h1>
      <SparklesIcon className="w-5 h-5 text-white"/>
    </div>
    <div className="mt-32">
      <div className="bg-neutral-900 rounded-xl p-4 w-full flex items-center space-x-2 hover:translate-x-4 transition duration-300">
        <CheckSquare2Icon className="w-5 h-5 text-neutral-500"/>
        <h1 className="text-sm text-neutral-500 font-medium">Spam Newsletter</h1>
      </div>
      <div className="bg-neutral-900 rounded-xl p-4 w-full mt-2 flex items-center space-x-2 hover:translate-x-[-16px] transition duration-300">
        <CheckSquare2Icon className="w-5 h-5 text-neutral-500"/>
        <h1 className="text-sm text-neutral-500 font-medium">Random Promotion</h1>
      </div>
      <div className="bg-neutral-900 rounded-xl p-4 w-full mt-2 flex items-center space-x-2 hover:translate-x-4 transition duration-300">
        <CheckSquare2Icon className="w-5 h-5 text-neutral-500"/>
        <h1 className="text-sm text-neutral-500 font-medium">Unrecognized Email</h1>
      </div>
    </div>
  </div>
);

const Card3 = () => (
  <div className="bg-none rounded-xl h-full px-4 w-full">
    <div className="bg-gradient-to-br from-neutral-950 to-neutral-950 rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-violet-400 font-semibold">Filter Builder</h2>
        <button className="bg-neutral-100 text-black p-2 rounded-full hover:bg-violet-300 transition-colors">
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-sky-400 rounded-full" />
            <span className="text-sm text-neutral-300">From: client@sentinel.com</span>
          </div>
          <XIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
        
        <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-pink-400 rounded-full" />
            <span className="text-sm text-neutral-300">Subject: contains "urgent"</span>
          </div>
          <XIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
        
        <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-pink-400 rounded-full" />
            <span className="text-sm text-neutral-300">Has: attachment</span>
          </div>
          <XIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
      </div>

      <button className="w-full mt-4 bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-lg p-px text-xs font-semibold leading-6 text-white">
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <span className="absolute inset-0 rounded-lg bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(244,114,182,0.6)_0%,rgba(167,139,250,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
        <div className="relative flex items-center justify-center z-10 rounded-lg bg-zinc-950 py-2 px-4 ring-1 ring-white/10">
          <span className="mr-2">Add Condition</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.75 8.75L14.25 12L10.75 15.25" />
          </svg>
        </div>
        <span className="absolute -top-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-purple-400/90 to-pink-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </button>

    </div>
  </div>
);