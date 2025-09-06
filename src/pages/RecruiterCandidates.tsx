import React from 'react';
import RecruiterLayout from '@/components/RecruiterLayout';
import CandidatesList from '@/components/CandidatesList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecruiterCandidates: React.FC = () => {
  return (
    <RecruiterLayout title="Ứng viên tiềm năng" subtitle="Danh sách gợi ý ứng viên phù hợp">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gợi ý hôm nay</CardTitle>
        </CardHeader>
        <CardContent>
          <CandidatesList />
        </CardContent>
      </Card>
    </RecruiterLayout>
  );
};

export default RecruiterCandidates;
