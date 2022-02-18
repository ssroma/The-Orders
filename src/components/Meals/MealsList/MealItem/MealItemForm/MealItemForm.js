import FormInput from '../../../../UI/FormInput/FormInput';
import Class from './MealItemForm.module.css';

const MealItemForm = (props) => {
    return (
        <form className={Class.form}>
            <FormInput 
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
            
        </form>
    )
}

export default MealItemForm;