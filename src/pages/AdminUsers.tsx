import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const users = [
  { id: 'u1', name: 'Nguyễn Văn A', email: 'vana@example.com', role: 'user' },
  { id: 'u2', name: 'Trần Thị B', email: 'thib@example.com', role: 'recruiter' },
  { id: 'u3', name: 'Admin', email: 'admin@example.com', role: 'admin' },
];

const AdminUsers: React.FC = () => {
  return (
    <AdminLayout title="Quản lý user">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Danh sách người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(u => (
                <TableRow key={u.id}>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Sửa</Button>
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

export default AdminUsers;
