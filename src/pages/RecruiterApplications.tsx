import React from 'react';
import RecruiterLayout from '@/components/RecruiterLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, UserCheck, Download } from 'lucide-react';

interface Application {
  id: string;
  name: string;
  job: string;
  email: string;
  phone: string;
  status: string;
  interviewAt?: string; // ISO
}

const initialApplications: Application[] = [
  { id: 'a1', name: 'Nguyễn Văn A', job: 'Frontend Developer', email: 'vana@example.com', phone: '0901 234 567', status: 'Mới' },
  { id: 'a2', name: 'Trần Thị B', job: 'Backend Developer', email: 'thib@example.com', phone: '0902 345 678', status: 'Đang xem' },
  { id: 'a3', name: 'Lê C', job: 'UI/UX Designer', email: 'lec@example.com', phone: '0903 456 789', status: 'Phỏng vấn' },
];

const STORAGE_KEY = 'recruiter_interviews';

interface InterviewPayload {
  id: string;
  candidate: string;
  job: string;
  email?: string;
  phone?: string;
  datetime: string; // ISO
  method: 'Online' | 'Tại văn phòng';
  location?: string;
  notes?: string;
  status: 'Đã lên lịch' | 'Hoàn thành' | 'Huỷ';
}

function appendInterview(item: InterviewPayload) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? (JSON.parse(raw) as InterviewPayload[]) : [];
    arr.unshift(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch {}
}

const RecruiterApplications: React.FC = () => {
  const { toast } = useToast();
  const [apps, setApps] = React.useState<Application[]>(initialApplications);
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState<string>('09:00');
  const [method, setMethod] = React.useState<'Online' | 'Tại văn phòng'>('Online');
  const [location, setLocation] = React.useState<string>('');
  const [notes, setNotes] = React.useState<string>('');

  const onSchedule = (a: Application) => {
    setOpenId(a.id);
    setDate(new Date());
    setTime('09:00');
    setMethod('Online');
    setLocation('');
    setNotes('');
  };

  const save = (a: Application) => {
    if (!date || !time) return;
    const [hh, mm] = time.split(':');
    const dt = new Date(date);
    dt.setHours(parseInt(hh || '0', 10));
    dt.setMinutes(parseInt(mm || '0', 10));
    const iso = dt.toISOString();

    const interview: InterviewPayload = {
      id: `${Date.now()}_${a.id}`,
      candidate: a.name,
      job: a.job,
      email: a.email,
      phone: a.phone,
      datetime: iso,
      method,
      location,
      notes,
      status: 'Đã lên lịch',
    };
    appendInterview(interview);

    setApps((prev) => prev.map((x) => (x.id === a.id ? { ...x, status: 'Phỏng vấn', interviewAt: iso } : x)));
    toast({ title: 'Đã lên lịch phỏng vấn', description: `${a.name} • ${a.job} • ${dt.toLocaleString('vi-VN')}` });
    setOpenId(null);
  };

  return (
    <RecruiterLayout title="Hồ sơ nhận được" subtitle="Danh sách CV đã ứng tuyển">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hồ sơ mới</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apps.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-4 border rounded-md p-3 bg-card">
                <div>
                  <div className="font-medium">{a.name}</div>
                  <div className="text-sm text-muted-foreground">Ứng tuyển: {a.job}</div>
                  {a.interviewAt && (
                    <div className="text-xs text-muted-foreground mt-1">Hẹn: {new Date(a.interviewAt).toLocaleString('vi-VN')}</div>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1"><Mail className="w-4 h-4" />{a.email}</div>
                  <div className="flex items-center gap-1"><Phone className="w-4 h-4" />{a.phone}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{a.status}</Badge>
                  <Button variant="outline" size="sm" className="gap-1"><Download className="w-4 h-4"/> CV</Button>
                  <Dialog open={openId === a.id} onOpenChange={(v) => !v && setOpenId(null)}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1" onClick={() => onSchedule(a)}><UserCheck className="w-4 h-4"/> Mời phỏng vấn</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                      <DialogHeader>
                        <DialogTitle>Lên lịch phỏng vấn cho {a.name}</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-1">
                          <Label>Chọn ngày</Label>
                          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                        </div>
                        <div className="space-y-3 md:col-span-1">
                          <div className="space-y-2">
                            <Label htmlFor="time">Giờ</Label>
                            <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Hình thức</Label>
                            <Select value={method} onValueChange={(v) => setMethod(v as any)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn hình thức" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Online">Online</SelectItem>
                                <SelectItem value="Tại văn phòng">Tại văn phòng</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Địa điểm/Link</Label>
                            <Input id="location" placeholder="Link meeting hoặc địa chỉ" value={location} onChange={(e) => setLocation(e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notes">Ghi chú</Label>
                            <Textarea id="notes" rows={4} placeholder="Ghi chú cho buổi phỏng vấn" value={notes} onChange={(e) => setNotes(e.target.value)} />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Huỷ</Button>
                        </DialogClose>
                        <Button onClick={() => save(a)}>Lưu lịch</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
