import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './DrawerNavigator';
import linking from '../../linking';

export const Navigation: React.FC = () => {
  return (
    <NavigationContainer linking={linking}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}; 