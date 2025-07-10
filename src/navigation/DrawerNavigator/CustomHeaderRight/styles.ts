import styled from 'styled-components';
import { View, TouchableOpacity, Text } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/constants';

export const HeaderRightContainer = styled(View)``;

export const CartButton = styled(TouchableOpacity)`
  margin-right: ${SPACING.md}px;
`;

export const CartBadge = styled(View)`
  position: absolute;
  right: -12px;
  top: -12px;
  background-color: ${COLORS.text};
  border-radius: 22px;
  width: 22px;
  height: 22px;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${SPACING.xs}px;
`;

export const CartBadgeText = styled(Text)`
  color: ${COLORS.surface};
  font-size: 10px;
  font-weight: bold;
`; 