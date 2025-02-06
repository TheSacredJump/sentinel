"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { dummyEmails } from '~/constants/dummyEmails';
import { themeConfig } from '~/constants/themeConfig';
import { ViewToggle } from '~/components/ViewToggle';
import { ThemeToggle } from '~/components/ThemeToggle';
import { EmailListView } from '~/components/EmailListView';
import { EmailDetailView } from '~/components/EmailDetailView';
import { LeftSidebar } from '~/components/LeftSidebar';
import { RightSidebar } from '~/components/RightSidebar';

export default function Dashboard() {
  // State management
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [emails, setEmails] = useState(dummyEmails.map(email => ({ ...email, flagged: false, read: false })));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('card');
  const [theme, setTheme] = useState('dark');
  
  const itemsPerPage = 25;
  const bgImageOpacity = 0.3;

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Event handlers
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleEmailClick = (email) => {
    setEmails(emails.map(e => 
      e.id === email.id ? { ...e, read: true } : e
    ));
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

  const filteredEmails = emails;

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
      <LeftSidebar 
        leftSidebarOpen={leftSidebarOpen}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        theme={theme}
        themeConfig={themeConfig}
      />

      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* Background Pattern */}
        <Image 
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: theme === 'dark' ? bgImageOpacity : 1 - bgImageOpacity }}
          src="/scenic-mountain.webp"
          alt="Scenic Mountain"
          fill
        />

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

            <ViewToggle 
              viewMode={viewMode}
              setViewMode={setViewMode}
              theme={theme}
              themeConfig={themeConfig}
            />

            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

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

        {/* Email Content */}
        <AnimatePresence mode="wait">
          {focusMode && selectedEmail ? (
            <EmailDetailView 
              selectedEmail={selectedEmail}
              handleDismissEmail={handleDismissEmail}
              theme={theme}
            />
          ) : (
            <EmailListView 
              viewMode={viewMode}
              leftSidebarOpen={leftSidebarOpen}
              filteredEmails={filteredEmails}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              handleEmailClick={handleEmailClick}
              handleFlagEmail={handleFlagEmail}
              setCurrentPage={setCurrentPage}
              theme={theme}
              themeConfig={themeConfig}
            />
          )}
        </AnimatePresence>

        {/* Right Sidebar */}
        <RightSidebar 
          rightSidebarOpen={rightSidebarOpen}
          filteredEmails={filteredEmails}
          handleEmailClick={handleEmailClick}
          selectedEmail={selectedEmail}
          focusMode={focusMode}
          theme={theme}
          themeConfig={themeConfig}
        />

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