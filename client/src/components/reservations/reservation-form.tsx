import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const reservationSchema = z.object({
  guestName: z.string().min(2, "الاسم يجب أن يكون أكثر من حرفين"),
  guestPhone: z.string().min(10, "رقم الهاتف غير صحيح"),
  guestEmail: z.string().email("البريد الإلكتروني غير صحيح").optional().or(z.literal("")),
  reservationDate: z.string().min(1, "التاريخ مطلوب"),
  reservationTime: z.string().min(1, "الوقت مطلوب"),
  numberOfGuests: z.string().min(1, "عدد الأشخاص مطلوب"),
  specialOccasion: z.string().optional(),
  notes: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

export default function ReservationForm() {
  const { toast } = useToast();
  
  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guestName: "",
      guestPhone: "",
      guestEmail: "",
      reservationDate: "",
      reservationTime: "",
      numberOfGuests: "",
      specialOccasion: "",
      notes: "",
    },
  });

  const createReservationMutation = useMutation({
    mutationFn: async (data: ReservationFormData) => {
      // Combine date and time into a single timestamp
      const reservationDateTime = new Date(`${data.reservationDate}T${data.reservationTime}`);
      
      const reservationData = {
        guestName: data.guestName,
        guestPhone: data.guestPhone,
        guestEmail: data.guestEmail || null,
        reservationDate: reservationDateTime.toISOString(),
        numberOfGuests: parseInt(data.numberOfGuests),
        specialOccasion: data.specialOccasion || null,
        notes: data.notes || null,
      };
      
      await apiRequest("POST", "/api/reservations", reservationData);
    },
    onSuccess: () => {
      toast({
        title: "تم إرسال طلب الحجز بنجاح!",
        description: "سنتواصل معكم قريباً لتأكيد الحجز",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "خطأ في إرسال طلب الحجز",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReservationFormData) => {
    createReservationMutation.mutate(data);
  };

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="guestName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-semibold">الاسم الكامل</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white/20 border border-white/30 text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-chicken-gold"
                  placeholder="أدخل اسمك الكامل"
                />
              </FormControl>
              <FormMessage className="text-chicken-gold" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guestPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-semibold">رقم الهاتف</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  className="bg-white/20 border border-white/30 text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-chicken-gold"
                  placeholder="رقم هاتفك"
                />
              </FormControl>
              <FormMessage className="text-chicken-gold" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guestEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-semibold">البريد الإلكتروني (اختياري)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className="bg-white/20 border border-white/30 text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-chicken-gold"
                  placeholder="بريدك الإلكتروني"
                />
              </FormControl>
              <FormMessage className="text-chicken-gold" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reservationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-semibold">تاريخ الحجز</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  min={today}
                  className="bg-white/20 border border-white/30 text-white focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-chicken-gold"
                />
              </FormControl>
              <FormMessage className="text-chicken-gold" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reservationTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-semibold">الوقت</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="time"
                  className="bg-white/20 border border-white/30 text-white focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-chicken-gold"
                />
              </FormControl>
              <FormMessage className="text-chicken-gold" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfGuests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-semibold">عدد الأشخاص</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/20 border border-white/30 text-white focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-chicken-gold">
                    <SelectValue placeholder="اختر عدد الأشخاص" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">شخص واحد</SelectItem>
                  <SelectItem value="2">شخصين</SelectItem>
                  <SelectItem value="3">3 أشخاص</SelectItem>
                  <SelectItem value="4">4 أشخاص</SelectItem>
                  <SelectItem value="5">5 أشخاص</SelectItem>
                  <SelectItem value="6">6 أشخاص</SelectItem>
                  <SelectItem value="7">7 أشخاص</SelectItem>
                  <SelectItem value="8">8 أشخاص</SelectItem>
                  <SelectItem value="9">9 أشخاص</SelectItem>
                  <SelectItem value="10">10+ أشخاص</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-chicken-gold" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specialOccasion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-semibold">مناسبة خاصة</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/20 border border-white/30 text-white focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-chicken-gold">
                    <SelectValue placeholder="اختياري" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="birthday">عيد ميلاد</SelectItem>
                  <SelectItem value="anniversary">ذكرى سنوية</SelectItem>
                  <SelectItem value="business">عمل</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-chicken-gold" />
            </FormItem>
          )}
        />

        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">ملاحظات إضافية</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={3}
                    className="bg-white/20 border border-white/30 text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-chicken-gold"
                    placeholder="أي طلبات خاصة أو ملاحظات"
                  />
                </FormControl>
                <FormMessage className="text-chicken-gold" />
              </FormItem>
            )}
          />
        </div>

        <div className="md:col-span-2">
          <Button
            type="submit"
            className="w-full bg-chicken-gold hover:bg-yellow-500 text-chicken-black font-bold py-4 px-8 rounded-lg text-lg transition-colors"
            disabled={createReservationMutation.isPending}
          >
            {createReservationMutation.isPending ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-chicken-black border-t-transparent rounded-full ml-2"></div>
                جاري الإرسال...
              </>
            ) : (
              <>
                <i className="fas fa-calendar-check ml-2"></i>
                تأكيد الحجز
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
