import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import FileUpload from "@/components/ui/file-upload";
import type { MenuItemWithCategory, Category } from "@shared/schema";

export default function MenuManagement() {
  const [editingItem, setEditingItem] = useState<MenuItemWithCategory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const { toast } = useToast();

  const { data: menuItems = [], isLoading: itemsLoading } = useQuery<MenuItemWithCategory[]>({
    queryKey: ["/api/menu-items"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const createItemMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/admin/menu-items", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      toast({ title: "تم إنشاء العنصر بنجاح" });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "خطأ في إنشاء العنصر", variant: "destructive" });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await apiRequest("PUT", `/api/admin/menu-items/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      toast({ title: "تم تحديث العنصر بنجاح" });
      setEditingItem(null);
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "خطأ في تحديث العنصر", variant: "destructive" });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/menu-items/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu-items"] });
      toast({ title: "تم حذف العنصر بنجاح" });
    },
    onError: () => {
      toast({ title: "خطأ في حذف العنصر", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      nameAr: formData.get("nameAr") as string,
      description: formData.get("description") as string,
      descriptionAr: formData.get("descriptionAr") as string,
      price: formData.get("price") as string,
      categoryId: formData.get("categoryId") as string,
      imageUrl: currentImageUrl || (formData.get("imageUrl") as string),
      isAvailable: formData.get("isAvailable") === "on",
      calories: formData.get("calories") ? parseInt(formData.get("calories") as string) : null,
    };

    if (editingItem) {
      updateItemMutation.mutate({ id: editingItem.id, data });
    } else {
      createItemMutation.mutate(data);
    }
  };

  const resetDialog = () => {
    setEditingItem(null);
    setCurrentImageUrl("");
    setIsDialogOpen(false);
  };

  const handleEditItem = (item: MenuItemWithCategory) => {
    setEditingItem(item);
    setCurrentImageUrl(item.imageUrl || "");
    setIsDialogOpen(true);
  };

  const handleNewItem = () => {
    setEditingItem(null);
    setCurrentImageUrl("");
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <i className="fas fa-arrow-right ml-2"></i>
                  العودة
                </Button>
              </Link>
              <h1 className="font-amiri font-bold text-3xl text-chicken-black">
                إدارة قائمة الطعام
              </h1>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-chicken-orange hover:bg-orange-600 shadow-lg transform hover:scale-105 transition-all duration-200"
                  onClick={handleNewItem}
                >
                  <i className="fas fa-plus ml-2"></i>
                  إضافة عنصر جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-orange-50">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-chicken-black flex items-center">
                    <i className={`${editingItem ? 'fas fa-edit' : 'fas fa-plus-circle'} ml-3 text-chicken-orange`}></i>
                    {editingItem ? "تعديل العنصر" : "إضافة عنصر جديد"}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nameAr" className="text-sm font-semibold text-chicken-black">الاسم بالعربية *</Label>
                      <Input
                        id="nameAr"
                        name="nameAr"
                        defaultValue={editingItem?.nameAr || ""}
                        required
                        className="bg-orange-50/50 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-chicken-black">الاسم بالإنجليزية</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={editingItem?.name || ""}
                        className="bg-orange-50/50 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descriptionAr" className="text-sm font-semibold text-chicken-black">الوصف بالعربية</Label>
                    <Textarea
                      id="descriptionAr"
                      name="descriptionAr"
                      defaultValue={editingItem?.descriptionAr || ""}
                      rows={3}
                      className="bg-orange-50/50 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200 shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-semibold text-chicken-black">الوصف بالإنجليزية</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={editingItem?.description || ""}
                      rows={3}
                      className="bg-orange-50/50 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200 shadow-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm font-semibold text-chicken-black">السعر (ريال) *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        defaultValue={editingItem?.price || ""}
                        required
                        className="bg-orange-50/50 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="categoryId" className="text-sm font-semibold text-chicken-black">الفئة *</Label>
                      <Select name="categoryId" defaultValue={editingItem?.categoryId || ""} required>
                        <SelectTrigger className="bg-orange-50/50 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200 shadow-sm">
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.nameAr}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border-2 border-orange-200 shadow-sm">
                    <FileUpload
                      onFileUploaded={(url) => setCurrentImageUrl(url)}
                      endpoint="/api/upload/menu-item-image"
                      currentImage={currentImageUrl}
                      label="صورة المنتج"
                      accept="image/*"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="calories" className="text-sm font-semibold text-chicken-black">السعرات الحرارية</Label>
                      <Input
                        id="calories"
                        name="calories"
                        type="number"
                        defaultValue={editingItem?.calories || ""}
                        className="bg-orange-50/50 border-2 border-orange-200 focus:border-chicken-orange focus:bg-white transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse pt-8">
                      <Switch
                        id="isAvailable"
                        name="isAvailable"
                        defaultChecked={editingItem?.isAvailable ?? true}
                        className="data-[state=checked]:bg-chicken-orange"
                      />
                      <Label htmlFor="isAvailable" className="text-sm font-semibold text-chicken-black">متاح للطلب</Label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 space-x-reverse pt-4">
                    <Button type="button" variant="outline" onClick={resetDialog}>
                      إلغاء
                    </Button>
                    <Button
                      type="submit"
                      className="bg-chicken-orange hover:bg-orange-600"
                      disabled={createItemMutation.isPending || updateItemMutation.isPending}
                    >
                      {editingItem ? "تحديث" : "إضافة"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Menu Items Grid */}
        {itemsLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-chicken-orange border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.nameAr}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        console.error('Failed to load admin image:', item.imageUrl);
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk3YTNiNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPtmE2Kcg2KrZiNis2K8g2LXZiNix2Kk8L3RleHQ+PC9zdmc+';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <i className="fas fa-image text-4xl text-gray-400"></i>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg truncate">{item.nameAr}</h3>
                    <Badge variant={item.isAvailable ? "default" : "secondary"}>
                      {item.isAvailable ? "متاح" : "غير متاح"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {item.descriptionAr}
                  </p>
                  <p className="text-chicken-orange font-bold text-xl mb-4">
                    {parseFloat(item.price).toFixed(2)} ريال
                  </p>
                  <div className="flex space-x-2 space-x-reverse">
                    <Button
                      onClick={() => handleEditItem(item)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <i className="fas fa-edit ml-1"></i>
                      تعديل
                    </Button>
                    <Button
                      onClick={() => deleteItemMutation.mutate(item.id)}
                      variant="destructive"
                      size="sm"
                      disabled={deleteItemMutation.isPending}
                    >
                      <i className="fas fa-trash ml-1"></i>
                      حذف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!itemsLoading && menuItems.length === 0 && (
          <div className="text-center py-20">
            <i className="fas fa-utensils text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد عناصر في القائمة</h3>
            <p className="text-gray-500">ابدأ بإضافة أول عنصر في قائمة طعامك</p>
          </div>
        )}
      </div>
    </div>
  );
}