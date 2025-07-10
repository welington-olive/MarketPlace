export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  brand: string;
  model: string;
  color: string;
  discount: number;
  popular?: boolean;
  onSale?: boolean;
}

export interface ProductsResponse {
  status: string;
  message: string;
  products: Product[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface RootState {
  cart: CartState;
}

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: { productId: number };
};

export type DrawerParamList = {
  HomeStack: undefined;
};

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError {
  message: string;
  status: number;
}
