import React from 'react';
import Class from './FormInput.module.css';

const FormInput = React.forwardRef((props, ref) => {
    const {label, input} = props
    return <div className={Class.input} >
        <label htmlFor={input.id}>{label}</label>
        <input ref={ref} {...input}/>
    </div>
});

export default FormInput;