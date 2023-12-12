import React, { useState, ReactNode } from "react";

import Wrapper from "./components/Wrapper/Wrapper";
import Screen from "./components/Screen/Screen";
import Button from "./components/Button/Button";
import ButtonBox from "./components/ButtonBox/ButtonBox";

import "./App.css";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

interface CalcState {
  sign: string;
  num: string;
  res: string;
}

const App: React.FC = () => {
  const [calc, setCalc] = useState<CalcState>({
    sign: "", // выбранный знак
    num: "0", // введенное число
    res: "0", // результат
  });

  const numClickHandler = (e: React.MouseEvent) => {
    // if user use 0-9 like num
    e.preventDefault();
    const value = e.currentTarget.innerHTML;

    if (calc.num.length < 16) {
      setCalc({
        ...calc,
        num:
          +calc.num === 0 && value === "0"
            ? "0"
            : +calc.num % 1 === 0
            ? String(Number(calc.num + value))
            : calc.num + value,
        res: !calc.sign ? "0" : calc.res,
      });
    }
  };

  const commaClickHandler = (e: React.MouseEvent) => {
    //if user click on '.'
    e.preventDefault();
    const value = e.currentTarget.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e: React.MouseEvent) => {
    // if user  click on "+, -, *, /"
    // sign will be overwritten in obj calc

    e.preventDefault();
    const value = e.currentTarget.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
    });
  };

  const equalsClickHandler = () => {};

  const percentClickHandler = () => {};

  const invertClickHandler = () => {};

  const resetClickHandler = () => {};

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
