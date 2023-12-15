import React, { useState } from "react";
import Wrapper from "./components/Wrapper/Wrapper";
import Screen from "./components/Screen/Screen";
import Button from "./components/Button/Button";
import ButtonBox from "./components/ButtonBox/ButtonBox";

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

const toLocaleString = (num: string) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num: string) => num.toString().replace(/\s/g, "");

const App: React.FC = () => {
  const [calc, setCalc] = useState<CalcState>({
    sign: "",
    num: "0",
    res: "0",
  });

  const numClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const value = e.currentTarget.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          +removeSpaces(calc.num) === 0 && value === "0"
            ? "0"
            : +removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(String(Number(removeSpaces(calc.num + value))))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? "0" : calc.res,
      });
    }
  };

  const commaClickHandler = (e: React.MouseEvent) => {
    // "."
    e.preventDefault();
    const value = e.currentTarget.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const value = e.currentTarget.innerHTML;

    if (calc.num && calc.res === "0") {
      setCalc({
        ...calc,
        sign: value,
        num: "0",
        res: calc.num,
      });
    }
  };
  const equalsClickHandler = () => {
    // =
    if (calc.num && calc.sign) {
      const currentNum = parseFloat(calc.num);
      let result: string = "0";

      switch (calc.sign) {
        case "/":
          result = (parseFloat(calc.res) / currentNum).toString();
          break;
        case "X":
          result = (parseFloat(calc.res) * currentNum).toString();
          break;
        case "-":
          result = (parseFloat(calc.res) - currentNum).toString();
          break;
        case "+":
          result = (parseFloat(calc.res) + currentNum).toString();
          break;
        default:
          break;
      }

      setCalc({
        sign: "",
        num: result,
        res: "0",
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num
        ? toLocaleString(String(+removeSpaces(calc.num) * -1))
        : "0",
      res: calc.res
        ? toLocaleString(String(+removeSpaces(calc.res) * -1))
        : "0",
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: String(num / Math.pow(100, 1)),
      res: String(res / Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: "0",
      res: "0",
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num !== "0" ? calc.num : calc.res} />
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
