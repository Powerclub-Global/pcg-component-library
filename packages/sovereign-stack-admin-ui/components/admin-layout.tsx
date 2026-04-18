import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/auth-context';

type LucideIcon = React.ComponentType<{ size?: number; className?: string }>;

export interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  titleGradientClass?: string;
  navItems: Array<{ path: string; label: string; icon: LucideIcon }>;
  ecosystemLinks?: Array<{ name: string; url: string; color: string }>;
}

export function AdminLayout({
  children,
  title,
  subtitle,
  titleGradientClass,
  navItems,
  ecosystemLinks,
}: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <h1 className={`text-xl font-bold ${titleGradientClass || 'text-primary'}`}>
            {title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Ecosystem Links */}
          {ecosystemLinks && ecosystemLinks.length > 0 && (
            <div className="mt-8 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 px-3">
                Sovereign Stack
              </p>
              <ul className="space-y-1">
                {ecosystemLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: link.color }}
                      />
                      {link.name}
                      <ExternalLink size={12} className="ml-auto opacity-50" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.username}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
