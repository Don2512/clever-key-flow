import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { date: '1/9', views: 45 },
  { date: '2/9', views: 95 },
  { date: '3/9', views: 150 },
  { date: '4/9', views: 190 },
  { date: '5/9', views: 285 },
  { date: '6/9', views: 380 },
];

const ViewsBarChart: React.FC = () => {
  const max = Math.max(...data.map((d) => d.views));
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Lượt xem theo ngày</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-56 grid grid-cols-6 items-end gap-3">
          {data.map((d) => (
            <div key={d.date} className="flex flex-col items-center gap-2">
              <div className="w-full bg-primary/15 rounded-md overflow-hidden flex items-end h-full">
                <div
                  className="w-full bg-primary rounded-md transition-all"
                  style={{ height: `${(d.views / max) * 100}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground text-center">{d.date}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <span className="text-2xl font-bold text-primary">{data[data.length - 1].views}</span>
          <p className="text-sm text-muted-foreground">Tổng lượt xem hôm nay</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewsBarChart;
