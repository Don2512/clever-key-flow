import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { jobsData } from '@/data/jobsData';

const AdminPosts: React.FC = () => {
  return (
    <AdminLayout title="Quản lý bài đăng">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Danh sách bài đăng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Công ty</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Lương</TableHead>
                <TableHead>Loại hình</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobsData.map(j => (
                <TableRow key={j.id}>
                  <TableCell>{j.id}</TableCell>
                  <TableCell>{j.title}</TableCell>
                  <TableCell>{j.company}</TableCell>
                  <TableCell>{j.location}</TableCell>
                  <TableCell>{j.salary}</TableCell>
                  <TableCell>{j.type}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Ẩn</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminPosts;
