import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building2, DollarSign, MapPin, Clock, Sparkles, Briefcase } from 'lucide-react';

interface PostJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PostJobDialog: React.FC<PostJobDialogProps> = ({ open, onOpenChange }) => {
  const [apiKey, setApiKey] = useState<string>('');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('openai_api_key');
      if (saved) setApiKey(saved);
    } catch {}
  }, []);
  const saveKey = (v: string) => {
    setApiKey(v);
    try { localStorage.setItem('openai_api_key', v); } catch {}
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Đăng tin tuyển dụng mới</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="manual">
          <TabsList className="w-full">
            <TabsTrigger value="manual" className="w-1/2">Điền thủ công</TabsTrigger>
            <TabsTrigger value="ai" className="w-1/2">AI Parse Job Text</TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2"><Briefcase className="w-4 h-4"/> Tên công việc *</Label>
                <Input id="title" placeholder="VD: Frontend Developer React" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2"><Building2 className="w-4 h-4"/> Tên công ty *</Label>
                <Input id="company" placeholder="VD: FPT Software" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2"><MapPin className="w-4 h-4"/> Địa điểm *</Label>
                <Input id="location" placeholder="VD: Quận 7, TP. Hồ Chí Minh" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary" className="flex items-center gap-2"><DollarSign className="w-4 h-4"/> Mức lương *</Label>
                  <Input id="salary" placeholder="VD: 15-25 triệu" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Clock className="w-4 h-4"/> Loại hình</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại hình" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Toàn thời gian</SelectItem>
                      <SelectItem value="part">Bán thời gian</SelectItem>
                      <SelectItem value="contract">Hợp đồng</SelectItem>
                      <SelectItem value="intern">Thực tập</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Mô tả công việc</Label>
                <Textarea id="desc" placeholder="Mô tả chi tiết về công việc, yêu cầu, quyền lợi..." rows={6} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button className="gap-2"><Building2 className="w-4 h-4"/> Đăng tin tuyển dụng</Button>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div className="space-y-2">
              <Label>OpenAI API Key</Label>
              <Input value={apiKey} onChange={(e) => saveKey(e.target.value)} placeholder="sk-..." />
              <p className="text-xs text-muted-foreground">API key sẽ được lưu trong localStorage để sử dụng sau</p>
            </div>
            <div className="space-y-2">
              <Label>Job Text từ nguồn khác</Label>
              <Textarea rows={10} placeholder="Copy & paste job description từ website khác vào đây..." />
            </div>
            <Button variant="secondary" className="w-full gap-2" disabled>
              <Sparkles className="w-4 h-4"/> Phân tích với AI
            </Button>
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="font-medium">Cách sử dụng:</div>
              <ol className="list-decimal ml-5 space-y-1">
                <li>Nhập OpenAI API key (một lần duy nhất)</li>
                <li>Copy job description từ website khác</li>
                <li>Paste vào ô "Job Text từ nguồn khác"</li>
                <li>Click "Phân tích với AI"</li>
                <li>AI sẽ tự động điền thông tin vào form bên tab "Điền thủ công"</li>
              </ol>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>Hủy</Button>
              <Button className="gap-2"><Building2 className="w-4 h-4"/> Đăng tin tuyển dụng</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PostJobDialog;
