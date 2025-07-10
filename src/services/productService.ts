import { apiService } from './api';
import { API_ENDPOINTS } from '@/constants';
import { Product, ProductsResponse } from '@/types';

export interface PaginationParams {
  page: number;
  limit: number;
}

export class ProductService {
  async testDirectFetch(): Promise<{ success: boolean; data?: ProductsResponse; status?: number; message?: string; error?: string }> {
    try {
      const response = await fetch('https://fakestoreapi.in/products');
      
      if (response.ok) {
        const data: ProductsResponse = await response.json();
        return { success: true, data, status: response.status };
      } else {
        return { success: false, status: response.status, message: response.statusText };
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await apiService.get<ProductsResponse>(API_ENDPOINTS.PRODUCTS);
      return response.data.products;
    } catch (error) {
      throw error;
    }
  }

  async getProductsWithPagination(params: PaginationParams): Promise<ProductsResponse> {
    try {
      const { page, limit } = params;
      const response = await apiService.get<ProductsResponse>(
        `${API_ENDPOINTS.PRODUCTS}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: number): Promise<Product> {
    const response = await apiService.get<{ status: string; message: string; product: Product }>(API_ENDPOINTS.PRODUCT(id));
    
    return response.data.product;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await apiService.get<ProductsResponse>(
      `${API_ENDPOINTS.PRODUCTS}/category/${category}`
    );
    return response.data.products;
  }

  async getCategories(): Promise<string[]> {
    const response = await apiService.get<{ status: string; message: string; categories: string[] }>(API_ENDPOINTS.CATEGORIES);
    
    if (response.data && 'categories' in response.data) {
      return response.data.categories;
    }
    return response.data as string[];
  }
}

export const productService = new ProductService();
