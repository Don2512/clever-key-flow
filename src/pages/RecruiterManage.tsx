import React, { useState } from 'react';
import RecruiterLayout from '@/components/RecruiterLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import LocationPicker, { LocationValue } from '@/components/LocationPicker';

const RecruiterManage: React.FC = () => {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState<LocationValue | null>(null);
  return (
    <RecruiterLayout
      title="Quản lý hồ sơ nhà tuyển dụng"
      subtitle="Cập nhật thông tin công ty, liên hệ và thương hiệu"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thông tin công ty</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Tên công ty</Label>
              <Input id="company" placeholder="VD: ABC Technology" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" placeholder="https://abc.vn" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email liên hệ</Label>
              <Input id="email" type="email" placeholder="hr@abc.vn" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" placeholder="0901 234 567" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <div className="flex gap-2">
                <Input id="address" placeholder="Số 1, Đường A, Quận B, TP. Hồ Chí Minh" value={address} onChange={(e) => setAddress(e.target.value)} />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button" variant="secondary">Chọn trên bản đồ</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Chọn địa chỉ trên bản đồ</DialogTitle>
                    </DialogHeader>
                    <LocationPicker
                      value={location}
                      onChange={(val) => {
                        setLocation(val);
                        if (val.address) setAddress(val.address);
                      }}
                      height={460}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">Đóng</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button type="button">Sử dụng địa chỉ này</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              {location && (
                <p className="text-xs text-muted-foreground">Toạ độ: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="about">Giới thiệu</Label>
              <Textarea id="about" rows={6} placeholder="Mô tả ngắn về công ty, văn hoá, sản phẩm..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input id="logo" placeholder="https://.../logo.png" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Hủy</Button>
            <Button>Lưu thay đổi</Button>
          </div>
        </CardContent>
      </Card>
    </RecruiterLayout>
  );
};

export default RecruiterManage;
