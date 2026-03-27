import React from "react";

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  error,
  ...rest
}) {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
        autoComplete={type === "password" ? "new-password" : "off"}
        {...rest}
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
}
