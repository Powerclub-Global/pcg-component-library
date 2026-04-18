import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from '../contexts/auth-context';
import type { AuthConfig } from '../contexts/auth-context';

const queryClient = new QueryClient();

export interface AdminAppShellProps {
  children: React.ReactNode;
  authConfig: AuthConfig;
  toastTheme?: 'dark' | 'light';
}

export function AdminAppShell({ children, authConfig, toastTheme = 'dark' }: AdminAppShellProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider config={authConfig}>
        <BrowserRouter>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style:
                toastTheme === 'dark'
                  ? {
                      background: '#1a1a1a',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#e5e7eb',
                    }
                  : undefined,
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
