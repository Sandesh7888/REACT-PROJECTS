import React, { useState, useRef } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);  // UI counter
  const countRef = useRef(0);             // Reference counter

  const increment = () => {
     setCount((p)=>{
      const newp=p*2/3-5+4;
      countRef.current=newp;
      return newp;

     })
  };

  const decrement = () => {
    setCount(prev => {
      const newVal = prev > 0 ? prev - 1 : 0; // prevent going below 0
      countRef.current = newVal; // sync ref with state
      return newVal;
    });
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-4">Counter (useState + useRef)</h2>

      <p className="mb-4">Count: {count}</p>

      <button
        onClick={increment}
        className="px-4 py-2 bg-blue-500 text-white rounded-xl m-2"
      >
        +
      </button>
      <button
        onClick={decrement}
        className="px-4 py-2 bg-red-500 text-white rounded-xl m-2"
      >
        -
      </button>

      <p className="mt-4 text-gray-600">
        Ref Value (synced): {countRef.current}
      </p>
    </div>
  );
}
