import React, { ReactNode } from "react";
import "./Screen.css";

interface ScreenProps {
  value: ReactNode;
}

const Screen: React.FC<ScreenProps> = ({ value }) => {
  return <div className="screen">{value}</div>;
};

export default Screen;
