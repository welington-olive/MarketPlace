import styled from 'styled-components';
import { TouchableOpacity, Text, View } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/constants';

export const StyledTouchableOpacity = styled(TouchableOpacity)<{
  variant: string;
  size: string;
  disabled: boolean;
  width?: string | number;
}>`
  padding: ${({ size }) => {
    switch (size) {
      case 'small':
        return `${SPACING.sm}px ${SPACING.md}px`;
      case 'large':
        return `${SPACING.lg}px ${SPACING.xl}px`;
      default:
        return `${SPACING.md}px ${SPACING.lg}px`;
    }
  }};
  border-radius: ${BORDER_RADIUS.md}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  width: ${({ width }) => (width ? (typeof width === 'number' ? `${width}px` : width) : 'auto')};
  background-color: ${({ variant, disabled }) => {
    if (disabled) return COLORS.textSecondary;
    switch (variant) {
      case 'secondary':
        return COLORS.secondary;
      case 'outline':
        return 'transparent';
      default:
        return COLORS.primary;
    }
  }};
  border: ${({ variant }) =>
    variant === 'outline' ? `2px solid ${COLORS.primary}` : 'none'};
`;

export const IconContainer = styled(View)`
  margin-right: ${SPACING.xs}px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled(Text)<{
  variant: string;
  size: string;
}>`
  color: ${({ variant }) =>
    variant === 'outline' ? COLORS.primary : COLORS.surface};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return FONT_SIZES.sm;
      case 'large':
        return FONT_SIZES.lg;
      default:
        return FONT_SIZES.md;
    }
  }}px;
  font-weight: 600;
`;
