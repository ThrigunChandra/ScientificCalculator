import React, { useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";
import { calcResult } from "../utils/calculate";

const Calculator = () => {

    const [expression, setExpression] = useState("");
    const [displayExp, setDisplayExp] = useState("");
    const [result, setResult] = useState("");

    const handleButton = (value) => {
        // console.log(value);
        if(value === "AC"){
            setExpression("");
            setDisplayExp("");
            setResult("");
        }else if(value === "DEL"){
            setDisplayExp(displayExp.slice(0, -1));
            setExpression(expression.slice(0, -1));
            setResult("")
        }else if(value === "="){
            setResult(calcResult(expression))
        }else{
            setExpression(expression + value)
            setDisplayExp(displayExp + value)
        }
    }

    return (
        <div className="calc">
            <DisplayWindow expression={displayExp} result={result}/>
            <KeysWindow handleButton={handleButton}/>
        </div>
    )
}

export default Calculator;