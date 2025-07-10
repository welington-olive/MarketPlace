import React, { useState } from 'react';
import { FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '@/constants';
import { RootStackParamList } from '@/types';
import { Product } from '@/types';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { AddToCartModal } from '@/components/AddToCartModal';
import {
  Container,
  LoadingContainer,
  ErrorContainer,
  ErrorText,
  RetryButton,
  EmptyContainer,
  EmptyText,
  LoadingMoreContainer,
} from './styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { products, loading, loadingMore, error, hasMore, refetch, loadMoreProducts } = useProducts();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductPress = (productId: number): void => {
    navigation.navigate('ProductDetails', { productId });
  };

  const handleAddToCart = (product: Product): void => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleContinueShopping = (): void => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleLoadMore = (): void => {
    if (hasMore && !loadingMore && !loading) {
      loadMoreProducts();
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item.id)}
      onAddToCart={handleAddToCart}
      accessibilityLabel={`Product card: ${item.title}`}
    />
  );

  const renderEmptyList = () => (
    <EmptyContainer>
      <EmptyText>No products found</EmptyText>
    </EmptyContainer>
  );

  const renderError = () => (
    <ErrorContainer>
      <ErrorText>Failed to load products</ErrorText>
      <RetryButton onPress={refetch}>Tap to retry</RetryButton>
    </ErrorContainer>
  );

  const renderLoading = () => (
    <LoadingContainer>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </LoadingContainer>
  );

  const renderLoadingMore = (): React.ReactElement | null => {
    if (!hasMore) return null;
    
    return (
      <LoadingMoreContainer>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </LoadingMoreContainer>
    );
  };

  if (loading && products.length === 0) {
    return renderLoading();
  }

  if (error && products.length === 0) {
    return renderError();
  }

  return (
    <Container>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item): string => item.id.toString()}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={renderLoadingMore}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        accessibilityLabel="Products list"
        accessibilityHint="Scroll to browse products"
      />
      
      <AddToCartModal
        visible={showModal}
        product={selectedProduct}
        onClose={handleCloseModal}
        onContinueShopping={handleContinueShopping}
      />
    </Container>
  );
};
