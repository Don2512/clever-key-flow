import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const companies = [
  { id: 'c1', name: 'FPT Software', website: 'https://fptsoftware.com', size: '1000+' },
  { id: 'c2', name: 'VNG Corporation', website: 'https://vng.com.vn', size: '2000+' },
  { id: 'c3', name: 'Tiki', website: 'https://tiki.vn', size: '500+' },
];

const AdminCompanies: React.FC = () => {
  return (
    <AdminLayout title="Quản lý công ty">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Danh sách công ty</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Quy mô</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.website}</TableCell>
                  <TableCell>{c.size}</TableCell>
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

export default AdminCompanies;
