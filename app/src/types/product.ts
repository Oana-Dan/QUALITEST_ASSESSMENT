export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    brand: string;
    category: string;
    thumbnail: string;
    rating: number;
    images: string[];
};
  

export interface ProductsState {
    items: Product[];
    favorites: Product[];           
    cart: Cart[]; 
    page: number;
    loading: boolean;
    hasMore: boolean;
    error: string | null;
};

export interface Cart {
    product: Product;
    quantity: number;
}