import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import Profile from "./pages/Profile";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<ProtectedRoute roles={["user", "recruiter", "admin"]}><UserDashboard /></ProtectedRoute>} />
            <Route path="/recruiter" element={<ProtectedRoute roles={["recruiter", "admin"]}><RecruiterDashboard /></ProtectedRoute>} />
            <Route path="/recruiter/jobs" element={<ProtectedRoute roles={["recruiter", "admin"]}><RecruiterJobs /></ProtectedRoute>} />
            <Route path="/recruiter/applications" element={<ProtectedRoute roles={["recruiter", "admin"]}><RecruiterApplications /></ProtectedRoute>} />
            <Route path="/recruiter/candidates" element={<ProtectedRoute roles={["recruiter", "admin"]}><RecruiterCandidates /></ProtectedRoute>} />
            <Route path="/recruiter/manage" element={<ProtectedRoute roles={["recruiter", "admin"]}><RecruiterManage /></ProtectedRoute>} />

            <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]}><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/companies" element={<ProtectedRoute roles={["admin"]}><AdminCompanies /></ProtectedRoute>} />
            <Route path="/admin/posts" element={<ProtectedRoute roles={["admin"]}><AdminPosts /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
