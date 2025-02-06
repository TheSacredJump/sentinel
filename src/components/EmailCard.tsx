// EmailCard.jsx
import { motion } from 'framer-motion';
import { Flag } from 'lucide-react';


export const EmailCard = ({ email, handleEmailClick, handleFlagEmail, theme, themeConfig }: any) => (
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