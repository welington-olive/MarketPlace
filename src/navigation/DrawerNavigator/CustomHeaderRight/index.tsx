import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RootState, DrawerParamList } from '@/types';
import { COLORS } from '@/constants';
import {
  HeaderRightContainer,
  CartButton,
  CartBadge,
  CartBadgeText,
} from './styles';

export const CustomHeaderRight: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const cartItemsCount = useSelector((state: RootState) => state.cart.items.length);
  
  return (
    <HeaderRightContainer>
      <CartButton onPress={() => navigation.toggleDrawer()}>
        <FontAwesome name="shopping-cart" size={24} color={COLORS.surface} />
        {cartItemsCount > 0 && (
          <CartBadge>
            <CartBadgeText>
              {cartItemsCount > 9 ? '9+' : cartItemsCount}
            </CartBadgeText>
          </CartBadge>
        )}
      </CartButton>
    </HeaderRightContainer>
  );
}; 