import styled from 'styled-components';
import { View, ScrollView, Text, Image } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/constants';

export const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${COLORS.background};
`;

export const Header = styled(View)`
  padding: ${SPACING.lg}px;
  background-color: ${COLORS.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.border};
`;

export const Title = styled(Text)`
  font-size: ${FONT_SIZES.xxl}px;
  font-weight: 700;
  color: ${COLORS.text};
  text-align: center;
`;

export const ProductImage = styled(Image)`
  width: 100%;
  height: 300px;
  resize-mode: contain;
  margin: 0 0 ${SPACING.lg}px 0;
  background-color: ${COLORS.surface};
`;

export const ContentContainer = styled(View)`
  padding: ${SPACING.lg}px;
  background-color: ${COLORS.surface};
  margin: ${SPACING.md}px;
  border-radius: ${BORDER_RADIUS.lg}px;
`;

export const ProductTitle = styled(Text)`
  font-size: ${FONT_SIZES.md}px;
  margin-bottom: ${SPACING.xs}px;
  font-weight: 600;
  color: ${COLORS.text};
  line-height: 20px;
`;

export const ProductPrice = styled(Text)`
  font-size: ${FONT_SIZES.xxxl}px;
  font-weight: 700;
  color: ${COLORS.primary};
`;

export const PriceButtonContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${SPACING.lg}px;
`;

export const ProductCategory = styled(Text)`
  font-size: ${FONT_SIZES.md}px;
  color: ${COLORS.textSecondary};
  text-transform: capitalize;
  margin-bottom: ${SPACING.md}px;
  padding: ${SPACING.sm}px ${SPACING.md}px;
  background-color: ${COLORS.background};
  border-radius: ${BORDER_RADIUS.md}px;
  align-self: flex-start;
`;

export const ProductDescription = styled(Text)`
  font-size: ${FONT_SIZES.md}px;
  color: ${COLORS.text};
  line-height: 24px;
`;

export const ProductBrand = styled(Text)`
  font-size: ${FONT_SIZES.sm}px;
  color: ${COLORS.secondary};
  font-weight: 500;
  text-transform: capitalize;
  align-items: center;
  justify-content: center;
`;

export const ProductColor = styled(Text)`
  font-size: ${FONT_SIZES.md}px;
  color: ${COLORS.textSecondary};
  margin-bottom: ${SPACING.md}px;
  text-transform: capitalize;
`;

export const DiscountBadge = styled(View)`
  background-color: ${COLORS.success};
  padding: ${SPACING.xs}px ${SPACING.sm}px;
  border-radius: ${BORDER_RADIUS.sm}px;
`;

export const PopularBadge = styled(View)`
  background-color: ${COLORS.warning};
  padding: ${SPACING.xs}px ${SPACING.sm}px;
  border-radius: ${BORDER_RADIUS.sm}px;
`;

export const SaleBadge = styled(View)`
  background-color: ${COLORS.error};
  padding: ${SPACING.xs}px ${SPACING.sm}px;
  border-radius: ${BORDER_RADIUS.sm}px;
`;

export const BadgeText = styled(Text)`
  font-size: ${FONT_SIZES.xs}px;
  color: ${COLORS.surface};
  font-weight: 600;
  text-transform: uppercase;
`;

export const BadgesContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${SPACING.md}px;
`;

export const ButtonContainer = styled(View)`
  margin-bottom: ${SPACING.lg}px;
`;

export const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${SPACING.lg}px;
`;

export const ErrorContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${SPACING.lg}px;
`;

export const ErrorText = styled(Text)`
  font-size: ${FONT_SIZES.lg}px;
  color: ${COLORS.error};
  text-align: center;
`;
