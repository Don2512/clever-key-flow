import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { RecruiterSidebar } from '@/components/RecruiterSidebar';
import { Button } from '@/components/ui/button';

interface RecruiterLayoutProps {
  title: string;
  subtitle?: string;
  rightActions?: React.ReactNode;
  children: React.ReactNode;
}

const RecruiterLayout: React.FC<RecruiterLayoutProps> = ({ title, subtitle, rightActions, children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <RecruiterSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-bold text-foreground">{title}</h1>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {rightActions}
            </div>
          </header>
          <main className="flex-1 p-6 space-y-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RecruiterLayout;
