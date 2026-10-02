import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  customizations?: Record<string, any>;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  removeItem: (id: string, customizations?: Record<string, any>) => void;
  updateQuantity: (id: string, quantity: number, customizations?: Record<string, any>) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (newItem) => {
        const items = get().items;
        const existingItem = items.find(item => 
          item.id === newItem.id && 
          JSON.stringify(item.customizations || {}) === JSON.stringify(newItem.customizations || {})
        );
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === newItem.id && 
              JSON.stringify(item.customizations || {}) === JSON.stringify(newItem.customizations || {})
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...newItem, quantity: 1 }],
          });
        }
      },
      
      removeFromCart: (id) => {
        set({
          items: get().items.filter(item => item.id !== id),
        });
      },

      removeItem: (id, customizations) => {
        set({
          items: get().items.filter(item => 
            !(item.id === id && 
              JSON.stringify(item.customizations || {}) === JSON.stringify(customizations || {}))
          ),
        });
      },
      
      updateQuantity: (id, quantity, customizations) => {
        if (quantity <= 0) {
          get().removeItem(id, customizations);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.id === id && 
            JSON.stringify(item.customizations || {}) === JSON.stringify(customizations || {})
              ? { ...item, quantity } 
              : item
          ),
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'chicken-hat-cart',
      version: 1,
    }
  )
);
