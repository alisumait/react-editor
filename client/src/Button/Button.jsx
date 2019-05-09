import React from 'react';
import './Button.css';

const Button = ({ children, onClick, disabled, className, ...props }) => {   
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
     {children}    
    </button>
  );
};

export default Button;