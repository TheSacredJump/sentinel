"use client";

import React from "react";
import { motion } from "framer-motion";

const Pricing = () => {
  // Define the pricing plans data structure
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Get started with basic features to organize your inbox.",
      features: ["AI Sorting", "Daily Email Limit: 50", "Basic Categorization"],
      buttonLabel: "Get Started",
      buttonStyle: "bg-neutral-200 text-neutral-950 hover:bg-neutral-100",
    },
    {
      name: "Sentient",
      price: "$2",
      period: "month",
      description: "Unlock advanced features for power users.",
      features: [
        "AI Sorting & Prioritization",
        "Daily Email Limit: Unlimited",
        "Advanced Categorization",
        "Email Summaries",
        "Bulk Unsubscribe",
      ],
      buttonLabel: "Start Free Trial",
      buttonStyle: "bg-white text-neutral-950 hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200",
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      description: "Tailored solutions for large teams and businesses.",
      features: [
        "Custom Features",
        "Team Management Tools",
        "Dedicated Support",
        "Priority Access to Updates",
      ],
      buttonLabel: "Contact Sales",
      buttonStyle: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    },
  ];

  // Animation variants for the header section
  const headerVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Animation variants for the pricing cards container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  // Animation variants for individual pricing cards
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Animation variants for features list items
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Card hover animation for enhanced interactivity
  const cardHoverVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <main id="pricing" className="bg-neutral-950 min-h-screen py-12">
      <section className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <h1 className="text-4xl font-bold text-neutral-200">
            Choose the Right Plan for You
          </h1>
          <p className="mt-4 text-gray-600">
            Start for free or explore premium options to enhance your productivity.
          </p>
        </motion.div>

        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`rounded-xl border shadow-sm p-8 bg-neutral-900 ${
                plan.name === "Sentient" 
                  ? "h-[110%] shadow-xl border-none shadow-violet-500 bg-gradient-to-br from-pink-400 from-25% via-violet-500 via-50% to-sky-400" 
                  : "border-neutral-800"
              }`}
              variants={cardVariants}
              whileHover="hover"
              variants={cardHoverVariants}
            >
              <motion.h2 
                className={`text-2xl font-semibold ${
                  plan.name === "Sentient" ? "text-white" : "text-neutral-200"
                }`}
              >
                {plan.name}
              </motion.h2>
              
              <motion.p 
                className={`mt-2 ${
                  plan.name === "Sentient" ? "text-white" : "text-neutral-400"
                }`}
              >
                {plan.description}
              </motion.p>
              
              <motion.div className="mt-4">
                <span className={`text-4xl font-bold ${
                  plan.name === "Sentient" ? "text-white" : "text-neutral-200"
                }`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={
                    plan.name === "Sentient" ? "text-white" : "text-neutral-400"
                  }> / {plan.period}</span>
                )}
              </motion.div>

              <motion.ul 
                className={`mt-6 space-y-3 ${
                  plan.name === "Sentient" ? "text-white" : "text-neutral-400"
                }`}
              >
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center space-x-2"
                    variants={featureVariants}
                    custom={i}
                  >
                    <motion.span 
                      className="text-black"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                    >
                      ✔
                    </motion.span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button
                className={`mt-8 w-full py-3 rounded-lg font-medium transition ${plan.buttonStyle}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.buttonLabel}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
};

export default Pricing;