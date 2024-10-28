import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFavoriteProducts } from '../../features/products/productsSlice';
import { Box, Drawer } from '@mui/material';
import DrawerProduct from '../DrawerProduct';
import './styles.css';

interface FavoriteProps {
  isOpen: boolean;
  onClose: () => void;
};

const Favorite: React.FC<FavoriteProps> = (props: FavoriteProps) => {
  const favoriteItems = useSelector(selectFavoriteProducts);

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
      {favoriteItems.map(favoriteItem => {
        return(
          <div className='products-container'>
            <DrawerProduct product={favoriteItem}/>
          </div>
        )
      })}
    </Box>
  );

  return (
    <>
      <React.Fragment>
        <Drawer
          anchor='right'
          open={props.isOpen}
          onClose={props.onClose}
        >
          <h1>Favorites</h1>
          {list()}
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default Favorite;