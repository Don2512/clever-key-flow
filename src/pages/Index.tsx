import React, { useState, useMemo } from 'react';
import SearchHeader from '@/components/SearchHeader';
import JobMap from '@/components/JobMap';
import JobCard from '@/components/JobCard';
import HotJobs from '@/components/HotJobs';
import JobDetailsDialog from '@/components/JobDetailsDialog';
import PostJobDialog from '@/components/PostJobDialog';
import { jobsData, Job } from '@/data/jobsData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ChatbotWidget from '@/components/ChatbotWidget';

const Index = () => {
  const [jobSearch, setJobSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [open, setOpen] = useState(false);
  const [types, setTypes] = useState<string[]>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [openCreate, setOpenCreate] = useState(false);

  const getCategory = (j: Job) => {
    const t = `${j.title} ${j.description ?? ''}`.toLowerCase();
    if (/(frontend|backend|fullstack|react|node|developer|engineer)/.test(t)) return 'IT';
    if (/(ui|ux|designer|design)/.test(t)) return 'Design';
    if (/product/.test(t)) return 'Product';
    if (/(data|analyst|analytics)/.test(t)) return 'Data';
    if (/security/.test(t)) return 'Security';
    if (/devops/.test(t)) return 'DevOps';
    if (/marketing/.test(t)) return 'Marketing';
    if (/sales/.test(t)) return 'Sales';
    if (/hr/.test(t)) return 'HR';
    return 'Other';
  };

  const allTypes = useMemo(() => Array.from(new Set(jobsData.map(j => j.type))), []);
  const allCats = useMemo(() => Array.from(new Set(jobsData.map(getCategory))), []);

  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      const matchesJob = jobSearch === '' ||
        job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
        job.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
        job.description?.toLowerCase().includes(jobSearch.toLowerCase());

      const matchesLocation = locationSearch === '' ||
        job.location.toLowerCase().includes(locationSearch.toLowerCase());

      const matchesType = types.length === 0 || types.includes(job.type);
      const cat = getCategory(job);
      const matchesCat = cats.length === 0 || cats.includes(cat);

      return matchesJob && matchesLocation && matchesType && matchesCat;
    });
  }, [jobSearch, locationSearch, types, cats]);

  const handleJobSelect = (job: Job) => {
    setSelectedJobId(job.id);
    setSelectedJob(job);
    setOpen(true);
  };

  const handleSearch = () => {
    console.log('Searching for:', { jobSearch, locationSearch });
  };

  const handleJobFocus = (job: Job) => {
    setSelectedJobId(job.id);
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
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <h2 className="font-semibold text-foreground">Tìm thấy {filteredJobs.length} việc làm</h2>
                <p className="text-sm text-muted-foreground">Nhập vào công việc để xem trên bản đồ</p>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">Loại hình</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Chọn loại hình</DropdownMenuLabel>
                    {allTypes.map(t => (
                      <DropdownMenuCheckboxItem
                        key={t}
                        checked={types.includes(t)}
                        onCheckedChange={(v) => setTypes(prev => v ? [...prev, t] : prev.filter(x => x !== t))}
                      >
                        {t}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">Danh mục</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Chọn danh mục</DropdownMenuLabel>
                    {allCats.map(c => (
                      <DropdownMenuCheckboxItem
                        key={c}
                        checked={cats.includes(c)}
                        onCheckedChange={(v) => setCats(prev => v ? [...prev, c] : prev.filter(x => x !== c))}
                      >
                        {c}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="p-4 space-y-3">
              <HotJobs onSelect={handleJobSelect} />
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
              <div className="h-16" />
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

      <JobDetailsDialog job={selectedJob} open={open} onOpenChange={setOpen} />
      <PostJobDialog open={openCreate} onOpenChange={setOpenCreate} />
      <ChatbotWidget onPick={handleJobFocus} />

      <Button onClick={() => setOpenCreate(true)} className="fixed bottom-6 right-6 rounded-full h-12 w-12 p-0 shadow-lg" aria-label="Tạo tin tuyển dụng">
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Index;
