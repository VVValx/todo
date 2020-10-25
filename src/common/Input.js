import React from "react";

function Input({
  type = "text",
  name = null,
  value,
  error = null,
  placeholder,
  onChange,
}) {
  return (
    <React.Fragment>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={name ? name : placeholder}
        onChange={onChange}
      />

      {error && <p className="error">{error[name]}</p>}
    </React.Fragment>
  );
}
export default Input;
