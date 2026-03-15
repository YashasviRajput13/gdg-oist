import React, { useState, useEffect, memo } from "react";
import { User } from "lucide-react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: React.ReactNode;
    containerClassName?: string;
}

const SafeImage = memo(({
    src,
    alt,
    className,
    fallback,
    containerClassName = "",
    crossOrigin = "anonymous",
    loading = "lazy",
    ...props
}: SafeImageProps) => {
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Reset error state when src changes
    useEffect(() => {
        setError(false);
        setIsLoaded(false);
    }, [src]);

    const defaultFallback = (
        <div className={`flex items-center justify-center bg-muted rounded-full w-full h-full text-muted-foreground ${className}`}>
            <User size="50%" />
        </div>
    );

    if (!src || error) {
        return (
            <div className={`relative overflow-hidden ${containerClassName}`}>
                {fallback || defaultFallback}
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${containerClassName}`}>
            <img
                src={src}
                alt={alt}
                className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                onError={() => setError(true)}
                onLoad={() => setIsLoaded(true)}
                crossOrigin={crossOrigin}
                loading={loading}
                {...props}
            />
            {!isLoaded && !error && (
                <div className="absolute inset-0 bg-muted/20 animate-pulse" />
            )}
        </div>
    );
});

SafeImage.displayName = "SafeImage";

export default SafeImage;
