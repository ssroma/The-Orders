import React, {useContext, useEffect, useState} from 'react';
import Class from './HeaderCartButton.module.css';

import CartIcon from '../../UI/CartIcon/CartIcon';
import CartContext from '../../../Store/cart-context';

const HeaderCartButton = (props) => { 
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext); 
    const {items} = cartCtx;
    const numberOfCartItems = items.reduce((currentNum, item) => {
        return currentNum + item.amount;
    }, 0);
    
    const btnClasses = `${Class.button} ${btnIsHighlighted === true ? Class.bump : ''}`;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnIsHighlighted(true);
        const clearTimer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300); 

        return () => { 
            clearTimeout(clearTimer);
        }
    }, [items]);
    
    return <button className={btnClasses} onClick={props.onClick} >
        <span className={Class.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={Class.badge}>{numberOfCartItems}</span>
    </button>
};

export default HeaderCartButton;