
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { WebsiteSettings } from "@shared/schema";

export default function AboutPage() {
  const { data: settings } = useQuery<WebsiteSettings>({
    queryKey: ["/api/website-settings"],
  });

  const stats = [
    { number: "15+", label: "سنوات خبرة", icon: "fas fa-calendar", color: "text-blue-600" },
    { number: "100K+", label: "عميل سعيد", icon: "fas fa-users", color: "text-green-600" },
    { number: "500K+", label: "وجبة مقدمة", icon: "fas fa-utensils", color: "text-chicken-orange" },
    { number: "4.9", label: "تقييم العملاء", icon: "fas fa-star", color: "text-yellow-500" }
  ];

  const values = [
    {
      title: "الجودة أولاً",
      description: "نستخدم أجود المكونات الطازجة والطبيعية في جميع وجباتنا",
      icon: "fas fa-award",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "النكهة الأصيلة",
      description: "وصفات سرية متوارثة عبر الأجيال مع لمسة عصرية مميزة",
      icon: "fas fa-fire",
      color: "from-red-500 to-orange-500"
    },
    {
      title: "الخدمة السريعة",
      description: "التوصيل في أقل من 30 دقيقة مع ضمان الطعم الساخن",
      icon: "fas fa-shipping-fast",
      color: "from-green-500 to-green-600"
    },
    {
      title: "السعر المناسب",
      description: "أفضل الأسعار مع جودة لا تُضاهى وعروض مستمرة",
      icon: "fas fa-tag",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const team = [
    {
      name: "أحمد محمد",
      position: "الشيف التنفيذي",
      image: "/placeholder-chef.jpg",
      experience: "15 سنة خبرة",
      specialty: "متخصص في الدجاج المقرمش"
    },
    {
      name: "فاطمة أحمد",
      position: "مدير العمليات",
      image: "/placeholder-manager.jpg",
      experience: "10 سنوات خبرة",
      specialty: "إدارة الجودة والخدمة"
    },
    {
      name: "محمد علي",
      position: "مسؤول التوصيل",
      image: "/placeholder-delivery.jpg",
      experience: "8 سنوات خبرة",
      specialty: "ضمان التوصيل السريع"
    }
  ];

  const timeline = [
    {
      year: "2010",
      title: "البداية المتواضعة",
      description: "افتتاح أول فرع في حي النخيل بالرياض"
    },
    {
      year: "2015",
      title: "التوسع الأول",
      description: "افتتاح 5 فروع جديدة في مختلف أحياء الرياض"
    },
    {
      year: "2018",
      title: "الخدمة الرقمية",
      description: "إطلاق تطبيق التوصيل والطلبات الإلكترونية"
    },
    {
      year: "2020",
      title: "الانتشار الواسع",
      description: "الوصول إلى 25 فرع في المملكة العربية السعودية"
    },
    {
      year: "2024",
      title: "الحاضر والمستقبل",
      description: "أكثر من 50 فرع مع التطوير المستمر"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-chicken-orange via-orange-500 to-amber-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyIDZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNHptLTEyLTZjMC0yIDItNCA0LTRzNCwyIDQsNHMtMiw0LTQsNHMtNC0yLTQtNCIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-amiri text-5xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            قصة تشكن هات
          </h1>
          <p className="font-cairo text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
            رحلة من الشغف والتميز في عالم الطعام السريع الصحي واللذيذ
          </p>
          <div className="flex justify-center space-x-6 space-x-reverse animate-fadeInUp animation-delay-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-heart text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">صُنع بحب</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-leaf text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">مكونات طبيعية</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-smile text-2xl"></i>
              </div>
              <p className="font-cairo font-bold">عملاء سعداء</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i className={`${stat.icon} text-3xl ${stat.color}`}></i>
                </div>
                <div className="font-amiri text-4xl font-bold text-chicken-black mb-2">
                  {stat.number}
                </div>
                <div className="font-cairo text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="font-amiri text-4xl md:text-5xl font-bold text-chicken-black mb-6">
                  قصتنا
                </h2>
                <div className="w-24 h-1 bg-chicken-orange rounded-full mb-8"></div>
              </div>

              <p className="font-cairo text-lg text-gray-700 leading-relaxed">
                بدأت قصة تشكن هات في عام 2010 بحلم بسيط: تقديم أفضل وجبات الدجاج في المنطقة. 
                من فرع صغير في حي النخيل إلى شبكة من أكثر من 50 فرع في جميع أنحاء المملكة.
              </p>

              <p className="font-cairo text-lg text-gray-700 leading-relaxed">
                لم نكتف بتقديم الطعام فحسب، بل سعينا لخلق تجربة متكاملة تجمع بين الجودة العالية، 
                والخدمة المميزة، والأسعار المناسبة. كل وجبة نقدمها هي نتيجة سنوات من البحث والتطوير.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="text-2xl font-bold text-chicken-orange font-amiri mb-1">2010</div>
                  <div className="font-cairo text-sm text-gray-600">سنة التأسيس</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="text-2xl font-bold text-chicken-orange font-amiri mb-1">50+</div>
                  <div className="font-cairo text-sm text-gray-600">فرع في المملكة</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/placeholder-restaurant1.jpg"
                  alt="مطعم تشكن هات"
                  className="rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300"
                />
                <img
                  src="/placeholder-restaurant2.jpg"
                  alt="فريق العمل"
                  className="rounded-2xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300 mt-8"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-chicken-orange rounded-full flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <i className="fas fa-trophy text-2xl mb-2"></i>
                  <div className="font-cairo text-xs font-bold">الأفضل دائماً</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-amiri text-4xl md:text-5xl font-bold text-chicken-black mb-6">
              قيمنا ومبادئنا
            </h2>
            <p className="font-cairo text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              نؤمن بأن النجاح الحقيقي يأتي من الالتزام بالقيم والمبادئ الأصيلة
            </p>
            <div className="w-24 h-1 bg-chicken-orange mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className={`h-32 bg-gradient-to-br ${value.color} text-white flex items-center justify-center`}>
                    <i className={`${value.icon} text-4xl`}></i>
                  </div>
                  <div className="p-6">
                    <h3 className="font-cairo font-bold text-xl text-chicken-black mb-3">
                      {value.title}
                    </h3>
                    <p className="font-cairo text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-amiri text-4xl md:text-5xl font-bold text-chicken-black mb-6">
              رحلة النجاح
            </h2>
            <p className="font-cairo text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              مراحل مهمة في تاريخ تشكن هات ونموها المستمر
            </p>
            <div className="w-24 h-1 bg-chicken-orange mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-chicken-orange"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:space-x-8 space-y-4 lg:space-y-0`}>
                  <div className="lg:w-1/2">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        <Badge className="bg-chicken-orange text-white font-cairo mb-4">
                          {item.year}
                        </Badge>
                        <h3 className="font-cairo font-bold text-xl text-chicken-black mb-3">
                          {item.title}
                        </h3>
                        <p className="font-cairo text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="w-4 h-4 bg-chicken-orange rounded-full border-4 border-white shadow-lg relative z-10"></div>
                  
                  <div className="lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-amiri text-4xl md:text-5xl font-bold text-chicken-black mb-6">
              فريق العمل
            </h2>
            <p className="font-cairo text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              نفخر بفريق عمل محترف ومتفان يسعى دائماً لتقديم الأفضل
            </p>
            <div className="w-24 h-1 bg-chicken-orange mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="aspect-square bg-gray-200 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-cairo font-bold text-xl text-chicken-black mb-2">
                    {member.name}
                  </h3>
                  <p className="font-cairo text-chicken-orange font-semibold mb-2">
                    {member.position}
                  </p>
                  <p className="font-cairo text-gray-600 text-sm mb-2">
                    {member.experience}
                  </p>
                  <p className="font-cairo text-gray-500 text-sm">
                    {member.specialty}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-chicken-orange to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-amiri text-4xl md:text-5xl font-bold mb-6">
            انضم إلى رحلتنا
          </h2>
          <p className="font-cairo text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            كن جزءاً من قصة نجاح تشكن هات واستمتع بأفضل تجربة طعام
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu">
              <Button className="bg-white text-chicken-orange hover:bg-gray-100 font-cairo text-lg px-8 py-3 rounded-full shadow-lg">
                <i className="fas fa-utensils ml-2"></i>
                اكتشف قائمة الطعام
              </Button>
            </Link>
            <Link href="/reservations">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-chicken-orange font-cairo text-lg px-8 py-3 rounded-full">
                <i className="fas fa-calendar-alt ml-2"></i>
                احجز طاولة
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
