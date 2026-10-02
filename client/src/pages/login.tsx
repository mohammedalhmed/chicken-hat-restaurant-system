import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginForm>({ email: "", password: "" });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message || "تعذر تسجيل الدخول");
      }
      return payload;
    },
    onSuccess: (data) => {
      queryClient.clear();
      toast({
        title: "تم تسجيل الدخول",
        description: `مرحباً بك ${data.user?.name ?? ""}`,
      });
      setLocation("/user-dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "تعذر تسجيل الدخول",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 px-4 py-24" dir="rtl">
      <div className="max-w-md mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-chicken-orange rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-user text-white text-2xl" />
            </div>
            <CardTitle className="font-amiri text-3xl">دخول العميل</CardTitle>
            <p className="font-cairo text-sm text-gray-500 mt-2">
              استخدم حسابك لمتابعة الطلبات المرتبطة بك.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="font-cairo text-sm font-medium">
                  البريد الإلكتروني
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="font-cairo text-sm font-medium">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                    className="pl-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-chicken-orange hover:bg-orange-600"
              >
                {loginMutation.isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3 font-cairo text-sm">
              <p className="text-gray-600">
                ليس لديك حساب؟{" "}
                <Link href="/register" className="text-chicken-orange font-semibold hover:underline">
                  إنشاء حساب
                </Link>
              </p>
              <p>
                <Link href="/admin/login" className="text-gray-500 hover:text-chicken-orange hover:underline">
                  دخول إدارة المطعم
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
