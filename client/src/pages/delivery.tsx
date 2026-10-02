
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DeliveryPage() {
  const [selectedArea, setSelectedArea] = useState("");
  const [trackingCode, setTrackingCode] = useState("");

  const deliveryAreas = [
    {
      id: 1,
      name: "النخيل",
      deliveryTime: "20-30 دقيقة",
      deliveryFee: 8,
      minOrder: 25,
      available: true,
      zones: ["النخيل الشمالي", "النخيل الجنوبي", "النخيل الغربي"]
    },
    {
      id: 2,
      name: "العليا", 
      deliveryTime: "25-35 دقيقة",
      deliveryFee: 10,
      minOrder: 30,
      available: true,
      zones: ["العليا التجاري", "برج العليا", "حي السفارات"]
    },
    {
      id: 3,
      name: "الملز",
      deliveryTime: "30-40 دقيقة", 
      deliveryFee: 12,
      minOrder: 35,
      available: true,
      zones: ["الملز الجنوبي", "الملز الشمالي", "ضاحية الملز"]
    },
    {
      id: 4,
      name: "الريان",
      deliveryTime: "35-45 دقيقة",
      deliveryFee: 15,
      minOrder: 40,
      available: false,
      zones: ["الريان", "المنصورة", "الصحافة"]
    }
  ];

  const deliverySteps = [
    {
      id: 1,
      title: "تأكيد الطلب",
      description: "نتلقى طلبك ونقوم بمراجعته فوراً",
      icon: "fas fa-check-circle",
      time: "فوري"
    },
    {
      id: 2,
      title: "تحضير الطعام",
      description: "طاقم المطبخ يحضر طلبك بعناية فائقة",
      icon: "fas fa-utensils",
      time: "10-15 دقيقة"
    },
    {
      id: 3,
      title: "تجهيز التوصيل",
      description: "نقوم بتغليف طلبك وتحضيره للتوصيل",
      icon: "fas fa-box",
      time: "5 دقائق"
    },
    {
      id: 4,
      title: "في الطريق",
      description: "سائق التوصيل في طريقه إليك",
      icon: "fas fa-motorcycle",
      time: "10-25 دقيقة"
    }
  ];

  const trackingStatuses = [
    { status: "confirmed", label: "تم تأكيد الطلب", color: "bg-blue-500" },
    { status: "preparing", label: "قيد التحضير", color: "bg-yellow-500" },
    { status: "ready", label: "جاهز للتوصيل", color: "bg-orange-500" },
    { status: "on_way", label: "في الطريق", color: "bg-purple-500" },
    { status: "delivered", label: "تم التوصيل", color: "bg-green-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-teal-500 to-blue-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyIDZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyLTZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNCIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-amiri text-5xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            خدمة التوصيل
          </h1>
          <p className="font-cairo text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
            نوصل لك أشهى الوجبات ساخنة ولذيذة حتى باب منزلك
          </p>
          <div className="flex justify-center space-x-6 space-x-reverse animate-fadeInUp animation-delay-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-shipping-fast text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">توصيل سريع</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-thermometer-half text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">طعام ساخن</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-map-marker-alt text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">تتبع مباشر</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Tabs defaultValue="areas" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="areas" className="font-cairo">مناطق التوصيل</TabsTrigger>
            <TabsTrigger value="tracking" className="font-cairo">تتبع الطلب</TabsTrigger>
            <TabsTrigger value="process" className="font-cairo">كيف نعمل</TabsTrigger>
          </TabsList>

          {/* Delivery Areas */}
          <TabsContent value="areas" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-amiri text-3xl font-bold text-chicken-black mb-4">
                مناطق التوصيل المتاحة
              </h2>
              <p className="font-cairo text-gray-600 text-lg">
                نوصل لجميع المناطق التالية بأسرع وقت ممكن
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliveryAreas.map((area) => (
                <Card key={area.id} className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  area.available ? 'bg-white' : 'bg-gray-100'
                }`}>
                  {!area.available && (
                    <div className="absolute inset-0 bg-gray-500/20 z-10 flex items-center justify-center">
                      <Badge className="bg-red-500 text-white font-cairo">
                        غير متاح حالياً
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      area.available ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <i className="fas fa-map-marker-alt text-2xl"></i>
                    </div>
                    <CardTitle className="font-cairo text-xl text-chicken-black">
                      {area.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-cairo text-gray-600">وقت التوصيل:</span>
                      <span className="font-cairo font-semibold">{area.deliveryTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-cairo text-gray-600">رسوم التوصيل:</span>
                      <span className="font-cairo font-semibold text-chicken-orange">{area.deliveryFee} ريال</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-cairo text-gray-600">الحد الأدنى:</span>
                      <span className="font-cairo font-semibold">{area.minOrder} ريال</span>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <h4 className="font-cairo font-semibold text-sm text-gray-700 mb-2">الأحياء المشمولة:</h4>
                      <div className="space-y-1">
                        {area.zones.map((zone, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <i className="fas fa-check text-green-500 ml-2"></i>
                            <span className="font-cairo">{zone}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {area.available && (
                      <Button className="w-full bg-chicken-orange hover:bg-orange-600 text-white font-cairo">
                        <i className="fas fa-shopping-cart ml-2"></i>
                        اطلب الآن
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Order Tracking */}
          <TabsContent value="tracking" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-amiri text-3xl font-bold text-chicken-black mb-4">
                تتبع طلبك
              </h2>
              <p className="font-cairo text-gray-600 text-lg">
                أدخل رقم الطلب لمعرفة حالة التوصيل
              </p>
            </div>

            <Card className="max-w-2xl mx-auto shadow-lg border-0">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block font-cairo font-medium mb-3 text-gray-700">
                      رقم الطلب
                    </label>
                    <div className="flex space-x-3 space-x-reverse">
                      <Input
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                        placeholder="أدخل رقم الطلب (مثال: CHK123456)"
                        className="flex-1 font-cairo"
                      />
                      <Button className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo px-6">
                        <i className="fas fa-search ml-2"></i>
                        تتبع
                      </Button>
                    </div>
                  </div>

                  {trackingCode && (
                    <div className="mt-8 p-6 bg-green-50 rounded-lg border-r-4 border-green-500">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-cairo font-bold text-lg text-chicken-black">
                          طلب رقم: {trackingCode}
                        </h3>
                        <Badge className="bg-green-500 text-white font-cairo">
                          في الطريق
                        </Badge>
                      </div>
                      
                      <div className="space-y-4">
                        {trackingStatuses.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 space-x-reverse">
                            <div className={`w-3 h-3 rounded-full ${
                              index <= 2 ? item.color : 'bg-gray-300'
                            }`}></div>
                            <span className={`font-cairo text-sm ${
                              index <= 2 ? 'text-gray-900 font-semibold' : 'text-gray-500'
                            }`}>
                              {item.label}
                            </span>
                            {index === 2 && (
                              <Badge className="bg-orange-500 text-white font-cairo text-xs">
                                الحالي
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-white rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-cairo font-semibold text-chicken-black">السائق: أحمد محمد</h4>
                            <p className="font-cairo text-sm text-gray-600">وقت التوصيل المتوقع: 15 دقيقة</p>
                          </div>
                          <Button variant="outline" size="sm" className="font-cairo">
                            <i className="fas fa-phone ml-2"></i>
                            اتصال
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Process */}
          <TabsContent value="process" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-amiri text-3xl font-bold text-chicken-black mb-4">
                كيف تعمل خدمة التوصيل
              </h2>
              <p className="font-cairo text-gray-600 text-lg">
                عملية بسيطة ومضمونة لتوصيل طلبك
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {deliverySteps.map((step, index) => (
                <Card key={step.id} className="text-center shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-chicken-orange text-white rounded-full flex items-center justify-center mx-auto">
                        <i className={`${step.icon} text-2xl`}></i>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-chicken-orange rounded-full flex items-center justify-center">
                        <span className="font-bold text-chicken-orange">{step.id}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-cairo font-bold text-lg text-chicken-black mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="font-cairo text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <Badge variant="outline" className="font-cairo">
                      <i className="fas fa-clock ml-1"></i>
                      {step.time}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Delivery Guarantee */}
            <Card className="mt-12 shadow-xl border-0 bg-gradient-to-br from-green-50 to-blue-50">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-shield-alt text-3xl"></i>
                </div>
                
                <h3 className="font-amiri text-2xl font-bold text-chicken-black mb-4">
                  ضمان الجودة والوقت
                </h3>
                
                <p className="font-cairo text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
                  نضمن لك وصول طلبك في الوقت المحدد وبأفضل جودة. إذا تأخر طلبك عن الوقت المتوقع، نقدم لك خصم على طلبك التالي.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-temperature-hot"></i>
                    </div>
                    <h4 className="font-cairo font-semibold text-chicken-black mb-1">طعام ساخن</h4>
                    <p className="font-cairo text-sm text-gray-600">نستخدم حقائب حرارية متطورة</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-clock"></i>
                    </div>
                    <h4 className="font-cairo font-semibold text-chicken-black mb-1">توصيل سريع</h4>
                    <p className="font-cairo text-sm text-gray-600">أقصى وقت توصيل 45 دقيقة</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 text-chicken-orange rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-headset"></i>
                    </div>
                    <h4 className="font-cairo font-semibold text-chicken-black mb-1">دعم 24/7</h4>
                    <p className="font-cairo text-sm text-gray-600">خدمة عملاء متاحة طوال الوقت</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
