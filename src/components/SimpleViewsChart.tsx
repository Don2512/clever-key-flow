import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const simpleViewsData = [
  { date: '1/9', views: 45 },
  { date: '2/9', views: 95 },
  { date: '3/9', views: 150 },
  { date: '4/9', views: 190 },
  { date: '5/9', views: 285 },
  { date: '6/9', views: 380 }
];

const SimpleViewsChart: React.FC = () => {
  const maxViews = Math.max(...simpleViewsData.map(d => d.views));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Lượt xem theo ngày (tháng này)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {simpleViewsData.map((item, index) => {
            const percentage = (item.views / maxViews) * 100;
            return (
              <div key={item.date} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground w-12">{item.date}</span>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium w-12 text-right">{item.views}</span>
              </div>
            );
          })}
          <div className="pt-4 border-t border-border">
            <div className="text-center">
              <span className="text-2xl font-bold text-primary">380</span>
              <p className="text-sm text-muted-foreground">Tổng lượt xem hôm nay</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleViewsChart;