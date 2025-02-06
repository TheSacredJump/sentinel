import { Moon, Sun } from "lucide-react";

// ThemeToggle.jsx
export const ThemeToggle = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors ${
        theme === 'dark' 
          ? 'bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50'
          : 'bg-white/50 text-neutral-600 hover:bg-white/70'
      }`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );