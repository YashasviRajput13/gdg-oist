import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, LogOut, ArrowLeft, Save, X, Image } from "lucide-react";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string | null;
}

const AdminGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ src: "", alt: "", caption: "" });
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchItems();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin/login"); return; }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");
    if (!roles || roles.length === 0) { navigate("/admin/login"); }
  };

  const fetchItems = async () => {
    const { data } = await supabase
      .from("gallery_items")
      .select("id, src, alt, caption")
      .order("created_at", { ascending: true });
    if (data) setItems(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!form.src.trim() || !form.alt.trim()) {
      toast({ title: "Required", description: "Image URL and alt text are required.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("gallery_items").insert({
      src: form.src.trim(),
      alt: form.alt.trim(),
      caption: form.caption.trim() || null,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Added!" });
    setForm({ src: "", alt: "", caption: "" });
    setIsAdding(false);
    fetchItems();
  };

  const handleUpdate = async (id: string) => {
    if (!form.src.trim() || !form.alt.trim()) {
      toast({ title: "Required", description: "Image URL and alt text are required.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("gallery_items").update({
      src: form.src.trim(),
      alt: form.alt.trim(),
      caption: form.caption.trim() || null,
    }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Updated!" });
    setEditingId(null);
    setForm({ src: "", alt: "", caption: "" });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("gallery_items").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted!" });
    fetchItems();
  };

  const startEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setForm({ src: item.src, alt: item.alt, caption: item.caption || "" });
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setForm({ src: "", alt: "", caption: "" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-bold text-foreground">Gallery Manager</h1>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground text-sm">{items.length} images</p>
          <Button onClick={() => { setIsAdding(true); setEditingId(null); setForm({ src: "", alt: "", caption: "" }); }}>
            <Plus className="h-4 w-4 mr-1" /> Add Image
          </Button>
        </div>

        {isAdding && (
          <Card className="mb-6 border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">New Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Image URL *" value={form.src} onChange={(e) => setForm({ ...form, src: e.target.value })} />
              <Input placeholder="Alt text *" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} />
              <Input placeholder="Caption (optional)" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAdd}><Save className="h-4 w-4 mr-1" /> Save</Button>
                <Button size="sm" variant="outline" onClick={cancelEdit}><X className="h-4 w-4 mr-1" /> Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <p className="text-center text-muted-foreground py-12">Loading...</p>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Preview</TableHead>
                  <TableHead>Alt Text</TableHead>
                  <TableHead>Caption</TableHead>
                  <TableHead className="w-24 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    {editingId === item.id ? (
                      <TableCell colSpan={4}>
                        <div className="space-y-3 py-2">
                          <Input placeholder="Image URL *" value={form.src} onChange={(e) => setForm({ ...form, src: e.target.value })} />
                          <Input placeholder="Alt text *" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} />
                          <Input placeholder="Caption (optional)" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleUpdate(item.id)}><Save className="h-4 w-4 mr-1" /> Save</Button>
                            <Button size="sm" variant="outline" onClick={cancelEdit}><X className="h-4 w-4 mr-1" /> Cancel</Button>
                          </div>
                        </div>
                      </TableCell>
                    ) : (
                      <>
                        <TableCell>
                          <img src={item.src} alt={item.alt} className="w-12 h-12 rounded-lg object-cover" />
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{item.alt}</TableCell>
                        <TableCell className="text-muted-foreground">{item.caption || "—"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button variant="ghost" size="icon" onClick={() => startEdit(item)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminGallery;
