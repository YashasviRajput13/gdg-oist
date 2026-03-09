import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, Mail, User, Clock, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface Submission {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
}

const AdminMessagesTab = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("contact_submissions")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setSubmissions(data || []);
        } catch (error: any) {
            toast({
                title: "Error fetching messages",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        try {
            const { error } = await supabase
                .from("contact_submissions")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setSubmissions(submissions.filter((s) => s.id !== id));
            toast({
                title: "Deleted",
                description: "Message has been removed.",
            });
        } catch (error: any) {
            toast({
                title: "Error deleting message",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground animate-pulse">Loading messages...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
                    <p className="text-muted-foreground">
                        Contact form submissions from your website visitors.
                    </p>
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                    <span className="text-sm font-semibold text-primary">
                        {submissions.length} {submissions.length === 1 ? 'Message' : 'Messages'}
                    </span>
                </div>
            </div>

            {submissions.length === 0 ? (
                <div className="text-center py-20 bg-card/50 rounded-3xl border border-dashed border-border/50">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="text-muted-foreground" size={24} />
                    </div>
                    <h3 className="text-lg font-medium">No messages yet</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto mt-2">
                        When visitors fill out the contact form on your site, their messages will appear here.
                    </p>
                </div>
            ) : (
                <div className="rounded-3xl border border-border/50 bg-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-muted/30">
                                <TableRow>
                                    <TableHead className="w-48 bg-transparent">Sender</TableHead>
                                    <TableHead className="bg-transparent">Message</TableHead>
                                    <TableHead className="w-40 bg-transparent text-right">Date</TableHead>
                                    <TableHead className="w-16 bg-transparent"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AnimatePresence mode="popLayout">
                                    {submissions.map((sub) => (
                                        <motion.tr
                                            key={sub.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10, backgroundColor: "hsl(var(--destructive) / 0.1)" }}
                                            className="group transition-colors hover:bg-muted/10 border-b border-border/40 last:border-0"
                                        >
                                            <TableCell className="align-top py-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 font-semibold">
                                                        <User size={14} className="text-primary/70" />
                                                        <span className="truncate">{sub.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Mail size={12} />
                                                        <a href={`mailto:${sub.email}`} className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                                                            {sub.email}
                                                        </a>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="align-top py-4">
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words max-w-md bg-muted/20 p-3 rounded-xl">
                                                    {sub.message}
                                                </p>
                                            </TableCell>
                                            <TableCell className="align-top text-right py-4">
                                                <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                                                    <Clock size={12} />
                                                    {format(new Date(sub.created_at), "MMM d, h:mm a")}
                                                </div>
                                            </TableCell>
                                            <TableCell className="align-top py-4">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(sub.id)}
                                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all rounded-lg"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMessagesTab;
