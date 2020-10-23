import React from "react";

function Input({ className, type = "text", value, placeholder, onChange }) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
export default Input;
