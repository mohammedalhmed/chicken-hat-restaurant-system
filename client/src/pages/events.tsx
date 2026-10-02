
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const upcomingEvents = [
    {
      id: 1,
      title: "مهرجان الدجاج المقرمش",
      description: "احتفالية كبيرة بأشهى أنواع الدجاج المقرمش مع عروض خاصة وفقرات ترفيهية",
      date: "2024-12-20",
      time: "18:00",
      duration: "4 ساعات",
      location: "فرع النخيل الرئيسي",
      image: "/uploads/general/1754663879290-656252803.jpg",
      type: "festival",
      price: "مجاني",
      capacity: 200,
      registered: 150,
      isHot: true,
      features: ["عروض مباشرة", "مسابقات", "جوائز قيمة", "طعام مجاني"]
    },
    {
      id: 2,
      title: "ورشة طبخ الدجاج",
      description: "تعلم أسرار طبخ الدجاج المقرمش مع الشيف التنفيذي للمطعم",
      date: "2024-12-22",
      time: "15:00",
      duration: "3 ساعات",
      location: "مطبخ التدريب - فرع العليا",
      image: "/uploads/general/1754663924679-454854765.jpg",
      type: "workshop",
      price: "50 ريال",
      capacity: 20,
      registered: 18,
      isHot: false,
      features: ["تدريب عملي", "شهادة حضور", "وجبة مجانية", "كتيب الوصفات"]
    },
    {
      id: 3,
      title: "يوم الأطفال المرح",
      description: "يوم مليء بالمرح والألعاب والأنشطة الترفيهية للأطفال",
      date: "2024-12-25",
      time: "10:00",
      duration: "6 ساعات",
      location: "جميع الفروع",
      image: "/uploads/general/1754663967206-46919532.jpg",
      type: "kids",
      price: "مجاني للأطفال",
      capacity: 500,
      registered: 420,
      isHot: true,
      features: ["ألعاب تفاعلية", "مهرجين", "رسم على الوجه", "هدايا مجانية"]
    },
    {
      id: 4,
      title: "ليلة الشواء الخاصة",
      description: "أمسية مميزة مع أشهى أنواع الدجاج المشوي في جو عائلي رائع",
      date: "2024-12-27",
      time: "19:00",
      duration: "4 ساعات",
      location: "حديقة فرع الملز",
      image: "/uploads/general/1754663986841-882257712.jpg",
      type: "dining",
      price: "80 ريال للشخص",
      capacity: 100,
      registered: 75,
      isHot: false,
      features: ["بوفيه مفتوح", "موسيقى حية", "ألعاب نارية", "جلسات خارجية"]
    },
    {
      id: 5,
      title: "مسابقة أسرع أكل",
      description: "مسابقة ممتعة لأسرع من يتناول وجبة الدجاج مع جوائز قيمة",
      date: "2024-12-30",
      time: "16:00",
      duration: "2 ساعة",
      location: "ساحة فرع النخيل",
      image: "/uploads/general/1754664044334-990935200.png",
      type: "competition",
      price: "مجاني",
      capacity: 50,
      registered: 45,
      isHot: true,
      features: ["جوائز نقدية", "شهادات فوز", "وجبات مجانية", "تغطية إعلامية"]
    }
  ];

  const eventTypes = [
    { type: "all", name: "جميع الأحداث", icon: "fas fa-calendar", color: "bg-gray-100" },
    { type: "festival", name: "مهرجانات", icon: "fas fa-star", color: "bg-yellow-100" },
    { type: "workshop", name: "ورش عمل", icon: "fas fa-chalkboard-teacher", color: "bg-blue-100" },
    { type: "kids", name: "أحداث الأطفال", icon: "fas fa-child", color: "bg-green-100" },
    { type: "dining", name: "عشاء خاص", icon: "fas fa-utensils", color: "bg-orange-100" },
    { type: "competition", name: "مسابقات", icon: "fas fa-trophy", color: "bg-red-100" }
  ];

  const [selectedType, setSelectedType] = useState("all");

  const filteredEvents = selectedType === "all" 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.type === selectedType);

  const getEventIcon = (type: string) => {
    const eventType = eventTypes.find(t => t.type === type);
    return eventType?.icon || "fas fa-calendar-alt";
  };

  const getAvailabilityPercentage = (registered: number, capacity: number) => {
    return (registered / capacity) * 100;
  };

  const getAvailabilityStatus = (registered: number, capacity: number) => {
    const percentage = getAvailabilityPercentage(registered, capacity);
    if (percentage >= 95) return { text: "مكتمل تقريباً", color: "text-red-600" };
    if (percentage >= 80) return { text: "أماكن قليلة متبقية", color: "text-orange-600" };
    if (percentage >= 50) return { text: "أماكن متوفرة", color: "text-green-600" };
    return { text: "أماكن كثيرة متوفرة", color: "text-blue-600" };
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyIDZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyLTZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNCIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-amiri text-5xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            الأحداث والفعاليات
          </h1>
          <p className="font-cairo text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
            انضم إلينا في أحداث مميزة وفعاليات ممتعة لجميع أفراد العائلة
          </p>
          <div className="flex justify-center space-x-6 space-x-reverse animate-fadeInUp animation-delay-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-users text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">أحداث عائلية</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-gift text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">جوائز قيمة</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-heart text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">ذكريات لا تُنسى</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Event Types Filter */}
        <div className="mb-12">
          <h2 className="font-amiri text-3xl font-bold text-chicken-black mb-8 text-center">
            اختر نوع الحدث
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {eventTypes.map((type) => (
              <Button
                key={type.type}
                variant={selectedType === type.type ? "default" : "outline"}
                onClick={() => setSelectedType(type.type)}
                className={`h-20 flex flex-col items-center justify-center space-y-2 font-cairo transition-all duration-300 ${
                  selectedType === type.type
                    ? "bg-chicken-orange hover:bg-orange-600 text-white shadow-lg scale-105"
                    : "hover:bg-orange-50 hover:border-chicken-orange hover:scale-105"
                }`}
              >
                <i className={`${type.icon} text-lg`}></i>
                <span className="text-xs font-medium">{type.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Events List */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map((event) => {
                const availability = getAvailabilityStatus(event.registered, event.capacity);
                
                return (
                  <Card key={event.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white">
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Event Type Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-800 font-cairo">
                          <i className={`${getEventIcon(event.type)} ml-1`}></i>
                          {eventTypes.find(t => t.type === event.type)?.name}
                        </Badge>
                      </div>

                      {/* Hot Badge */}
                      {event.isHot && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-red-500 text-white font-cairo animate-pulse">
                            <i className="fas fa-fire ml-1"></i>
                            الأكثر طلباً
                          </Badge>
                        </div>
                      )}

                      {/* Date Overlay */}
                      <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg">
                        <div className="text-center">
                          <div className="font-bold text-lg">{new Date(event.date).getDate()}</div>
                          <div className="text-xs">{format(new Date(event.date), 'MMM', { locale: ar })}</div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="font-cairo font-bold text-xl text-chicken-black mb-3 group-hover:text-chicken-orange transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="font-cairo text-gray-600 mb-4 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Event Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <i className="fas fa-calendar ml-2 text-chicken-orange"></i>
                          <span className="font-cairo">{event.date}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <i className="fas fa-clock ml-2 text-chicken-orange"></i>
                          <span className="font-cairo">{event.time} ({event.duration})</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <i className="fas fa-map-marker-alt ml-2 text-chicken-orange"></i>
                          <span className="font-cairo">{event.location}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <i className="fas fa-tag ml-2 text-chicken-orange"></i>
                          <span className="font-cairo font-semibold">{event.price}</span>
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-cairo text-sm text-gray-600">المسجلين:</span>
                          <span className={`font-cairo text-sm font-bold ${availability.color}`}>
                            {event.registered} / {event.capacity}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-chicken-orange h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getAvailabilityPercentage(event.registered, event.capacity)}%` }}
                          ></div>
                        </div>
                        <span className={`font-cairo text-xs ${availability.color}`}>
                          {availability.text}
                        </span>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="font-cairo font-semibold text-sm text-gray-700 mb-2">مميزات الحدث:</h4>
                        <div className="flex flex-wrap gap-1">
                          {event.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs font-cairo">
                              {feature}
                            </Badge>
                          ))}
                          {event.features.length > 3 && (
                            <Badge variant="outline" className="text-xs font-cairo">
                              +{event.features.length - 3} المزيد
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Register Button */}
                      <Button 
                        className="w-full bg-chicken-orange hover:bg-orange-600 text-white font-cairo transition-all duration-300"
                        disabled={event.registered >= event.capacity}
                      >
                        {event.registered >= event.capacity ? (
                          <>
                            <i className="fas fa-times ml-2"></i>
                            مكتمل
                          </>
                        ) : (
                          <>
                            <i className="fas fa-user-plus ml-2"></i>
                            سجل الآن
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Calendar */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="font-cairo text-lg text-chicken-black">
                    <i className="fas fa-calendar-alt ml-2 text-chicken-orange"></i>
                    التقويم
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    locale={ar}
                    className="rounded-md"
                  />
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="font-cairo text-lg text-chicken-black">
                    <i className="fas fa-chart-bar ml-2 text-chicken-orange"></i>
                    إحصائيات سريعة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-chicken-orange font-amiri">
                      {upcomingEvents.length}
                    </div>
                    <div className="text-sm font-cairo text-gray-600">أحداث قادمة</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 font-amiri">
                      {upcomingEvents.reduce((sum, event) => sum + event.registered, 0)}
                    </div>
                    <div className="text-sm font-cairo text-gray-600">مسجل إجمالي</div>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 font-amiri">
                      {upcomingEvents.filter(event => event.price === "مجاني").length}
                    </div>
                    <div className="text-sm font-cairo text-gray-600">أحداث مجانية</div>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-chicken-orange to-orange-600 text-white">
                <CardContent className="p-6 text-center">
                  <i className="fas fa-bell text-3xl mb-4"></i>
                  <h3 className="font-cairo font-bold text-lg mb-2">
                    تنبيهات الأحداث
                  </h3>
                  <p className="font-cairo text-sm mb-4">
                    احصل على تنبيهات فورية عند إضافة أحداث جديدة
                  </p>
                  <Button className="bg-white text-chicken-orange hover:bg-gray-100 font-cairo text-sm">
                    <i className="fas fa-plus ml-2"></i>
                    اشترك الآن
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
