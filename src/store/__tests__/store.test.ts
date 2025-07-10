import { store } from '../index';
import { addToCart, removeFromCart, clearCart } from '../cartSlice';
import { Product } from '@/types';

// Mock product for testing
const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 100,
  description: 'Test description',
  category: 'Electronics',
  image: 'test-image.jpg',
  brand: 'Test Brand',
  model: 'Test Model',
  color: 'Black',
  discount: 0,
};

describe('Redux Store', () => {
  beforeEach(() => {
    // Clear the store before each test
    store.dispatch(clearCart());
  });

  describe('Store Configuration', () => {
    it('should have the correct initial state', () => {
      const state = store.getState();
      
      expect(state.cart).toBeDefined();
      expect(state.cart.items).toEqual([]);
      expect(state.cart.total).toBe(0);
    });

    it('should have the correct store structure', () => {
      const state = store.getState();
      
      expect(state).toHaveProperty('cart');
      expect(typeof state.cart).toBe('object');
    });
  });

  describe('Cart Actions Integration', () => {
    it('should handle addToCart action', () => {
      store.dispatch(addToCart(mockProduct));
      
      const state = store.getState();
      expect(state.cart.items).toHaveLength(1);
      expect(state.cart.items[0].product).toEqual(mockProduct);
      expect(state.cart.items[0].quantity).toBe(1);
      expect(state.cart.total).toBe(100);
    });

    it('should handle multiple addToCart actions', () => {
      store.dispatch(addToCart(mockProduct));
      store.dispatch(addToCart(mockProduct));
      
      const state = store.getState();
      expect(state.cart.items).toHaveLength(1);
      expect(state.cart.items[0].quantity).toBe(2);
      expect(state.cart.total).toBe(200);
    });

    it('should handle removeFromCart action', () => {
      store.dispatch(addToCart(mockProduct));
      store.dispatch(removeFromCart(1));
      
      const state = store.getState();
      expect(state.cart.items).toHaveLength(0);
      expect(state.cart.total).toBe(0);
    });

    it('should handle clearCart action', () => {
      store.dispatch(addToCart(mockProduct));
      store.dispatch(addToCart(mockProduct));
      store.dispatch(clearCart());
      
      const state = store.getState();
      expect(state.cart.items).toHaveLength(0);
      expect(state.cart.total).toBe(0);
    });
  });

  describe('State Immutability', () => {
    it('should not mutate state directly', () => {
      const initialState = store.getState();
      
      // Try to mutate state directly (this should not work)
      const cartState = store.getState().cart;
      const originalItems = cartState.items;
      
      store.dispatch(addToCart(mockProduct));
      
      const newState = store.getState();
      
      // The original state should not be mutated
      expect(originalItems).toEqual([]);
      expect(newState.cart.items).toHaveLength(1);
    });
  });

  describe('Action Dispatching', () => {
    it('should dispatch actions without errors', () => {
      expect(() => {
        store.dispatch(addToCart(mockProduct));
      }).not.toThrow();
      
      expect(() => {
        store.dispatch(removeFromCart(1));
      }).not.toThrow();
      
      expect(() => {
        store.dispatch(clearCart());
      }).not.toThrow();
    });

    it('should return the correct action types', () => {
      const addAction = addToCart(mockProduct);
      const removeAction = removeFromCart(1);
      const clearAction = clearCart();
      
      expect(addAction.type).toBe('cart/addToCart');
      expect(removeAction.type).toBe('cart/removeFromCart');
      expect(clearAction.type).toBe('cart/clearCart');
    });
  });

  describe('Store Subscription', () => {
    it('should notify subscribers of state changes', () => {
      const mockSubscriber = jest.fn();
      const unsubscribe = store.subscribe(mockSubscriber);
      
      store.dispatch(addToCart(mockProduct));
      
      expect(mockSubscriber).toHaveBeenCalled();
      
      unsubscribe();
    });

    it('should allow unsubscribing from store updates', () => {
      const mockSubscriber = jest.fn();
      const unsubscribe = store.subscribe(mockSubscriber);
      
      unsubscribe();
      store.dispatch(addToCart(mockProduct));
      
      expect(mockSubscriber).not.toHaveBeenCalled();
    });
  });

  describe('Complex State Changes', () => {
    it('should handle complex cart operations', () => {
      const product1: Product = { ...mockProduct, id: 1, price: 100 };
      const product2: Product = { ...mockProduct, id: 2, price: 50 };
      
      // Add multiple products
      store.dispatch(addToCart(product1));
      store.dispatch(addToCart(product2));
      store.dispatch(addToCart(product1)); // Add more of product1
      
      let state = store.getState();
      expect(state.cart.items).toHaveLength(2);
      expect(state.cart.total).toBe(250); // (100 * 2) + 50
      
      // Remove one product
      store.dispatch(removeFromCart(1));
      
      state = store.getState();
      expect(state.cart.items).toHaveLength(1);
      expect(state.cart.items[0].product.id).toBe(2);
      expect(state.cart.total).toBe(50);
      
      // Clear cart
      store.dispatch(clearCart());
      
      state = store.getState();
      expect(state.cart.items).toHaveLength(0);
      expect(state.cart.total).toBe(0);
    });
  });
}); 