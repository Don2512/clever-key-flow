import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, User } from 'lucide-react';
import { useState } from 'react';
import LoginDialog from '@/components/LoginDialog';
import { useAuth } from '@/lib/auth';

interface SearchHeaderProps {
  jobSearch: string;
  locationSearch: string;
  onJobSearchChange: (value: string) => void;
  onLocationSearchChange: (value: string) => void;
  onSearch: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  jobSearch,
  locationSearch,
  onJobSearchChange,
  onLocationSearchChange,
  onSearch
}) => {
  return (
    <header className="bg-background border-b border-border">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Tìm Việc Làm</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">18 việc làm</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => window.location.href = '/recruiter'}
            >
              <User className="w-4 h-4" />
              Nhà tuyển dụng
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên công việc hoặc mô tả..."
              value={jobSearch}
              onChange={(e) => onJobSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-64 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Địa điểm (quận, thành phố)..."
              value={locationSearch}
              onChange={(e) => onLocationSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            onClick={onSearch}
            className="px-6 hover:bg-primary-hover"
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SearchHeader;
