import React from 'react';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '@/constants';
import { StyledTouchableOpacity, ButtonText, IconContainer } from './styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  icon?: React.ReactNode;
  width?: string | number;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  accessibilityLabel,
  icon,
  width,
}) => {
  return (
    <StyledTouchableOpacity
      variant={variant}
      size={size}
      disabled={disabled || loading}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      width={width}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? COLORS.primary : COLORS.surface}
        />
      )}
      {icon && <IconContainer>{icon}</IconContainer>}
      <ButtonText variant={variant} size={size}>
        {title}
      </ButtonText>
    </StyledTouchableOpacity>
  );
};
