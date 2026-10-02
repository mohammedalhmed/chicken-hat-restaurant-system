import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { WebsiteSettings } from "@shared/schema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { data: settings } = useQuery<WebsiteSettings>({
    queryKey: ["/api/website-settings"],
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "تم إرسال الرسالة بنجاح",
        description: "سنتواصل معك في أقرب وقت ممكن",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "العنوان",
      details: [settings?.streetAddress || 'القاهرة', settings?.area || 'الخط الرئيسي'],
      color: "text-red-500"
    },
    {
      icon: "fas fa-phone",
      title: "هاتف الطلبات",
      details: [settings?.contactPhone || '+966 50 123 4567'],
      color: "text-green-500"
    },
    {
      icon: "fas fa-envelope",
      title: "البريد الإلكتروني",
      details: [settings?.contactEmail || 'info@chickenhat.com'],
      color: "text-blue-500"
    },
    {
      icon: "fas fa-clock",
      title: "ساعات العمل",
      details: [settings?.operatingHours || 'السبت - الخميس: 10:00 ص - 12:00 م\nالجمعة: 2:00 م - 12:00 م'],
      color: "text-chicken-orange"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-chicken-black via-gray-900 to-chicken-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 text-chicken-orange text-8xl animate-pulse">
          <i className="fas fa-phone"></i>
        </div>
        <div className="absolute bottom-20 left-20 text-chicken-orange text-6xl animate-pulse delay-1000">
          <i className="fas fa-envelope"></i>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-amiri font-bold text-4xl md:text-5xl mb-6">
            تواصل معنا
          </h2>
          <div className="w-24 h-1 bg-chicken-orange mx-auto mb-6"></div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed font-cairo">
            نحن هنا للإجابة على جميع استفساراتكم وتلقي اقتراحاتكم. تواصلوا معنا في أي وقت
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-cairo font-bold text-2xl mb-8 flex items-center">
                <i className="fas fa-info-circle text-chicken-orange ml-3"></i>
                معلومات التواصل
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-chicken-orange transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-start">
                      <div className={`w-12 h-12 bg-gradient-to-br from-chicken-orange to-orange-600 rounded-lg flex items-center justify-center ml-4 flex-shrink-0`}>
                        <i className={`${info.icon} text-white text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-cairo font-semibold text-lg mb-2 text-chicken-orange">
                          {info.title}
                        </h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-300 font-cairo text-sm leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h4 className="font-cairo font-semibold text-lg mb-4 text-chicken-orange flex items-center">
                <i className="fas fa-share-alt ml-3"></i>
                تابعنا على وسائل التواصل
              </h4>
              <div className="flex space-x-4 space-x-reverse">
                {[
                  { icon: "fab fa-instagram", color: "hover:text-pink-500", label: "Instagram", link: settings?.instagramUrl || '#' },
                  { icon: "fab fa-twitter", color: "hover:text-blue-400", label: "Twitter", link: settings?.twitterUrl || '#' },
                  { icon: "fab fa-facebook", color: "hover:text-blue-600", label: "Facebook", link: settings?.facebookUrl || '#' },
                  { icon: "fab fa-whatsapp", color: "hover:text-green-500", label: "WhatsApp", link: `https://wa.me/${(settings?.whatsappNumber || '+967738738317').replace(/[^0-9]/g, '')}` }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-600`}
                    title={social.label}
                  >
                    <i className={`${social.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <h3 className="font-cairo font-bold text-2xl mb-6 flex items-center text-chicken-orange">
              <i className="fas fa-paper-plane ml-3"></i>
              أرسل لنا رسالة
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-cairo font-medium mb-2 text-gray-300">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 font-cairo focus:border-chicken-orange focus:ring-1 focus:ring-chicken-orange transition-all duration-300"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-cairo font-medium mb-2 text-gray-300">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 font-cairo focus:border-chicken-orange focus:ring-1 focus:ring-chicken-orange transition-all duration-300"
                    placeholder="966xxxxxxxxx+"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-cairo font-medium mb-2 text-gray-300">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 font-cairo focus:border-chicken-orange focus:ring-1 focus:ring-chicken-orange transition-all duration-300"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-cairo font-medium mb-2 text-gray-300">
                  موضوع الرسالة
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white font-cairo focus:border-chicken-orange focus:ring-1 focus:ring-chicken-orange transition-all duration-300"
                >
                  <option value="">اختر موضوع الرسالة</option>
                  <option value="order">استفسار عن طلب</option>
                  <option value="complaint">شكوى</option>
                  <option value="suggestion">اقتراح</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-cairo font-medium mb-2 text-gray-300">
                  الرسالة *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 font-cairo focus:border-chicken-orange focus:ring-1 focus:ring-chicken-orange transition-all duration-300 resize-none"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-chicken-orange to-orange-600 hover:from-orange-600 hover:to-chicken-orange text-white font-cairo py-3 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
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
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href={`tel:${settings?.contactPhone || '+966501234567'}`}
              className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <i className="fas fa-phone text-2xl mb-2"></i>
              <div className="font-cairo font-semibold">اتصل بنا الآن</div>
              <div className="font-cairo text-sm opacity-90">للطلبات السريعة</div>
            </a>

            <a
              href={`https://wa.me/${(settings?.whatsappNumber || '+967738738317').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <i className="fab fa-whatsapp text-2xl mb-2"></i>
              <div className="font-cairo font-semibold">واتساب</div>
              <div className="font-cairo text-sm opacity-90">تواصل سريع</div>
            </a>

            <button
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-chicken-orange hover:bg-orange-600 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <i className="fas fa-utensils text-2xl mb-2"></i>
              <div className="font-cairo font-semibold">اطلب الآن</div>
              <div className="font-cairo text-sm opacity-90">من القائمة</div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}