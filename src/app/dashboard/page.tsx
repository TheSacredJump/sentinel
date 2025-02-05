"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Star, Clock, AlertCircle, Archive, Trash2, Search, X, MessageCircle, Phone, Video, ChevronLeft, ChevronRight, Maximize2, Minimize2, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { dummyEmails } from '~/constants/dummyEmails';
import Image from 'next/image';

export default function Dashboard() {
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [emails, setEmails] = useState(dummyEmails.map(email => ({ ...email, flagged: false, read: false })));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 25;

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const zones = {
    all: { icon: <Mail className="w-4 h-4" />, label: 'All' },
    urgent: { icon: <AlertCircle className="w-4 h-4" />, label: 'Urgent' },
    followup: { icon: <Clock className="w-4 h-4" />, label: 'Follow-up' },
    later: { icon: <Archive className="w-4 h-4" />, label: 'Later' }
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setFocusMode(true);
  };

  const handleFlagEmail = (e, emailId) => {
    e.stopPropagation();
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, flagged: !email.flagged } : email
    ));
  };

  const handleDismissEmail = (emailId) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, read: true } : email
    ));
    setFocusMode(false);
    setSelectedEmail(null);
  };

  const filteredEmails = emails.filter(email => !email.read);

  const EmailCard = ({ email }) => (
    <motion.div
      key={email.id}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`group bg-neutral-900/50 backdrop-blur-xl p-4 rounded-lg border border-neutral-800 cursor-pointer transform transition-all hover:border-neutral-700 ${
        email.unread ? 'border-l-4 border-l-sky-400' : ''
      } ${email.flagged ? 'border-r-4 border-r-yellow-400' : ''}`}
      whileHover={{ scale: 1.01, y: -2 }}
      onClick={() => handleEmailClick(email)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className='flex items-center space-x-2'>
          <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center">{email.sender.charAt(0).toUpperCase()}</div>
          <span className="font-medium text-neutral-300">{email.sender}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-neutral-500">{email.timestamp}</span>
          <button 
            onClick={(e) => handleFlagEmail(e, email.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-yellow-400"
          >
            <Flag className={`w-4 h-4 ${email.flagged ? 'fill-yellow-400 text-yellow-400' : ''}`} />
          </button>
        </div>
      </div>
      <h3 className="font-semibold text-neutral-200 mb-1">{email.subject}</h3>
      <p className="text-sm text-neutral-400 line-clamp-2">{email.preview}</p>
    </motion.div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-b from-neutral-950 to-black relative overflow-hidden">
      {/* Ethereal Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/4 top-1/4 w-96 h-full">
          <div className="absolute inset-0 bg-pink-400/20 blur-[140px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-violet-400/10 blur-[160px] rounded-full mix-blend-screen transform translate-y-1/4" />
        </div>
        <div className="absolute -right-1/4 top-1/3 w-96 h-full">
          <div className="absolute inset-0 bg-violet-400/20 blur-[160px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-sky-400/10 blur-[140px] rounded-full mix-blend-screen transform -translate-y-1/4" />
        </div>
      </div>

      {/* Left Sidebar */}
      <AnimatePresence>
        {leftSidebarOpen && (
          <motion.div 
            className="w-48 bg-neutral-900/50 border-r border-neutral-800 p-3 backdrop-blur-xl relative z-20"
            initial={{ x: -192 }}
            animate={{ x: 0 }}
            exit={{ x: -192 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="space-y-10">
              <div className="flex items-center space-x-2 px-2">
                <Image src="/logo.png" alt="Sentinel Logo" width={24} height={24}/>
                <span className="text-lg font-semibold text-neutral-200">Sentinel</span>
              </div>

              <div className="space-y-1">
                {Object.entries(zones).map(([key, { icon, label }]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedZone(key)}
                    className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-sm transition-colors ${
                      selectedZone === key 
                        ? 'bg-neutral-800/50 text-neutral-200' 
                        : 'text-neutral-400 hover:bg-neutral-800/30'
                    }`}
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* Status Widget */}
        <div className='absolute top-10 left-1/2 transform -translate-x-1/2 w-[95%] rounded-lg h-48 bg-gradient-to-r from-pink-400/20 from-25% via-violet-500/20 via-50% to-sky-400/20 border border-neutral-800 backdrop-blur-xl p-6'>
          <div className="h-full flex gap-6">
            {/* Time and Date Section */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </h2>
                <p className="text-neutral-400">
                  {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-sm text-neutral-300">Connected to Sentinel</span>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-3">Quick Filters</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className="px-3 py-1.5 rounded-full bg-neutral-800/50 text-sm text-neutral-300 hover:bg-neutral-700/50 transition-colors"
                  >
                    Unread ({filteredEmails.length})
                  </button>
                  <button 
                    className="px-3 py-1.5 rounded-full bg-neutral-800/50 text-sm text-neutral-300 hover:bg-neutral-700/50 transition-colors"
                  >
                    Flagged ({filteredEmails.filter(e => e.flagged).length})
                  </button>
                  <button 
                    className="px-3 py-1.5 rounded-full bg-neutral-800/50 text-sm text-neutral-300 hover:bg-neutral-700/50 transition-colors"
                  >
                    Priority ({filteredEmails.filter(e => e.priority === 'urgent').length})
                  </button>
                </div>
              </div>
              <div className="flex items-center border rounded-full px-3 py-1 border-white/50">
                <Search className="w-4 h-4 text-neutral-500" />
                <input 
                  type="text" 
                  placeholder="Search emails..."
                  className="bg-transparent border-none text-sm text-neutral-300 placeholder-neutral-500 focus:outline-none ml-2 w-full"
                />
              </div>
            </div>

            {/* Custom Categories */}
            <div className="flex-1 flex flex-col justify-between ml-20">
              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-300">Work</span>
                    <span className="text-neutral-500">12</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-300">Personal</span>
                    <span className="text-neutral-500">5</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-300">Updates</span>
                    <span className="text-neutral-500">8</span>
                  </div>
                </div>
              </div>
              <button className="text-sm text-neutral-400 hover:text-neutral-300 transition-colors">
                + Add Category
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {focusMode && selectedEmail ? (
            <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Email Modal Header */}
            <div className="bg-gradient-to-r from-pink-400 via-violet-400 to-sky-400 border-b border-neutral-800 px-6 py-4">
              <div className="max-w-5xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setFocusMode(false)}
                    className="text-neutral-800 hover:text-neutral-200 p-2 rounded-full hover:bg-neutral-800/50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-semibold text-neutral-100">{selectedEmail.subject}</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleDismissEmail(selectedEmail.id)}
                    className="text-neutral-800 hover:text-neutral-200 p-2 rounded-full hover:bg-neutral-800/50"
                  >
                    <Archive className="w-5 h-5" />
                  </button>
                  <button className="text-neutral-800 hover:text-neutral-200 p-2 rounded-full hover:bg-neutral-800/50">
                    <Flag className={`w-5 h-5 ${selectedEmail.flagged ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          
            {/* Scrollable Email Content */}
            <div className="flex-1 overflow-y-auto py-6">
              <div className="max-w-5xl mx-auto bg-neutral-900/90 rounded-lg border border-neutral-800">
                {/* Email Metadata */}
                <div className="p-6 border-b border-neutral-800">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                        <span className="text-lg font-semibold text-neutral-200">
                          {selectedEmail.sender.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-neutral-200">{selectedEmail.sender}</h3>
                          <span className="text-sm text-neutral-500">&lt;{selectedEmail.sender.toLowerCase().replace(/\s/g, '.')}@example.com&gt;</span>
                        </div>
                        <p className="text-neutral-400 text-sm">to me</p>
                      </div>
                    </div>
                    <div className="text-sm text-neutral-500">
                      <p>{selectedEmail.timestamp}</p>
                    </div>
                  </div>
                </div>
          
                {/* Email Body */}
                <div className="p-6">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-neutral-300 whitespace-pre-wrap">
                      {selectedEmail.content}
                    </div>
                  </div>
                </div>
          
                {/* Quick Reply Section */}
                <div className="p-6 border-t border-neutral-800">
                  <div className="bg-neutral-800/50 rounded-lg p-4">
                    <textarea 
                      placeholder="Click here to reply..."
                      className="w-full bg-transparent border-none text-neutral-300 placeholder-neutral-500 focus:outline-none resize-none"
                      rows="1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          ) : (
            <motion.div 
              className="flex-1 px-6 pt-72 pb-6 overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col h-[calc(100vh-20rem)]">
                <div className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {filteredEmails
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((email) => (
                        <EmailCard key={email.id} email={email} />
                    ))}
                  </div>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-neutral-800 pt-4 mt-auto">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-neutral-400">
                      Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredEmails.length)} - {Math.min(currentPage * itemsPerPage, filteredEmails.length)} of {filteredEmails.length}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded text-neutral-400 hover:bg-neutral-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {[...Array(Math.ceil(filteredEmails.length / itemsPerPage))].map((_, idx) => (
                      <button
                        key={idx + 1}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          currentPage === idx + 1
                            ? 'bg-neutral-800 text-neutral-200'
                            : 'text-neutral-400 hover:bg-neutral-800/50'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredEmails.length / itemsPerPage)))}
                      disabled={currentPage === Math.ceil(filteredEmails.length / itemsPerPage)}
                      className="p-2 rounded text-neutral-400 hover:bg-neutral-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Sidebar */}
        <AnimatePresence>
          {rightSidebarOpen && (
            <motion.aside 
              className="fixed right-0 top-0 bottom-0 w-[30%] bg-neutral-900/50 backdrop-blur-xl border-l border-neutral-800 p-6 z-20"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Welcome Message */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-200 mb-2">Welcome back, Sathya! 👋</h2>
                <p className="text-neutral-400 text-sm">You have {filteredEmails.filter(e => e.flagged).length} flagged messages waiting for your attention.</p>
                <div className="mt-4 p-3 bg-neutral-800/50 rounded-lg border border-neutral-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm text-neutral-300">Active Status</span>
                    </div>
                    <span className="text-xs text-neutral-500">Online</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-neutral-200 mb-4">Flagged Messages</h2>
                <div className="space-y-3">
                  {filteredEmails.filter(email => email.flagged).map((email) => (
                    <motion.div 
                      key={email.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleEmailClick(email)}
                      className="bg-neutral-900/60 backdrop-blur-xl p-3 rounded-lg border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-all"
                      whileHover={{ scale: 1.01, y: -1 }}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-neutral-300 text-sm">{email.sender}</span>
                        <span className="text-xs text-neutral-500">{email.timestamp}</span>
                      </div>
                      <h3 className="font-semibold text-neutral-200 text-sm mb-1">{email.subject}</h3>
                      <p className="text-xs text-neutral-400 line-clamp-1">{email.preview}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {selectedEmail && !focusMode && (
                <div className="border-t border-neutral-800 pt-4">
                  <h3 className="text-sm font-medium text-neutral-500 mb-3">Quick Actions</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded text-neutral-400 hover:bg-neutral-800/50 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded text-neutral-400 hover:bg-neutral-800/50 transition-colors">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded text-neutral-400 hover:bg-neutral-800/50 transition-colors">
                      <Video className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Sidebar Toggles */}
        <button
          onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-50 bg-neutral-900/50 p-1.5 rounded-r backdrop-blur-xl border border-l-0 border-neutral-800 text-neutral-400 hover:text-neutral-200"
        >
          {leftSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-50 bg-neutral-900/50 p-1.5 rounded-l backdrop-blur-xl border border-r-0 border-neutral-800 text-neutral-400 hover:text-neutral-200"
        >
          {rightSidebarOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}