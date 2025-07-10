import { LinkingOptions } from '@react-navigation/native';
import { DrawerParamList, RootStackParamList } from './src/types';

const linking: LinkingOptions<DrawerParamList> = {
  prefixes: ['marketplace://', 'https://marketplace.com'],
  config: {
    screens: {
      HomeStack: {
        screens: {
          Home: 'home',
          ProductDetails: 'product/:productId',
        },
      },
    },
  },
};

export default linking; 