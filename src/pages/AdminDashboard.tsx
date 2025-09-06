import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import StatsCard from '@/components/StatsCard';
import JobMap from '@/components/JobMap';
import SimpleViewsChart from '@/components/SimpleViewsChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Eye, FileText, Users, Building2 } from 'lucide-react';
import { jobsData } from '@/data/jobsData';

const AdminDashboard: React.FC = () => {
  const handleJobSelect = () => {};

  return (
    <AdminLayout title="Admin Dashboard" subtitle="Tổng quan hệ thống và lược view theo bản đồ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Bài đăng" value={String(jobsData.length)} icon={<FileText className="w-5 h-5" />} color="text-primary" />
        <StatsCard title="Công ty" value="12" icon={<Building2 className="w-5 h-5" />} color="text-success" />
        <StatsCard title="Người dùng" value="120" icon={<Users className="w-5 h-5" />} color="text-orange-500" />
        <StatsCard title="Lượt xem" value="8.2k" icon={<Eye className="w-5 h-5" />} color="text-muted-foreground" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bản đồ lược view theo khu vực</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 rounded-lg overflow-hidden">
            <JobMap jobs={jobsData} onJobSelect={handleJobSelect} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kênh & chỉ số</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleViewsChart />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboard;
