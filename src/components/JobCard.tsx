import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, Clock } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  coordinates: [number, number];
  type: string;
  description?: string;
  postedTime?: string;
}

interface JobCardProps {
  job: Job;
  onClick: () => void;
  isSelected?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick, isSelected }) => {
  const getSalaryColor = (salary: string) => {
    const salaryNum = parseInt(salary.replace(/[^\d]/g, ''));
    if (salaryNum >= 25) return 'bg-salary-high text-white';
    if (salaryNum >= 15) return 'bg-salary-medium text-white';
    return 'bg-salary-low text-white';
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary shadow-md' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground line-clamp-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <Building2 className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground line-clamp-1">
                  {job.company}
                </span>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className={`text-xs font-medium ${getSalaryColor(job.salary)}`}
            >
              {job.salary}
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground line-clamp-1">
              {job.location}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {job.type}
            </Badge>
            {job.postedTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {job.postedTime}
                </span>
              </div>
            )}
          </div>

          {job.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {job.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;