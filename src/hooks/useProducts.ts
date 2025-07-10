import { useState, useEffect, useCallback, useRef } from 'react';
import { productService, PaginationParams } from '@/services/productService';
import { Product } from '@/types';
import { Alert } from 'react-native';

const ITEMS_PER_PAGE = 10;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  
  const isLoadingRef = useRef<boolean>(false);
  const loadedPagesRef = useRef<Set<number>>(new Set());

  const fetchProducts = async (page: number = 1, append: boolean = false): Promise<void> => {
    if (isLoadingRef.current) {
      return;
    }
    
    if (append && loadedPagesRef.current.has(page)) {
      return;
    }

    try {
      isLoadingRef.current = true;
      
      if (page === 1) {
        setLoading(true);
        loadedPagesRef.current.clear();
      } else {
        setLoadingMore(true);
      }
      setError(null);
      
      const params: PaginationParams = {
        page,
        limit: ITEMS_PER_PAGE,
      };
      
      const response = await productService.getProductsWithPagination(params);
      const newProducts = response.products || [];
      
      loadedPagesRef.current.add(page);
      
      if (append) {
        setProducts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p.id));
          return [...prev, ...uniqueNewProducts];
        });
      } else {
        setProducts(newProducts);
      }
      
      setHasMore(newProducts.length === ITEMS_PER_PAGE);
      setCurrentPage(page);
      
    } catch (err: any) {
      let errorMessage = 'Failed to fetch products';
      if (err.status === 0) {
        errorMessage = 'Network error: Unable to connect to server. Please check your internet connection.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      
      if (page === 1) {
        Alert.alert(
          'Network Error',
          `Status: ${err.status || 'Unknown'}\nMessage: ${err.message || 'No message'}\nCode: ${err.code || 'No code'}`,
          [{ text: 'OK' }]
        );
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
      isLoadingRef.current = false;
    }
  };

  const loadMoreProducts = useCallback((): void => {
    const nextPage = currentPage + 1;
    
    if (!isLoadingRef.current && hasMore && !loading && !loadedPagesRef.current.has(nextPage)) {
      fetchProducts(nextPage, true);
    }
  }, [hasMore, loading, currentPage]);

  const refetch = useCallback((): void => {
    setCurrentPage(1);
    setHasMore(true);
    loadedPagesRef.current.clear();
    fetchProducts(1, false);
  }, []);

  useEffect(() => {
    fetchProducts(1, false);
  }, []);

  return {
    products,
    loading,
    loadingMore,
    error,
    hasMore,
    refetch,
    loadMoreProducts,
  };
};

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
};
