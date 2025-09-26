import { useState } from 'react';
import api from '../api';

export default function NewFamily() {
  const [name, setName] = useState('');
  const submit = async e => {
    e.preventDefault();
    await api.post('/families', { name });
    setName('');
    alert('Family added!');
  };
  return (
    <form onSubmit={submit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Family Name" />
      <button type="submit">Add Family</button>
    </form>
  );
}
