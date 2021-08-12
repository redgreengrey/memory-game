import React from "react";
import "./Button.css";

const Button = ({ children, className, ...props }) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
};

export default Button;
