import { Component, ReactNode } from "react";

interface Props {
    children: ReactNode;
    /** Rendered when a WebGL component crashes. Defaults to nothing (transparent). */
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

/**
 * Error boundary for WebGL/GPU-heavy components.
 * Catches render errors and WebGL context loss gracefully
 * so the rest of the app continues working.
 */
export class WebGLErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.warn("[WebGLErrorBoundary] Component failed, rendering fallback:", error.message);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? null;
        }
        return this.props.children;
    }
}
