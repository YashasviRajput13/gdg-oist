import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, ArrowLeft, Image, Calendar, Users, MessageSquareQuote, Loader2, UserPlus, Sparkles } from "lucide-react";
import AdminGalleryTab from "./AdminGalleryTab";
import AdminEvents from "./AdminEvents";
import AdminTeamTab from "./AdminTeamTab";
import AdminTestimonialsTab from "./AdminTestimonialsTab";
import AdminInvite from "@/components/AdminInvite";
import AdminHighlightsTab from "./AdminHighlightsTab";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAdminAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="gallery">
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="gallery" className="gap-2">
              <Image className="h-4 w-4" /> Gallery
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <Calendar className="h-4 w-4" /> Events
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Users className="h-4 w-4" /> Team
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-2">
              <MessageSquareQuote className="h-4 w-4" /> Testimonials
            </TabsTrigger>
            <TabsTrigger value="invite" className="gap-2">
              <UserPlus className="h-4 w-4" /> Invite Admin
            </TabsTrigger>
          </TabsList>
          <TabsContent value="gallery">
            <AdminGalleryTab />
          </TabsContent>
          <TabsContent value="events">
            <AdminEvents />
          </TabsContent>
          <TabsContent value="team">
            <AdminTeamTab />
          </TabsContent>
          <TabsContent value="testimonials">
            <AdminTestimonialsTab />
          </TabsContent>
          <TabsContent value="invite">
            <AdminInvite />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
