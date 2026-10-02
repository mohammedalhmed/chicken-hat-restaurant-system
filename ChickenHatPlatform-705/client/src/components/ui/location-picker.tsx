
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationPickerProps {
  onLocationSelect: (location: LocationData) => void;
  currentLocation?: LocationData | null;
}

export function LocationPicker({ onLocationSelect, currentLocation }: LocationPickerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getCurrentLocation = () => {
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "خطأ",
        description: "متصفحك لا يدعم تحديد الموقع الجغرافي",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Try to get address from coordinates using reverse geocoding
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
          ).catch(() => null);
          
          let address = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          
          if (response && response.ok) {
            const data = await response.json();
            if (data.results && data.results[0]) {
              address = data.results[0].formatted || address;
            }
          }
          
          const locationData: LocationData = {
            latitude,
            longitude,
            address
          };
          
          onLocationSelect(locationData);
          
          toast({
            title: "تم تحديد الموقع بنجاح",
            description: "تم الحصول على موقعك الحالي"
          });
        } catch (error) {
          console.error("Error getting address:", error);
          
          const locationData: LocationData = {
            latitude,
            longitude,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          };
          
          onLocationSelect(locationData);
          
          toast({
            title: "تم تحديد الموقع",
            description: "تم الحصول على الإحداثيات بنجاح"
          });
        }
        
        setIsLoading(false);
      },
      (error) => {
        let errorMessage = "فشل في تحديد الموقع";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "تم رفض الإذن لتحديد الموقع";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "معلومات الموقع غير متاحة";
            break;
          case error.TIMEOUT:
            errorMessage = "انتهت مهلة تحديد الموقع";
            break;
        }
        
        toast({
          title: "خطأ في تحديد الموقع",
          description: errorMessage,
          variant: "destructive"
        });
        
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        onClick={getCurrentLocation}
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700 font-medium"
      >
        <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-map-marker-alt'} ml-2`}></i>
        {isLoading ? "جاري تحديد الموقع..." : "تحديد موقعي الحالي"}
      </Button>
      
      {currentLocation && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <i className="fas fa-check-circle text-green-600"></i>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">تم تحديد الموقع</p>
                <p className="text-xs text-green-600 mt-1">
                  {currentLocation.address || `${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
