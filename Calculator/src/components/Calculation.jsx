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
            <input type="text" placeholder="0" value={value} id="result" disabled />
          </div>
          <div>
            <input type="button" value="C" id="clear" onClick={() => setValue('')} />
            <input type="button" value="DE" id="delete" onClick={() => setValue(value.slice(0, -1))} />
            <input type="button" value="." id="decimal" onClick={(e) => setValue(value + e.target.value)} />
            <input type="button" value="/" className="divide" onClick={(e) => setValue(value + e.target.value)} />
          </div>
          <div>
            <input type="button" value="7" onClick={(e) => setValue(value + e.target.value)} className="number" />
            <input type="button" value="8" onClick={(e) => setValue(value + e.target.value)} className="number" />
            <input type="button" value="9" onClick={(e) => setValue(value + e.target.value)} className="number" />
            <input type="button" value="*" onClick={(e) => setValue(value + e.target.value)} className="multiply" />
          </div>
          <div>
            <input type="button" value="4" onClick={(e) => setValue(value + e.target.value)} className="number" />
            <input type="button" value="5" onClick={(e) => setValue(value + e.target.value)} className="number" />
            <input type="button" value="6" onClick={(e) => setValue(value + e.target.value)} className="number" />
            <input type="button" value="-" onClick={(e) => setValue(value + e.target.value)} className="subtract" />
          </div>
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
