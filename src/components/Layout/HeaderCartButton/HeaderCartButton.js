import React from 'react';
import Class from './HeaderCartButton.module.css';

import CartIcon from '../../UI/CartIcon/CartIcon';

const HeaderCartButton = () => { 
    return <button className={Class.button}>
        <span className={Class.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={Class.badge}>5</span>
    </button>
};

export default HeaderCartButton;