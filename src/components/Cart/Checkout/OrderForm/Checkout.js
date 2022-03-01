import React, {useRef, useState} from "react";
import Class from './Checkout.module.css'

const isEmpty = value => value.trim() === "";
const inFiveChars = value => value.includes('-');

const Checkout = (props) => {
  //const [response, setResponse] = useState(false);
  const [formInputValidity, setFormInputValidity ] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameValid = !isEmpty(enteredName);
    const enteredStreetValid = !isEmpty(enteredStreet);
    const enteredPostalCodeValid = inFiveChars(enteredPostalCode);
    const enteredCityValid = !isEmpty(enteredCity);
    
    setFormInputValidity({
      name: enteredNameValid,
      street: enteredStreetValid,
      postalCode: enteredPostalCodeValid,
      city: enteredCityValid
    });
  
    const formIsValid = enteredNameValid && enteredStreetValid && enteredPostalCodeValid && enteredCityValid;

    if(!formIsValid){
      return;
    }
    
    props.onSubmit({enteredName, enteredStreet, enteredPostalCode, enteredCity});
    
  };

  return (
    <form className={Class.form} onSubmit={confirmHandler}>
      <div className={`${Class.control} ${formInputValidity.name ? '' : Class.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p className={Class.error} >Please enter a valid Name.</p>}
      </div>
      <div className={Class.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && <p className={Class.error} >Please enter a valid Street.</p>}
      </div>
      <div className={Class.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && <p className={Class.error} >Please enter a valid Postal Code.</p>}
      </div>
      <div className={Class.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidity.city && <p className={Class.error} >Please enter a valid City.</p>}
      </div>
      <div className={Class.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={Class.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;