import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { WebsiteSettings } from "@shared/schema";

function hexToHsl(hex: string): string {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');
  
  // Parse the hex values
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const sum = max + min;
  
  let h = 0;
  let s = 0;
  let l = sum / 2;
  
  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - sum) : diff / sum;
    
    switch (max) {
      case r:
        h = ((g - b) / diff) + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }
    h /= 6;
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function useDynamicColors() {
  const { data: settings } = useQuery<WebsiteSettings>({
    queryKey: ["/api/website-settings"],
  });

  useEffect(() => {
    if (settings) {
      const root = document.documentElement;
      
      // Convert hex colors to HSL and update CSS custom properties
      root.style.setProperty('--chicken-orange', hexToHsl(settings.primaryColor));
      root.style.setProperty('--chicken-gold', hexToHsl(settings.secondaryColor));
      root.style.setProperty('--chicken-black', hexToHsl(settings.accentColor));
      root.style.setProperty('--warm-white', hexToHsl(settings.backgroundColor));
    }
  }, [settings]);

  return settings;
}