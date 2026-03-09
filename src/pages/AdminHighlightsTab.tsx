import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { toDirectImageUrl } from "@/lib/driveUrl";
import { Plus, Trash2, GripVertical, Save, X, Pencil } from "lucide-react";

interface Highlight {
  id: string;
  image_url: string;
  label: string;
  display_order: number;
}

const AdminHighlightsTab = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ image_url: "", label: "", display_order: 0 });
  const [newItem, setNewItem] = useState({ image_url: "", label: "" });
  const [adding, setAdding] = useState(false);
  const { toast } = useToast();

  const fetchHighlights = async () => {
    const { data, error } = await supabase
      .from("event_highlights")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      toast({ title: "Failed to load highlights", variant: "destructive" });
    } else {
      setHighlights(data || []);
    }
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchHighlights(); }, []);

  const handleAdd = async () => {
    if (!newItem.image_url.trim() || !newItem.label.trim()) return;
    const { error } = await supabase.from("event_highlights").insert({
      image_url: newItem.image_url.trim(),
      label: newItem.label.trim(),
      display_order: highlights.length + 1,
    });
    if (error) {
      toast({ title: "Failed to add", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Highlight added" });
      setNewItem({ image_url: "", label: "" });
      setAdding(false);
      fetchHighlights();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("event_highlights").delete().eq("id", id);
    if (error) {
      toast({ title: "Failed to delete", variant: "destructive" });
    } else {
      toast({ title: "Highlight deleted" });
      fetchHighlights();
    }
  };

  const startEdit = (h: Highlight) => {
    setEditingId(h.id);
    setEditForm({ image_url: h.image_url, label: h.label, display_order: h.display_order });
  };

  const handleSave = async () => {
    if (!editingId) return;
    const { error } = await supabase.from("event_highlights").update({
      image_url: editForm.image_url.trim(),
      label: editForm.label.trim(),
      display_order: editForm.display_order,
    }).eq("id", editingId);
    if (error) {
      toast({ title: "Failed to update", variant: "destructive" });
    } else {
      toast({ title: "Highlight updated" });
      setEditingId(null);
      fetchHighlights();
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Event Highlights</CardTitle>
        <Button size="sm" onClick={() => setAdding(true)} disabled={adding} className="gap-2">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {adding && (
          <div className="flex gap-2 items-end p-3 rounded-lg border border-border bg-muted/30">
            <div className="flex-1 space-y-1">
              <label className="text-xs text-muted-foreground">Image URL</label>
              <Input
                placeholder="https://..."
                value={newItem.image_url}
                onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
              />
            </div>
            <div className="w-40 space-y-1">
              <label className="text-xs text-muted-foreground">Label</label>
              <Input
                placeholder="DevFest '24"
                value={newItem.label}
                onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
              />
            </div>
            <Button size="icon" onClick={handleAdd}><Save className="h-4 w-4" /></Button>
            <Button size="icon" variant="ghost" onClick={() => setAdding(false)}><X className="h-4 w-4" /></Button>
          </div>
        )}

        {highlights.map((h) => (
          <div key={h.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/20 transition-colors">
            <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
            <img src={toDirectImageUrl(h.image_url)} alt={h.label} className="w-16 h-12 object-cover rounded-md shrink-0" />
            {editingId === h.id ? (
              <>
                <Input
                  className="flex-1"
                  value={editForm.image_url}
                  onChange={(e) => setEditForm({ ...editForm, image_url: e.target.value })}
                />
                <Input
                  className="w-32"
                  value={editForm.label}
                  onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                />
                <Input
                  className="w-16"
                  type="number"
                  value={editForm.display_order}
                  onChange={(e) => setEditForm({ ...editForm, display_order: parseInt(e.target.value) || 0 })}
                />
                <Button size="icon" variant="ghost" onClick={handleSave}><Save className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}><X className="h-4 w-4" /></Button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm font-medium text-foreground truncate">{h.label}</span>
                <span className="text-xs text-muted-foreground">#{h.display_order}</span>
                <Button size="icon" variant="ghost" onClick={() => startEdit(h)}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(h.id)}><Trash2 className="h-4 w-4" /></Button>
              </>
            )}
          </div>
        ))}

        {highlights.length === 0 && !adding && (
          <p className="text-sm text-muted-foreground text-center py-8">No highlights yet. Click "Add" to create one.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminHighlightsTab;
