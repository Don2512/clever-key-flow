import React, { useMemo } from 'react';
import { jobsData, type Job } from '@/data/jobsData';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface HotJobsProps {
  onSelect: (job: Job) => void;
}

function parseFirstSalary(s: string) {
  const nums = (s.match(/\d+/g) || []).map(Number);
  return nums[0] || 0;
}

const HotJobs: React.FC<HotJobsProps> = ({ onSelect }) => {
  const hot = useMemo(() => {
    return [...jobsData]
      .sort((a, b) => parseFirstSalary(b.salary) - parseFirstSalary(a.salary))
      .slice(0, 5);
  }, []);

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">Hot jobs đề xuất</h3>
        <Badge variant="secondary" className="text-[10px]">Top {hot.length}</Badge>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {hot.map((job) => (
          <button
            key={job.id}
            onClick={() => onSelect(job)}
            className="min-w-[200px] text-left rounded-md border bg-card px-3 py-2 hover:bg-accent transition-colors"
          >
            <div className="text-sm font-medium line-clamp-1">{job.title}</div>
            <div className="text-xs text-muted-foreground line-clamp-1">{job.company}</div>
            <div className="text-xs font-medium text-primary">{job.salary}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HotJobs;
