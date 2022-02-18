import Class from './MealItem.module.css';

import MealItemForm from './MealItemForm/MealItemForm';

const MealItem = (props) => {
    const {id, name, description, price} = props.meal;
    const formatedPrice = `$${price.toFixed(2)}`;

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
           <MealItemForm id={id} />
        </div>
    </li>
};

export default MealItem;