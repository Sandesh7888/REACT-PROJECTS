import React, { useState } from "react";
import './Calculation.css'

const Calculation =()=>{

  const [value, setValue] = useState('');


    return(
        <>
          <div className="container">
            <div className="calculator">
              <form name="form">
                
                <div>
                  <input type="text" placeholder="0" value={value} id="result" disabled />  
                </div>
                <div>
                  <input type="button" value="C" id="clear" onClick={(e)=>{ setValue('')}} />
                  <input type="button" value="DE" id="delete" onClick={(e)=>{setValue(value.slice(0,-1))}} />
                  <input type="button" value="." id="decimal" onClick={(e) => { setValue(value + e.target.value) }} />
                  <input type="button" value="/" className="divide" onClick={(e) => { setValue(value + e.target.value) }} />
                </div>
                <div>
                  <input type="button" value="7" onClick={(e)=>{setValue(value + e.target.value) }} className="number"  />
                  <input type="button" value="8" onClick={(e)=>{setValue(value + e.target.value) }}className="number" />
                  <input type="button" value="9" onClick={(e)=>{setValue(value + e.target.value) }}className="number" />
                  <input type="button" value="*" onClick={(e)=>{setValue(value + e.target.value) }}className="multiply" />
                </div>
                <div>
                  <input type="button" value="4" onClick={(e)=>{setValue(value + e.target.value) }}className="number" />
                  <input type="button" value="5" onClick={(e)=>{setValue(value + e.target.value) }}className="number" />
                  <input type="button" value="6" onClick={(e)=>{setValue(value + e.target.value) }}className="number" />
                  <input type="button" value="-" onClick={(e)=>{setValue(value + e.target.value) }}className="subtract" />

                </div>
                <div>
                  <input type="button" value="1" onClick={(e)=>{setValue(value + e.target.value) }}className="number" />
                  <input type="button" value="2" onClick={(e)=>{setValue(value + e.target.value) }}className="number" />
                  <input type="button" value="3" onClick={(e)=>{setValue(value + e.target.value) }}className="number" />
                  <input type="button" value="+" onClick={(e)=>{setValue(value + e.target.value) }}className="add" />
                </div>
                <div>
                  <input type="button" value="0" onClick={(e)=>{setValue(value + e.target.value) }}className="number" />
                  <input type="button" value="00" onClick={(e)=>{setValue(value + e.target.value) }}className="number" />
                  <input type="button" value="=" id="equals" onClick={(e) => { setValue(eval(value)) }} />
                </div>
              </form>
            </div>
          </div>
        </>
    )
}

export default Calculation;