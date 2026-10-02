
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "تم تأكيد طلبك",
      message: "تم تأكيد طلب رقم #CHK12345 وهو قيد التحضير الآن",
      time: "منذ 5 دقائق",
      read: false,
      icon: "fas fa-check-circle",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 2,
      type: "offer",
      title: "عرض خاص لك!",
      message: "خصم 30% على جميع الوجبات العائلية حتى نهاية الأسبوع",
      time: "منذ ساعة",
      read: false,
      icon: "fas fa-percentage",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: 3,
      type: "delivery",
      title: "السائق في الطريق",
      message: "السائق أحمد في طريقه إليك ووقت الوصول المتوقع 10 دقائق",
      time: "منذ 3 ساعات",
      read: true,
      icon: "fas fa-shipping-fast",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 4,
      type: "loyalty",
      title: "مبروك! وصلت لمستوى جديد",
      message: "لقد وصلت إلى مستوى الذهبي في برنامج الولاء واكتسبت 100 نقطة",
      time: "أمس",
      read: true,
      icon: "fas fa-crown",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      id: 5,
      type: "review",
      title: "شاركنا رأيك",
      message: "كيف كانت تجربتك مع طلبك الأخير؟ نحن نقدر ملاحظاتك",
      time: "أمس",
      read: false,
      icon: "fas fa-star",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ]);

  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: true,
    deliveryUpdates: true,
    loyaltyUpdates: true,
    reviewReminders: false,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const notificationTypes = [
    { type: "all", label: "جميع الإشعارات", count: notifications.length },
    { type: "order", label: "الطلبات", count: notifications.filter(n => n.type === "order").length },
    { type: "offer", label: "العروض", count: notifications.filter(n => n.type === "offer").length },
    { type: "delivery", label: "التوصيل", count: notifications.filter(n => n.type === "delivery").length },
    { type: "loyalty", label: "الولاء", count: notifications.filter(n => n.type === "loyalty").length }
  ];

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyIDZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyLTZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNCIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-amiri text-5xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            الإشعارات
          </h1>
          <p className="font-cairo text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
            ابق على اطلاع دائم بآخر تحديثات طلباتك والعروض الخاصة
          </p>
          <div className="flex justify-center space-x-6 space-x-reverse animate-fadeInUp animation-delay-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-bell text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">{unreadCount} غير مقروء</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-envelope text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">تحديثات فورية</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-cog text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">إعدادات مخصصة</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Tabs defaultValue="notifications" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notifications" className="font-cairo">
              الإشعارات ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="settings" className="font-cairo">
              الإعدادات
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            {/* Header Actions */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-cairo font-bold text-xl text-chicken-black">
                      إشعاراتك
                    </h2>
                    <p className="font-cairo text-gray-600">
                      لديك {unreadCount} إشعار غير مقروء
                    </p>
                  </div>
                  <div className="flex space-x-3 space-x-reverse">
                    <Button
                      variant="outline"
                      onClick={markAllAsRead}
                      disabled={unreadCount === 0}
                      className="font-cairo"
                    >
                      <i className="fas fa-check-double ml-2"></i>
                      تحديد الكل كمقروء
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Types Filter */}
            <div className="flex flex-wrap gap-3">
              {notificationTypes.map((type) => (
                <Button
                  key={type.type}
                  variant="outline"
                  className="font-cairo"
                >
                  {type.label} ({type.count})
                </Button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'bg-white'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${notification.bgColor}`}>
                        <i className={`${notification.icon} text-lg ${notification.color}`}></i>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-cairo font-bold text-lg text-chicken-black">
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <span className="font-cairo text-sm text-gray-500">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                        
                        <p className="font-cairo text-gray-700 leading-relaxed mb-3">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className={`font-cairo ${notification.color}`}
                          >
                            {notification.type === "order" && "طلب"}
                            {notification.type === "offer" && "عرض"}
                            {notification.type === "delivery" && "توصيل"}
                            {notification.type === "loyalty" && "ولاء"}
                            {notification.type === "review" && "تقييم"}
                          </Badge>
                          
                          <div className="flex space-x-2 space-x-reverse">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="font-cairo text-blue-600 hover:text-blue-800"
                              >
                                <i className="fas fa-eye ml-1"></i>
                                تحديد كمقروء
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="font-cairo text-red-600 hover:text-red-800"
                            >
                              <i className="fas fa-trash ml-1"></i>
                              حذف
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {notifications.length === 0 && (
              <Card className="text-center py-16 shadow-lg border-0">
                <CardContent>
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-bell-slash text-4xl text-gray-400"></i>
                  </div>
                  <h3 className="font-cairo font-bold text-xl text-gray-800 mb-4">
                    لا توجد إشعارات
                  </h3>
                  <p className="font-cairo text-gray-600">
                    ستظهر هنا جميع إشعاراتك عندما تتوفر
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="font-cairo text-xl text-chicken-black">
                  <i className="fas fa-cog ml-2 text-chicken-orange"></i>
                  إعدادات الإشعارات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Notification Types */}
                <div>
                  <h3 className="font-cairo font-bold text-lg text-chicken-black mb-4">
                    أنواع الإشعارات
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-cairo font-semibold text-chicken-black">
                          تحديثات الطلبات
                        </h4>
                        <p className="font-cairo text-sm text-gray-600">
                          احصل على تحديثات فورية حول حالة طلباتك
                        </p>
                      </div>
                      <Switch
                        checked={settings.orderUpdates}
                        onCheckedChange={(checked) => updateSetting('orderUpdates', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-cairo font-semibold text-chicken-black">
                          العروض والخصومات
                        </h4>
                        <p className="font-cairo text-sm text-gray-600">
                          تلقى إشعارات بأحدث العروض والخصومات الحصرية
                        </p>
                      </div>
                      <Switch
                        checked={settings.promotions}
                        onCheckedChange={(checked) => updateSetting('promotions', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-cairo font-semibold text-chicken-black">
                          تحديثات التوصيل
                        </h4>
                        <p className="font-cairo text-sm text-gray-600">
                          تتبع حالة التوصيل ووقت الوصول المتوقع
                        </p>
                      </div>
                      <Switch
                        checked={settings.deliveryUpdates}
                        onCheckedChange={(checked) => updateSetting('deliveryUpdates', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-cairo font-semibold text-chicken-black">
                          برنامج الولاء
                        </h4>
                        <p className="font-cairo text-sm text-gray-600">
                          إشعارات حول النقاط والمستويات والمكافآت
                        </p>
                      </div>
                      <Switch
                        checked={settings.loyaltyUpdates}
                        onCheckedChange={(checked) => updateSetting('loyaltyUpdates', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-cairo font-semibold text-chicken-black">
                          تذكير التقييم
                        </h4>
                        <p className="font-cairo text-sm text-gray-600">
                          تذكيرات لتقييم تجربتك مع طلباتك
                        </p>
                      </div>
                      <Switch
                        checked={settings.reviewReminders}
                        onCheckedChange={(checked) => updateSetting('reviewReminders', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Methods */}
                <div>
                  <h3 className="font-cairo font-bold text-lg text-chicken-black mb-4">
                    طرق التوصيل
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-cairo font-semibold text-chicken-black">
                          إشعارات البريد الإلكتروني
                        </h4>
                        <p className="font-cairo text-sm text-gray-600">
                          تلقى الإشعارات عبر البريد الإلكتروني
                        </p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-cairo font-semibold text-chicken-black">
                          الإشعارات الفورية
                        </h4>
                        <p className="font-cairo text-sm text-gray-600">
                          إشعارات فورية على الموقع والتطبيق
                        </p>
                      </div>
                      <Switch
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-cairo font-semibold text-chicken-black">
                          الرسائل النصية SMS
                        </h4>
                        <p className="font-cairo text-sm text-gray-600">
                          تلقى إشعارات مهمة عبر الرسائل النصية
                        </p>
                      </div>
                      <Switch
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Save Settings */}
                <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t">
                  <Button
                    variant="outline"
                    className="font-cairo"
                  >
                    إعادة تعيين
                  </Button>
                  <Button
                    className="bg-chicken-orange hover:bg-orange-600 text-white font-cairo"
                  >
                    <i className="fas fa-save ml-2"></i>
                    حفظ الإعدادات
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
