// LeftSidebar.jsx
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, AlertCircle, Clock, Archive, PencilIcon } from 'lucide-react';
import Image from 'next/image';

export const LeftSidebar = ({ leftSidebarOpen, selectedZone, setSelectedZone, theme, themeConfig }: { leftSidebarOpen: boolean; selectedZone: string; setSelectedZone: (zone: string) => void; theme: string; themeConfig: any }) => {
    const zones = {
      all: { icon: <Mail className="w-4 h-4" />, label: 'All' },
      urgent: { icon: <AlertCircle className="w-4 h-4" />, label: 'Urgent' },
      followup: { icon: <Clock className="w-4 h-4" />, label: 'Follow-up' },
      later: { icon: <Archive className="w-4 h-4" />, label: 'Later' }
    };
  
    return (
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
    );
  };