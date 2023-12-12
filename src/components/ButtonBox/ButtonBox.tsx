import React, { ReactNode } from "react";
import "./ButtonBox.css";

interface ButtonBoxProps {
  children: ReactNode;
}

const ButtonBox: React.FC<ButtonBoxProps> = ({ children }) => {
  return <div className="buttonBox">{children}</div>;
};

export default ButtonBox;
