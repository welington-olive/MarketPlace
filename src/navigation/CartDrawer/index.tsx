import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootState } from '@/types';
import { removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice';
import { Modal } from '@/components';
import {
  DrawerContainer,
  Header,
  HeaderTitle,
  ItemCount,
  ItemsContainer,
  EmptyCart,
  EmptyCartText,
  EmptyCartSubtext,
  CartItem,
  ProductImage,
  ItemDetails,
  ProductTitle,
  ProductPrice,
  QuantityContainer,
  QuantityButton,
  QuantityText,
  RemoveButton,
  Footer,
  TotalContainer,
  TotalLabel,
  TotalValue,
  ButtonContainer,
  CheckoutButton,
  CheckoutButtonText,
  ClearCartButton,
  ClearCartButtonText,
} from './styles';

export const CartDrawer: React.FC = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleRemoveItem = (productId: number) => {
    setItemToDelete(productId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      dispatch(removeFromCart(itemToDelete));
      setItemToDelete(null);
    }
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setShowDeleteModal(false);
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      setItemToDelete(productId);
      setShowDeleteModal(true);
    } else {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const handleClearCart = () => {
    setShowClearCartModal(true);
  };

  const handleConfirmClearCart = () => {
    dispatch(clearCart());
    setShowClearCartModal(false);
  };

  const handleCancelClearCart = () => {
    setShowClearCartModal(false);
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleConfirmCheckout = () => {
    dispatch(clearCart());
    setShowCheckoutModal(false);
  };

  return (
    <DrawerContainer>
      <Header>
        <HeaderTitle>Cart</HeaderTitle>
        <ItemCount>
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </ItemCount>
      </Header>
      
      <ItemsContainer>
        {items.length === 0 ? (
          <EmptyCart>
            <FontAwesome name="shopping-cart" size={48} color="#333" />
            <EmptyCartText>Empty Cart</EmptyCartText>
            <EmptyCartSubtext>
              Add products to your cart
            </EmptyCartSubtext>
          </EmptyCart>
        ) : (
          <>
            {items.map(item => (
              <CartItem key={item.product.id}>
                <ProductImage source={{ uri: item.product.image }} />
                <ItemDetails>
                  <ProductTitle numberOfLines={2}>
                    {item.product.title}
                  </ProductTitle>
                  <ProductPrice>
                    $ {item.product.price.toFixed(2)}
                  </ProductPrice>
                  <QuantityContainer>
                    <QuantityButton
                      onPress={() =>
                        handleUpdateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <MaterialIcons
                        name="remove"
                        size={16}
                        color="#007AFF"
                      />
                    </QuantityButton>
                    <QuantityText>{item.quantity}</QuantityText>
                    <QuantityButton
                      onPress={() =>
                        handleUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <MaterialIcons
                        name="add"
                        size={16}
                        color="#007AFF"
                      />
                    </QuantityButton>
                  </QuantityContainer>
                </ItemDetails>
                <RemoveButton
                  onPress={() => handleRemoveItem(item.product.id)}
                >
                  <MaterialIcons name="delete" size={20} color="#FF3B30" />
                </RemoveButton>
              </CartItem>
            ))}
          </>
        )}
      </ItemsContainer>
      
      {items.length > 0 && (
        <Footer>
          <TotalContainer>
            <TotalLabel>Total:</TotalLabel>
            <TotalValue>$ {total.toFixed(2)}</TotalValue>
          </TotalContainer>
          <ButtonContainer>
            <ClearCartButton onPress={handleClearCart}>
              <ClearCartButtonText>Clear</ClearCartButtonText>
            </ClearCartButton>
            <CheckoutButton onPress={handleCheckout}>
              <CheckoutButtonText>Checkout</CheckoutButtonText>
            </CheckoutButton>
          </ButtonContainer>
        </Footer>
      )}
      
      <Modal
        visible={showClearCartModal}
        title="Clear Cart"
        message="Are you sure you want to remove all items from your cart?"
        buttons={[
          {
            title: "Cancel",
            onPress: handleCancelClearCart,
            variant: "outline",
            width: "47%"
          },
          {
            title: "Clear",
            onPress: handleConfirmClearCart,
            variant: "primary",
            width: "47%"
          }
        ]}
        onClose={handleCancelClearCart}
      />
      
      <Modal
        visible={showCheckoutModal}
        title="Purchase Successful!"
        message="Your purchase has been completed successfully. Thank you for shopping with us!"
        buttons={[
          {
            title: "OK",
            onPress: handleConfirmCheckout,
            variant: "primary",
            width: "100%"
          }
        ]}
        onClose={handleConfirmCheckout}
      />
      
      <Modal
        visible={showDeleteModal}
        title="Remove Item"
        message="Are you sure you want to remove this item from your cart?"
        buttons={[
          {
            title: "Cancel",
            onPress: handleCancelDelete,
            variant: "outline",
            width: "47%"
          },
          {
            title: "Remove",
            onPress: handleConfirmDelete,
            variant: "primary",
            width: "47%"
          }
        ]}
        onClose={handleCancelDelete}
      />
    </DrawerContainer>
  );
}; 