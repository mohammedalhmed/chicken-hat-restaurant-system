import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { queryClient } from "@/lib/queryClient";
import type { OrderWithItems } from "@shared/schema";

type SessionResponse = {
  authenticated: true;
  user: {
    id: string;
    name: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
  };
};

const statusLabels: Record<string, string> = {
  pending: "معلق",
  confirmed: "مؤكد",
  preparing: "قيد التحضير",
  out_for_delivery: "في الطريق",
  delivered: "تم التسليم",
  cancelled: "ملغي",
};

export default function UserDashboardPage() {
  const [, setLocation] = useLocation();

  const { data: session, isLoading: sessionLoading } = useQuery<SessionResponse>({
    queryKey: ["/api/auth/session"],
    staleTime: 60 * 1000,
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery<OrderWithItems[]>({
    queryKey: ["/api/me/orders"],
    enabled: Boolean(session?.authenticated),
  });

  const logout = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok && response.status !== 204) {
        throw new Error("Failed to log out");
      }
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation("/");
    },
  });

  if (sessionLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const totalSpent = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + Number(order.totalAmount), 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-cairo text-sm text-gray-500">حساب العميل</p>
            <h1 className="font-amiri text-4xl font-bold text-chicken-black">
              أهلاً {session.user.fullName}
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
          >
            {logout.isPending ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card>
            <CardHeader><CardTitle className="text-base">البريد الإلكتروني</CardTitle></CardHeader>
            <CardContent className="font-cairo break-all">{session.user.email}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">رقم الهاتف</CardTitle></CardHeader>
            <CardContent className="font-cairo">{session.user.phone}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">إجمالي الطلبات</CardTitle></CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-chicken-orange">{orders.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                بقيمة {totalSpent.toFixed(2)} ريال للطلبات غير الملغاة
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-amiri text-2xl">طلباتي</CardTitle>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="py-10 flex justify-center"><LoadingSpinner /></div>
            ) : orders.length === 0 ? (
              <div className="py-10 text-center text-gray-500 font-cairo">
                لا توجد طلبات مرتبطة بهذا الحساب حتى الآن.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div>
                      <p className="font-semibold">طلب #{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString("ar-SA")}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.items.length} عنصر
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge>{statusLabels[order.status] ?? order.status}</Badge>
                      <span className="font-bold text-chicken-orange">
                        {Number(order.totalAmount).toFixed(2)} ريال
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
