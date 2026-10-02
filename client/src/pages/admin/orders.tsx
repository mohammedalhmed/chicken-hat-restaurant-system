import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import type { OrderWithItems } from "@shared/schema";

export default function AdminOrders() {
  const { toast } = useToast();

  const { data: orders = [], isLoading } = useQuery<OrderWithItems[]>({
    queryKey: ["/api/orders"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await apiRequest("PATCH", `/api/orders/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({ title: "تم تحديث حالة الطلب بنجاح" });
    },
    onError: () => {
      toast({ title: "خطأ في تحديث حالة الطلب", variant: "destructive" });
    },
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'confirmed': return 'default';
      case 'preparing': return 'secondary';
      case 'out_for_delivery': return 'outline';
      case 'delivered': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'معلق';
      case 'confirmed': return 'مؤكد';
      case 'preparing': return 'قيد التحضير';
      case 'out_for_delivery': return 'في الطريق';
      case 'delivered': return 'تم التسليم';
      case 'cancelled': return 'ملغي';
      default: return status;
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
              إدارة الطلبات
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
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2 space-x-reverse">
                        <span>طلب #{order.id.slice(0, 8)}</span>
                        <Badge variant={getStatusBadgeVariant(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </CardTitle>
                      <p className="text-gray-600 mt-1">
                        {new Date(order.createdAt).toLocaleString('ar-SA')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-chicken-orange">
                        {parseFloat(order.totalAmount).toFixed(2)} ريال
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.paymentMethod === 'cash_on_delivery' ? 'دفع عند التسليم' : 'دفع إلكتروني'}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Customer Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">معلومات العميل</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>الاسم:</strong> {order.guestName || "عميل مسجل"}
                      </div>
                      <div>
                        <strong>الهاتف:</strong> {order.guestPhone}
                      </div>
                      <div className="md:col-span-2">
                        <strong>العنوان:</strong> {order.street}, {order.area}, {order.city}
                        {order.buildingNumber && ` - مبنى ${order.buildingNumber}`}
                        {order.apartmentNumber && ` - شقة ${order.apartmentNumber}`}
                        {(order as any).latitude && (order as any).longitude && (
                          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mt-3">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <i className="fas fa-map-marker-alt text-blue-600"></i>
                                <span className="font-medium text-blue-800">موقع جغرافي محدد</span>
                              </div>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">GPS</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm text-blue-700 mb-3">
                              <div>
                                <span className="font-medium">خط العرض:</span>
                                <br />
                                <span className="font-mono">{parseFloat((order as any).latitude).toFixed(6)}</span>
                              </div>
                              <div>
                                <span className="font-medium">خط الطول:</span>
                                <br />
                                <span className="font-mono">{parseFloat((order as any).longitude).toFixed(6)}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2 space-x-reverse">
                              <a
                                href={`https://www.google.com/maps?q=${(order as any).latitude},${(order as any).longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                              >
                                <i className="fas fa-external-link-alt mr-1"></i>
                                عرض على الخريطة
                              </a>
                              <a
                                href={`https://maps.google.com/maps?daddr=${(order as any).latitude},${(order as any).longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                              >
                                <i className="fas fa-directions mr-1"></i>
                                الاتجاهات
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                      {order.addressDetails && (
                        <div className="md:col-span-2">
                          <strong>تفاصيل إضافية:</strong> {order.addressDetails}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-semibold mb-3">عناصر الطلب</h4>
                    <div className="space-y-2">
                      {order.items?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            {item.menuItem?.imageUrl && (
                              <img
                                src={item.menuItem.imageUrl}
                                alt={item.menuItem.nameAr}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            )}
                            <div>
                              <p className="font-medium">{item.menuItem?.nameAr}</p>
                              <p className="text-sm text-gray-600">
                                {parseFloat(item.priceAtOrder).toFixed(2)} ريال × {item.quantity}
                              </p>
                            </div>
                          </div>
                          <div className="font-semibold">
                            {(parseFloat(item.priceAtOrder) * item.quantity).toFixed(2)} ريال
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {order.notes && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">ملاحظات العميل</h4>
                      <p className="text-sm">{order.notes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-sm">تحديث الحالة:</span>
                      <Select
                        value={order.status}
                        onValueChange={(status) => updateStatusMutation.mutate({ id: order.id, status })}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">معلق</SelectItem>
                          <SelectItem value="confirmed">مؤكد</SelectItem>
                          <SelectItem value="preparing">قيد التحضير</SelectItem>
                          <SelectItem value="out_for_delivery">في الطريق</SelectItem>
                          <SelectItem value="delivered">تم التسليم</SelectItem>
                          <SelectItem value="cancelled">ملغي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.print()}
                    >
                      <i className="fas fa-print ml-2"></i>
                      طباعة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {orders.length === 0 && (
              <div className="text-center py-20">
                <i className="fas fa-clipboard-list text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد طلبات حتى الآن</h3>
                <p className="text-gray-500">ستظهر الطلبات هنا عند وصولها</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}