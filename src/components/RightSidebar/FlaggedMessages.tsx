import { motion } from "framer-motion";

export const FlaggedMessages = ({ filteredEmails, handleEmailClick, theme, themeConfig }: any) => (
    <div className="space-y-6">
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
  
      <div>
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
    </div>
  );