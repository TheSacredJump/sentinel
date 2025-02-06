// components/RightSidebar/Profile.tsx
import { Github, Twitter, Linkedin, Globe, MapPin, Building2, Mail, CalendarDays } from 'lucide-react';
import { useSession } from 'next-auth/react';

export const Profile = ({ theme, themeConfig }: any) => {
    const { data: session } = useSession();

    return (
  <div className="space-y-6">
    {/* Profile Header */}
    <div className="text-center mb-8">
      <div className="relative mb-4">
        <div className="w-24 h-24 mx-auto relative">
          <img
            src={session?.user?.image}
            alt="Sathya Padmanabhan"
            className="rounded-full object-cover w-full h-full border-2 border-violet-400"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-neutral-900" />
        </div>
      </div>
      <h2 className={`text-xl font-semibold ${themeConfig[theme].text}`}>{session?.user?.name}</h2>
      <p className={`${themeConfig[theme].textSecondary} text-sm mt-1`}>Product Engineer</p>
      <div className="flex items-center justify-center gap-2 mt-2">
        <Building2 className="w-4 h-4 text-violet-400" />
        <span className={`text-sm ${themeConfig[theme].textSecondary}`}>Sentinel Labs</span>
      </div>
    </div>

    {/* Contact & Social */}
    <div className={`p-4 rounded-lg ${themeConfig[theme].cardBg} border ${themeConfig[theme].cardBorder}`}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-violet-400" />
          <div className={`text-sm ${themeConfig[theme].text} hover:text-violet-400 transition-colors`}>
            {session?.user?.email}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-violet-400" />
          <span className={`text-sm ${themeConfig[theme].textSecondary}`}>San Francisco, CA</span>
        </div>
        <div className="flex items-center gap-3">
          <CalendarDays className="w-4 h-4 text-violet-400" />
          <span className={`text-sm ${themeConfig[theme].textSecondary}`}>Joined March 2022</span>
        </div>
        <div className="pt-3 flex items-center gap-3">
          <a href="https://github.com/sathya" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors">
            <Github className="w-4 h-4 text-neutral-300" />
          </a>
          <a href="https://twitter.com/sathya" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors">
            <Twitter className="w-4 h-4 text-neutral-300" />
          </a>
          <a href="https://linkedin.com/in/sathya" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors">
            <Linkedin className="w-4 h-4 text-neutral-300" />
          </a>
          <a href="https://sathya.dev" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors">
            <Globe className="w-4 h-4 text-neutral-300" />
          </a>
        </div>
      </div>
    </div>

    {/* Bio */}
    <div className={`p-4 rounded-lg ${themeConfig[theme].cardBg} border ${themeConfig[theme].cardBorder}`}>
      <h3 className={`text-sm font-medium ${themeConfig[theme].textSecondary} mb-3`}>About</h3>
      <p className={`text-sm ${themeConfig[theme].text} leading-relaxed`}>
        Product Engineer passionate about building beautiful, functional interfaces. 
        Focused on creating intuitive email experiences and collaboration tools. 
        Previously helped scale design systems at Figma and led frontend development at Notion.
      </p>
    </div>

    {/* Work Experience */}
    <div className={`p-4 rounded-lg ${themeConfig[theme].cardBg} border ${themeConfig[theme].cardBorder}`}>
      <h3 className={`text-sm font-medium ${themeConfig[theme].textSecondary} mb-3`}>Experience</h3>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h4 className={`text-sm font-medium ${themeConfig[theme].text}`}>Sentinel Labs</h4>
            <span className={`text-xs ${themeConfig[theme].textSecondary}`}>2022 - Present</span>
          </div>
          <p className={`text-xs ${themeConfig[theme].textSecondary} mt-1`}>Product Engineer</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h4 className={`text-sm font-medium ${themeConfig[theme].text}`}>Figma</h4>
            <span className={`text-xs ${themeConfig[theme].textSecondary}`}>2020 - 2022</span>
          </div>
          <p className={`text-xs ${themeConfig[theme].textSecondary} mt-1`}>Senior Frontend Engineer</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h4 className={`text-sm font-medium ${themeConfig[theme].text}`}>Notion</h4>
            <span className={`text-xs ${themeConfig[theme].textSecondary}`}>2018 - 2020</span>
          </div>
          <p className={`text-xs ${themeConfig[theme].textSecondary} mt-1`}>Frontend Engineer</p>
        </div>
      </div>
    </div>

    {/* Skills */}
    <div className={`p-4 rounded-lg ${themeConfig[theme].cardBg} border ${themeConfig[theme].cardBorder}`}>
      <h3 className={`text-sm font-medium ${themeConfig[theme].textSecondary} mb-3`}>Skills</h3>
      <div className="flex flex-wrap gap-2">
        {['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS', 'Node.js', 'AWS', 'UI/UX', 'System Design'].map((skill) => (
          <span 
            key={skill}
            className={`px-3 py-1 rounded-full text-xs ${themeConfig[theme].buttonBg} ${themeConfig[theme].text}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);
}