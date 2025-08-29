import React, { useState } from "react";
import "./Calculation.css";

const Calculation = () => {
  const [value, setValue] = useState("");

  // safe evaluate function
  const calculate = () => {
    try {
      // eslint-disable-next-line no-new-func
      const result = new Function("return " + value)();
      setValue(result.toString());
    } catch {
      setValue("Error");
    }
  };

  const handleClick = (e) => {
    setValue(value + e.target.value);
  };

  return (
    <div className="container">
      <div className="calculator">
        <div>
          <input type="text" placeholder="0" value={value} id="result" disabled />
        </div>

        <div>
          <input type="button" value="C" onClick={() => setValue("")} />
          <input type="button" value="DE" onClick={() => setValue(value.slice(0, -1))} />
          <input type="button" value="." onClick={handleClick} />
          <input type="button" value="/" onClick={handleClick} />
        </div>

        <div>
          <input type="button" value="7" onClick={handleClick} />
          <input type="button" value="8" onClick={handleClick} />
          <input type="button" value="9" onClick={handleClick} />
          <input type="button" value="*" onClick={handleClick} />
        </div>

        <div>
          <input type="button" value="4" onClick={handleClick} />
          <input type="button" value="5" onClick={handleClick} />
          <input type="button" value="6" onClick={handleClick} />
          <input type="button" value="-" onClick={handleClick} />
        </div>

        <div>
          <input type="button" value="1" onClick={handleClick} />
          <input type="button" value="2" onClick={handleClick} />
          <input type="button" value="3" onClick={handleClick} />
          <input type="button" value="+" onClick={handleClick} />
        </div>

        <div>
          <input type="button" value="0" onClick={handleClick} />
          <input type="button" value="00" onClick={handleClick} />
          <input type="button" value="=" onClick={calculate} />
        </div>
      </div>
    </div>
  );
};

export default Calculation;
