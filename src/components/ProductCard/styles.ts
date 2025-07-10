import styled from 'styled-components';
import { TouchableOpacity, Image, Text, View, Dimensions } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/constants';

const width = Dimensions.get('window').width;

export const CardContainer = styled(TouchableOpacity)`
  background-color: ${COLORS.surface};
  border-radius: ${BORDER_RADIUS.lg}px;
  padding: ${SPACING.md}px;
  margin: ${SPACING.sm}px;
  shadow-color: ${COLORS.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  min-height: 200px;
  width: ${(width / 2) - (SPACING.sm * 2)}px;
`;

export const ProductImage = styled(Image)`
  width: 100%;
  height: 120px;
  border-radius: ${BORDER_RADIUS.md}px;
  margin-bottom: ${SPACING.sm}px;
  resize-mode: contain;
`;

export const ProductTitle = styled(Text)`
  font-size: ${FONT_SIZES.md}px;
  font-weight: 600;
  color: ${COLORS.text};
  margin-bottom: ${SPACING.xs}px;
  line-height: 20px;
`;

export const ProductPrice = styled(Text)`
  font-size: ${FONT_SIZES.lg}px;
  font-weight: 700;
  color: ${COLORS.primary};
  margin-bottom: ${SPACING.sm}px;
`;

export const ProductCategory = styled(Text)`
  font-size: ${FONT_SIZES.sm}px;
  color: ${COLORS.textSecondary};
  text-transform: capitalize;
`;

export const ProductBrand = styled(Text)`
  font-size: ${FONT_SIZES.sm}px;
  color: ${COLORS.secondary};
  font-weight: 500;
  margin-bottom: ${SPACING.xs}px;
  text-transform: capitalize;
`;

export const DiscountBadge = styled(View)`
  background-color: ${COLORS.success};
  padding: ${SPACING.xs}px ${SPACING.sm}px;
  border-radius: ${BORDER_RADIUS.sm}px;
  position: absolute;
  top: ${SPACING.sm}px;
  right: ${SPACING.sm}px;
`;

export const PopularBadge = styled(View)`
  background-color: ${COLORS.warning};
  padding: ${SPACING.xs}px ${SPACING.sm}px;
  border-radius: ${BORDER_RADIUS.sm}px;
  position: absolute;
  top: ${SPACING.sm}px;
  left: ${SPACING.sm}px;
`;

export const SaleBadge = styled(View)`
  background-color: ${COLORS.error};
  padding: ${SPACING.xs}px ${SPACING.sm}px;
  border-radius: ${BORDER_RADIUS.sm}px;
  position: absolute;
  top: ${SPACING.sm}px;
  left: ${SPACING.sm}px;
`;

export const BadgeText = styled(Text)`
  font-size: ${FONT_SIZES.xs}px;
  color: ${COLORS.surface};
  font-weight: 600;
  text-transform: uppercase;
`;

export const ButtonContainer = styled(View)`
  margin-top: ${SPACING.sm}px;
  align-items: center;
`;
