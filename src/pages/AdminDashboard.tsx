import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, ArrowLeft, Image, Calendar, Users } from "lucide-react";
import AdminGalleryTab from "./AdminGalleryTab";
import AdminEvents from "./AdminEvents";
import AdminTeamTab from "./AdminTeamTab";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/admin/login"); return; }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");
      if (!roles || roles.length === 0) { navigate("/admin/login"); return; }
      setAuthed(true);
    };
    check();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (!authed) return null;

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
          <TabsList className="mb-6">
            <TabsTrigger value="gallery" className="gap-2">
              <Image className="h-4 w-4" /> Gallery
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <Calendar className="h-4 w-4" /> Events
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Users className="h-4 w-4" /> Team
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
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
