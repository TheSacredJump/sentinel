"use client";

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

const SignIn = () => {
    const { data: session, status } = useSession();
    console.log(status)
    if (status === "loading") {
        return <div>Loading...</div>  // Or your loading component
      }
    
      if (status === "authenticated") {
        // User is signed in
        console.log("Signed in as:", session.user?.email)
        // You could redirect them away from sign-in page:
      }
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const slideInVariants = {
    hidden: { 
      x: 100,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen w-full">
      <motion.div 
        className="absolute top-4 left-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
          <ArrowLeft size={20} />
          <span>Go back</span>
        </Link>
      </motion.div>
      
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left: Auth */}
        <motion.div 
          className="flex items-center justify-center p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full max-w-sm">
            <motion.div 
              className="text-center mb-8"
              variants={itemVariants}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image src="/logo.png" alt="Sentinel Logo" width={40} height={40} className="mx-auto" />
              </motion.div>
              <motion.h1 
                className="text-xl font-semibold mt-4 mb-1"
                variants={itemVariants}
              >
                Log in or sign up
              </motion.h1>
              <motion.p 
                className="text-sm text-gray-500"
                variants={itemVariants}
              >
                Introducing Sentinel. Emails made simple.
              </motion.p>
            </motion.div>

            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg border shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02, shadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Image src="/google_svg.png" alt="Google" width={20} height={20} />
                <span>Continue with Google</span>
              </motion.button>
            </motion.div>

            <motion.p 
              className="mt-8 text-center text-xs text-gray-500"
              variants={itemVariants}
            >
              By logging in or signing up, you agree to our{' '}
              <a href="#" className="text-violet-400 hover:text-violet-500">Terms & Conditions</a>
              {' '}and{' '}
              <a href="#" className="text-violet-400 hover:text-violet-500">Privacy Policy</a>
            </motion.p>
          </div>
        </motion.div>

        {/* Right: Gradient + Testimonial */}
        <motion.div 
          className="hidden lg:block bg-gradient-to-br from-pink-400 to-violet-500 p-8"
          variants={slideInVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="h-full flex items-center justify-center">
            <motion.div 
              className="max-w-md text-white"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <motion.blockquote 
                className="text-2xl font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                "Transform your inbox experience with AI-powered email management that saves you hours every week."
              </motion.blockquote>
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-lg font-semibold">JD</span>
                </div>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-white/80">CEO, TechCorp</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SignIn