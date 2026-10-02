import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import type { Reservation } from "@shared/schema";

export default function AdminReservations() {
  const { toast } = useToast();

  const { data: reservations = [], isLoading } = useQuery<Reservation[]>({
    queryKey: ["/api/reservations"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await apiRequest("PATCH", `/api/reservations/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reservations"] });
      toast({ title: "تم تحديث حالة الحجز بنجاح" });
    },
    onError: () => {
      toast({ title: "خطأ في تحديث حالة الحجز", variant: "destructive" });
    },
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'confirmed': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'معلق';
      case 'confirmed': return 'مؤكد';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getSpecialOccasionText = (occasion: string) => {
    switch (occasion) {
      case 'birthday': return 'عيد ميلاد';
      case 'anniversary': return 'ذكرى سنوية';
      case 'business': return 'عمل';
      case 'other': return 'أخرى';
      default: return occasion || 'غير محدد';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <i className="fas fa-arrow-right ml-2"></i>
                العودة
              </Button>
            </Link>
            <h1 className="font-amiri font-bold text-3xl text-chicken-black">
              إدارة الحجوزات
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-chicken-orange border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.map((reservation) => (
              <Card key={reservation.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg truncate">
                      {reservation.guestName || "ضيف"}
                    </CardTitle>
                    <Badge variant={getStatusBadgeVariant(reservation.status)}>
                      {getStatusText(reservation.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse text-sm">
                      <i className="fas fa-phone text-chicken-orange"></i>
                      <span>{reservation.guestPhone}</span>
                    </div>
                    {reservation.guestEmail && (
                      <div className="flex items-center space-x-2 space-x-reverse text-sm">
                        <i className="fas fa-envelope text-chicken-orange"></i>
                        <span className="truncate">{reservation.guestEmail}</span>
                      </div>
                    )}
                  </div>

                  {/* Reservation Details */}
                  <div className="bg-gray-50 p-3 rounded-lg space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">التاريخ:</span>
                      <span>{new Date(reservation.reservationDate).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">الوقت:</span>
                      <span>{new Date(reservation.reservationDate).toLocaleTimeString('ar-SA', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">عدد الأشخاص:</span>
                      <span>{reservation.numberOfGuests} شخص</span>
                    </div>
                    {reservation.specialOccasion && (
                      <div className="flex items-center justify-between">
                        <span className="font-medium">المناسبة:</span>
                        <span>{getSpecialOccasionText(reservation.specialOccasion)}</span>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  {reservation.notes && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">ملاحظات:</h4>
                      <p className="text-sm text-gray-700">{reservation.notes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">الحالة:</span>
                      <Select
                        value={reservation.status}
                        onValueChange={(status) => updateStatusMutation.mutate({ id: reservation.id, status })}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">معلق</SelectItem>
                          <SelectItem value="confirmed">مؤكد</SelectItem>
                          <SelectItem value="cancelled">ملغي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex space-x-2 space-x-reverse">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          const phone = reservation.guestPhone;
                          const message = `مرحباً ${reservation.guestName}، نود تأكيد حجزكم في مطعم تشكن هات بتاريخ ${new Date(reservation.reservationDate).toLocaleDateString('ar-SA')}`;
                          window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
                        }}
                      >
                        <i className="fab fa-whatsapp text-green-600 ml-1"></i>
                        واتساب
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          const phone = reservation.guestPhone;
                          window.open(`tel:${phone}`);
                        }}
                      >
                        <i className="fas fa-phone text-blue-600 ml-1"></i>
                        اتصال
                      </Button>
                    </div>
                  </div>

                  {/* Creation Date */}
                  <div className="text-xs text-gray-500 pt-2 border-t">
                    تم الإنشاء: {new Date(reservation.createdAt).toLocaleString('ar-SA')}
                  </div>
                </CardContent>
              </Card>
            ))}

            {reservations.length === 0 && (
              <div className="col-span-full text-center py-20">
                <i className="fas fa-calendar-alt text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد حجوزات حتى الآن</h3>
                <p className="text-gray-500">ستظهر الحجوزات هنا عند وصولها</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}