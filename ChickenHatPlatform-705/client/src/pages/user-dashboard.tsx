
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";

export default function UserDashboardPage() {
  const [user] = useState({
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "0501234567",
    avatar: "/placeholder-avatar.jpg",
    joinDate: "2023-01-15",
    loyaltyLevel: "ذهبي",
    loyaltyPoints: 2450,
    nextLevelPoints: 3000,
    totalOrders: 48,
    favoriteItems: 12
  });

  const recentOrders = [
    {
      id: "CHK12345",
      date: "2024-08-05",
      status: "delivered",
      total: 85.50,
      items: ["دجاج مقرمش", "برغر دجاج", "بطاطس"],
      rating: 5
    },
    {
      id: "CHK12344",
      date: "2024-08-02",
      status: "delivered",
      total: 45.00,
      items: ["وجبة عائلية صغيرة"],
      rating: 4
    },
    {
      id: "CHK12343",
      date: "2024-07-28",
      status: "cancelled",
      total: 32.50,
      items: ["أجنحة دجاج", "كولا"],
      rating: null
    }
  ];

  const loyaltyBenefits = [
    {
      title: "خصم 15% على جميع الطلبات",
      description: "خصم دائم على جميع الوجبات",
      icon: "fas fa-percentage",
      active: true
    },
    {
      title: "توصيل مجاني",
      description: "توصيل مجاني للطلبات أكثر من 30 ريال",
      icon: "fas fa-shipping-fast",
      active: true
    },
    {
      title: "أولوية في الطلبات",
      description: "أولوية في التحضير أثناء الأوقات المزدحمة",
      icon: "fas fa-star",
      active: true
    },
    {
      title: "دعوات للفعاليات الخاصة",
      description: "دعوات حصرية للأحداث والفعاليات",
      icon: "fas fa-calendar-star",
      active: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500 text-white font-cairo">تم التوصيل</Badge>;
      case "preparing":
        return <Badge className="bg-yellow-500 text-white font-cairo">قيد التحضير</Badge>;
      case "on_way":
        return <Badge className="bg-blue-500 text-white font-cairo">في الطريق</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500 text-white font-cairo">ملغي</Badge>;
      default:
        return <Badge variant="outline" className="font-cairo">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`fas fa-star text-sm ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          ></i>
        ))}
      </div>
    );
  };

  const loyaltyProgress = (user.loyaltyPoints / user.nextLevelPoints) * 100;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-blue-500 to-teal-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyIDZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyLTZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNCIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-6 space-x-reverse">
            <Avatar className="w-24 h-24 border-4 border-white/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-white/20 text-white font-cairo text-2xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h1 className="font-amiri text-4xl md:text-5xl font-bold mb-2">
                مرحباً، {user.name}
              </h1>
              <p className="font-cairo text-xl mb-4">
                عضو {user.loyaltyLevel} منذ {new Date(user.joinDate).toLocaleDateString('ar-SA')}
              </p>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Badge className="bg-yellow-500 text-white font-cairo text-lg px-4 py-2">
                  <i className="fas fa-crown ml-2"></i>
                  {user.loyaltyLevel}
                </Badge>
                <span className="font-cairo text-lg">
                  {user.loyaltyPoints} نقطة
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-chicken-orange text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shopping-bag text-2xl"></i>
              </div>
              <h3 className="font-cairo font-bold text-2xl text-chicken-black mb-2">
                {user.totalOrders}
              </h3>
              <p className="font-cairo text-gray-600">إجمالي الطلبات</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-teal-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-2xl"></i>
              </div>
              <h3 className="font-cairo font-bold text-2xl text-chicken-black mb-2">
                {user.favoriteItems}
              </h3>
              <p className="font-cairo text-gray-600">وجبة مفضلة</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-coins text-2xl"></i>
              </div>
              <h3 className="font-cairo font-bold text-2xl text-chicken-black mb-2">
                {user.loyaltyPoints}
              </h3>
              <p className="font-cairo text-gray-600">نقاط الولاء</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-star text-2xl"></i>
              </div>
              <h3 className="font-cairo font-bold text-2xl text-chicken-black mb-2">
                4.8
              </h3>
              <p className="font-cairo text-gray-600">متوسط التقييم</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="font-cairo">نظرة عامة</TabsTrigger>
            <TabsTrigger value="orders" className="font-cairo">طلباتي</TabsTrigger>
            <TabsTrigger value="loyalty" className="font-cairo">برنامج الولاء</TabsTrigger>
            <TabsTrigger value="profile" className="font-cairo">الملف الشخصي</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="font-cairo text-xl text-chicken-black">
                    <i className="fas fa-clock ml-2 text-chicken-orange"></i>
                    آخر الطلبات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-cairo font-semibold text-chicken-black">
                          طلب #{order.id}
                        </h4>
                        <p className="font-cairo text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString('ar-SA')}
                        </p>
                        <p className="font-cairo text-sm text-gray-600">
                          {order.items.join(", ")}
                        </p>
                      </div>
                      <div className="text-left">
                        {getStatusBadge(order.status)}
                        <p className="font-cairo font-bold text-chicken-orange mt-1">
                          {order.total} ريال
                        </p>
                      </div>
                    </div>
                  ))}
                  <Link href="/user-dashboard?tab=orders">
                    <Button variant="outline" className="w-full font-cairo">
                      عرض جميع الطلبات
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Loyalty Progress */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="font-cairo text-xl text-chicken-black">
                    <i className="fas fa-trophy ml-2 text-chicken-orange"></i>
                    تقدم برنامج الولاء
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-crown text-3xl"></i>
                    </div>
                    <h3 className="font-cairo font-bold text-lg text-chicken-black mb-2">
                      مستوى {user.loyaltyLevel}
                    </h3>
                    <p className="font-cairo text-gray-600">
                      {user.loyaltyPoints} من {user.nextLevelPoints} نقطة
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-cairo text-sm text-gray-600">التقدم للمستوى التالي:</span>
                      <span className="font-cairo text-sm font-bold text-chicken-orange">
                        {Math.round(loyaltyProgress)}%
                      </span>
                    </div>
                    <Progress value={loyaltyProgress} className="h-3" />
                    <p className="font-cairo text-xs text-gray-500 mt-2">
                      تحتاج {user.nextLevelPoints - user.loyaltyPoints} نقطة للوصول للمستوى البلاتيني
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-cairo font-semibold text-chicken-black">المزايا الحالية:</h4>
                    {loyaltyBenefits.filter(b => b.active).map((benefit, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <i className={`${benefit.icon} text-green-500 ml-2`}></i>
                        <span className="font-cairo text-gray-700">{benefit.title}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-chicken-orange text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-utensils text-2xl"></i>
                  </div>
                  <h3 className="font-cairo font-bold text-lg text-chicken-black mb-2">
                    اطلب الآن
                  </h3>
                  <p className="font-cairo text-gray-600 mb-4">
                    اختر من قائمة الطعام المتنوعة
                  </p>
                  <Link href="/menu">
                    <Button className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo">
                      تصفح القائمة
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-teal-50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-heart text-2xl"></i>
                  </div>
                  <h3 className="font-cairo font-bold text-lg text-chicken-black mb-2">
                    المفضلة
                  </h3>
                  <p className="font-cairo text-gray-600 mb-4">
                    اطلب من وجباتك المفضلة بسرعة
                  </p>
                  <Link href="/favorites">
                    <Button variant="outline" className="font-cairo">
                      عرض المفضلة
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-calendar text-2xl"></i>
                  </div>
                  <h3 className="font-cairo font-bold text-lg text-chicken-black mb-2">
                    احجز طاولة
                  </h3>
                  <p className="font-cairo text-gray-600 mb-4">
                    احجز طاولة لتجربة مميزة
                  </p>
                  <Link href="/reservations">
                    <Button variant="outline" className="font-cairo">
                      احجز الآن
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="font-cairo text-xl text-chicken-black">
                  سجل الطلبات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-cairo font-bold text-lg text-chicken-black">
                            طلب #{order.id}
                          </h3>
                          <p className="font-cairo text-gray-600">
                            {new Date(order.date).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                        <div className="text-left">
                          {getStatusBadge(order.status)}
                          <p className="font-cairo font-bold text-chicken-orange text-lg mt-1">
                            {order.total} ريال
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-cairo font-semibold text-chicken-black mb-2">الأصناف:</h4>
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item, index) => (
                            <Badge key={index} variant="outline" className="font-cairo">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          {order.rating && (
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <span className="font-cairo text-sm text-gray-600">تقييمك:</span>
                              {renderStars(order.rating)}
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-3 space-x-reverse">
                          <Button variant="outline" size="sm" className="font-cairo">
                            عرض التفاصيل
                          </Button>
                          {order.status === "delivered" && (
                            <Button variant="outline" size="sm" className="font-cairo">
                              إعادة الطلب
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loyalty Tab */}
          <TabsContent value="loyalty" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Benefits */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="font-cairo text-xl text-chicken-black">
                    المزايا الحالية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loyaltyBenefits.map((benefit, index) => (
                    <div key={index} className={`p-4 rounded-lg border-2 ${
                      benefit.active 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-start space-x-3 space-x-reverse">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          benefit.active 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <i className={benefit.icon}></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-cairo font-semibold text-chicken-black mb-1">
                            {benefit.title}
                          </h4>
                          <p className="font-cairo text-sm text-gray-600">
                            {benefit.description}
                          </p>
                          {!benefit.active && (
                            <Badge className="bg-yellow-500 text-white font-cairo mt-2">
                              متاح في المستوى البلاتيني
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Points History */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="font-cairo text-xl text-chicken-black">
                    سجل النقاط
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-cairo font-semibold text-green-800">ربح نقاط</p>
                        <p className="font-cairo text-sm text-green-600">طلب #CHK12345</p>
                      </div>
                      <span className="font-cairo font-bold text-green-600">+85 نقطة</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-cairo font-semibold text-red-800">استخدام نقاط</p>
                        <p className="font-cairo text-sm text-red-600">خصم على الطلب</p>
                      </div>
                      <span className="font-cairo font-bold text-red-600">-200 نقطة</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-cairo font-semibold text-blue-800">مكافأة الولاء</p>
                        <p className="font-cairo text-sm text-blue-600">الوصول للمستوى الذهبي</p>
                      </div>
                      <span className="font-cairo font-bold text-blue-600">+500 نقطة</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full font-cairo">
                    عرض السجل الكامل
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="font-cairo text-xl text-chicken-black">
                  معلومات الملف الشخصي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-cairo font-medium mb-2 text-gray-700">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full p-3 border border-gray-300 rounded-lg font-cairo bg-gray-50"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block font-cairo font-medium mb-2 text-gray-700">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full p-3 border border-gray-300 rounded-lg font-cairo bg-gray-50"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block font-cairo font-medium mb-2 text-gray-700">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={user.phone}
                      className="w-full p-3 border border-gray-300 rounded-lg font-cairo bg-gray-50"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block font-cairo font-medium mb-2 text-gray-700">
                      تاريخ الانضمام
                    </label>
                    <input
                      type="text"
                      value={new Date(user.joinDate).toLocaleDateString('ar-SA')}
                      className="w-full p-3 border border-gray-300 rounded-lg font-cairo bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3 space-x-reverse">
                  <Button className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo">
                    <i className="fas fa-edit ml-2"></i>
                    تعديل الملف الشخصي
                  </Button>
                  <Button variant="outline" className="font-cairo">
                    تغيير كلمة المرور
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
