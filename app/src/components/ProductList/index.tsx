import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchProducts } from '../../features/products/productsSlice';
import ProductCard from '../ProductCard/index';
import ProductView from '../ProductView';
import { Product } from '../../types/product';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, page, loading, hasMore } = useSelector((state: RootState) => state.products);
  const [ isProductViewHidden, setIsProductViewHidden ] = useState<boolean>(true);
  const [ selectedProduct, setSelectedProduct ] = useState<Product>();

  const loadMoreProducts = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchProducts(page));
    }
  }, [dispatch, loading, hasMore, page]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 500) {
      loadMoreProducts();
    }
  }, [loadMoreProducts]);

  useEffect(() => {
    loadMoreProducts();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleOnClick = (product: Product) => () => {
    setIsProductViewHidden(false);
    setSelectedProduct(product);
  };

  return (
    <div className='container'>
      <div className='product-list'>
        {items.map((product) => (
          <ProductCard product={product} handleOnClick={handleOnClick(product)}/>
        ))}
      </div>
      <div className='product-view'>
        <ProductView isHidden={isProductViewHidden} product={selectedProduct}/>
      </div>
    </div>
  );
};

export default ProductList;