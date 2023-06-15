import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    nameValid: true,
    streetValid: true,
    cityValid: true,
    postalCodeValid: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postalCode = postalCodeRef.current.value;
    const city = cityRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const cityIsValid = !isEmpty(city);
    const postalCodeIsValid = isFiveChars(postalCode);

    setFormInputsValidity({
      nameValid: nameIsValid,
      streetValid: streetIsValid,
      postalCodeValid: postalCodeIsValid,
      cityValid: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    const userData = {
      name: name,
      street: street,
      postalCode: postalCode,
      city: city,
    };

    props.onSubmitOrder(userData);
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.nameValid ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.streetValid ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCodeValid ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.cityValid ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.field_container}>
        <div className={nameControlClasses}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameRef} />
          {!formInputsValidity.nameValid && <p>Please enter a valid name!</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetRef} />
          {!formInputsValidity.streetValid && (
            <p>Please enter a valid street!</p>
          )}
        </div>
        <div className={postalCodeControlClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={postalCodeRef} />
          {!formInputsValidity.postalCodeValid && (
            <p>Please enter a valid postal code!</p>
          )}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityRef} />
          {!formInputsValidity.cityValid && <p>Please enter a valid city!</p>}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onHideCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
