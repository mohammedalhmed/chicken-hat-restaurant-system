export function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-spin rounded-full border-4 border-gray-300 border-t-chicken-orange h-8 w-8 ${className}`}></div>
  );
}