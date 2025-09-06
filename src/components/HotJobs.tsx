import React, { useEffect, useMemo, useRef, useState } from 'react';
import { jobsData, type Job } from '@/data/jobsData';
import { Badge } from '@/components/ui/badge';
import useEmblaCarousel from 'embla-carousel-react';

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
      .slice(0, 8);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: true });
  const dirRef = useRef<1 | -1>(1);
  const pauseRef = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => {
      if (pauseRef.current) return;
      const last = emblaApi.scrollSnapList().length - 1;
      const cur = emblaApi.selectedScrollSnap();
      if (cur === last) dirRef.current = -1;
      if (cur === 0) dirRef.current = 1;
      dirRef.current === 1 ? emblaApi.scrollNext() : emblaApi.scrollPrev();
    }, 1800);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          Job Recommend Hot
          <Badge className="bg-red-600 text-white animate-pulse">HOT</Badge>
        </h3>
        <Badge variant="secondary" className="text-[10px]">Top {hot.length}</Badge>
      </div>

      <div
        className="overflow-hidden rounded-md border border-red-200/60 bg-gradient-to-r from-red-50/60 to-transparent dark:from-red-900/20"
        onMouseEnter={() => (pauseRef.current = true)}
        onMouseLeave={() => (pauseRef.current = false)}
      >
        <div className="px-2" ref={emblaRef}>
          <div className="flex gap-2 py-2">
            {hot.map((job) => (
              <button
                key={job.id}
                onClick={() => onSelect(job)}
                className="min-w-[220px] flex-[0_0_auto] text-left rounded-md border bg-card px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ring-1 ring-transparent hover:ring-red-400"
              >
                <div className="text-sm font-semibold line-clamp-1">{job.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{job.company}</div>
                <div className="text-xs font-bold text-red-600">{job.salary}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotJobs;
