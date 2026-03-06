import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  twitter_url: string | null;
  display_order: number | null;
  category: string | null;
}

const CATEGORIES = ["Core", "Tech", "Design", "Marketing", "Volunteers", "Media", "Women in Tech", "Management", "Other"];

const empty: Omit<TeamMember, "id"> = {
  name: "", role: "", bio: "", avatar_url: "", linkedin_url: "", github_url: "", twitter_url: "", display_order: 0, category: "Tech",
};

const AdminTeamTab = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(empty);
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase.from("team_members").select("*").order("display_order", { ascending: true });
    if (data) setMembers(data);
  };

  useEffect(() => { fetch(); }, []);

  const set = (key: string, val: string | number | null) => setForm((f) => ({ ...f, [key]: val }));

  const handleAdd = async () => {
    if (!form.name || !form.role) { toast({ title: "Name and role are required", variant: "destructive" }); return; }
    const { error } = await supabase.from("team_members").insert({
      name: form.name, role: form.role, bio: form.bio || null, avatar_url: form.avatar_url || null,
      linkedin_url: form.linkedin_url || null, github_url: form.github_url || null,
      twitter_url: form.twitter_url || null, display_order: form.display_order ?? 0, category: form.category || "Tech",
    });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Member added" }); setAdding(false); setForm(empty); fetch();
  };

  const handleUpdate = async () => {
    if (!editing) return;
    const { error } = await supabase.from("team_members").update({
      name: form.name, role: form.role, bio: form.bio || null, avatar_url: form.avatar_url || null,
      linkedin_url: form.linkedin_url || null, github_url: form.github_url || null,
      twitter_url: form.twitter_url || null, display_order: form.display_order ?? 0, category: form.category || "Tech",
    }).eq("id", editing.id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Member updated" }); setEditing(null); setForm(empty); fetch();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Member deleted" }); fetch();
  };

  const startEdit = (m: TeamMember) => {
    setEditing(m); setAdding(false);
    setForm({ name: m.name, role: m.role, bio: m.bio, avatar_url: m.avatar_url, linkedin_url: m.linkedin_url, github_url: m.github_url, twitter_url: m.twitter_url, display_order: m.display_order, category: m.category });
  };

  const cancel = () => { setEditing(null); setAdding(false); setForm(empty); };

  const formUI = (
    <Card className="mb-6 border-border/50">
      <CardHeader><CardTitle className="text-lg">{editing ? "Edit Member" : "Add Member"}</CardTitle></CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input placeholder="Name *" value={form.name} onChange={(e) => set("name", e.target.value)} />
        <Input placeholder="Role *" value={form.role} onChange={(e) => set("role", e.target.value)} />
        <Input placeholder="Bio" value={form.bio || ""} onChange={(e) => set("bio", e.target.value)} />
        <Input placeholder="Avatar URL" value={form.avatar_url || ""} onChange={(e) => set("avatar_url", e.target.value)} />
        <Input placeholder="LinkedIn URL" value={form.linkedin_url || ""} onChange={(e) => set("linkedin_url", e.target.value)} />
        <Input placeholder="GitHub URL" value={form.github_url || ""} onChange={(e) => set("github_url", e.target.value)} />
        <Input placeholder="Twitter URL" value={form.twitter_url || ""} onChange={(e) => set("twitter_url", e.target.value)} />
        <Input type="number" placeholder="Display Order" value={form.display_order ?? 0} onChange={(e) => set("display_order", parseInt(e.target.value) || 0)} />
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.category || "Tech"} onChange={(e) => set("category", e.target.value)}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div className="md:col-span-2 flex gap-2">
          <Button onClick={editing ? handleUpdate : handleAdd}><Save className="h-4 w-4 mr-1" />{editing ? "Update" : "Save"}</Button>
          <Button variant="outline" onClick={cancel}><X className="h-4 w-4 mr-1" />Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      {(adding || editing) && formUI}
      {!adding && !editing && (
        <Button onClick={() => setAdding(true)} className="mb-4"><Plus className="h-4 w-4 mr-1" />Add Member</Button>
      )}
      <Card className="border-border/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.display_order}</TableCell>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell><span className="text-xs px-2 py-1 rounded-full bg-muted">{m.category || "Tech"}</span></TableCell>
                <TableCell>{m.avatar_url ? <img src={m.avatar_url} alt={m.name} className="h-8 w-8 rounded-full object-cover" /> : "—"}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => startEdit(m)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {members.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No team members yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminTeamTab;
