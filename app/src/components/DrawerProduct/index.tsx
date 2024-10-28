import { Product } from "../../types/product";
import './styles.css';

interface DrawerProductProps {
    product: Product;
    quantity?: number;
}

const DrawerProduct: React.FC<DrawerProductProps> = (props: DrawerProductProps) => {
    return(
        <>
            <div className='container'>
                <div className='drawer-product-image'>
                    <img className='drawer-product-image' src={props.product.thumbnail} alt={props.product.title}></img>
                </div>
                <div className='title'>
                    <p>{props.product.title}</p>
                </div>
                <div className='price-quantity-container'>
                    <p>{props.quantity ? (props.product.price * props.quantity) + ' $' : props.product.price + ' $'}</p>
                    <p>{props.quantity ? `Quantity: ${props.quantity}` : ''}</p>
                </div>
            </div>
        </>
    );
};

export default DrawerProduct;