import React, {useState, useRef} from 'react';
import './App.css';

let flag = false

function App() {
  const [total, setTotal] = useState("")
  const [current, setCurrent] = useState("0")
  const valueToCalculate = useRef("")
  const zeroTacker = useRef("")
  let slicedString = ""
  

  const setTotalFunction = (e) => {
    const valueAdded = e.target.innerText

    let currentArray = Array.from(current)
    let found = currentArray.includes(".")

    let zeroArray = Array.from(zeroTacker.current)
    let zeroArrayLength = zeroArray.length
    if (zeroArray[0] === "0" && valueAdded === "0" && zeroArrayLength <2) return
    if (found && valueAdded === ".") return
    if (current === "0") setCurrent("") 
    setTotal(prev => 
      prev += `${valueAdded}`)
    setCurrent((prev) => 
      prev += `${valueAdded}`
    )
    zeroTacker.current += `${valueAdded}`
    valueToCalculate.current += `${valueAdded}`
  }
  function clearAll () {
    setTotal("")
    setCurrent("0")
    valueToCalculate.current = ""
    zeroTacker.current = ""
  }
  function operate (e) {
    console.log(flag)
    let input = e.target.innerText
    let valueToCalculateArray = Array.from(valueToCalculate.current)
    let valueToCalculateArrayLength = valueToCalculateArray.length
    let lastElement = valueToCalculateArray[valueToCalculateArrayLength-1]
    let secondToLastElement = valueToCalculateArray[valueToCalculateArrayLength-2]
    setCurrent(`${e.target.innerText}`)
    setTotal((prev) => 
      prev += `${e.target.innerText}`
    )
    zeroTacker.current = ""
    if(lastElement === "/" || lastElement === "*" || lastElement === "-" || lastElement === "+" ) {
      if (secondToLastElement === "/" || secondToLastElement === "*" || secondToLastElement === "-" || secondToLastElement === "+" ) {
        if (lastElement === "-" && input === "-") {
          return
        }
        else {
          slicedString = valueToCalculate.current.slice(0, -2)
          valueToCalculate.current = slicedString
          valueToCalculate.current += `${input}`
          if(flag === true) setTotal(prev => prev = valueToCalculate.current)
          flag = false
          return
        }
      }

      if (input === "-") {
        valueToCalculate.current += "-"
        if(flag === true) setTotal(prev => prev = valueToCalculate.current)
        flag = false
        return
      }
      if (input === "/" || input === "+" ) {
        slicedString = valueToCalculate.current.slice(0, -1)
        valueToCalculate.current = slicedString
        valueToCalculate.current += `${input}`
        if(flag === true) setTotal(prev => prev = valueToCalculate.current)
        flag = false
        return
      }
    }
    valueToCalculate.current += `${e.target.innerText}`
    if(flag === true) setTotal(prev => prev = valueToCalculate.current)
    flag = false
    
  }
  function multiply (e) {
    let input2 = "*"
    let valueToCalculateArray2 = Array.from(valueToCalculate.current)
    let valueToCalculateArrayLength2 = valueToCalculateArray2.length
    let lastElement2 = valueToCalculateArray2[valueToCalculateArrayLength2-1]
    let secondToLastElement2 = valueToCalculateArray2[valueToCalculateArrayLength2-2]
    setCurrent(`${e.target.innerText}`)
    setTotal((prev) => 
      prev += `*`
    )
    zeroTacker.current = ""
    if(lastElement2 === "/" || lastElement2 === "*" || lastElement2 === "-" || lastElement2 === "+" ) {
      if (secondToLastElement2 === "/" || secondToLastElement2 === "*" || secondToLastElement2 === "-" || secondToLastElement2 === "+" ) {
        slicedString = valueToCalculate.current.slice(0, -2)
        valueToCalculate.current = slicedString
        valueToCalculate.current += input2
        if(flag === true) setTotal(prev => prev = valueToCalculate.current)
        flag = false
        return
      }
      slicedString = valueToCalculate.current.slice(0, -1)
      valueToCalculate.current = slicedString
      valueToCalculate.current += input2
      if(flag === true) setTotal(prev => prev = valueToCalculate.current)
      flag = false
      return
    }
    valueToCalculate.current += '*'
    if(flag === true) setTotal(prev => prev = valueToCalculate.current)
    flag = false
    
  }
  function equals (e) {
    console.log(valueToCalculate.current)
    let result = eval(valueToCalculate.current)
    setCurrent(`${result}`)
    setTotal((prev) => 
      prev += `${e.target.innerText} ${result}`
    )
    zeroTacker.current = ""
    valueToCalculate.current = `${result}`
    flag = true
    console.log(valueToCalculate.current)
  }

  return (
    <>
      <div className='container'>
          <div className="display" id="display-container">
            <div className='all-calculations'>
              <p>{total}</p>
            </div>
            <div className='current-calculations' id="display">
              <p>{current}</p>
            </div>
          </div> 
          <div className="operations-container">
            <button id="clear" onClick={clearAll}>AC</button>
            <button id="multiply" onClick={multiply}>X</button>
            <button id="divide" onClick={operate}>/</button>
            <button id="seven" onClick={setTotalFunction}>7</button>
            <button id="eight" onClick={setTotalFunction}>8</button>
            <button id="nine" onClick={setTotalFunction}>9</button>
            <button id="subtract" onClick={operate}>-</button>
            <button id="four" onClick={setTotalFunction}>4</button>
            <button id="five" onClick={setTotalFunction}>5</button>
            <button id="six" onClick={setTotalFunction}>6</button>
            <button id="add" onClick={operate}>+</button>
            <button id="one" onClick={setTotalFunction}>1</button>
            <button id="two" onClick={setTotalFunction}>2</button>
            <button id="three" onClick={setTotalFunction}>3</button>
            <button id="equals" onClick={equals}>=</button>
            <button id="zero" onClick={setTotalFunction}>0</button>
            <button id="decimal" onClick={setTotalFunction}>.</button>
          </div>
      </div>
      <p class="author">By: Kyle E.F.O.</p>
    </>
    
  );
}

export default App;
