
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("خطأ في تسجيل الدخول");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "تم تسجيل الدخول بنجاح!",
        description: `مرحباً بك ${data.user?.name || 'في موقعنا'}`,
        variant: "default",
      });
      
      // Redirect based on user role
      if (data.user?.role === 'admin') {
        setLocation("/admin/dashboard");
      } else {
        setLocation("/user-dashboard");
      }
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message || "تحقق من البيانات وحاول مرة أخرى",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof LoginForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const demoAccounts = [
    { type: "عميل", email: "customer@demo.com", password: "password123" },
    { type: "مدير", email: "admin@demo.com", password: "admin123" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50" dir="rtl">
      <div className="flex items-center justify-center min-h-screen py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-chicken-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-drumstick-bite text-white text-3xl"></i>
            </div>
            <h1 className="font-amiri text-3xl font-bold text-chicken-black">
              مرحباً بك في تشكن هات
            </h1>
            <p className="font-cairo text-gray-600 mt-2">
              سجل دخولك للاستمتاع بتجربة أفضل
            </p>
          </div>

          {/* Login Form */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="font-amiri text-2xl text-chicken-black">
                تسجيل الدخول
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="font-cairo pl-10"
                      required
                    />
                    <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="كلمة المرور"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="font-cairo pl-10 pr-10"
                      required
                    />
                    <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 ml-2" />
                    <span className="font-cairo text-sm text-gray-600">تذكرني</span>
                  </label>
                  <a href="#" className="font-cairo text-sm text-chicken-orange hover:underline">
                    نسيت كلمة المرور؟
                  </a>
                </div>

                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full bg-chicken-orange hover:bg-orange-600 text-white font-cairo py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {loginMutation.isPending ? (
                    <div className="flex items-center justify-center">
                      <i className="fas fa-spinner fa-spin ml-2"></i>
                      جارٍ تسجيل الدخول...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <i className="fas fa-sign-in-alt ml-2"></i>
                      تسجيل الدخول
                    </div>
                  )}
                </Button>
              </form>

              <Separator className="my-6" />

              {/* Social Login */}
              <div className="space-y-3">
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full font-cairo border-gray-300 hover:bg-gray-50"
                >
                  <i className="fab fa-google text-red-500 ml-2"></i>
                  تسجيل الدخول بـ Google
                </Button>
                
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full font-cairo border-gray-300 hover:bg-gray-50"
                >
                  <i className="fab fa-apple text-black ml-2"></i>
                  تسجيل الدخول بـ Apple ID
                </Button>
              </div>

              <Separator className="my-6" />

              {/* Demo Accounts */}
              <div className="space-y-3">
                <p className="font-cairo text-sm text-gray-600 text-center">
                  حسابات تجريبية:
                </p>
                {demoAccounts.map((account, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ email: account.email, password: account.password })}
                    className="w-full font-cairo text-xs border-dashed"
                  >
                    تجربة كـ {account.type}
                  </Button>
                ))}
              </div>

              {/* Register Link */}
              <div className="text-center mt-6">
                <p className="font-cairo text-gray-600">
                  ليس لديك حساب؟{" "}
                  <Link href="/register">
                    <span className="text-chicken-orange hover:underline font-semibold cursor-pointer">
                      سجل الآن
                    </span>
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/50 rounded-lg p-4">
              <i className="fas fa-shipping-fast text-chicken-orange text-2xl mb-2"></i>
              <p className="font-cairo text-xs text-gray-600">توصيل سريع</p>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <i className="fas fa-star text-chicken-orange text-2xl mb-2"></i>
              <p className="font-cairo text-xs text-gray-600">نقاط مكافآت</p>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <i className="fas fa-percent text-chicken-orange text-2xl mb-2"></i>
              <p className="font-cairo text-xs text-gray-600">خصومات حصرية</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
