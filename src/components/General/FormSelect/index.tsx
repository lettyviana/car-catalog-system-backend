import { TFormSelect } from "@/lib/types";
import { useState } from "react";

const FormSelect = ({
  id,
  name,
  label,
  value,
  onChange,
  families,
}: TFormSelect) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <fieldset className={`select-container ${isFocused ? "focus" : ""}`}>
      <select
        className="select"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <option className="select-default-option" value="">
          Escolha aqui
        </option>
        {families.map((family) => (
          <option className="select-option" key={family._id} value={family._id}>
            {family.make} {family.model}
          </option>
        ))}
      </select>
      <label className="select-label" htmlFor={name}>
        {label}
      </label>
    </fieldset>
  );
};

export default FormSelect;
