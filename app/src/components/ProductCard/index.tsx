import { Product } from '../../types/product';
import { CiStar } from "react-icons/ci";
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, addToCart, selectCartProducts, selectFavoriteProducts } from '../../features/products/productsSlice';
import { Button } from '@mui/material';

interface ProductCardProps {
  product: Product;
  handleOnClick: () => void;
};

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoriteProducts);
  const cart = useSelector(selectCartProducts);

  const isFavorite = (id: string) => favorites.some((product) => product.id === id);
  const inCart = (id: string) => cart.some((cartItem) => cartItem.product.id === id);
  
  const handleFavoriteClick = () => {
    if (!isFavorite(props.product.id)) {
      dispatch(addFavorite(props.product));
    }
  };

  const handleCartClick = () => {
    if (inCart(props.product.id)) {
      const quantity = cart.find(cartItem => cartItem.product.id === props.product.id)?.quantity;
      if(quantity) {
        dispatch(addToCart({product: props.product, quantity: quantity + 1 }));
      }
    } else {
      dispatch(addToCart({product: props.product, quantity: 1}));
    }
  };

  return(
    <>
      <div className="product-card">
        <Button onClick={props.handleOnClick}>
          <img className="product-image" src={props.product.thumbnail} alt={props.product.title}/>
          <div className="product-info">
            <p>{props.product.title}</p>
            <div className="product-rating">
              {'★'.repeat(props.product.rating)}{'☆'.repeat(6 - props.product.rating)}
            </div>
          </div>
          <div className='right-container'>
            <div className="product-pricing">
              <span className="price">${props.product.price}</span>
              <span className="discount">{props.product.discountPercentage ? props.product.discountPercentage.toString()+' % off' : ''}</span>
            </div>
            <div className="product-actions">
              <Button onClick={handleCartClick}>Add to cart</Button>
              <Button onClick={handleFavoriteClick}><CiStar color='black'/></Button>
            </div>
          </div>
        </Button>
    </div>
  </>  
  )
};

export default ProductCard;