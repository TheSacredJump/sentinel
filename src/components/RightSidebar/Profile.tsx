export const Profile = ({ theme, themeConfig }: any) => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className={`w-16 h-16 rounded-full ${themeConfig[theme].buttonBg} flex items-center justify-center text-2xl font-semibold ${themeConfig[theme].text}`}>
          S
        </div>
        <div>
          <h2 className={`text-xl font-semibold ${themeConfig[theme].text}`}>Sathya Padmanabhan</h2>
          <p className={`${themeConfig[theme].textSecondary} text-sm`}>sathya.padmanabhan@example.com</p>
        </div>
      </div>
  
      <div className={`p-4 rounded-lg ${themeConfig[theme].cardBg} border ${themeConfig[theme].cardBorder}`}>
        <h3 className={`text-sm font-medium ${themeConfig[theme].textSecondary} mb-3`}>Account Status</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className={`text-sm ${themeConfig[theme].text}`}>Storage Used</span>
            <span className={`text-sm ${themeConfig[theme].textSecondary}`}>4.2 GB / 15 GB</span>
          </div>
          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full w-[28%] bg-gradient-to-r from-pink-400 via-violet-400 to-sky-400 rounded-full" />
          </div>
        </div>
      </div>
  
      <div className={`p-4 rounded-lg ${themeConfig[theme].cardBg} border ${themeConfig[theme].cardBorder}`}>
        <h3 className={`text-sm font-medium ${themeConfig[theme].textSecondary} mb-3`}>Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${themeConfig[theme].buttonBg}`}>
            <div className={`text-2xl font-bold ${themeConfig[theme].text}`}>2,481</div>
            <div className={`text-xs ${themeConfig[theme].textSecondary}`}>Total Emails</div>
          </div>
          <div className={`p-3 rounded-lg ${themeConfig[theme].buttonBg}`}>
            <div className={`text-2xl font-bold ${themeConfig[theme].text}`}>86%</div>
            <div className={`text-xs ${themeConfig[theme].textSecondary}`}>Response Rate</div>
          </div>
        </div>
      </div>
  
      <div className={`p-4 rounded-lg ${themeConfig[theme].cardBg} border ${themeConfig[theme].cardBorder}`}>
        <h3 className={`text-sm font-medium ${themeConfig[theme].textSecondary} mb-3`}>Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-sky-400 rounded-full mt-1.5" />
            <div>
              <p className={`text-sm ${themeConfig[theme].text}`}>Sent 12 emails today</p>
              <p className={`text-xs ${themeConfig[theme].textSecondary}`}>2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5" />
            <div>
              <p className={`text-sm ${themeConfig[theme].text}`}>Achieved 90% response rate</p>
              <p className={`text-xs ${themeConfig[theme].textSecondary}`}>1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );