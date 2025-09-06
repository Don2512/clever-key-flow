import React from 'react';
import RecruiterLayout from '@/components/RecruiterLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, UserCheck, Download } from 'lucide-react';

const applications = [
  { id: 'a1', name: 'Nguyễn Văn A', job: 'Frontend Developer', email: 'vana@example.com', phone: '0901 234 567', status: 'Mới' },
  { id: 'a2', name: 'Trần Thị B', job: 'Backend Developer', email: 'thib@example.com', phone: '0902 345 678', status: 'Đang xem' },
  { id: 'a3', name: 'Lê C', job: 'UI/UX Designer', email: 'lec@example.com', phone: '0903 456 789', status: 'Phỏng vấn' },
];

const RecruiterApplications: React.FC = () => {
  return (
    <RecruiterLayout title="Hồ sơ nhận được" subtitle="Danh sách CV đã ứng tuyển">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hồ sơ mới</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {applications.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-4 border rounded-md p-3 bg-card">
                <div>
                  <div className="font-medium">{a.name}</div>
                  <div className="text-sm text-muted-foreground">Ứng tuyển: {a.job}</div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1"><Mail className="w-4 h-4" />{a.email}</div>
                  <div className="flex items-center gap-1"><Phone className="w-4 h-4" />{a.phone}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{a.status}</Badge>
                  <Button variant="outline" size="sm" className="gap-1"><Download className="w-4 h-4"/> CV</Button>
                  <Button size="sm" className="gap-1"><UserCheck className="w-4 h-4"/> Mời phỏng vấn</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </RecruiterLayout>
  );
};

export default RecruiterApplications;
