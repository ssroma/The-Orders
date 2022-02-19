import { useRef, useState } from 'react';
import Class from './MealItemForm.module.css';
import FormInput from '../../../../UI/FormInput/FormInput';

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amontInputRef = useRef();
    const submitHadler = event => {
        event.preventDefault();
        const enteredAmount = amontInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5 ){
            setAmountIsValid(false);
            return;
        } 
        
        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form 
            onSubmit={submitHadler}
            className={Class.form}
        >
            <FormInput 
                ref={amontInputRef}
                label="Amount"
                input={{
                    type: "number",
                    id: "input_" + props.id,
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1"
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
            
        </form>
    )
}

export default MealItemForm;