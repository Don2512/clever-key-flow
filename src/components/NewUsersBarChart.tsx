import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend,
  Line,
} from 'recharts';

const newUsersData = [
  { month: '1/2025', users: 100, posts: 30 },
  { month: '2/2025', users: 150, posts: 50 },
  { month: '3/2025', users: 180, posts: 65 },
  { month: '4/2025', users: 120, posts: 45 },
  { month: '5/2025', users: 200, posts: 80 },
  { month: '6/2025', users: 180, posts: 70 },
  { month: '7/2025', users: 240, posts: 95 },
  { month: '8/2025', users: 310, posts: 130 },
  { month: '9/2025', users: 400, posts: 160 },
  { month: '10/2025', users: 380, posts: 150 },
  { month: '11/2025', users: 420, posts: 170 },
  { month: '12/2025', users: 500, posts: 200 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const usersData = payload.find((p: any) => p.dataKey === 'users');
    const postsData = payload.find((p: any) => p.dataKey === 'posts');
    return (
      <div className="bg-white dark:bg-neutral-900 p-2 rounded-lg shadow text-sm border">
        {usersData && (
          <p className="font-medium text-primary">{usersData.value} người dùng</p>
        )}
        {postsData && <p className="text-blue-500">{postsData.value} bài đăng</p>}
        <p className="text-muted-foreground">{payload[0].payload.month}</p>
      </div>
    );
  }
  return null;
};

const NewUsersBarChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Người dùng mới & Bài đăng mới (12 tháng)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={newUsersData}
              margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />

              {/* Trục trái cho users */}
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              {/* Trục phải cho posts */}
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />

              <Tooltip content={<CustomTooltip />} />
              <Legend />

              {/* Bar cho Users */}
              <Bar
                yAxisId="left"
                dataKey="users"
                name="Người dùng mới"
                fill="url(#colorUsers)"
                radius={[6, 6, 0, 0]}
                barSize={28}
              >
                <LabelList dataKey="users" position="top" className="text-[10px]" />
              </Bar>

              {/* Line cho Posts */}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="posts"
                name="Bài đăng mới"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#3b82f6" }}
                activeDot={{ r: 6 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewUsersBarChart;
