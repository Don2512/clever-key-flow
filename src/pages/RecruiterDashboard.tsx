import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { RecruiterSidebar } from '@/components/RecruiterSidebar';
import StatsCard from '@/components/StatsCard';
import CandidatesList from '@/components/CandidatesList';
import SimpleViewsChart from '@/components/NewUsersBarChart';
import ApplicationsByJobChart from '@/components/ApplicationsByJobChart';
import ConversionFunnel from '@/components/ConversionFunnel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  FileText,
  Eye,
  UserCheck,
  Plus,
  Settings,
  TrendingUp,
  Home,
  Activity
} from 'lucide-react';

const RecruiterDashboard = () => {

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted/20">
        <RecruiterSidebar />

        <div className="flex-1 flex flex-col">
          {/* Modern Header with Glass Effect */}
          <header className="h-20 border-b border-border/40 bg-card/80 backdrop-blur-sm px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-primary/10 transition-colors rounded-lg p-2" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <Activity className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    Quản lý tin, theo dõi hồ sơ và hiệu quả tuyển dụng
                    <Badge variant="secondary" className="text-xs">Live</Badge>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hover:bg-muted/50 transition-colors">
                <Home className="w-4 h-4 mr-2" />
                Trang chủ
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg transition-all duration-200 hover:scale-105">
                <Plus className="w-4 h-4 mr-2" />
                Đăng tin mới
              </Button>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-8 animate-fade-in">

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="transform hover:scale-105 transition-all duration-200">
                <StatsCard
                  title="Tổng tin đăng"
                  value="15"
                  icon={<FileText className="w-6 h-6" />}
                  trend="+12% từ tháng trước"
                  color="text-primary"
                />
              </div>
              <div className="transform hover:scale-105 transition-all duration-200">
                <StatsCard
                  title="Tổng hồ sơ"
                  value="30"
                  icon={<Users className="w-6 h-6" />}
                  trend="+25% từ tháng trước"
                  color="text-green-500"
                />
              </div>
              <div className="transform hover:scale-105 transition-all duration-200">
                <StatsCard
                  title="Hồ sơ hôm nay"
                  value="2"
                  icon={<UserCheck className="w-6 h-6" />}
                  trend="Mới nhận"
                  color="text-orange-500"
                />
              </div>
              <div className="transform hover:scale-105 transition-all duration-200">
                <StatsCard
                  title="Tỷ lệ phản hồi"
                  value="85%"
                  icon={<Eye className="w-6 h-6" />}
                  trend="+5% từ tuần trước"
                  color="text-blue-500"
                />
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ApplicationsByJobChart />
              <ConversionFunnel />
            </div>

            {/* Enhanced Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
                  <h3 className="text-lg font-semibold">Ứng viên tiềm năng</h3>
                </div>
                <CandidatesList />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-blue-500/50 rounded-full"></div>
                  <h3 className="text-lg font-semibold">Thống kê lượt xem</h3>
                </div>
                <SimpleViewsChart />
              </div>
            </div>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-r from-card to-muted/10 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Thao tác nhanh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-16 flex-col gap-2 hover:bg-primary/5 hover:border-primary/20 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span className="text-xs">Đăng tin mới</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2 hover:bg-primary/5 hover:border-primary/20 transition-colors">
                    <Users className="w-5 h-5" />
                    <span className="text-xs">Xem hồ sơ</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2 hover:bg-primary/5 hover:border-primary/20 transition-colors">
                    <FileText className="w-5 h-5" />
                    <span className="text-xs">Báo cáo</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2 hover:bg-primary/5 hover:border-primary/20 transition-colors">
                    <Settings className="w-5 h-5" />
                    <span className="text-xs">Cài đặt</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RecruiterDashboard;
