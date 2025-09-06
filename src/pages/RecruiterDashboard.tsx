import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { RecruiterSidebar } from '@/components/RecruiterSidebar';
import StatsCard from '@/components/StatsCard';
import CandidatesList from '@/components/CandidatesList';
import SimpleViewsChart from '@/components/SimpleViewsChart';
import JobMap from '@/components/JobMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  Eye, 
  UserCheck,
  Plus,
  Settings
} from 'lucide-react';
import { jobsData } from '@/data/jobsData';

const RecruiterDashboard = () => {
  const handleJobSelect = (job: any) => {
    console.log('Selected job:', job);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <RecruiterSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-bold text-foreground">Dashboard nhà tuyển dụng</h1>
                <p className="text-sm text-muted-foreground">Quản lý tin, theo dõi hồ sơ và hiệu quả tuyển dụng</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                Trang chủ
              </Button>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Đăng tin
              </Button>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Tổng tin"
                value="15"
                icon={<FileText className="w-5 h-5" />}
                trend="+12% từ tháng trước"
                color="text-primary"
              />
              <StatsCard
                title="Tổng hồ sơ"
                value="30"
                icon={<Users className="w-5 h-5" />}
                trend="+25% từ tháng trước"
                color="text-success"
              />
              <StatsCard
                title="Hồ sơ hôm nay"
                value="2"
                icon={<UserCheck className="w-5 h-5" />}
                color="text-orange-500"
              />
              <StatsCard
                title="Tin chưa có hồ sơ"
                value="0"
                icon={<Eye className="w-5 h-5" />}
                color="text-muted-foreground"
              />
            </div>

            {/* Map Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Bản đồ thống kê (tháng này)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 rounded-lg overflow-hidden">
                  <JobMap
                    jobs={jobsData}
                    onJobSelect={handleJobSelect}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CandidatesList />
              <SimpleViewsChart />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RecruiterDashboard;