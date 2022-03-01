import React, { useContext, useEffect, useState } from 'react'; 
import Class from './Cart.module.css';

import Modal from '../UI/Modal/Modal';
import CartContext from '../../Store/cart-context';
import CartItem from './cart-item/CartItem';
import Checkout from './Checkout/OrderForm/Checkout';
import { Circles } from  'react-loader-spinner'

const postOrders = async (userData, cartItems, setConfirmResponse) => {
    const response = await fetch('https://food-order-project-34dc7-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            user: userData,
            orderedItems: cartItems
        })
    });

    const data = await response.json();
    setConfirmResponse({data, response});
}


const Cart = (props) => { 
    const cartCtx = useContext(CartContext);
    const [showCheckout, setShowCheckout] = useState(false);
    const [confirmResponse, setConfirmResponse] = useState({data: '', response: {ok: false}});
    const [waitResponse, setWaitResponse] = useState(false);
    const [response, setResponse] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems =  cartCtx.items.length > 0;

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    };

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cancelHandler = () => {
        setShowCheckout(false);
    }

    const orderHandler = () => {
        setShowCheckout(true);
    }

    const submitOrder = (userData) => {
        setWaitResponse(true);
        postOrders(userData, cartCtx.items, setConfirmResponse);
    }

    useEffect(() => {
        if(confirmResponse.response.ok === true){
            setShowCheckout(false);
            setWaitResponse(false);
            setResponse(true);
            cartCtx.clearCart();
        }
    }, [confirmResponse]);
    
    
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

    const modelActions = (
        <div className={Class.actions} >
            <button 
                className={Class['button--alt']} 
                onClick={props.onHideCart} 
            >Close</button>
            { hasItems && <button className={Class.button} onClick={orderHandler} 
            >
                Order
            </button> }
        </div> 
    );

    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={Class.total} >
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {showCheckout && <Checkout onCancel={cancelHandler} onSubmit={submitOrder} /> }
        {!showCheckout && modelActions}
    </React.Fragment>

    return <Modal onCloseCart={props.onHideCart}>
        {!waitResponse && !response && cartModalContent}
        {waitResponse && <Circles color="#8a2b06" height={80} width={80} />}
        {response && 
            <React.Fragment>
                <p>Order sent Successfully..</p>
                <div className={Class.actions} >
                    <button 
                        className={Class.button} 
                        onClick={props.onHideCart} 
                    >Close</button>
                </div> 
            </React.Fragment>
        }
    </Modal>
};

export default Cart;