import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AdminAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
}

/**
 * Secure admin authentication hook.
 * - Validates session via getUser() (server-side check, not just local token)
 * - Verifies admin role from user_roles table
 * - Listens for auth state changes (logout, session expiry)
 * - Redirects to login if unauthorized
 */
export function useAdminAuth(): AdminAuthState {
  const navigate = useNavigate();
  const [state, setState] = useState<AdminAuthState>({
    isAuthenticated: false,
    isLoading: true,
    userId: null,
  });

  const validateAdmin = useCallback(async () => {
    try {
      // Use getUser() instead of getSession() for server-side validation
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        setState({ isAuthenticated: false, isLoading: false, userId: null });
        navigate("/admin/login", { replace: true });
        return;
      }

      // Verify admin role
      const { data: roles, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");

      if (roleError || !roles || roles.length === 0) {
        await supabase.auth.signOut();
        setState({ isAuthenticated: false, isLoading: false, userId: null });
        navigate("/admin/login", { replace: true });
        return;
      }

      setState({ isAuthenticated: true, isLoading: false, userId: user.id });
    } catch {
      setState({ isAuthenticated: false, isLoading: false, userId: null });
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    validateAdmin();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
          validateAdmin();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [validateAdmin]);

  return state;
}
