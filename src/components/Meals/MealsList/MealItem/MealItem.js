import { useContext } from 'react';
import Class from './MealItem.module.css';

import CartContext from '../../../../Store/cart-context';
import MealItemForm from './MealItemForm/MealItemForm';


const MealItem = (props) => {
    const {id, name, description, price} = props.meal;
    const cartCtx = useContext(CartContext);
    const formatedPrice = `$${price.toFixed(2)}`;


    const addToCartHandler = amount => {
        cartCtx.addItem({
            id, name, amount, price
        })
    }

    return <li className={Class.meal} data-item={id}>
        <div>
            <h3>{name}</h3>
            <div className={Class.description}>
                <p>{description}</p>
            </div>
            <div className={Class.price}>
                {formatedPrice}
            </div>
        </div>
        <div>
           <MealItemForm id={id} onAddToCart={addToCartHandler} />
        </div>
    </li>
};

export default MealItem;