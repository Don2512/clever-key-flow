import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Eye, Calendar, MapPin } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  position: string;
  appliedDate: string;
  location: string;
  status: 'new' | 'reviewed' | 'interviewed';
}

const candidatesData: Candidate[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    position: 'Frontend Developer React',
    appliedDate: '9/6/2025, 11:11:29 AM',
    location: 'TP.HCM',
    status: 'new'
  },
  {
    id: '2',
    name: 'Trần Thị B',
    position: 'UI/UX Designer',
    appliedDate: '9/5/2025, 11:11:29 AM',
    location: 'TP.HCM',
    status: 'reviewed'
  },
  {
    id: '3',
    name: 'Lê Văn C',
    position: 'Data Analyst',
    appliedDate: '9/4/2025, 11:11:29 AM',
    location: 'Hà Nội',
    status: 'new'
  },
  {
    id: '4',
    name: 'Phạm Minh D',
    position: 'Frontend Developer',
    appliedDate: '9/3/2025, 11:11:29 AM',
    location: 'TP.HCM',
    status: 'interviewed'
  },
  {
    id: '5',
    name: 'Đỗ Thảo',
    position: 'Backend Developer',
    appliedDate: '9/2/2025, 11:11:29 AM',
    location: 'Đà Nẵng',
    status: 'new'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'bg-blue-500 text-white';
    case 'reviewed': return 'bg-yellow-500 text-white';
    case 'interviewed': return 'bg-green-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'new': return 'Mới';
    case 'reviewed': return 'Đã xem';
    case 'interviewed': return 'Phỏng vấn';
    default: return status;
  }
};

const CandidatesList: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Các hồ sơ mới</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {candidatesData.map((candidate) => (
            <div key={candidate.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground">{candidate.name}</h3>
                  <p className="text-sm text-muted-foreground">{candidate.position}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {candidate.appliedDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {candidate.location}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className={`text-xs ${getStatusColor(candidate.status)}`}>
                  {getStatusText(candidate.status)}
                </Badge>
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  Xem CV
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidatesList;