import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, X, Calendar, Star, Link, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface EventItem {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_type: string | null;
  location: string | null;
  image_url: string | null;
  is_featured: boolean | null;
  registration_link: string | null;
}

interface EventForm {
  title: string;
  description: string;
  event_date: string;
  event_type: string;
  location: string;
  image_url: string;
  is_featured: boolean;
  registration_link: string;
}

const emptyForm: EventForm = {
  title: "",
  description: "",
  event_date: "",
  event_type: "meetup",
  location: "",
  image_url: "",
  is_featured: false,
  registration_link: "",
};

const AdminEvents = () => {
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EventForm>(emptyForm);
  const [isAdding, setIsAdding] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [linkValue, setLinkValue] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!form.title.trim() || !form.event_date) {
      toast({ title: "Required", description: "Title and date are required.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("events").insert({
      title: form.title.trim(),
      description: form.description.trim() || null,
      event_date: form.event_date,
      event_type: form.event_type || "meetup",
      location: form.location.trim() || null,
      image_url: form.image_url.trim() || null,
      is_featured: form.is_featured,
      registration_link: form.registration_link.trim() || null,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Event added!" });
    setForm(emptyForm);
    setIsAdding(false);
    fetchItems();
  };

  const handleUpdate = async (id: string) => {
    if (!form.title.trim() || !form.event_date) {
      toast({ title: "Required", description: "Title and date are required.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("events").update({
      title: form.title.trim(),
      description: form.description.trim() || null,
      event_date: form.event_date,
      event_type: form.event_type || "meetup",
      location: form.location.trim() || null,
      image_url: form.image_url.trim() || null,
      is_featured: form.is_featured,
      registration_link: form.registration_link.trim() || null,
    }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Event updated!" });
    setEditingId(null);
    setForm(emptyForm);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Event deleted!" });
    fetchItems();
  };

  const startEdit = (item: EventItem) => {
    setEditingId(item.id);
    setIsAdding(false);
    setForm({
      title: item.title,
      description: item.description || "",
      event_date: item.event_date ? item.event_date.slice(0, 16) : "",
      event_type: item.event_type || "meetup",
      location: item.location || "",
      image_url: item.image_url || "",
      is_featured: item.is_featured || false,
      registration_link: item.registration_link || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setForm(emptyForm);
  };

  const handleQuickLinkSave = async (id: string) => {
    const { error } = await supabase.from("events").update({ registration_link: linkValue.trim() || null }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Registration link updated!" });
    setEditingLinkId(null);
    fetchItems();
  };

  const EventFormFields = () => (
    <div className="space-y-3">
      <Input placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <Input type="datetime-local" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
      <Input placeholder="Event type (e.g. workshop, hackathon)" value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })} />
      <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <Input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
      <Input placeholder="Registration link" value={form.registration_link} onChange={(e) => setForm({ ...form, registration_link: e.target.value })} />
      <div className="flex items-center gap-2">
        <Switch checked={form.is_featured} onCheckedChange={(v) => setForm({ ...form, is_featured: v })} />
        <span className="text-sm text-muted-foreground">Featured event</span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground text-sm">{items.length} events</p>
        <Button onClick={() => { setIsAdding(true); setEditingId(null); setForm(emptyForm); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Event
        </Button>
      </div>

      {isAdding && (
        <Card className="mb-6 border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <EventFormFields />
            <div className="flex gap-2 mt-4">
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
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Registration Link</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  {editingId === item.id ? (
                    <TableCell colSpan={5}>
                      <EventFormFields />
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" onClick={() => handleUpdate(item.id)}><Save className="h-4 w-4 mr-1" /> Save</Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit}><X className="h-4 w-4 mr-1" /> Cancel</Button>
                      </div>
                    </TableCell>
                  ) : (
                    <>
                      <TableCell className="font-medium text-foreground">{item.title}</TableCell>
                      <TableCell className="text-muted-foreground capitalize">{item.event_type || "—"}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.event_date ? new Date(item.event_date).toLocaleDateString() : "—"}
                      </TableCell>
                      <TableCell>
                        {item.is_featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                      </TableCell>
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
    </div>
  );
};

export default AdminEvents;
