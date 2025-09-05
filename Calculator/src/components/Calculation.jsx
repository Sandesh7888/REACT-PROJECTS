import React, { useState } from "react";
import './Calculation.css';
import ThemeToggle from "./ThemeToggle";

const Calculation = () => {
  const [value, setValue] = useState('');
  const [theme, setTheme] = useState("light");

  return (
    <div className={`container ${theme}`}>
      <div className="calculator">
        {/* Theme Toggle Switch */}
        <ThemeToggle theme={theme} setTheme={setTheme} />

        <form name="form">
          <div>
          <div>
            <input type="button" value="1" onClick={(e) => setValue(value + e.target.value)} className="number" />
            <input type="button" value="2" onClick={(e) => setValue(value + e.target.value)} className="number" />
            <input type="button" value="3" onClick={(e) => setValue(value + e.target.value)} className="number" />
            <input type="button" value="+" onClick={(e) => setValue(value + e.target.value)} className="add" />
          </div>
          <div>
            <input type="button" value="0" onClick={(e) => setValue(value + e.target.value)} className="number" />
            <input type="button" value="00" onClick={(e) => setValue(value + e.target.value)} className="number" />
            <input type="button" value="=" id="equals" onClick={() => setValue(eval(value))} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Calculation;
