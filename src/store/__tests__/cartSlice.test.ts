import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../cartSlice';
import { CartState, Product } from '@/types';

// Mock product data for testing
const mockProduct1: Product = {
  id: 1,
  title: 'Test Product 1',
  price: 100,
  description: 'Test description 1',
  category: 'Electronics',
  image: 'test-image-1.jpg',
  brand: 'Test Brand',
  model: 'Test Model',
  color: 'Black',
  discount: 0,
};

const mockProduct2: Product = {
  id: 2,
  title: 'Test Product 2',
  price: 50,
  description: 'Test description 2',
  category: 'Clothing',
  image: 'test-image-2.jpg',
  brand: 'Test Brand 2',
  model: 'Test Model 2',
  color: 'White',
  discount: 10,
};

describe('Cart Slice', () => {
  let initialState: CartState;

  beforeEach(() => {
    initialState = {
      items: [],
      total: 0,
    };
  });

  describe('Initial State', () => {
    it('should return the initial state', () => {
      const state = cartReducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });
  });

  describe('addToCart', () => {
    it('should add a new product to cart', () => {
      const state = cartReducer(initialState, addToCart(mockProduct1));
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual({
        product: mockProduct1,
        quantity: 1,
      });
      expect(state.total).toBe(100);
    });

    it('should increment quantity when adding existing product', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct1, quantity: 1 }],
        total: 100,
      };

      const state = cartReducer(stateWithItem, addToCart(mockProduct1));
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
      expect(state.total).toBe(200);
    });

    it('should handle multiple different products', () => {
      let state = cartReducer(initialState, addToCart(mockProduct1));
      state = cartReducer(state, addToCart(mockProduct2));
      
      expect(state.items).toHaveLength(2);
      expect(state.items[0].product.id).toBe(1);
      expect(state.items[1].product.id).toBe(2);
      expect(state.total).toBe(150); // 100 + 50
    });

    it('should calculate total correctly with multiple items', () => {
      let state = cartReducer(initialState, addToCart(mockProduct1));
      state = cartReducer(state, addToCart(mockProduct1)); // Add same product again
      state = cartReducer(state, addToCart(mockProduct2));
      
      expect(state.items).toHaveLength(2);
      expect(state.items[0].quantity).toBe(2);
      expect(state.items[1].quantity).toBe(1);
      expect(state.total).toBe(250); // (100 * 2) + 50
    });
  });

  describe('removeFromCart', () => {
    it('should remove a product from cart', () => {
      const stateWithItems = {
        ...initialState,
        items: [
          { product: mockProduct1, quantity: 1 },
          { product: mockProduct2, quantity: 2 },
        ],
        total: 200, // 100 + (50 * 2)
      };

      const state = cartReducer(stateWithItems, removeFromCart(1));
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0].product.id).toBe(2);
      expect(state.total).toBe(100); // 50 * 2
    });

    it('should handle removing non-existent product', () => {
      const stateWithItems = {
        ...initialState,
        items: [{ product: mockProduct1, quantity: 1 }],
        total: 100,
      };

      const state = cartReducer(stateWithItems, removeFromCart(999));
      
      expect(state.items).toHaveLength(1);
      expect(state.total).toBe(100);
    });

    it('should handle removing from empty cart', () => {
      const state = cartReducer(initialState, removeFromCart(1));
      
      expect(state.items).toHaveLength(0);
      expect(state.total).toBe(0);
    });
  });

  describe('updateQuantity', () => {
    it('should update quantity of existing product', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct1, quantity: 1 }],
        total: 100,
      };

      const state = cartReducer(
        stateWithItem,
        updateQuantity({ productId: 1, quantity: 3 })
      );
      
      expect(state.items[0].quantity).toBe(3);
      expect(state.total).toBe(300); // 100 * 3
    });

    it('should remove product when quantity is set to 0', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct1, quantity: 1 }],
        total: 100,
      };

      const state = cartReducer(
        stateWithItem,
        updateQuantity({ productId: 1, quantity: 0 })
      );
      
      expect(state.items).toHaveLength(0);
      expect(state.total).toBe(0);
    });

    it('should remove product when quantity is negative', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct1, quantity: 1 }],
        total: 100,
      };

      const state = cartReducer(
        stateWithItem,
        updateQuantity({ productId: 1, quantity: -5 })
      );
      
      expect(state.items).toHaveLength(0);
      expect(state.total).toBe(0);
    });

    it('should handle updating non-existent product', () => {
      const stateWithItem = {
        ...initialState,
        items: [{ product: mockProduct1, quantity: 1 }],
        total: 100,
      };

      const state = cartReducer(
        stateWithItem,
        updateQuantity({ productId: 999, quantity: 5 })
      );
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(1);
      expect(state.total).toBe(100);
    });

    it('should handle multiple quantity updates', () => {
      const stateWithItems = {
        ...initialState,
        items: [
          { product: mockProduct1, quantity: 1 },
          { product: mockProduct2, quantity: 2 },
        ],
        total: 200,
      };

      let state = cartReducer(
        stateWithItems,
        updateQuantity({ productId: 1, quantity: 3 })
      );
      state = cartReducer(
        state,
        updateQuantity({ productId: 2, quantity: 1 })
      );
      
      expect(state.items[0].quantity).toBe(3);
      expect(state.items[1].quantity).toBe(1);
      expect(state.total).toBe(350); // (100 * 3) + (50 * 1)
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', () => {
      const stateWithItems = {
        ...initialState,
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 3 },
        ],
        total: 350, // (100 * 2) + (50 * 3)
      };

      const state = cartReducer(stateWithItems, clearCart());
      
      expect(state.items).toHaveLength(0);
      expect(state.total).toBe(0);
    });

    it('should handle clearing empty cart', () => {
      const state = cartReducer(initialState, clearCart());
      
      expect(state.items).toHaveLength(0);
      expect(state.total).toBe(0);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle a complete shopping cart workflow', () => {
      // Start with empty cart
      let state = cartReducer(initialState, { type: 'unknown' });
      expect(state.items).toHaveLength(0);
      expect(state.total).toBe(0);

      // Add first product
      state = cartReducer(state, addToCart(mockProduct1));
      expect(state.items).toHaveLength(1);
      expect(state.total).toBe(100);

      // Add second product
      state = cartReducer(state, addToCart(mockProduct2));
      expect(state.items).toHaveLength(2);
      expect(state.total).toBe(150);

      // Add more of first product
      state = cartReducer(state, addToCart(mockProduct1));
      expect(state.items).toHaveLength(2);
      expect(state.items[0].quantity).toBe(2);
      expect(state.total).toBe(250);

      // Update quantity of second product
      state = cartReducer(
        state,
        updateQuantity({ productId: 2, quantity: 5 })
      );
      expect(state.items[1].quantity).toBe(5);
      expect(state.total).toBe(450); // (100 * 2) + (50 * 5)

      // Remove first product
      state = cartReducer(state, removeFromCart(1));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].product.id).toBe(2);
      expect(state.total).toBe(250); // 50 * 5

      // Clear cart
      state = cartReducer(state, clearCart());
      expect(state.items).toHaveLength(0);
      expect(state.total).toBe(0);
    });

    it('should handle products with decimal prices', () => {
      const productWithDecimalPrice: Product = {
        ...mockProduct1,
        price: 99.99,
      };

      let state = cartReducer(initialState, addToCart(productWithDecimalPrice));
      state = cartReducer(state, addToCart(productWithDecimalPrice));
      
      expect(state.items[0].quantity).toBe(2);
      expect(state.total).toBe(199.98);
    });

    it('should handle products with zero price', () => {
      const freeProduct: Product = {
        ...mockProduct1,
        price: 0,
      };

      let state = cartReducer(initialState, addToCart(freeProduct));
      state = cartReducer(state, addToCart(mockProduct2));
      
      expect(state.items).toHaveLength(2);
      expect(state.total).toBe(50); // 0 + 50
    });
  });
}); 