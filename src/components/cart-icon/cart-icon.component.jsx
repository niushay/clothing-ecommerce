import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CartItemContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartItemContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount >{cartCount}</ItemCount>
        </CartItemContainer>
    )
}

export default CartIcon;