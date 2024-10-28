import './styles.css';
import { TiShoppingCart } from 'react-icons/ti';
import { IoIosStarOutline } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import { Button, InputAdornment, OutlinedInput } from '@mui/material';
import Cart from '../../components/Cart';
import { useState } from 'react';
import Favorite from '../../components/Favorites';

const Header: React.FC = () => {
    const [ isCartOpen, setIsCartOpen ] = useState<boolean>(false);
    const [ isFavoriteOpen, setIsFavoriteOpen ] = useState<boolean>(false);

    return(
        <div className='header'>
            <p>App Logo</p>
            <div className='search-bar'>
                <OutlinedInput size='small' className='input-field'
                    endAdornment={
                    <InputAdornment position="end">
                        <CiSearch />
                    </InputAdornment>
                }/>
            </div>
            <div className='cart-favorites-container'>
                <Button>
                    <TiShoppingCart color='black' className='icon' onClick={() => setIsCartOpen(!isCartOpen)}/>
                </Button>
                <Button>
                    <IoIosStarOutline color='black' className='icon' onClick={() => setIsFavoriteOpen(!isCartOpen)}/>
                </Button>
                <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}/>
                <Favorite isOpen={isFavoriteOpen} onClose={() => {setIsFavoriteOpen(false)}}/>
            </div>
        </div>
    );
};

export default Header;