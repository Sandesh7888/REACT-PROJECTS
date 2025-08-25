import React from "react";
import './Calculation.css'

const Calculation =()=>{
    return(
        <>
          <div className="container">
            <div className="calculator">
              <form name="form">
                <div>
                  <div className="history">
                    
                  </div>
                </div>
                <div>
                  <input type="text" placeholder="0" id="result" disabled />  
                </div>
                <div>
                  <input type="button" value="C" id="clear" />
                  <input type="button" value="DE" id="delete" />
                  <input type="button" value="." id="decimal" />
                  <input type="button" value="/" className="divide" />
                </div>
                <div>
                  <input type="button" value="7" className="number" />
                  <input type="button" value="8" className="number" />
                  <input type="button" value="9" className="number" />
                  <input type="button" value="*" className="multiply" />
                </div>
                <div>
                  <input type="button" value="4" className="number" />
                  <input type="button" value="5" className="number" />
                  <input type="button" value="6" className="number" />
                  <input type="button" value="-" className="subtract" />

                </div>
                <div>
                  <input type="button" value="1" className="number" />
                  <input type="button" value="2" className="number" />
                  <input type="button" value="3" className="number" />
                  <input type="button" value="+" className="add" />
                </div>
                <div>
                  <input type="button" value="0" className="number" />
                  <input type="button" value="00" className="number" />
                  <input type="button" value="=" id="equals" />
                </div>

              </form>
            </div>
           

          </div>

        </>
    )
}

export default Calculation;