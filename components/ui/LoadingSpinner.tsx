import Image from "next/image";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

export default function LoadingSpinner({
  size = "md",
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Logo with pulse animation */}
      <div className="relative">
        <div className={`${sizeClasses[size]} relative animate-pulse`}>
          <Image
            src="/images/target-logo-last.png"
            alt="Loading..."
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* Animated ring around logo */}
        <div
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-primary-200 rounded-full animate-ping opacity-20`}
        />
      </div>
      
      {/* Loading text */}
      {text && (
        <p className="text-gray-600 text-sm font-medium animate-pulse">{text}</p>
      )}
      
      {/* Loading dots */}
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-64">
      {content}
    </div>
  );
}

