import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigationState } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootState, DrawerParamList } from '@/types';
import { COLORS } from '@/constants';
import { HomeStack } from '../HomeStack';
import { CartDrawer } from '../CartDrawer';
import { CustomHeaderRight } from './CustomHeaderRight';
import { CustomHeaderLeft } from './CustomHeaderLeft';

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DrawerNavigator: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const cartItemCount = items.length;
  
  const navigationState = useNavigationState(state => state);
  const currentRoute =
    navigationState?.routes?.[navigationState.index ?? 0]?.state?.routes?.[
      navigationState?.routes?.[navigationState.index ?? 0]?.state?.index ?? 0
    ];
  
  const getDrawerTitle = () => {
    if (currentRoute?.name === 'ProductDetails') {
      return 'Product';
    }
    return 'Products';
  };

  const isProductDetails = currentRoute?.name === 'ProductDetails';

  return (
    <Drawer.Navigator
      drawerContent={() => <CartDrawer />}
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.surface,
        headerTitleStyle: {
          fontWeight: '600',
        },
        drawerStyle: {
          backgroundColor: COLORS.surface,
          width: 320,
        },
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.text,
        drawerPosition: 'right',
        headerRight: () => <CustomHeaderRight />,
        headerLeft: () => isProductDetails ? <CustomHeaderLeft /> : null,
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: getDrawerTitle(),
          headerTitleAlign: 'center',
        }}
      />
    </Drawer.Navigator>
  );
}; 