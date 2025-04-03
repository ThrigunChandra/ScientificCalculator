import React from "react";

const KeysWindow = ({handleButton}) => {
    const sciKeys = ['sin', 'cos', 'ln', 'log', 'tan', 'π', 'e', '^', '√']
    const basicKeys = ['7', '8', '9', '*', '/', '4', '5', '6', '-', '(', '1', '2', '3', '+', ')', '.', '0', 'DEL', 'AC', '=']
    return (
        <div className="keysWindow">
            <div className="scientificKeys">
                {sciKeys.map((item, index)=>{
                    return <button key={index} onClick={()=>handleButton(item)}>{item}</button>
                })}
            </div>
            <div className="line"></div>
            <div className="basicKeys">
                {
                    basicKeys.map((item, index)=>{
                        return <button 
                            key={index} 
                            className={
                                `${item >= "0" && item <= '9' ? 'number' : ''}
                                ${item === '=' && "equal"}`
                            }
                            onClick={()=>handleButton(item)}
                        >
                            {item}
                        </button>
                    })
                }
            </div>
        </div>
    )
}

export default KeysWindow;