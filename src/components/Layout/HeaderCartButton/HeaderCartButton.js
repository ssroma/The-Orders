import React, {useContext} from 'react';
import Class from './HeaderCartButton.module.css';

import CartIcon from '../../UI/CartIcon/CartIcon';
import CartContext from '../../../Store/cart-context';

const HeaderCartButton = (props) => { 
    const cartCtx = useContext(CartContext); 
    
    const numberOfCartItems = cartCtx.items.reduce((currentNum, item) => {
        return currentNum + item.amount;
    }, 0);
    
    return <button className={Class.button} onClick={props.onClick} >
        <span className={Class.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={Class.badge}>{numberOfCartItems}</span>
    </button>
};

export default HeaderCartButton;