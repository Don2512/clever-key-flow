import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { job: 'Frontend Developer', applications: 18 },
  { job: 'Backend Developer', applications: 24 },
  { job: 'DevOps Engineer', applications: 12 },
  { job: 'UI/UX Designer', applications: 15 },
  { job: 'Product Manager', applications: 9 },
];

const ApplicationsByJobChart: React.FC = () => {
  const max = Math.max(...data.map(d => d.applications));
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Hồ sơ theo vị trí</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((d) => (
            <div key={d.job} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground line-clamp-1 pr-2">{d.job}</span>
                <span className="font-medium">{d.applications}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full"
                  style={{ width: `${(d.applications / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationsByJobChart;
