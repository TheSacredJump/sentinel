// components/EmailDetailView.tsx
import { motion } from 'framer-motion';
import { ChevronLeft, Archive, Flag } from 'lucide-react';

interface EmailDetailViewProps {
  selectedEmail: any;
  handleDismissEmail: (emailId: string) => void;
  theme: string;
}

export const EmailDetailView = ({ selectedEmail, handleDismissEmail, theme }: EmailDetailViewProps) => (
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
            onClick={() => handleDismissEmail(selectedEmail.id)}
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
              rows={1}
            />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);