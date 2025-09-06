import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

const Profile: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [company, setCompany] = useState(user?.company || '');

  if (!user) return <div className="p-6">Vui lòng đăng nhập.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-1">
              <Label>Tên</Label>
              <Input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            {user.role !== 'user' && (
              <div className="space-y-1">
                <Label>Công ty</Label>
                <Input value={company} onChange={e => setCompany(e.target.value)} />
              </div>
            )}
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="destructive" onClick={logout}>Đăng xuất</Button>
            <Button onClick={() => updateProfile({ name, email, company })}>Lưu</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
