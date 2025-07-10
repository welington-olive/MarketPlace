import styled from 'styled-components';
import { View, Text } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '@/constants';

export const Container = styled(View)`
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
  font-size: ${FONT_SIZES.xxxl}px;
  font-weight: 700;
  color: ${COLORS.text};
  text-align: center;
`;

export const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
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
  margin-bottom: ${SPACING.md}px;
`;

export const RetryButton = styled(Text)`
  font-size: ${FONT_SIZES.md}px;
  color: ${COLORS.primary};
  font-weight: 600;
`;

export const EmptyContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${SPACING.lg}px;
`;

export const EmptyText = styled(Text)`
  font-size: ${FONT_SIZES.lg}px;
  color: ${COLORS.textSecondary};
  text-align: center;
`;

export const LoadingMoreContainer = styled(View)`
  padding: ${SPACING.md}px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${SPACING.lg}px;
`;
