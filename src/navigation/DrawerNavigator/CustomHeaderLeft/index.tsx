import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HeaderLeftContainer } from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import { COLORS } from '@/constants';
import { DrawerParamList } from '@/types';

export const CustomHeaderLeft: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const navigationState = useNavigationState(state => state);

  const currentRoute =
    navigationState?.routes?.[navigationState.index ?? 0]?.state?.routes?.[
      navigationState?.routes?.[navigationState.index ?? 0]?.state?.index ?? 0
    ];

  const isProductDetails = currentRoute?.name === 'ProductDetails';

  const handleGoBack = () => {
    if (isProductDetails) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeStack' }],
        });
      }
    }
  };

  if (isProductDetails) {
    return (
      <HeaderLeftContainer>
        <TouchableOpacity onPress={handleGoBack}>
          <FontAwesome name='arrow-left' size={24} color={COLORS.surface} />
        </TouchableOpacity>
      </HeaderLeftContainer>
    );
  }

  return null;
};
