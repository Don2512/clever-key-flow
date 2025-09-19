import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
  { key: 'views', label: 'Lượt xem', value: 1200, color: 'bg-blue-600' },
  { key: 'applies', label: 'Ứng tuyển', value: 240, color: 'bg-primary' },
  { key: 'interviews', label: 'Phỏng vấn', value: 72, color: 'bg-amber-500' },
  { key: 'offers', label: 'Offer', value: 18, color: 'bg-emerald-600' },
  { key: 'hires', label: 'Nhận việc', value: 10, color: 'bg-green-600' },
];

const ConversionFunnel: React.FC = () => {
  const max = useMemo(() => Math.max(...steps.map(s => s.value)), []);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tỉ lệ chuyển đổi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((s, i) => {
            const prev = i === 0 ? s.value : steps[i - 1].value;
            const rate = prev ? Math.round((s.value / prev) * 100) : 0;
            return (
              <div key={s.key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium">{s.value} • {rate}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: `${(s.value / max) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionFunnel;
