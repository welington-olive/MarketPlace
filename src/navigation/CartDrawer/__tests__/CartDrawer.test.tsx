import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from '@/store/cartSlice';
import { CartDrawer } from '../index';
import { Product } from '@/types';

// Mock Modal usando componentes do React Native
jest.mock('@/components', () => ({
  Modal: ({ visible, title, message }: any) => {
    if (!visible) return null;
    const { Text, View } = require('react-native');
    return (
      <View>
        {title && <Text>{title}</Text>}
        {message && <Text>{message}</Text>}
      </View>
    );
  },
}));

// Mock icons e styled-components
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('../styles', () => new Proxy({}, { get: (target, prop) => prop }));

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

const createTestStore = (initialState: any = { cart: { items: [], total: 0 } }) => {
  return configureStore({
    reducer: combineReducers({ cart: cartReducer }),
    preloadedState: initialState as any,
  });
};

const renderWithStore = (store: any) =>
  render(
    <Provider store={store}>
      <CartDrawer />
    </Provider>
  );

function findAllTexts(node: any): string[] {
  if (!node) return [];
  if (typeof node === 'string') return [node];
  if (Array.isArray(node)) return node.flatMap(findAllTexts);
  if (typeof node === 'object') {
    let texts: string[] = [];
    if (node.children) texts = texts.concat(findAllTexts(node.children));
    return texts;
  }
  return [];
}

describe('CartDrawer', () => {
  it('renderiza mensagem de carrinho vazio', () => {
    const store = createTestStore();
    const { toJSON } = renderWithStore(store);
    const allTexts = findAllTexts(toJSON());
    expect(allTexts.some(t => typeof t === 'string' && t.includes('Cart'))).toBe(true);
    expect(allTexts.some(t => typeof t === 'string' && t.includes('Empty Cart'))).toBe(true);
    expect(allTexts.some(t => typeof t === 'string' && t.includes('Add products to your cart'))).toBe(true);
  });

  it('renderiza produtos no carrinho', () => {
    const store = createTestStore({
      cart: {
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 1 },
        ],
        total: 250,
      },
    });
    const { toJSON } = renderWithStore(store);
    const allTexts = findAllTexts(toJSON());
    const allTextJoined = allTexts.filter(t => typeof t === 'string').join(' ');
    expect(allTextJoined).toContain('Test Product 1');
    expect(allTextJoined).toContain('Test Product 2');
    expect(allTextJoined).toMatch(/\$\s*100\.00/);
    expect(allTextJoined).toMatch(/\$\s*50\.00/);
    expect(allTextJoined).toMatch(/\b2\b/);
    expect(allTextJoined).toMatch(/\b1\b/);
    expect(allTextJoined).toContain('Total:');
    expect(allTextJoined).toMatch(/\$\s*250\.00/);
  });
}); 