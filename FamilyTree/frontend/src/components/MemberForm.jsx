import React from 'react'


export default function MemberForm({initial = {}, onSubmit}){
const [form, setForm] = React.useState({ name: '', gender: 'male', dob: '', ...initial })


return (
<form
onSubmit={(e) => { e.preventDefault(); onSubmit(form) }}
className="space-y-3 bg-white p-4 rounded shadow"
>
<div>
<label className="block text-sm font-medium">Name</label>
<input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="mt-1 block w-full rounded border p-2" />
</div>


<div>
<label className="block text-sm font-medium">Gender</label>
<select value={form.gender} onChange={e=>setForm({...form, gender:e.target.value})} className="mt-1 block w-full rounded border p-2">
<option value="male">Male</option>
<option value="female">Female</option>
<option value="other">Other</option>
</select>
</div>


<div>
<label className="block text-sm font-medium">Date of birth</label>
<input type="date" value={form.dob} onChange={e=>setForm({...form, dob:e.target.value})} className="mt-1 block w-full rounded border p-2" />
</div>


<div className="flex justify-end">
<button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded">Save</button>
</div>
</form>
)
}