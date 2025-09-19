import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth';
import { User, FileText, Clock, CheckCircle, XCircle, Calendar, Briefcase, TrendingUp } from 'lucide-react';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ open, onOpenChange }) => {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [company, setCompany] = useState(user?.company || '');

  // Mock data for CV applications and interview status
  const mockApplications = [
    { id: 1, company: 'Công ty ABC', position: 'Frontend Developer', status: 'pending', appliedDate: '2024-01-15', interviewDate: null },
    { id: 2, company: 'Tech Corp', position: 'React Developer', status: 'interview', appliedDate: '2024-01-10', interviewDate: '2024-01-20' },
    { id: 3, company: 'Digital Solutions', position: 'Full Stack Developer', status: 'rejected', appliedDate: '2024-01-08', interviewDate: null },
    { id: 4, company: 'Innovation Hub', position: 'Senior Developer', status: 'accepted', appliedDate: '2024-01-05', interviewDate: '2024-01-18' },
    { id: 5, company: 'StartUp XYZ', position: 'JavaScript Developer', status: 'reviewing', appliedDate: '2024-01-12', interviewDate: null },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reviewing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'interview': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'reviewing': return <FileText className="w-4 h-4" />;
      case 'interview': return <Calendar className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Đang chờ';
      case 'reviewing': return 'Đang xem xét';
      case 'interview': return 'Phỏng vấn';
      case 'accepted': return 'Được nhận';
      case 'rejected': return 'Từ chối';
      default: return status;
    }
  };

  const statusCounts = mockApplications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <User className="w-5 h-5" />
            Thông tin cá nhân & Thống kê CV
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value="applications">CV đã gửi</TabsTrigger>
            <TabsTrigger value="statistics">Thống kê</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Thông tin cá nhân
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên</Label>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  {user.role !== 'user' && (
                    <div className="space-y-2">
                      <Label htmlFor="company">Công ty</Label>
                      <Input id="company" value={company} onChange={e => setCompany(e.target.value)} />
                    </div>
                  )}
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="destructive" onClick={logout}>
                    Đăng xuất
                  </Button>
                  <Button onClick={() => updateProfile({ name, email, company })}>
                    Lưu thay đổi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Danh sách CV đã gửi ({mockApplications.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockApplications.map((app) => (
                    <div key={app.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{app.position}</h3>
                          <p className="text-muted-foreground">{app.company}</p>
                          <p className="text-sm text-muted-foreground">
                            Nộp ngày: {new Date(app.appliedDate).toLocaleDateString('vi-VN')}
                            {app.interviewDate && (
                              <span className="ml-4">
                                Phỏng vấn: {new Date(app.interviewDate).toLocaleDateString('vi-VN')}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(app.status)} flex items-center gap-1`}>
                            {getStatusIcon(app.status)}
                            {getStatusText(app.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng CV đã gửi</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockApplications.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 so với tháng trước
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Phỏng vấn</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{statusCounts.interview || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Đang chờ phỏng vấn
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tỷ lệ thành công</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(((statusCounts.accepted || 0) / mockApplications.length) * 100)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {statusCounts.accepted || 0} được nhận
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Phân bố trạng thái CV</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <div key={status} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status)}
                        <span>{getStatusText(status)}</span>
                      </div>
                      <span>{count} CV</span>
                    </div>
                    <Progress 
                      value={(count / mockApplications.length) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;