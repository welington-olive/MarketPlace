import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { COLORS } from '@/constants';
import { RootStackParamList } from '@/types';
import { useProduct } from '@/hooks/useProducts';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addToCart } from '@/store/cartSlice';
import { Button } from '@/components/Button';
import { AddToCartModal } from '@/components/AddToCartModal';
import {
  Container,
  Header,
  Title,
  ProductImage,
  ContentContainer,
  ProductTitle,
  ProductPrice,
  ProductCategory,
  ProductDescription,
  ProductBrand,
  ProductColor,
  DiscountBadge,
  PopularBadge,
  SaleBadge,
  BadgeText,
  BadgesContainer,
  ButtonContainer,
  PriceButtonContainer,
  LoadingContainer,
  ErrorContainer,
  ErrorText,
} from './styles';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

export const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { productId } = route.params;
  const { product, loading, error } = useProduct(productId);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleContinueShopping = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size='large' color={COLORS.primary} />
      </LoadingContainer>
    );
  }

  if (error || !product) {
    return (
      <ErrorContainer>
        <ErrorText>Failed to load product details</ErrorText>
      </ErrorContainer>
    );
  }

  return (
    <>
      <Container>
        <ProductImage source={{ uri: product.image }} />
        <ContentContainer>
          <BadgesContainer>
            {(product.popular && !product.onSale) && (
              <PopularBadge>
                <BadgeText>Popular</BadgeText>
              </PopularBadge>
            )}

            {product.onSale && (
              <SaleBadge>
                <BadgeText>Sale</BadgeText>
              </SaleBadge>
            )}

            {product.discount > 0 && (
              <DiscountBadge>
                <BadgeText>-{product.discount}%</BadgeText>
              </DiscountBadge>
            )}
          </BadgesContainer>

          <ProductBrand>
            {product.category}{' '}
            <FontAwesome6 name='arrow-right' size={10} color={COLORS.secondary} />{' '}
            {product.brand}
          </ProductBrand>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductColor>Color: {product.color}</ProductColor>
          <PriceButtonContainer>
            <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
            <Button
              title='Buy'
              onPress={handleAddToCart}
              size='small'
              accessibilityLabel='Add product to cart'
              icon={<FontAwesome name='cart-plus' size={24} color={COLORS.surface} />}
            />
          </PriceButtonContainer>

          <ProductDescription>{product.description}</ProductDescription>
        </ContentContainer>
      </Container>

      <AddToCartModal
        visible={showModal}
        product={product}
        onClose={handleCloseModal}
        onContinueShopping={handleContinueShopping}
      />
    </>
  );
};
