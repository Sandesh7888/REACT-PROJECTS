import React from 'react'


export default function ExportTree({ onExport }){
return (
<div>
<button onClick={onExport} className="px-3 py-2 rounded bg-indigo-600 text-white">Export</button>
</div>
)
}