import styled from 'styled-components';
import { View, Text } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/constants';

export const ModalOverlay = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${SPACING.lg}px;
`;

export const ModalContainer = styled(View)`
  background-color: ${COLORS.surface};
  border-radius: ${BORDER_RADIUS.lg}px;
  padding: ${SPACING.lg}px;
  width: 100%;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const ModalTitle = styled(Text)`
  font-size: ${FONT_SIZES.xl}px;
  font-weight: bold;
  color: ${COLORS.text};
  text-align: center;
  margin-bottom: ${SPACING.md}px;
`;

export const ModalMessage = styled(Text)`
  font-size: ${FONT_SIZES.md}px;
  color: ${COLORS.textSecondary};
  text-align: center;
  margin-bottom: ${SPACING.lg}px;
  line-height: 22px;
`;

export const ModalButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`; 