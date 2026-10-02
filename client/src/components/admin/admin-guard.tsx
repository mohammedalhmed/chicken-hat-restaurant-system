import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import { clearAdminToken, getAdminToken } from "@/lib/queryClient";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [, setLocation] = useLocation();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = getAdminToken();

    if (!token) {
      setLocation("/admin/login");
      return;
    }

    const controller = new AbortController();

    fetch("/api/admin/session", {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          clearAdminToken();
          setLocation("/admin/login");
          return;
        }
        setAuthorized(true);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          clearAdminToken();
          setLocation("/admin/login");
        }
      });

    return () => controller.abort();
  }, [setLocation]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" className="mx-auto" />
          <p className="font-cairo text-gray-600">جاري التحقق من صلاحية الإدارة...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
