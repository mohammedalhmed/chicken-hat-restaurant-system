import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { queryClient, setAdminToken } from "@/lib/queryClient";

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [token, setToken] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (token.trim().length < 32) {
      toast({
        title: "رمز الإدارة غير صالح",
        description: "يجب استخدام رمز إدارة قوي مكوّن من 32 حرفًا على الأقل.",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);

    try {
      const response = await fetch("/api/admin/session", {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid admin token");
      }

      setAdminToken(token.trim());
      queryClient.clear();

      toast({ title: "تم تسجيل دخول الإدارة بنجاح" });
      setLocation("/admin");
    } catch {
      toast({
        title: "تعذر تسجيل الدخول",
        description: "تحقق من رمز الإدارة وحاول مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4" dir="rtl">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="font-amiri text-2xl text-center">
            دخول لوحة إدارة تشكن هات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="admin-token" className="font-cairo text-sm font-medium">
                رمز الإدارة
              </label>
              <Input
                id="admin-token"
                type="password"
                autoComplete="current-password"
                value={token}
                onChange={(event) => setToken(event.target.value)}
                placeholder="ADMIN_API_TOKEN"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isChecking}
              className="w-full bg-chicken-orange hover:bg-orange-600"
            >
              {isChecking ? "جاري التحقق..." : "دخول الإدارة"}
            </Button>

            <p className="text-xs text-gray-500 font-cairo text-center leading-relaxed">
              لا يتم حفظ الرمز بشكل دائم؛ يبقى داخل جلسة المتصفح الحالية فقط.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
