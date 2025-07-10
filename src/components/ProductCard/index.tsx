import React from 'react';
import { Product } from '@/types';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addToCart } from '@/store/cartSlice';
import { Button } from '@/components/Button';
import { COLORS } from '@/constants';
import {
  CardContainer,
  ProductImage,
  ProductTitle,
  ProductPrice,
  ProductCategory,
  ProductBrand,
  DiscountBadge,
  PopularBadge,
  SaleBadge,
  BadgeText,
  ButtonContainer,
} from './styles';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart?: (product: Product) => void;
  accessibilityLabel?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  accessibilityLabel,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    onAddToCart?.(product);
  };

  return (
    <CardContainer
      onPress={onPress}
      accessibilityLabel={accessibilityLabel || `Product: ${product.title}`}
      accessibilityRole='button'
      accessibilityHint='Double tap to view product details'>
      <ProductImage source={{ uri: product.image }} />
      <ProductTitle numberOfLines={2}>{product.title}</ProductTitle>
      <ProductBrand>{product.brand}</ProductBrand>
      <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
      <ProductCategory>{product.category}</ProductCategory>

      {/* Badges */}
      {product.discount > 0 && (
        <DiscountBadge>
          <BadgeText>-{product.discount}%</BadgeText>
        </DiscountBadge>
      )}

      {product.onSale && (
        <SaleBadge>
          <BadgeText>Sale</BadgeText>
        </SaleBadge>
      )}

      {(product.popular && !product.onSale) && (
        <PopularBadge>
          <BadgeText>Popular</BadgeText>
        </PopularBadge>
      )}

      <ButtonContainer>
        <Button
          title='Buy'
          onPress={handleAddToCart}
          size='small'
          accessibilityLabel='Add product to cart'
          icon={
            <FontAwesome name='cart-plus' size={16} color={COLORS.surface} />
          }
          width='100%'
        />
      </ButtonContainer>
    </CardContainer>
  );
};
