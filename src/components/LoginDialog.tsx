import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, Role } from '@/lib/auth';

const LoginDialog: React.FC<{ open: boolean; onOpenChange: (v: boolean) => void; defaultRole?: Role }>
= ({ open, onOpenChange, defaultRole = 'user' }) => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>(defaultRole);
  const [company, setCompany] = useState('');

  const doLogin = () => {
    if (!name || !email) return;
    login({ name, email, role, company: role !== 'user' ? company : undefined });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Đăng nhập (chọn vai trò)</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label>Tên</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="VD: Nguyễn Văn A" />
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="space-y-1">
            <Label>Vai trò</Label>
            <Select value={role} onValueChange={v => setRole(v as Role)}>
              <SelectTrigger><SelectValue placeholder="Chọn vai trò" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="recruiter">Nhà tuyển dụng</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {role !== 'user' && (
            <div className="space-y-1">
              <Label>Công ty</Label>
              <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="VD: ABC Tech" />
            </div>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Hủy</Button>
            <Button onClick={doLogin}>Đăng nhập</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
