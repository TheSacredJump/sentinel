  // components/RightSidebar/index.tsx
  import { AnimatePresence, motion } from "framer-motion";
  import { MessageCircle, Phone, Video, UserCircle2, Flag, Settings, Bell } from "lucide-react";
  import { useState } from "react";
import { Profile } from "./RightSidebar/Profile";
import { FlaggedMessages } from "./RightSidebar/FlaggedMessages";

interface RightSidebarProps {
    rightSidebarOpen: boolean;
    filteredEmails: any[];
    handleEmailClick: (email: any) => void;
    selectedEmail: any;
    focusMode: boolean;
    theme: string;
    themeConfig: any;
  }
  
  export const RightSidebar = ({ rightSidebarOpen, filteredEmails, handleEmailClick, selectedEmail, focusMode, theme, themeConfig }: RightSidebarProps) => {
    const [activeView, setActiveView] = useState('flagged');
  
    const navigationItems = [
      { id: 'profile', icon: UserCircle2, label: 'Profile' },
      { id: 'flagged', icon: Flag, label: 'Flagged' },
      { id: 'notifications', icon: Bell, label: 'Notifications' },
      { id: 'settings', icon: Settings, label: 'Settings' }
    ];
  
    const renderContent = () => {
      switch (activeView) {
        case 'profile':
          return <Profile theme={theme} themeConfig={themeConfig} />;
        case 'flagged':
          return (
            <FlaggedMessages 
              filteredEmails={filteredEmails}
              handleEmailClick={handleEmailClick}
              theme={theme}
              themeConfig={themeConfig}
            />
          );
        default:
          return <FlaggedMessages 
            filteredEmails={filteredEmails}
            handleEmailClick={handleEmailClick}
            theme={theme}
            themeConfig={themeConfig}
          />;
      }
    };
  
    return (
      <AnimatePresence>
        {rightSidebarOpen && (
          <motion.aside 
            className={`fixed right-0 top-0 bottom-0 w-[30%] ${themeConfig[theme].rightSidebarBg} backdrop-blur-xl border-l ${themeConfig[theme].cardBorder} p-6 z-20`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Navigation Icons */}
            <div className="flex items-center justify-around mb-8 pb-4 border-b border-neutral-800">
              {navigationItems.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveView(id)}
                  className={`p-2 rounded-lg transition-all ${
                    activeView === id 
                      ? `${themeConfig[theme].buttonBg} text-white`
                      : `text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50`
                  }`}
                  title={label}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
  
            {/* Content Area */}
            <div className="h-[calc(100vh-8rem)] overflow-y-auto">
              {renderContent()}
            </div>
  
            {/* Quick Actions */}
            {selectedEmail && !focusMode && (
              <div className="border-t border-neutral-800 pt-4 mt-4">
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
    );
  };