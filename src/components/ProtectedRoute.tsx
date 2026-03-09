import { ReactNode } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface ProtectedRouteProps {
    children: ReactNode;
}

/**
 * Route-level guard for admin pages.
 * Validates the session and admin role before rendering children.
 * Redirects to /admin/login if unauthorized (handled by useAdminAuth).
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading } = useAdminAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground text-sm tracking-widest uppercase">
                    Verifying access…
                </p>
            </div>
        );
    }

    // useAdminAuth already navigates to /admin/login if not authenticated
    if (!isAuthenticated) return null;

    return <>{children}</>;
};

export default ProtectedRoute;
