import React from 'react';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { 
  BarChart3, 
  FileText, 
  Users, 
  UserCheck, 
  Settings,
  Home
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const menuItems = [
  {
    title: 'Thống kê & hồ sơ mới',
    url: '/recruiter',
    icon: BarChart3,
    active: true
  },
  {
    title: 'Thông tin tuyển dụng',
    url: '/recruiter/jobs',
    icon: FileText
  },
  {
    title: 'Hồ sơ nhận được',
    url: '/recruiter/applications',
    icon: Users
  },
  {
    title: 'Ứng viên tiềm năng',
    url: '/recruiter/candidates',
    icon: UserCheck
  },
  {
    title: 'Quản lý hồ sơ',
    url: '/recruiter/manage',
    icon: Settings
  }
];

export function RecruiterSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50";

  return (
    <Sidebar className="w-64">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 py-2">
            Dashboard nhà tuyển dụng
          </SidebarGroupLabel>
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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
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
}