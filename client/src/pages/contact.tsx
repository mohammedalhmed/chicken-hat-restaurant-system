
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      toast({
        title: "تم إرسال رسالتك بنجاح!",
        description: "سنتواصل معك في أقرب وقت ممكن",
        variant: "default",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "خطأ في إرسال الرسالة",
        description: "حدث خطأ، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "العنوان",
      details: ["الرياض، حي النخيل", "شارع الملك فهد، مبنى رقم 123"],
      color: "text-red-600"
    },
    {
      icon: "fas fa-phone",
      title: "الهاتف",
      details: ["0123456789", "920123456"],
      color: "text-green-600"
    },
    {
      icon: "fas fa-envelope",
      title: "البريد الإلكتروني",
      details: ["info@chickenhat.com", "support@chickenhat.com"],
      color: "text-blue-600"
    },
    {
      icon: "fas fa-clock",
      title: "ساعات العمل",
      details: ["السبت - الخميس: 10:00 - 23:00", "الجمعة: 14:00 - 23:00"],
      color: "text-purple-600"
    }
  ];

  const branches = [
    {
      name: "فرع النخيل الرئيسي",
      address: "حي النخيل، شارع الملك فهد",
      phone: "0112345678",
      hours: "10:00 - 23:00",
      features: ["توصيل", "صالة طعام", "مواقف سيارات"]
    },
    {
      name: "فرع العليا",
      address: "حي العليا، طريق الملك عبدالعزيز",
      phone: "0112345679",
      hours: "10:00 - 23:00",
      features: ["توصيل", "صالة طعام", "دراع الاستقبال"]
    },
    {
      name: "فرع الملز",
      address: "حي الملز، شارع العروبة",
      phone: "0112345680",
      hours: "10:00 - 23:00",
      features: ["توصيل فقط"]
    }
  ];

  const socialMedia = [
    { platform: "Instagram", icon: "fab fa-instagram", url: "#", color: "text-pink-600" },
    { platform: "Twitter", icon: "fab fa-twitter", url: "#", color: "text-blue-400" },
    { platform: "Facebook", icon: "fab fa-facebook", url: "#", color: "text-blue-600" },
    { platform: "TikTok", icon: "fab fa-tiktok", url: "#", color: "text-black" },
    { platform: "Snapchat", icon: "fab fa-snapchat", url: "#", color: "text-yellow-400" },
    { platform: "WhatsApp", icon: "fab fa-whatsapp", url: "#", color: "text-green-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-chicken-orange via-orange-500 to-amber-500 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-amiri text-5xl md:text-6xl font-bold mb-6">
            تواصل معنا
          </h1>
          <p className="font-cairo text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            نحن هنا للإجابة على جميع استفساراتكم وتلقي اقتراحاتكم القيمة
          </p>
          <div className="flex justify-center space-x-6 space-x-reverse">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-headset text-2xl"></i>
              </div>
              <p className="font-cairo">خدمة عملاء 24/7</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-reply text-2xl"></i>
              </div>
              <p className="font-cairo">رد سريع</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-smile text-2xl"></i>
              </div>
              <p className="font-cairo">خدمة مميزة</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="font-amiri text-3xl text-chicken-black">
                  <i className="fas fa-envelope ml-3 text-chicken-orange"></i>
                  أرسل لنا رسالة
                </CardTitle>
                <p className="font-cairo text-gray-600 mt-2">
                  املأ النموذج أدناه وسنتواصل معك في أقرب وقت
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                        الاسم الكامل *
                      </label>
                      <Input
                        type="text"
                        placeholder="أدخل اسمك الكامل"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="font-cairo"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                        رقم الهاتف *
                      </label>
                      <Input
                        type="tel"
                        placeholder="05xxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="font-cairo"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                      البريد الإلكتروني *
                    </label>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="font-cairo"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                      موضوع الرسالة *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg font-cairo focus:border-chicken-orange focus:ring-2 focus:ring-chicken-orange/50 transition-all duration-300"
                      required
                    >
                      <option value="">اختر موضوع الرسالة</option>
                      <option value="complaint">شكوى</option>
                      <option value="suggestion">اقتراح</option>
                      <option value="inquiry">استفسار عام</option>
                      <option value="partnership">شراكة</option>
                      <option value="franchise">امتياز تجاري</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                      الرسالة *
                    </label>
                    <Textarea
                      placeholder="اكتب رسالتك هنا..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="font-cairo min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-chicken-orange hover:bg-orange-600 text-white font-cairo py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {contactMutation.isPending ? (
                      <div className="flex items-center justify-center">
                        <i className="fas fa-spinner fa-spin ml-2"></i>
                        جارٍ الإرسال...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <i className="fas fa-paper-plane ml-2"></i>
                        إرسال الرسالة
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="font-amiri text-2xl text-chicken-black">
                  <i className="fas fa-info-circle ml-3 text-chicken-orange"></i>
                  معلومات التواصل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className={`${info.icon} ${info.color} text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-cairo font-bold text-gray-800 mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="font-cairo text-gray-600 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="font-amiri text-2xl text-chicken-black">
                  <i className="fas fa-share-alt ml-3 text-chicken-orange"></i>
                  تابعونا على
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 group"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                        <i className={`${social.icon} ${social.color} text-xl`}></i>
                      </div>
                      <span className="font-cairo text-xs text-gray-600">{social.platform}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-chicken-orange to-orange-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-amiri text-xl font-bold mb-4">
                  <i className="fas fa-phone ml-2"></i>
                  تواصل سريع
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:0123456789"
                    className="flex items-center p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300"
                  >
                    <i className="fas fa-phone ml-3"></i>
                    <span className="font-cairo">اتصل الآن: 0123456789</span>
                  </a>
                  <a
                    href="https://wa.me/966123456789"
                    className="flex items-center p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300"
                  >
                    <i className="fab fa-whatsapp ml-3"></i>
                    <span className="font-cairo">واتساب</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Branches Section */}
        <div className="mt-16">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="font-amiri text-3xl text-chicken-black">
                <i className="fas fa-store ml-3 text-chicken-orange"></i>
                فروعنا
              </CardTitle>
              <p className="font-cairo text-gray-600 mt-2">
                زورونا في أي من فروعنا المنتشرة في الرياض
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {branches.map((branch, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="font-cairo font-bold text-lg text-chicken-black mb-3">
                      {branch.name}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <i className="fas fa-map-marker-alt ml-2 text-chicken-orange"></i>
                        <span className="font-cairo text-sm">{branch.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="fas fa-phone ml-2 text-chicken-orange"></i>
                        <span className="font-cairo text-sm">{branch.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="fas fa-clock ml-2 text-chicken-orange"></i>
                        <span className="font-cairo text-sm">{branch.hours}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {branch.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-chicken-orange/10 text-chicken-orange text-xs font-cairo rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="font-amiri text-3xl text-chicken-black">
                <i className="fas fa-question-circle ml-3 text-chicken-orange"></i>
                الأسئلة الشائعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-cairo font-bold text-gray-800 cursor-pointer">
                    ما هي ساعات العمل؟
                  </summary>
                  <p className="font-cairo text-gray-600 mt-2">
                    نعمل يومياً من الساعة 10:00 صباحاً حتى 11:00 مساءً، ما عدا يوم الجمعة من 2:00 ظهراً حتى 11:00 مساءً.
                  </p>
                </details>
                
                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-cairo font-bold text-gray-800 cursor-pointer">
                    هل يوجد خدمة توصيل؟
                  </summary>
                  <p className="font-cairo text-gray-600 mt-2">
                    نعم، نوفر خدمة التوصيل لجميع مناطق الرياض مع رسوم توصيل 10 ريال، والتوصيل مجاني للطلبات أكثر من 50 ريال.
                  </p>
                </details>
                
                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-cairo font-bold text-gray-800 cursor-pointer">
                    كيف يمكنني الحصول على العروض الخاصة؟
                  </summary>
                  <p className="font-cairo text-gray-600 mt-2">
                    يمكنك متابعة حساباتنا على وسائل التواصل الاجتماعي أو الاشتراك في النشرة الإخبارية للحصول على آخر العروض والخصومات.
                  </p>
                </details>
                
                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-cairo font-bold text-gray-800 cursor-pointer">
                    هل تقدمون وجبات نباتية؟
                  </summary>
                  <p className="font-cairo text-gray-600 mt-2">
                    حالياً نتخصص في وجبات الدجاج، ولكن لدينا خيارات من السلطات والمقبلات النباتية. نعمل على توسيع قائمة الخيارات النباتية قريباً.
                  </p>
                </details>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
