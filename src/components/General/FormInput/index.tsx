import { TFormInput } from "@/lib/types";
import { useState } from "react";

const FormInput = ({
  label,
  name,
  type,
  placeholder,
  autoComplete,
  value,
  hidden,
  onChange,
}: TFormInput) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <fieldset
      className={`input-container ${isFocused ? "focus" : ""}`}
    >
      <input
        id={name}
        aria-label={label}
        className="input"
        type={type}
        autoComplete={autoComplete}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        hidden={hidden}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
    </fieldset>
  );
};

export default FormInput;
