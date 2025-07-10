import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { Modal } from '@/components/Modal';
import { Product } from '@/types';

interface AddToCartModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
  visible,
  product,
  onClose,
  onContinueShopping,
}) => {
  const navigation = useNavigation();

  const handleGoToCart = () => {
    onClose();
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleContinueShopping = () => {
    onClose();
    onContinueShopping();
  };

  const productName = product?.title || 'Product';
  const productPrice = product?.price ? `$${product.price}` : '';
  
  return (
    <Modal
      visible={visible}
      title="Product Added!"
      message={`"${productName}" ${productPrice ? `(${productPrice})` : ''} has been added to your cart. Would you like to go to your cart or continue shopping?`}
      buttons={[
        {
          title: "Continue",
          onPress: handleContinueShopping,
          variant: "outline",
          width: "47%"
        },
        {
          title: "Cart",
          onPress: handleGoToCart,
          variant: "primary",
          width: "47%"
        }
      ]}
      onClose={onClose}
    />
  );
}; 