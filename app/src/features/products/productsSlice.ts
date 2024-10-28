// src/features/products/productsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Cart, Product, ProductsState } from '../../types/product';
import { RootState } from '../../store/store';

const initialState: ProductsState = {
  items: [],
  favorites: [],
  cart: [],
  page: 1,
  loading: false,
  hasMore: true,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page: number) => {
    const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${(page - 1) * 20}`);
    const data = await response.json();
    return data.products as Product[];
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {
      if (!state.favorites.find((item) => item.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload);
    },
    addToCart: (state, action: PayloadAction<Cart>) => {
      if (!state.cart.find((item) => item.product.id === action.payload.product.id)) {
        state.cart.push(action.payload);
      } else {
        const index = state.cart.findIndex((item) => item.product.id === action.payload.product.id);
        state.cart[index].quantity = action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload];
        state.page += 1;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      });
  },
});

export const selectCartProducts = (state: RootState) => state.products.cart;
export const selectFavoriteProducts = (state: RootState) => state.products.favorites;

export const { addFavorite, removeFavorite, addToCart } = productsSlice.actions;
export default productsSlice.reducer;
