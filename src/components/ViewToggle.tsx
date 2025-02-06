// ViewToggle.jsx
export const ViewToggle = ({ viewMode, setViewMode, theme, themeConfig }: { viewMode: string; setViewMode: (mode: string) => void; theme: string; themeConfig: any }) => (
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