import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth, UserLink } from '@/lib/auth';
import { User, FileText, Clock, CheckCircle, XCircle, Calendar, Briefcase, TrendingUp } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateProfile, logout, changePassword } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [links, setLinks] = useState<UserLink[]>(user?.links && user.links.length ? user.links : [{ label: '', url: '' }]);
  const [isOpen, setIsOpen] = useState(false);

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

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

  if (!user) return <div className="p-6">Vui lòng đăng nhập.</div>;

  const handleSave = () => {
    const cleaned = links.filter(l => l.label || l.url);
    updateProfile({ name, email, bio, links: cleaned });
    toast({ title: 'Đã lưu thay đổi', description: 'Thông tin cá nhân đã được cập nhật.' });
  };

  const handleAddLink = () => setLinks((prev) => [...prev, { label: '', url: '' }]);
  const handleRemoveLink = (idx: number) => setLinks((prev) => prev.filter((_, i) => i !== idx));
  const handleUpdateLink = (idx: number, patch: Partial<UserLink>) => setLinks((prev) => prev.map((l, i) => (i === idx ? { ...l, ...patch } : l)));

  const handleChangePassword = async () => {
    if (newPw !== confirmPw) {
      toast({ title: 'Lỗi', description: 'Mật khẩu nhập lại không khớp.' });
      return;
    }
    try {
      await changePassword(currentPw, newPw);
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
      toast({ title: 'Thành công', description: 'Đổi mật khẩu thành công.' });
    } catch (e: any) {
      toast({ title: 'Không thể đổi mật khẩu', description: e?.message || 'Vui lòng thử lại.' });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Hồ sơ cá nhân
        </h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              <User className="w-4 h-4 mr-2" />
              Xem thông tin chi tiết
            </Button>
          </DialogTrigger>
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
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Mô t��</Label>
                      <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Giới thiệu ngắn về bản thân, kỹ năng, mục tiêu..." />
                    </div>

                    <div className="space-y-2">
                      <Label>Liên kết khác</Label>
                      <div className="space-y-2">
                        {links.map((link, idx) => (
                          <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-2">
                            <Input placeholder="Nhãn (VD: LinkedIn)" value={link.label} onChange={(e) => handleUpdateLink(idx, { label: e.target.value })} className="md:col-span-2" />
                            <Input placeholder="URL (https://...)" value={link.url} onChange={(e) => handleUpdateLink(idx, { url: e.target.value })} className="md:col-span-3" />
                            <div className="md:col-span-5 flex justify-end">
                              <Button variant="ghost" size="sm" onClick={() => handleRemoveLink(idx)}>Xóa</Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={handleAddLink}>Thêm liên kết</Button>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button variant="destructive" onClick={logout}>
                        Đăng xuất
                      </Button>
                      <Button onClick={handleSave}>
                        Lưu thay đổi
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Đổi mật khẩu</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label>Mật khẩu hiện tại</Label>
                        <Input type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder={user.passwordHash ? 'Nhập mật khẩu hiện tại' : 'Chưa đặt mật khẩu'} />
                      </div>
                      <div className="space-y-1">
                        <Label>Mật khẩu mới</Label>
                        <Input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <Label>Nhập lại mật khẩu mới</Label>
                        <Input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleChangePassword}>Cập nhật mật khẩu</Button>
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
      </div>

      {/* Quick stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">CV đã gửi</p>
                <p className="text-2xl font-bold text-blue-900">{mockApplications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-900">Phỏng vấn</p>
                <p className="text-2xl font-bold text-purple-900">{statusCounts.interview || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-900">Được nhận</p>
                <p className="text-2xl font-bold text-green-900">{statusCounts.accepted || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-900">Đang chờ</p>
                <p className="text-2xl font-bold text-yellow-900">{statusCounts.pending || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent applications preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            CV gần đây
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockApplications.slice(0, 3).map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <div>
                  <h3 className="font-medium">{app.position}</h3>
                  <p className="text-sm text-muted-foreground">{app.company}</p>
                </div>
                <Badge className={`${getStatusColor(app.status)} flex items-center gap-1`}>
                  {getStatusIcon(app.status)}
                  {getStatusText(app.status)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
