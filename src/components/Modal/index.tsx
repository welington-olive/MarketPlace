import React from 'react';
import { Button } from '@/components/Button';
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalMessage,
  ModalButtonContainer,
} from './styles';

export interface ModalButton {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  width?: string;
}

interface ModalProps {
  visible: boolean;
  title: string;
  message: string;
  buttons: ModalButton[];
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  message,
  buttons,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ModalButtonContainer>
          {buttons.map((button, index) => (
            <Button
              key={index}
              title={button.title}
              onPress={button.onPress}
              variant={button.variant || 'primary'}
              size={button.size || 'small'}
              width={button.width || '47%'}
            />
          ))}
        </ModalButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}; 