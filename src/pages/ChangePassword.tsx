import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const ChangePassword: React.FC = () => {
  const { user, changePassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  if (!user) return <div className="p-6">Vui lòng đăng nhập.</div>;

  const submit = async () => {
    if (newPw !== confirmPw) {
      toast({ title: 'Lỗi', description: 'Mật khẩu nhập lại không khớp.' });
      return;
    }
    try {
      await changePassword(currentPw, newPw);
      toast({ title: 'Thành công', description: 'Đổi mật khẩu thành công.' });
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
    } catch (e: any) {
      toast({ title: 'Không thể đổi mật khẩu', description: e?.message || 'Vui lòng thử lại.' });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Đổi mật khẩu</h1>
        <p className="text-muted-foreground">Cập nhật mật khẩu tài khoản của bạn.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin mật khẩu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Mật khẩu hiện tại</Label>
            <Input type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder={user.passwordHash ? 'Nhập mật khẩu hiện tại' : 'Chưa đặt mật khẩu trước đó'} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Mật khẩu mới</Label>
              <Input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Nhập lại mật khẩu mới</Label>
              <Input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={() => navigate('/profile')}>Quay lại hồ sơ</Button>
            <Button onClick={submit}>Cập nhật mật khẩu</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
