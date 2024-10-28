import { Button } from '@mui/material';
import { CiStar } from 'react-icons/ci';
import { Product } from '../../types/product';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavoriteProducts, selectCartProducts, addFavorite, addToCart } from '../../features/products/productsSlice';

interface ProductViewProps {
    isHidden: boolean;
    product: Product | undefined;	
};

const ProductView: React.FC<ProductViewProps> = (props: ProductViewProps) => {
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavoriteProducts);
    const cart = useSelector(selectCartProducts);
  
    const isFavorite = (id: string) => favorites.some((product) => product.id === id);
    const inCart = (id: string) => cart.some((cartItem) => cartItem.product.id === id);
    
    const handleFavoriteClick = () => {
        if (props.product?.id && !isFavorite(props.product.id)) {
          dispatch(addFavorite(props.product));
        }
      };
    
    const handleCartClick = () => {
        if (props.product && props.product?.id && inCart(props.product.id)) {
            const quantity = cart.find(cartItem => cartItem.product.id === props.product?.id)?.quantity;
            if(quantity) {
            dispatch(addToCart({product: props.product, quantity: quantity + 1 }));
            }
        } else if(props.product){
            dispatch(addToCart({product: props.product, quantity: 1}));
        }
    };
    return(
        <>{props.product ?
            <div className={`${props.isHidden? 'is-hidden' : 'product-view-container'}`} >
                <div className='info-view'>
                    <h2 className='product-title'>{props.product.title}</h2>
                    <div className='price-discount'>
                        <p className='price'>${props.product.price}</p>
                        <p className='discount'>{props.product.discountPercentage? props.product.discountPercentage.toString()+' % off' : ''}</p>
                    </div>
                    <div className="product-rating">
                        {'★'.repeat(props.product.rating)}{'☆'.repeat(6 - props.product.rating)}
                    </div>
                </div>
                <img className='image' src={props.product.thumbnail} alt={props.product.title}/>
                <p className='description'>{props.product.description}</p>

                <div className="product-actions-view">
                    <Button onClick={handleCartClick}>Add to cart</Button>
                    <Button onClick={handleFavoriteClick}><CiStar color='black'/></Button>
                </div>
            </div>
        : 
            ''
        }
        </>
    )
};

export default ProductView;