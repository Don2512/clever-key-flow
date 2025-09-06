import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { MessageCircle, Send, X } from 'lucide-react';
import { jobsData, type Job } from '@/data/jobsData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome',
    role: 'assistant',
    content: 'Xin chào! Tôi là trợ lý AI. Bạn muốn tìm công việc theo kỹ năng, mức lương, hay khu vực nào?'
  }]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text };
    const reply = createReply(text);
    const botMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: reply };
    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  function createReply(text: string): string {
    const t = text.toLowerCase();

    // Filter by district/location
    if (t.includes('quận') || t.includes('tp') || t.includes('thành phố') || t.includes('khu vực')) {
      const rel = jobsData.filter(j => j.location.toLowerCase().includes(t.replace('tìm', ''))).slice(0, 3);
      if (rel.length) return formatJobs(rel, 'Các việc làm phù hợp theo khu vực:');
    }

    // Filter by title/skill
    const skillMatch = jobsData.filter(j => j.title.toLowerCase().includes(t) || (j.description || '').toLowerCase().includes(t)).slice(0, 3);
    if (skillMatch.length) return formatJobs(skillMatch, 'Gợi ý theo nội dung bạn nhập:');

    // Filter by salary number
    const salaryNums = (t.match(/\d+/g) || []).map(Number);
    if (salaryNums.length) {
      const target = Math.max(...salaryNums);
      const rel = jobsData.filter(j => parseInt(j.salary.replace(/[^\d]/g, '')) >= target).slice(0, 3);
      if (rel.length) return formatJobs(rel, `Các công việc mức lương từ ${target} triệu:`);
    }

    // Default help
    return 'Bạn có thể nhập: "React ở Quận 1", "lương 25", hoặc "UI/UX Bình Thạnh" để nhận gợi ý nhanh.';
  }

  function formatJobs(items: Job[], title: string) {
    const list = items.map(j => `• ${j.title} — ${j.company} — ${j.salary} — ${j.location}`).join('\n');
    return `${title}\n${list}`;
  }

  const panel = (
    <Card className="fixed bottom-28 right-6 z-50 w-80 shadow-xl border bg-background">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="font-medium">Trợ lý AI</div>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Đóng">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-64 p-3">
        <div className="space-y-3">
          {messages.map(m => (
            <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <div className={`inline-block rounded-md px-3 py-2 text-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                {m.content}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
      <div className="p-3 border-t flex items-center gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          placeholder="Nhập câu hỏi..."
        />
        <Button size="icon" onClick={handleSend} aria-label="Gửi">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );

  return (
    <>
      {open && panel}
      <Button onClick={() => setOpen(v => !v)} className="fixed bottom-24 right-6 z-50 rounded-full h-12 w-12 p-0 shadow-lg" aria-label="Mở trợ lý AI">
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  );
};

export default ChatbotWidget;
