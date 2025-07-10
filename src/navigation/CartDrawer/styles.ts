import styled from 'styled-components';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/constants';

export const DrawerContainer = styled(View)`
  flex: 1;
  background-color: ${COLORS.surface};
`;

export const Header = styled(View)`
  padding: ${SPACING.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.border};
  background-color: ${COLORS.primary};
`;

export const HeaderTitle = styled(Text)`
  font-size: ${FONT_SIZES.xxl}px;
  font-weight: bold;
  color: ${COLORS.surface};
  margin-bottom: ${SPACING.xs}px;
`;

export const ItemCount = styled(Text)`
  font-size: ${FONT_SIZES.sm}px;
  color: ${COLORS.surface};
  opacity: 0.8;
`;

export const ItemsContainer = styled(ScrollView)`
  flex: 1;
  padding: ${SPACING.md}px;
`;

export const EmptyCart = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-vertical: ${SPACING.xl}px;
`;

export const EmptyCartText = styled(Text)`
  font-size: ${FONT_SIZES.lg}px;
  font-weight: 600;
  color: ${COLORS.text};
  margin-top: ${SPACING.md}px;
`;

export const EmptyCartSubtext = styled(Text)`
  font-size: ${FONT_SIZES.sm}px;
  color: ${COLORS.textSecondary};
  margin-top: ${SPACING.sm}px;
`;

export const CartItem = styled(View)`
  flex-direction: row;
  padding: ${SPACING.sm}px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.border};
  align-items: center;
`;

export const ProductImage = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: ${BORDER_RADIUS.md}px;
  margin-right: ${SPACING.sm}px;
`;

export const ItemDetails = styled(View)`
  flex: 1;
`;

export const ProductTitle = styled(Text)`
  font-size: ${FONT_SIZES.sm}px;
  font-weight: 500;
  color: ${COLORS.text};
  margin-bottom: ${SPACING.xs}px;
`;

export const ProductPrice = styled(Text)`
  font-size: ${FONT_SIZES.md}px;
  font-weight: bold;
  color: ${COLORS.primary};
  margin-bottom: ${SPACING.sm}px;
`;

export const QuantityContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const QuantityButton = styled(TouchableOpacity)`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${COLORS.background};
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${COLORS.border};
`;

export const QuantityText = styled(Text)`
  font-size: ${FONT_SIZES.md}px;
  font-weight: 600;
  color: ${COLORS.text};
  margin-horizontal: ${SPACING.sm}px;
  min-width: 20px;
  text-align: center;
`;

export const RemoveButton = styled(TouchableOpacity)`
  padding: ${SPACING.sm}px;
`;

export const Footer = styled(View)`
  padding: ${SPACING.md}px;
  border-top-width: 1px;
  border-top-color: ${COLORS.border};
  background-color: ${COLORS.background};
`;

export const TotalContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${SPACING.md}px;
`;

export const TotalLabel = styled(Text)`
  font-size: ${FONT_SIZES.lg}px;
  font-weight: 600;
  color: ${COLORS.text};
`;

export const TotalValue = styled(Text)`
  font-size: ${FONT_SIZES.xl}px;
  font-weight: bold;
  color: ${COLORS.primary};
`;

export const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  gap: ${SPACING.sm}px;
`;

export const ClearCartButton = styled(TouchableOpacity)`
  background-color: ${COLORS.textSecondary};
  padding-vertical: ${SPACING.sm}px;
  padding-horizontal: ${SPACING.md}px;
  border-radius: ${BORDER_RADIUS.md}px;
  align-items: center;
  flex: 1;
`;

export const ClearCartButtonText = styled(Text)`
  color: ${COLORS.surface};
  font-size: ${FONT_SIZES.sm}px;
  font-weight: 600;
`;

export const CheckoutButton = styled(TouchableOpacity)`
  background-color: ${COLORS.primary};
  padding-vertical: ${SPACING.sm}px;
  padding-horizontal: ${SPACING.lg}px;
  border-radius: ${BORDER_RADIUS.md}px;
  align-items: center;
  flex: 1;
`;

export const CheckoutButtonText = styled(Text)`
  color: ${COLORS.surface};
  font-size: ${FONT_SIZES.md}px;
  font-weight: 600;
`;

 