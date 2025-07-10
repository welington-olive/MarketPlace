import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AddToCartModal } from '../index';
import { Product } from '@/types';

// Mock Modal usando componentes do React Native
jest.mock('@/components/Modal', () => ({
  Modal: ({ visible, title, message, buttons, onClose }: any) => {
    if (!visible) return null;
    const React = require('react');
    const { Text, TouchableOpacity, View } = require('react-native');
    return (
      <View>
        {title && <Text>{title}</Text>}
        {message && <Text>{message}</Text>}
        {buttons?.map((button: any, idx: number) => (
          <TouchableOpacity key={idx} onPress={button.onPress} testID={`modal-btn-${button.title.toLowerCase()}`}>
            <Text>{button.title}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={onClose} testID="modal-btn-close">
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    );
  },
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ dispatch: jest.fn() }),
  DrawerActions: { openDrawer: jest.fn() },
}));

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

describe('AddToCartModal', () => {
  const mockOnClose = jest.fn();
  const mockOnContinueShopping = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('não renderiza quando visível é false', () => {
    const { queryByText } = render(
      <AddToCartModal visible={false} product={mockProduct} onClose={mockOnClose} onContinueShopping={mockOnContinueShopping} />
    );
    expect(queryByText('Product Added!')).toBeNull();
  });

  it('renderiza título e mensagem quando visível', () => {
    const { getByText } = render(
      <AddToCartModal visible={true} product={mockProduct} onClose={mockOnClose} onContinueShopping={mockOnContinueShopping} />
    );
    expect(getByText('Product Added!')).toBeTruthy();
    expect(getByText(/Test Product/)).toBeTruthy();
    expect(getByText(/\$100/)).toBeTruthy();
  });

  it('aciona onContinueShopping ao clicar em Continue', () => {
    const { getByTestId } = render(
      <AddToCartModal visible={true} product={mockProduct} onClose={mockOnClose} onContinueShopping={mockOnContinueShopping} />
    );
    fireEvent.press(getByTestId('modal-btn-continue'));
    expect(mockOnContinueShopping).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('aciona onClose ao clicar em Cart', () => {
    const { getByTestId } = render(
      <AddToCartModal visible={true} product={mockProduct} onClose={mockOnClose} onContinueShopping={mockOnContinueShopping} />
    );
    fireEvent.press(getByTestId('modal-btn-cart'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('aciona onClose ao clicar em Close', () => {
    const { getByTestId } = render(
      <AddToCartModal visible={true} product={mockProduct} onClose={mockOnClose} onContinueShopping={mockOnContinueShopping} />
    );
    fireEvent.press(getByTestId('modal-btn-close'));
    expect(mockOnClose).toHaveBeenCalled();
  });
}); 