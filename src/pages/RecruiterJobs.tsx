import React from 'react';
import RecruiterLayout from '@/components/RecruiterLayout';
import { jobsData } from '@/data/jobsData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Eye, Trash2, Plus } from 'lucide-react';

const RecruiterJobs: React.FC = () => {
  return (
    <RecruiterLayout
      title="Thông tin tuyển dụng"
      subtitle="Quản lý các tin đã đăng và trạng thái nhận hồ sơ"
      rightActions={<Button size="sm" className="gap-2"><Plus className="w-4 h-4"/> Đăng tin</Button>}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Danh sách tin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {jobsData.map((job) => (
              <div key={job.id} className="flex items-center justify-between gap-4 border rounded-md p-3 bg-card">
                <div>
                  <div className="font-medium">{job.title}</div>
                  <div className="text-sm text-muted-foreground">{job.company} • {job.location}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{job.type}</Badge>
                  <Badge>{job.salary}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1"><Eye className="w-4 h-4"/>Xem</Button>
                  <Button variant="outline" size="sm" className="gap-1"><Pencil className="w-4 h-4"/>Sửa</Button>
                  <Button variant="destructive" size="sm" className="gap-1"><Trash2 className="w-4 h-4"/>Ẩn</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </RecruiterLayout>
  );
};

export default RecruiterJobs;
