import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useDynamicColors } from "@/hooks/use-dynamic-colors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { OrderWithItems, Reservation } from "@shared/schema";

export default function AdminDashboard() {
  // Apply dynamic colors globally
  useDynamicColors();
  const { data: orders = [] } = useQuery<OrderWithItems[]>({
    queryKey: ["/api/orders"],
  });

  const { data: reservations = [] } = useQuery<Reservation[]>({
    queryKey: ["/api/reservations"],
  });

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const todayRevenue = orders
    .filter(order => {
      const orderDate = new Date(order.createdAt);
      const today = new Date();
      return orderDate.toDateString() === today.toDateString() && order.status !== 'cancelled';
    })
    .reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);

  const pendingReservations = reservations.filter(res => res.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="bg-chicken-orange text-white p-2 rounded-lg">
                <i className="fas fa-drumstick-bite text-2xl"></i>
              </div>
              <div>
                <h1 className="font-amiri font-bold text-3xl text-chicken-black">
                  لوحة تحكم تشكن هات
                </h1>
                <p className="text-gray-600">إدارة المطعم والطلبات</p>
              </div>
            </div>
            <Link href="/" className="text-chicken-orange hover:underline">
              العودة للموقع الرئيسي
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الطلبات المعلقة</CardTitle>
              <i className="fas fa-clock text-chicken-orange"></i>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders.length}</div>
              <p className="text-xs text-muted-foreground">طلب جديد</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إيرادات اليوم</CardTitle>
              <i className="fas fa-money-bill-wave text-green-600"></i>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayRevenue.toFixed(2)} ريال</div>
              <p className="text-xs text-muted-foreground">من بداية اليوم</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الحجوزات المعلقة</CardTitle>
              <i className="fas fa-calendar-check text-blue-600"></i>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingReservations.length}</div>
              <p className="text-xs text-muted-foreground">حجز جديد</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
              <i className="fas fa-shopping-bag text-purple-600"></i>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">جميع الطلبات</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/admin/orders">
            <Button className="w-full h-20 bg-chicken-orange hover:bg-orange-600 text-white">
              <div className="text-center">
                <i className="fas fa-clipboard-list text-2xl block mb-2"></i>
                <span>إدارة الطلبات</span>
              </div>
            </Button>
          </Link>

          <Link href="/admin/menu">
            <Button className="w-full h-20 bg-blue-600 hover:bg-blue-700 text-white">
              <div className="text-center">
                <i className="fas fa-utensils text-2xl block mb-2"></i>
                <span>إدارة القائمة</span>
              </div>
            </Button>
          </Link>

          <Link href="/admin/reservations">
            <Button className="w-full h-20 bg-green-600 hover:bg-green-700 text-white">
              <div className="text-center">
                <i className="fas fa-calendar-alt text-2xl block mb-2"></i>
                <span>إدارة الحجوزات</span>
              </div>
            </Button>
          </Link>

          <Link href="/admin/settings">
            <Button className="w-full h-20 bg-purple-600 hover:bg-purple-700 text-white">
              <div className="text-center">
                <i className="fas fa-cog text-2xl block mb-2"></i>
                <span>إعدادات الموقع</span>
              </div>
            </Button>
          </Link>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>أحدث الطلبات</span>
              <Link href="/admin/orders">
                <Button variant="outline" size="sm">
                  عرض الكل
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      {order.guestName || "عميل مسجل"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.guestPhone} • {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{parseFloat(order.totalAmount).toFixed(2)} ريال</p>
                    <Badge variant={order.status === 'pending' ? 'destructive' : 'secondary'}>
                      {order.status === 'pending' ? 'معلق' :
                       order.status === 'confirmed' ? 'مؤكد' :
                       order.status === 'preparing' ? 'قيد التحضير' :
                       order.status === 'out_for_delivery' ? 'في الطريق' :
                       order.status === 'delivered' ? 'تم التسليم' : 'ملغي'}
                    </Badge>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-inbox text-4xl mb-4 opacity-50"></i>
                  <p>لا توجد طلبات حتى الآن</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}