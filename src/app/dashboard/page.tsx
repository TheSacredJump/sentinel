"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Star, Clock, AlertCircle, Archive, Trash2, Search, X, MessageCircle, Phone, Video, ChevronLeft, ChevronRight, Maximize2, Minimize2, Flag, PlusCircleIcon, PencilIcon, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { dummyEmails } from '~/constants/dummyEmails';
import Image from 'next/image';
import bgPattern from '/scenic-mountain.webp';

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
  const [viewMode, setViewMode] = useState('card');
  const [theme, setTheme] = useState('dark');

// Add this function with other handlers
const toggleTheme = () => {
  setTheme(prev => prev === 'dark' ? 'light' : 'dark');
};

const ThemeToggle = () => (
  <button
    onClick={toggleTheme}
    className={`p-2 rounded-lg transition-colors ${
      theme === 'dark' 
        ? 'bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50'
        : 'bg-white/50 text-neutral-600 hover:bg-white/70'
    }`}
  >
    {theme === 'dark' ? (
      <Sun className="w-4 h-4" />
    ) : (
      <Moon className="w-4 h-4" />
    )}
  </button>
);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const ViewToggle = () => (
    <div className="flex items-center">
      <div className={`${themeConfig[theme].buttonBg} backdrop-blur-xl rounded-lg border ${themeConfig[theme].cardBorder} p-1`}>
        <button
          onClick={() => setViewMode('card')}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
            viewMode === 'card'
              ? `${theme === 'dark' ? 'bg-neutral-700/50 text-neutral-100' : 'bg-white/90 text-neutral-900'} shadow-sm`
              : `${themeConfig[theme].textSecondary} ${themeConfig[theme].buttonHover}`
          }`}
        >
          Grid View
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
            viewMode === 'list'
              ? `${theme === 'dark' ? 'bg-neutral-700/50 text-neutral-100' : 'bg-white/90 text-neutral-900'} shadow-sm`
              : `${themeConfig[theme].textSecondary} ${themeConfig[theme].buttonHover}`
          }`}
        >
          List View
        </button>
      </div>
    </div>
  );

  const EmailListItem = ({ email }) => (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`group h-20 w-full ${themeConfig[theme].cardBg} backdrop-blur-xl px-4 py-3 rounded-lg border ${themeConfig[theme].cardBorder} cursor-pointer ${themeConfig[theme].cardHover} flex items-center ${
        email.unread ? 'border-l-4 border-l-sky-400' : ''
      } ${email.flagged ? 'border-r-4 border-r-yellow-400' : ''}`}
      onClick={() => handleEmailClick(email)}
    >
      <div className={`w-8 h-8 rounded-full ${themeConfig[theme].buttonBg} flex items-center justify-center mr-4 ${themeConfig[theme].text}`}>
        {email.sender.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className={`font-medium ${themeConfig[theme].text} truncate`}>{email.sender}</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${themeConfig[theme].textSecondary}`}>{email.timestamp}</span>
            <button 
              onClick={(e) => handleFlagEmail(e, email.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-yellow-400"
            >
              <Flag className={`w-4 h-4 ${email.flagged ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            </button>
          </div>
        </div>
        <h3 className={`font-semibold ${themeConfig[theme].text} mb-1 truncate`}>{email.subject}</h3>
        <p className={`text-sm ${themeConfig[theme].textSecondary} truncate`}>{email.preview}</p>
      </div>
    </motion.div>
  );

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

  const bgImageOpacity = 0.3

  const EmailCard = ({ email }) => (
    <motion.div
      key={email.id}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`group ${themeConfig[theme].cardBg} backdrop-blur-xl p-4 rounded-lg border ${themeConfig[theme].cardBorder} cursor-pointer transform transition-all ${themeConfig[theme].cardHover} ${
        email.unread ? 'border-l-4 border-l-sky-400' : ''
      } ${email.flagged ? 'border-r-4 border-r-yellow-400' : ''}`}
      whileHover={{ scale: 1.01, y: -2 }}
      onClick={() => handleEmailClick(email)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className='flex items-center space-x-2'>
          <div className={`w-8 h-8 rounded-full ${themeConfig[theme].buttonBg} flex items-center justify-center ${themeConfig[theme].text}`}>
            {email.sender.charAt(0).toUpperCase()}
          </div>
          <span className={`font-medium ${themeConfig[theme].text}`}>{email.sender}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${themeConfig[theme].textSecondary}`}>{email.timestamp}</span>
          <button 
            onClick={(e) => handleFlagEmail(e, email.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-yellow-400"
          >
            <Flag className={`w-4 h-4 ${email.flagged ? 'fill-yellow-400 text-yellow-400' : ''}`} />
          </button>
        </div>
      </div>
      <h3 className={`font-semibold ${themeConfig[theme].text} mb-1`}>{email.subject}</h3>
      <p className={`text-sm ${themeConfig[theme].textSecondary} line-clamp-2`}>{email.preview}</p>
    </motion.div>
  );

  return (
    <div className={`flex h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-neutral-950 to-black text-white'
        : 'bg-gradient-to-b from-blue-50 to-white text-neutral-900'
    } relative overflow-hidden`}>
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
          className={`w-48 ${themeConfig[theme].sidebarBg} border-r ${themeConfig[theme].cardBorder} p-3 backdrop-blur-xl relative z-20`}
          initial={{ x: -192 }}
          animate={{ x: 0 }}
          exit={{ x: -192 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="space-y-10">
            <div className="flex items-center space-x-2 px-2">
              <Image src="/logo.png" alt="Sentinel Logo" width={24} height={24}/>
              <span className={`text-lg font-semibold ${themeConfig[theme].text}`}>Sentinel</span>
            </div>
        
            <div className="space-y-1">
              {Object.entries(zones).map(([key, { icon, label }]) => (
                <button
                  key={key}
                  onClick={() => setSelectedZone(key)}
                  className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-sm transition-colors ${
                    selectedZone === key 
                      ? `${themeConfig[theme].buttonBg} ${themeConfig[theme].text}`
                      : `${themeConfig[theme].textSecondary} ${themeConfig[theme].buttonHover}`
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
              <div className='hover:scale-105 hover:cursor-pointer hover:shadow-md transition-all duration-300 flex items-center justify-center p-2 text-sm font-semibold text-neutral-50 rounded-lg bg-gradient-to-r from-pink-400 via-violet-400 to-sky-400'>
                    <PencilIcon className="w-4 h-4 mr-2" />
                    <h1>Compose Email</h1>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* Background Pattern - Only visible in light mode */}
        {(
          <Image 
            className={`absolute inset-0 pointer-events-none`}
            // style={{ opacity: theme === 'dark' ? `${bgImageOpacity}` : `${1 - bgImageOpacity}` }}
            style={{ opacity: 0 }}
            src={"/scenic-mountain.webp"}
            alt="Scenic Mountain"
            fill
          />
        )}
        {/* Status Widget */}
        <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-[95%] rounded-lg h-16 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-pink-400/75 from-25% via-violet-500/75 via-50% to-sky-400/75 border-neutral-800'
              : 'bg-gradient-to-r from-pink-200 from-25% via-violet-300 via-50% to-sky-200 border-neutral-200'
          } border backdrop-blur-xl px-6`}>
            <div className="h-full flex items-center justify-between gap-6">
              {/* Time and Date Section */}
              <div className="flex items-center gap-3">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </h2>
                <div className={`h-4 w-px ${theme === 'dark' ? 'bg-neutral-700/50' : 'bg-neutral-300/50'}`} />
                <p className={`text-sm ${themeConfig[theme].textSecondary}`}>
                  {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                <div className="flex items-center gap-2 ml-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className={`text-xs ${themeConfig[theme].textSecondary}`}>Connected</span>
                </div>
              </div>

            <ViewToggle />
            <ThemeToggle />

            {/* Quick Filters */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button className={`px-2.5 py-1 rounded-full ${theme === 'dark' ? 'bg-neutral-800/50' : 'bg-white/50'} text-xs ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'} hover:bg-neutral-700/50 transition-colors`}>
                  Unread ({filteredEmails.length})
                </button>
                <button className={`px-2.5 py-1 rounded-full ${theme === 'dark' ? 'bg-neutral-800/50' : 'bg-white/50'} text-xs ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'} hover:bg-neutral-700/50 transition-colors`}>
                  Flagged ({filteredEmails.filter(e => e.flagged).length})
                </button>
                <button className={`px-2.5 py-1 rounded-full ${theme === 'dark' ? 'bg-neutral-800/50' : 'bg-white/50'} text-xs ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'} hover:bg-neutral-700/50 transition-colors`}>
                  Priority ({filteredEmails.filter(e => e.priority === 'urgent').length})
                </button>
              </div>
              <div className={`flex items-center border rounded-full px-3 py-1 ${theme === 'light' ? 'border-black/50' : 'border-white/50'}`}>
                <Search className={`w-3.5 h-3.5 ${themeConfig[theme].textSecondary}`} />
                <input 
                  type="text" 
                  placeholder="Search emails..."
                  className={`bg-transparent border-none text-xs text-neutral-300 ${theme == 'dark' ? 'placeholder-neutral-200' : 'placeholder-neutral-500'} focus:outline-none ml-2 w-40`}
                />
              </div>
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
              className="flex-1 px-6 pt-28 pb-6 overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col h-[calc(100vh-7.5rem)]">
                <div className="flex-1 overflow-y-auto">
                <div className="flex-1 overflow-y-auto">
                  {viewMode === 'card' ? (
                    <div className={`grid ${leftSidebarOpen ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4 mb-4`}>
                      {filteredEmails
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((email) => (
                          <EmailCard key={email.id} email={email} />
                      ))}
                    </div>
                  ) : (
                    <div className={`space-y-2 pr-4 w-full max-w-7xl mx-auto`}>
                      {filteredEmails
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((email) => (
                          <EmailListItem key={email.id} email={email} />
                      ))}
                    </div>
                  )}
                </div>
                </div>
                
                {/* Pagination */}
                <div className={`flex items-center justify-between border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'} pt-2 mt-auto`}>
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
            className={`fixed right-0 top-0 bottom-0 w-[30%] ${themeConfig[theme].rightSidebarBg} backdrop-blur-xl border-l ${themeConfig[theme].cardBorder} p-6 z-20`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Welcome Message */}
            <div className="mb-8">
              <h2 className={`text-2xl font-semibold ${themeConfig[theme].text} mb-2`}>Welcome back, Sathya! 👋</h2>
              <p className={`${themeConfig[theme].textSecondary} text-sm`}>
                You have {filteredEmails.filter(e => e.flagged).length} flagged messages waiting for your attention.
              </p>
              <div className={`mt-4 p-3 ${themeConfig[theme].buttonBg} rounded-lg border ${themeConfig[theme].cardBorder}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className={`text-sm ${themeConfig[theme].text}`}>Active Status</span>
                  </div>
                  <span className={`text-xs ${themeConfig[theme].textSecondary}`}>Online</span>
                </div>
              </div>
            </div>

              <div className="mb-6">
                <h2 className={`text-lg font-semibold ${themeConfig[theme].textPrimary} mb-4`}>Flagged Messages</h2>
                <div className="space-y-3">
                  {filteredEmails.filter(email => email.flagged).map((email) => (
                    <motion.div 
                      key={email.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleEmailClick(email)}
                      className={`${themeConfig[theme].cardBg} backdrop-blur-xl p-3 rounded-lg border ${themeConfig[theme].cardBorder} cursor-pointer hover:border-neutral-700 transition-all`}
                      whileHover={{ scale: 1.01, y: -1 }}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`font-medium ${themeConfig[theme].textPrimary} text-sm`}>{email.sender}</span>
                        <span className={`text-xs ${themeConfig[theme].textSecondary}`}>{email.timestamp}</span>
                      </div>
                      <h3 className={`font-semibold ${themeConfig[theme].textPrimary} text-sm mb-1`}>{email.subject}</h3>
                      <p className={`text-xs ${themeConfig[theme].textSecondary} line-clamp-1`}>{email.preview}</p>
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
          className={`absolute left-0 top-1/2 transform ${leftSidebarOpen ? '-translate-x-7' : '-translate-x-3'} -translate-y-1/2 z-50 ${themeConfig[theme].buttonBg} p-1.5 rounded-r backdrop-blur-xl border ${leftSidebarOpen ? 'border-r-0' : 'border-l-0'} ${themeConfig[theme].cardBorder} text-neutral-400 hover:text-neutral-200`}
        >
          {leftSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-50 ${themeConfig[theme].buttonBg} p-1.5 rounded-l backdrop-blur-xl border border-r-0 ${themeConfig[theme].cardBorder} text-neutral-400 hover:text-neutral-200`}
        >
          {rightSidebarOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

const themeConfig = {
  dark: {
    background: 'bg-gradient-to-b from-neutral-950 to-black',
    text: 'text-white',
    textSecondary: 'text-neutral-300',
    cardBg: 'bg-neutral-900',
    cardBorder: 'border-neutral-800',
    cardHover: 'hover:border-neutral-700',
    sidebarBg: 'bg-neutral-900/50',
    rightSidebarBg: 'bg-neutral-900/50',
    inputBg: 'bg-neutral-800/50',
    buttonBg: 'bg-neutral-800/50',
    buttonHover: 'hover:bg-neutral-700/50',
    dividerColor: 'border-neutral-800',
    accentGlow: {
      pink: 'bg-pink-400/20',
      violet: 'bg-violet-400/20',
      sky: 'bg-sky-400/20'
    }
  },
  light: {
    background: 'bg-gradient-to-b from-blue-50 to-white',
    text: 'text-neutral-900',
    textSecondary: 'text-neutral-600',
    cardBg: 'bg-white',
    cardBorder: 'border-neutral-200',
    cardHover: 'hover:border-neutral-300',
    sidebarBg: 'bg-white/70',
    rightSidebarBg: 'bg-neutral-100/50',
    inputBg: 'bg-white/50',
    buttonBg: 'bg-white/50',
    buttonHover: 'hover:bg-white/70',
    dividerColor: 'border-neutral-200',
    accentGlow: {
      pink: 'bg-pink-100/40',
      violet: 'bg-violet-100/40',
      sky: 'bg-sky-100/40'
    }
  }
};