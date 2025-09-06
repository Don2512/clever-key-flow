import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Building2, DollarSign, Clock, Share2, Bookmark, X, Send } from 'lucide-react';
import type { Job } from '@/data/jobsData';

interface JobDetailsDialogProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InfoPill: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-lg border bg-card p-3">
    <div className="mt-0.5 text-muted-foreground">{icon}</div>
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium text-foreground">{value}</div>
    </div>
  </div>
);

const JobDetailsDialog: React.FC<JobDetailsDialogProps> = ({ job, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        {job && (
          <div className="space-y-5">
            <DialogHeader>
              <DialogTitle className="text-2xl">{job.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-base">
                <Building2 className="w-4 h-4" />
                <span>{job.company}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <InfoPill icon={<MapPin className="w-4 h-4" />} label="Địa điểm" value={job.location} />
              <InfoPill icon={<DollarSign className="w-4 h-4" />} label="Lương" value={job.salary} />
              <InfoPill icon={<Clock className="w-4 h-4" />} label="Hình thức" value={job.type} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="px-2">Mô tả công việc</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {job.description || 'Chưa có mô tả chi tiết cho công việc này.'}
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{job.postedTime || 'Vừa đăng'}</span>
              </div>
              <span className="text-xs">ID: {job.id}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 justify-end">
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="w-4 h-4" /> Lưu
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" /> Chia sẻ
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => onOpenChange(false)}>
                <X className="w-4 h-4" /> Đóng
              </Button>
              <Button size="sm" className="gap-2">
                <Send className="w-4 h-4" /> Ứng tuyển ngay
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
