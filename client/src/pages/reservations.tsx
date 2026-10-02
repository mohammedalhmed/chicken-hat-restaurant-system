import { useState } from "react";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const reservationSchema = z.object({
  customerName: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين"),
  customerPhone: z.string().min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل"),
  customerEmail: z.string().email("البريد الإلكتروني غير صحيح").optional().or(z.literal("")),
  guestCount: z.number().min(1, "عدد الأشخاص يجب أن يكون على الأقل 1").max(20, "الحد الأقصى 20 شخص"),
  reservationDate: z.string().min(1, "تاريخ الحجز مطلوب"),
  reservationTime: z.string().min(1, "وقت الحجز مطلوب"),
  specialRequests: z.string().optional(),
});

type ReservationForm = z.infer<typeof reservationSchema>;

export default function ReservationsPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: timeSlots = [] } = useQuery({
    queryKey: ['/api/time-slots', selectedDate],
    enabled: !!selectedDate,
  });

  const form = useForm<ReservationForm>({
    // resolver: zodResolver(reservationSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      guestCount: 2,
      reservationDate: "",
      reservationTime: "",
      specialRequests: "",
    },
  });

  const createReservationMutation = useMutation({
    mutationFn: (data: ReservationForm) => {
      return fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    onSuccess: () => {
      toast({
        title: "تم إنشاء الحجز بنجاح!",
        description: "سيتم التواصل معك لتأكيد الحجز قريباً",
        variant: "default",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/reservations'] });
    },
    onError: () => {
      toast({
        title: "خطأ في إنشاء الحجز",
        description: "حدث خطأ أثناء إنشاء الحجز، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReservationForm) => {
    createReservationMutation.mutate(data);
  };

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 12; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isAvailable = Math.random() > 0.3; // Simulate availability
        slots.push({ time: timeStr, available: isAvailable });
      }
    }
    return slots;
  };

  const availableSlots = generateTimeSlots();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-chicken-orange via-orange-500 to-amber-500 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h1 className="font-amiri text-5xl md:text-6xl font-bold mb-6">
              احجز طاولتك الآن
            </h1>
            <p className="font-cairo text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              استمتع بتجربة طعام مميزة في أجواء رائعة مع أفضل الأطباق والخدمة المتميزة
            </p>
            <div className="flex justify-center space-x-6 space-x-reverse">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-clock text-2xl"></i>
                </div>
                <p className="font-cairo">مفتوح يومياً</p>
                <p className="font-cairo text-sm opacity-90">12:00 - 23:00</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-users text-2xl"></i>
                </div>
                <p className="font-cairo">حتى 20 شخص</p>
                <p className="font-cairo text-sm opacity-90">مجموعات كبيرة</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-phone text-2xl"></i>
                </div>
                <p className="font-cairo">اتصل بنا</p>
                <p className="font-cairo text-sm opacity-90">0123456789</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Reservation Form */}
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="font-amiri text-3xl text-chicken-black">
                <i className="fas fa-calendar-check ml-3 text-chicken-orange"></i>
                نموذج الحجز
              </CardTitle>
              <p className="font-cairo text-gray-600 mt-2">
                املأ البيانات أدناه لحجز طاولتك
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-cairo font-bold text-lg text-gray-800 border-b border-gray-200 pb-2">
                    البيانات الشخصية
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                      الاسم الكامل *
                    </label>
                    <Input
                      {...form.register("customerName")}
                      placeholder="أدخل اسمك الكامل"
                      className="font-cairo"
                      data-testid="input-customer-name"
                    />
                    {form.formState.errors.customerName && (
                      <p className="text-red-500 text-sm mt-1 font-cairo">
                        {form.formState.errors.customerName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                      رقم الهاتف *
                    </label>
                    <Input
                      {...form.register("customerPhone")}
                      placeholder="05xxxxxxxx"
                      className="font-cairo"
                      data-testid="input-customer-phone"
                    />
                    {form.formState.errors.customerPhone && (
                      <p className="text-red-500 text-sm mt-1 font-cairo">
                        {form.formState.errors.customerPhone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                      البريد الإلكتروني (اختياري)
                    </label>
                    <Input
                      {...form.register("customerEmail")}
                      type="email"
                      placeholder="example@email.com"
                      className="font-cairo"
                      data-testid="input-customer-email"
                    />
                    {form.formState.errors.customerEmail && (
                      <p className="text-red-500 text-sm mt-1 font-cairo">
                        {form.formState.errors.customerEmail.message}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Reservation Details */}
                <div className="space-y-4">
                  <h3 className="font-cairo font-bold text-lg text-gray-800 border-b border-gray-200 pb-2">
                    تفاصيل الحجز
                  </h3>

                  <div>
                    <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                      عدد الأشخاص *
                    </label>
                    <Input
                      {...form.register("guestCount", { valueAsNumber: true })}
                      type="number"
                      min="1"
                      max="20"
                      placeholder="2"
                      className="font-cairo"
                      data-testid="input-guest-count"
                    />
                    {form.formState.errors.guestCount && (
                      <p className="text-red-500 text-sm mt-1 font-cairo">
                        {form.formState.errors.guestCount.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                      تاريخ الحجز *
                    </label>
                    <Input
                      {...form.register("reservationDate")}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="font-cairo"
                      onChange={(e) => setSelectedDate(e.target.value)}
                      data-testid="input-reservation-date"
                    />
                    {form.formState.errors.reservationDate && (
                      <p className="text-red-500 text-sm mt-1 font-cairo">
                        {form.formState.errors.reservationDate.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                      وقت الحجز *
                    </label>
                    <select
                      {...form.register("reservationTime")}
                      className="w-full p-3 border border-gray-300 rounded-lg font-cairo focus:border-chicken-orange focus:ring-2 focus:ring-chicken-orange/50 transition-all duration-300"
                      onChange={(e) => setSelectedTime(e.target.value)}
                      data-testid="select-reservation-time"
                    >
                      <option value="">اختر الوقت</option>
                      {availableSlots.map((slot) => (
                        <option 
                          key={slot.time} 
                          value={slot.time}
                          disabled={!slot.available}
                        >
                          {slot.time} {!slot.available && '(محجوز)'}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.reservationTime && (
                      <p className="text-red-500 text-sm mt-1 font-cairo">
                        {form.formState.errors.reservationTime.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-cairo font-medium mb-2 text-gray-700">
                      طلبات خاصة (اختياري)
                    </label>
                    <Textarea
                      {...form.register("specialRequests")}
                      placeholder="أي طلبات خاصة أو ملاحظات..."
                      className="font-cairo min-h-[100px]"
                      data-testid="textarea-special-requests"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={createReservationMutation.isPending}
                  className="w-full bg-chicken-orange hover:bg-orange-600 text-white font-cairo py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  data-testid="button-submit-reservation"
                >
                  {createReservationMutation.isPending ? (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>جارٍ إنشاء الحجز...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <i className="fas fa-calendar-plus"></i>
                      <span>احجز الآن</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Restaurant Information */}
          <div className="space-y-8">
            {/* Opening Hours */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="font-amiri text-2xl text-chicken-black">
                  <i className="fas fa-clock ml-3 text-chicken-orange"></i>
                  أوقات العمل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { day: "السبت - الخميس", hours: "12:00 ص - 11:00 م", status: "مفتوح" },
                  { day: "الجمعة", hours: "2:00 م - 11:00 م", status: "مفتوح" },
                ].map((schedule) => (
                  <div key={schedule.day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-cairo font-medium text-gray-800">{schedule.day}</p>
                      <p className="font-cairo text-sm text-gray-600">{schedule.hours}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 font-cairo">
                      {schedule.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="font-amiri text-2xl text-chicken-black">
                  <i className="fas fa-map-marker-alt ml-3 text-chicken-orange"></i>
                  معلومات التواصل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-chicken-orange/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-phone text-chicken-orange"></i>
                  </div>
                  <div>
                    <p className="font-cairo font-medium">الهاتف</p>
                    <p className="font-cairo text-gray-600">0123456789</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-chicken-orange/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-envelope text-chicken-orange"></i>
                  </div>
                  <div>
                    <p className="font-cairo font-medium">البريد الإلكتروني</p>
                    <p className="font-cairo text-gray-600">info@chickenhat.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-chicken-orange/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-chicken-orange"></i>
                  </div>
                  <div>
                    <p className="font-cairo font-medium">العنوان</p>
                    <p className="font-cairo text-gray-600">الرياض، حي النخيل، شارع الملك فهد</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Policies */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="font-amiri text-2xl text-chicken-black">
                  <i className="fas fa-info-circle ml-3 text-chicken-orange"></i>
                  سياسة الحجز
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 font-cairo text-gray-700">
                  <li className="flex items-start space-x-2 space-x-reverse">
                    <i className="fas fa-check text-green-500 mt-1"></i>
                    <span>يُنصح بالحجز المسبق خاصة في نهاية الأسبوع</span>
                  </li>
                  <li className="flex items-start space-x-2 space-x-reverse">
                    <i className="fas fa-check text-green-500 mt-1"></i>
                    <span>يمكن إلغاء الحجز قبل 2 ساعة من الموعد</span>
                  </li>
                  <li className="flex items-start space-x-2 space-x-reverse">
                    <i className="fas fa-check text-green-500 mt-1"></i>
                    <span>الطاولة محجوزة لمدة ساعتين كحد أقصى</span>
                  </li>
                  <li className="flex items-start space-x-2 space-x-reverse">
                    <i className="fas fa-check text-green-500 mt-1"></i>
                    <span>للمجموعات الكبيرة (أكثر من 10 أشخاص) يرجى الاتصال مباشرة</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}