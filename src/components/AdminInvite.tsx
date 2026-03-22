import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, Copy, Check, UserPlus, Link2 } from "lucide-react";

const AdminInvite = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setInviteLink(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Not authenticated", variant: "destructive" });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke("send-admin-invite", {
        body: { email: email.trim() },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        toast({ title: "Invite failed", description: error.message, variant: "destructive" });
      } else if (data?.error) {
        toast({ title: "Invite failed", description: data.error, variant: "destructive" });
      } else {
        setInviteLink(data.inviteLink);
        toast({ title: "Invite created!", description: `Share the link with ${email}` });
        setEmail("");
      }
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" });
    }

    setLoading(false);
  };

  const handleCopy = async () => {
    if (!inviteLink) return;
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast({ title: "Link copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Invite Admin</CardTitle>
            <CardDescription>Send a secure invite link to add a new admin</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleInvite} className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="gap-2">
            <Send className="h-4 w-4" />
            {loading ? "Sending..." : "Invite"}
          </Button>
        </form>

        {inviteLink && (
          <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Link2 className="h-4 w-4 text-primary" />
              Invite Link Generated
            </div>
            <div className="flex gap-2">
              <Input
                value={inviteLink}
                readOnly
                className="text-xs font-mono bg-background"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Share this link with the invited admin. It expires in 7 days.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminInvite;
