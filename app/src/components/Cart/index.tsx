import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartProducts } from '../../features/products/productsSlice';
import { Box, Drawer } from '@mui/material';
import DrawerProduct from '../DrawerProduct';
import './styles.css';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
};

const Cart: React.FC<CartProps> = (props: CartProps) => {
  const cartItems = useSelector(selectCartProducts);
  const [ total, setTotal ] = useState<number>(0);
  const toggleDrawer =
  () =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    props.onClose();
  };

  const list = () => (
    <Box
      sx={{ width: '25vw'}}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      {cartItems.map(cartItem => {
        return(
          <div className='products-container'>
            <DrawerProduct product={cartItem.product} quantity={cartItem.quantity}/>
          </div>
        )
      })}
    </Box>
  );

  useEffect(() => {
    setTotal(cartItems.reduce((total, item) => total + item.product.price*item.quantity, 0))
  }, [cartItems])

  return (
    <>
      <React.Fragment>
        <Drawer
          anchor='right'
          open={props.isOpen}
          onClose={props.onClose}
        >
          <h1>Cart</h1>
          {list()}
          <div className='total'>Total: {total.toFixed(2)} $</div>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default Cart;