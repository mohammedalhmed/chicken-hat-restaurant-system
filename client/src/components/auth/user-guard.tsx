import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface UserGuardProps {
  children: ReactNode;
}

export default function UserGuard({ children }: UserGuardProps) {
  const [, setLocation] = useLocation();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/auth/session", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          setLocation("/login");
          return;
        }
        setAuthorized(true);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setLocation("/login");
        }
      });

    return () => controller.abort();
  }, [setLocation]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}
