import React, { useEffect, useMemo, useState } from 'react';
import RecruiterLayout from '@/components/RecruiterLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, CheckCircle2, XCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format, isSameDay, parseISO } from 'date-fns';
import vi from 'date-fns/locale/vi';

interface Interview {
  id: string;
  candidate: string;
  job: string;
  email?: string;
  phone?: string;
  datetime: string; // ISO
  method: 'Online' | 'Tại văn phòng';
  location?: string; // address or meeting link
  notes?: string;
  status: 'Đã lên lịch' | 'Hoàn thành' | 'Huỷ';
}

const STORAGE_KEY = 'recruiter_interviews';

function loadInterviews(): Interview[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as Interview[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveInterviews(items: Interview[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const RecruiterInterviews: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [items, setItems] = useState<Interview[]>([]);

  useEffect(() => {
    setItems(loadInterviews());
  }, []);

  const byDay = useMemo(() => {
    if (!date) return [];
    return items.filter((it) => isSameDay(parseISO(it.datetime), date));
  }, [items, date]);

  const mark = (id: string, status: Interview['status']) => {
    const next = items.map((it) => (it.id === id ? { ...it, status } : it));
    setItems(next);
    saveInterviews(next);
  };

  const headerRight = (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <CalendarIcon className="w-4 h-4" />
      <span>{date ? format(date, "EEEE, dd/MM/yyyy", { locale: vi }) : 'Chọn ngày'}</span>
    </div>
  );

  return (
    <RecruiterLayout title="Lịch phỏng vấn" subtitle="Xem và quản lý lịch phỏng vấn" rightActions={headerRight}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Chọn ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" locale={vi as any} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Cuộc hẹn trong ngày</CardTitle>
          </CardHeader>
          <CardContent>
            {byDay.length === 0 ? (
              <div className="text-sm text-muted-foreground">Không có lịch cho ngày này.</div>
            ) : (
              <div className="space-y-3">
                {byDay.map((it) => (
                  <div key={it.id} className="flex items-center justify-between gap-4 border rounded-md p-3 bg-card">
                    <div>
                      <div className="font-medium">{it.candidate} • {it.job}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(parseISO(it.datetime), 'HH:mm')} • {it.method} {it.location ? `• ${it.location}` : ''}
                      </div>
                      {it.notes && <div className="text-xs text-muted-foreground mt-1">Ghi chú: {it.notes}</div>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded bg-muted">{it.status}</span>
                      <Button size="sm" variant="outline" className="gap-1" onClick={() => mark(it.id, 'Hoàn thành')}>
                        <CheckCircle2 className="w-4 h-4" /> Hoàn thành
                      </Button>
                      <Button size="sm" variant="destructive" className="gap-1" onClick={() => mark(it.id, 'Huỷ')}>
                        <XCircle className="w-4 h-4" /> Huỷ
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterInterviews;
