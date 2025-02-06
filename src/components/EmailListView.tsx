// components/EmailListView.tsx
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EmailCard } from './EmailCard';
import { EmailListItem } from './EmailListItem';
import { themeConfig } from '~/constants/themeConfig';
import { ThemeConfig } from 'tailwindcss/types/config';

interface EmailListViewProps {
  viewMode: string;
  leftSidebarOpen: boolean;
  filteredEmails: any[];
  currentPage: number;
  itemsPerPage: number;
  handleEmailClick: (email: any) => void;
  handleFlagEmail: (e: React.MouseEvent, emailId: string) => void;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  theme: string;
  themeConfig: ThemeConfig;
}

export const EmailListView = ({ 
  viewMode, 
  leftSidebarOpen, 
  filteredEmails, 
  currentPage, 
  itemsPerPage,
  handleEmailClick,
  handleFlagEmail,
  setCurrentPage,
  theme,
  themeConfig 
}: EmailListViewProps) => (
  <motion.div 
    className="flex-1 px-6 pt-28 pb-6 overflow-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex flex-col h-[calc(100vh-7.5rem)]">
      <div className="flex-1 overflow-y-auto">
        {viewMode === 'card' ? (
          <div className={`grid ${leftSidebarOpen ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4 mb-4`}>
            {filteredEmails
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((email) => (
                <EmailCard 
                  key={email.id} 
                  email={email}
                  handleEmailClick={handleEmailClick}
                  handleFlagEmail={handleFlagEmail}
                  theme={theme}
                  themeConfig={themeConfig}
                />
            ))}
          </div>
        ) : (
          <div className="pr-4 w-full max-w-7xl mx-auto">
            {filteredEmails
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((email) => (
                <EmailListItem 
                  key={email.id} 
                  email={email}
                  handleEmailClick={handleEmailClick}
                  handleFlagEmail={handleFlagEmail}
                  theme={theme}
                  themeConfig={themeConfig}
                />
            ))}
          </div>
        )}
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
);