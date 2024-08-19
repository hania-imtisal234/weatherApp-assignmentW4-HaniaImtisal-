import React, { useState, useEffect, useCallback, forwardRef } from "react";
import { debounce } from "../../util/util";

const Input = forwardRef(({ className, placeholder, onChange, value, debounceDelay = 1000 }, ref) => {
  const [inputValue, setInputValue] = useState(value);
  
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = useCallback(
    debounce((newValue) => {
      onChange(newValue);
    }, debounceDelay),
    [onChange, debounceDelay]
  );

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    handleChange(newValue);
  };

  return (
    <input
      ref={ref}
      className={className}
      placeholder={placeholder}
      onChange={handleInputChange}
      value={inputValue}
    />
  );
});

export default Input;
