import Class from './FormInput.module.css';

const FormInput = (props) => {
    const {label, input} = props
    return <div className={Class.input} >
        <label htmlFor={input.id}>{label}</label>
        <input {...input}/>
    </div>
};

export default FormInput;