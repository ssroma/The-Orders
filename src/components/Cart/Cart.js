import { useContext } from 'react'; 
import Class from './Cart.module.css';

import Modal from '../UI/Modal/Modal';
import CartContext from '../../Store/cart-context';
import CartItem from './cart-item/CartItem';

const Cart = (props) => { 
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems =  cartCtx.items.length > 0;

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    };

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cartItems = <ul className={Class['cart-items']}>{
        cartCtx.items.map( item => {
            return <CartItem 
                    key={item.id} 
                    item={item}  
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                />
        })
    }</ul>;

    return <Modal onCloseCart={props.onHideCart}>
        {cartItems}
        <div className={Class.total} >
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={Class.actions} >
            <button className={Class['button--alt']} onClick={props.onHideCart} >Close</button>
            { hasItems && <button className={Class.button} >Order</button> }
        </div>
    </Modal>
};

export default Cart;