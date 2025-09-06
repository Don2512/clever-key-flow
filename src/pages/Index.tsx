import React, { useState, useMemo } from 'react';
import SearchHeader from '@/components/SearchHeader';
import JobMap from '@/components/JobMap';
import JobCard from '@/components/JobCard';
import { jobsData, Job } from '@/data/jobsData';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [jobSearch, setJobSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>();

  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      const matchesJob = jobSearch === '' || 
        job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
        job.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
        job.description?.toLowerCase().includes(jobSearch.toLowerCase());
      
      const matchesLocation = locationSearch === '' ||
        job.location.toLowerCase().includes(locationSearch.toLowerCase());
      
      return matchesJob && matchesLocation;
    });
  }, [jobSearch, locationSearch]);

  const handleJobSelect = (job: Job) => {
    setSelectedJobId(job.id);
  };

  const handleSearch = () => {
    // Search is performed automatically via filteredJobs
    console.log('Searching for:', { jobSearch, locationSearch });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchHeader
        jobSearch={jobSearch}
        locationSearch={locationSearch}
        onJobSearchChange={setJobSearch}
        onLocationSearchChange={setLocationSearch}
        onSearch={handleSearch}
      />
      
      <div className="flex-1 flex">
        {/* Jobs Sidebar */}
        <div className="w-96 border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-foreground">
              Tìm thấy {filteredJobs.length} việc làm
            </h2>
            <p className="text-sm text-muted-foreground">
              Nhập vào công việc để xem trên bản đồ
            </p>
          </div>
          
          <ScrollArea className="h-[calc(100vh-140px)]">
            <div className="p-4 space-y-3">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => handleJobSelect(job)}
                  isSelected={selectedJobId === job.id}
                />
              ))}
              {filteredJobs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Không tìm thấy việc làm phù hợp
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Map */}
        <div className="flex-1">
          <JobMap
            jobs={filteredJobs}
            onJobSelect={handleJobSelect}
            selectedJobId={selectedJobId}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
