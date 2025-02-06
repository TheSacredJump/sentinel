// EmailListItem.jsx
import { motion } from 'framer-motion';
import { Flag } from 'lucide-react';

export const EmailListItem = ({ email, handleEmailClick, handleFlagEmail, theme, themeConfig }: any) => (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`group h-20 w-full ${themeConfig[theme].cardBg} backdrop-blur-xl px-4 py-4 my-1 ${themeConfig[theme].cardBorder} cursor-pointer ${themeConfig[theme].cardHover} flex items-center ${
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
  