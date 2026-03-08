import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, X, Eye, EyeOff } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar_initials: string;
  quote: string;
  rating: number;
  color_index: number;
  display_order: number | null;
  is_visible: boolean;
}

const empty = {
  name: "",
  role: "",
  avatar_initials: "",
  quote: "",
  rating: 5,
  color_index: 0,
  display_order: 0,
  is_visible: true,
};

const COLOR_LABELS = ["Blue", "Red", "Green", "Yellow", "Blue→Green"];

const AdminTestimonialsTab = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(empty);
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("display_order", { ascending: true });
    if (data) setItems(data);
  };

  useEffect(() => { fetchData(); }, []);

  const set = (key: string, val: string | number | boolean | null) => setForm((f) => ({ ...f, [key]: val }));

  const handleAdd = async () => {
    if (!form.name || !form.quote) { toast({ title: "Name and quote required", variant: "destructive" }); return; }
    const initials = form.avatar_initials || form.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    const { error } = await supabase.from("testimonials").insert({ ...form, avatar_initials: initials });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Testimonial added" });
    setAdding(false);
    setForm(empty);
    fetchData();
  };

  const handleUpdate = async () => {
    if (!editing) return;
    const initials = form.avatar_initials || form.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    const { error } = await supabase.from("testimonials").update({ ...form, avatar_initials: initials }).eq("id", editing.id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Testimonial updated" });
    setEditing(null);
    setForm(empty);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Testimonial deleted" });
    fetchData();
  };

  const toggleVisibility = async (item: Testimonial) => {
    await supabase.from("testimonials").update({ is_visible: !item.is_visible }).eq("id", item.id);
    fetchData();
  };

  const startEdit = (item: Testimonial) => {
    setEditing(item);
    setAdding(false);
    setForm({
      name: item.name, role: item.role, avatar_initials: item.avatar_initials,
      quote: item.quote, rating: item.rating, color_index: item.color_index,
      display_order: item.display_order ?? 0, is_visible: item.is_visible,
    });
  };

  const cancel = () => { setEditing(null); setAdding(false); setForm(empty); };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Testimonials</CardTitle>
        {!adding && !editing && (
          <Button size="sm" onClick={() => { setAdding(true); setEditing(null); setForm(empty); }}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {(adding || editing) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 p-4 border border-border rounded-lg bg-muted/30">
            <Input placeholder="Name" value={form.name} onChange={(e) => set("name", e.target.value)} />
            <Input placeholder="Role" value={form.role} onChange={(e) => set("role", e.target.value)} />
            <Input placeholder="Initials (auto)" value={form.avatar_initials} onChange={(e) => set("avatar_initials", e.target.value)} />
            <Input type="number" placeholder="Rating (1-5)" value={form.rating} min={1} max={5} onChange={(e) => set("rating", parseInt(e.target.value) || 5)} />
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.color_index}
              onChange={(e) => set("color_index", parseInt(e.target.value))}
            >
              {COLOR_LABELS.map((label, i) => (
                <option key={i} value={i}>{label}</option>
              ))}
            </select>
            <Input type="number" placeholder="Display Order" value={form.display_order} onChange={(e) => set("display_order", parseInt(e.target.value) || 0)} />
            <Textarea placeholder="Quote" value={form.quote} onChange={(e) => set("quote", e.target.value)} className="md:col-span-2" />
            <div className="md:col-span-2 flex gap-2">
              <Button size="sm" onClick={editing ? handleUpdate : handleAdd}>
                <Save className="h-4 w-4 mr-1" /> {editing ? "Update" : "Save"}
              </Button>
              <Button size="sm" variant="outline" onClick={cancel}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Quote</TableHead>
              <TableHead>Visible</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell className="hidden md:table-cell max-w-xs truncate">{item.quote}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => toggleVisibility(item)}>
                    {item.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => startEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No testimonials yet. Add one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminTestimonialsTab;
