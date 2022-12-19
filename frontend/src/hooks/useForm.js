import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState);
  const reset = () => {
    setFormValues(initialState);
  };
  const handleInputChange = ({ target: { name, value } }) => {
    setFormValues((state) => ({ ...state, [name]: value }));
  };

  return [formValues, handleInputChange, reset];
};
