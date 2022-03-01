import { useReducer } from "react";
import CartContext from "./cart-context"

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cardReducer = (state, action) => {
    if(action.type === 'ADD'){
        const updatedAmount = state.totalAmount + (action.item.price * action.item.amount); 
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id 
        )
        const existemCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        
        if(existemCartItem){
            const updatedItem = {
                ...existemCartItem,
                amount: existemCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem; 
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    };
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id 
        );
        const existemCartItem = state.items[existingCartItemIndex];
        const updatedAmount = state.totalAmount - existemCartItem.price; 
        let updatedItems;
        if(existemCartItem.amount === 1){
            updatedItems = state.items.filter( item => {
                return item.id !== action.id;
            })
        }else{
            const updatedItem = {
                ...existemCartItem,
                amount: existemCartItem.amount - 1
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem; 
        }

        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }
    if(action.type === 'CLEAR'){
        return defaultCartState;
    }

    return defaultCartState;
}

const CartProvider = (props) => {
    const [cartState, dispatchCartState] = useReducer(cardReducer, defaultCartState);
    
    const addItemCartHandler = (item) => {
        dispatchCartState({type: 'ADD', item: item });
    };
    
    const removeItemCartHandler = (id) => {
        dispatchCartState({type: 'REMOVE', id: id });
    };

    const clearCartHandler = () => {
        dispatchCartState({type: 'CLEAR'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemCartHandler,
        removeItem: removeItemCartHandler,
        clearCart: clearCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;