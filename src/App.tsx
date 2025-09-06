import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import RecruiterJobs from "./pages/RecruiterJobs";
import RecruiterApplications from "./pages/RecruiterApplications";
import RecruiterCandidates from "./pages/RecruiterCandidates";
import RecruiterManage from "./pages/RecruiterManage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminCompanies from "./pages/AdminCompanies";
import AdminPosts from "./pages/AdminPosts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recruiter" element={<RecruiterDashboard />} />
          <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
          <Route path="/recruiter/applications" element={<RecruiterApplications />} />
          <Route path="/recruiter/candidates" element={<RecruiterCandidates />} />
          <Route path="/recruiter/manage" element={<RecruiterManage />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/companies" element={<AdminCompanies />} />
          <Route path="/admin/posts" element={<AdminPosts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
