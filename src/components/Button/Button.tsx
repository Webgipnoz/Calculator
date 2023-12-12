import React, { ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
  className: string;
  value: ReactNode;
  onClick: (e: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ className, value, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
