import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarSeparator,
  SidebarTrigger,
  SidebarRail,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Users, Building2, FileText, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Quản lý user', url: '/admin/users', icon: Users },
  { title: 'Quản lý công ty', url: '/admin/companies', icon: Building2 },
  { title: 'Quản lý bài đăng', url: '/admin/posts', icon: FileText },
];

const AdminSidebar: React.FC = () => {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'bg-sidebar-accent text-primary font-semibold ring-1 ring-sidebar-border'
      : 'hover:bg-muted/50 text-foreground';

  return (
    <Sidebar className="w-64">
      <SidebarRail />
      <SidebarContent>
        <SidebarHeader className="px-3 py-2 flex items-center justify-between">
          <span className="text-sm font-semibold">Admin</span>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs px-3 py-2">Quản trị hệ thống</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className="flex items-center gap-2 hover:bg-muted/50">
                    <Home className="h-4 w-4" />
                    <span>Trang chủ</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {items.map(it => (
                <SidebarMenuItem key={it.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={it.url} className={linkCls}>
                      <it.icon className="h-4 w-4" />
                      <span>{it.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
