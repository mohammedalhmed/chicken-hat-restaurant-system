
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface RegisterForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<RegisterForm>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterForm) => {
      if (data.password !== data.confirmPassword) {
        throw new Error("كلمات المرور غير متطابقة");
      }
      
      if (!data.acceptTerms) {
        throw new Error("يجب الموافقة على الشروط والأحكام");
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          password: data.password
        }),
      });
      
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message || "خطأ في إنشاء الحساب");
      }

      return payload;
    },
    onSuccess: (data) => {
      toast({
        title: "تم إنشاء الحساب بنجاح!",
        description: `مرحباً بك ${data.user?.name || 'في موقعنا'}`,
        variant: "default",
      });
      
      setLocation("/user-dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في إنشاء الحساب",
        description: error.message || "تحقق من البيانات وحاول مرة أخرى",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof RegisterForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1: return { text: "ضعيفة", color: "text-red-500" };
      case 2: return { text: "متوسطة", color: "text-yellow-500" };
      case 3: return { text: "جيدة", color: "text-blue-500" };
      case 4: return { text: "قوية", color: "text-green-500" };
      default: return { text: "", color: "" };
    }
  };

  const strength = passwordStrength(formData.password);
  const strengthInfo = getPasswordStrengthText(strength);

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
              انضم إلى عائلة تشكن هات
            </h1>
            <p className="font-cairo text-gray-600 mt-2">
              أنشئ حساباً جديداً واستمتع بالمزايا الحصرية
            </p>
          </div>

          {/* Register Form */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="font-amiri text-2xl text-chicken-black">
                إنشاء حساب جديد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                    الاسم الكامل
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="أدخل اسمك الكامل"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="font-cairo pl-10"
                      required
                    />
                    <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

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
                    رقم الهاتف
                  </label>
                  <div className="relative">
                    <Input
                      type="tel"
                      placeholder="05xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="font-cairo pl-10"
                      required
                    />
                    <i className="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
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
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              strength === 1 ? 'bg-red-500 w-1/4' :
                              strength === 2 ? 'bg-yellow-500 w-2/4' :
                              strength === 3 ? 'bg-blue-500 w-3/4' :
                              strength === 4 ? 'bg-green-500 w-full' : 'w-0'
                            }`}
                          ></div>
                        </div>
                        <span className={`text-xs font-cairo ${strengthInfo.color}`}>
                          {strengthInfo.text}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                    تأكيد كلمة المرور
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="أعد إدخال كلمة المرور"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="font-cairo pl-10 pr-10"
                      required
                    />
                    <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1 font-cairo">
                      كلمات المرور غير متطابقة
                    </p>
                  )}
                </div>

                <div className="flex items-start space-x-2 space-x-reverse">
                  <input 
                    type="checkbox" 
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                    className="rounded border-gray-300 mt-1"
                    required
                  />
                  <label htmlFor="acceptTerms" className="font-cairo text-sm text-gray-600">
                    أوافق على إنشاء الحساب واستخدام بياناته لتقديم خدمات الطلب والمتابعة.
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={registerMutation.isPending}
                  className="w-full bg-chicken-orange hover:bg-orange-600 text-white font-cairo py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {registerMutation.isPending ? (
                    <div className="flex items-center justify-center">
                      <i className="fas fa-spinner fa-spin ml-2"></i>
                      جارٍ إنشاء الحساب...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <i className="fas fa-user-plus ml-2"></i>
                      إنشاء حساب
                    </div>
                  )}
                </Button>
              </form>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="font-cairo text-gray-600">
                  لديك حساب بالفعل؟{" "}
                  <Link href="/login">
                    <span className="text-chicken-orange hover:underline font-semibold cursor-pointer">
                      سجل دخول
                    </span>
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="mt-8 bg-white/50 rounded-lg p-6">
            <h3 className="font-amiri text-lg font-bold text-chicken-black mb-4 text-center">
              مزايا الانضمام لعائلة تشكن هات
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <i className="fas fa-gift text-chicken-orange"></i>
                <span className="font-cairo text-sm text-gray-700">خصومات حصرية ومكافآت</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <i className="fas fa-star text-chicken-orange"></i>
                <span className="font-cairo text-sm text-gray-700">نقاط ولاء مع كل طلب</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <i className="fas fa-shipping-fast text-chicken-orange"></i>
                <span className="font-cairo text-sm text-gray-700">أولوية في التوصيل</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <i className="fas fa-bell text-chicken-orange"></i>
                <span className="font-cairo text-sm text-gray-700">إشعارات بالعروض الجديدة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
