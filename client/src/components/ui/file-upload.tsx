import React, { useState, useRef } from 'react';
import { Button } from './button';
import { Label } from './label';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileUploaded: (url: string) => void;
  endpoint: string;
  currentImage?: string;
  label: string;
  accept?: string;
}

export default function FileUpload({
  onFileUploaded,
  endpoint,
  currentImage,
  label,
  accept = "image/*"
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "خطأ في نوع الملف",
        description: "يرجى اختيار صورة صالحة فقط",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "حجم الملف كبير",
        description: "يرجى اختيار صورة أصغر من 5 ميجابايت",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append(endpoint.includes('logo') ? 'logo' :
                     endpoint.includes('favicon') ? 'favicon' : 'image', file);

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('فشل في رفع الصورة');
      }

      const data = await response.json();
      const imageUrl = data.logoUrl || data.faviconUrl || data.imageUrl;

      onFileUploaded(imageUrl);
      toast({
        title: "تم رفع الصورة بنجاح",
        description: "تم رفع الصورة وحفظها بنجاح",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "خطأ في رفع الصورة",
        description: "حدث خطأ أثناء رفع الصورة. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-semibold text-chicken-black flex items-center">
        <i className="fas fa-image ml-2 text-chicken-orange"></i>
        {label}
      </Label>

      <div className="flex flex-col items-center space-y-4">
        {/* Current Image Preview */}
        {currentImage && (
          <div className="relative group mb-4">
            <img
              src={currentImage.replace('/uploads/uploads/', '/uploads/')}
              alt="معاينة الصورة"
              className="w-32 h-32 object-cover rounded-xl border-2 border-orange-200 shadow-md"
              loading="lazy"
              onError={(e) => {
                console.error('Failed to load preview image:', currentImage);
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk3YTNiNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPtiu2LfYoyDZgdmKINi52LHYtiDYp9mE2LXZiNix2Kk8L3RleHQ+PC9zdmc+';
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center cursor-pointer"
                 onClick={() => window.open(currentImage.replace('/uploads/uploads/', '/uploads/'), '_blank')}>
              <i className="fas fa-search text-white opacity-0 group-hover:opacity-100 text-xl transition-opacity duration-200"></i>
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex flex-col items-center space-y-2">
          <Button
            type="button"
            onClick={handleFileSelect}
            disabled={isUploading}
            className="bg-gradient-to-r from-chicken-orange to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {isUploading ? (
              <>
                <i className="fas fa-spinner fa-spin ml-2"></i>
                جاري الرفع...
              </>
            ) : (
              <>
                <i className="fas fa-cloud-upload-alt ml-2"></i>
                {currentImage ? 'تغيير الصورة' : 'اختيار صورة'}
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            أنواع الملفات المدعومة: JPG, PNG, GIF<br />
            الحد الأقصى لحجم الملف: 5 ميجابايت
          </p>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}