
import React, {useState, useEffect} from 'react';
import API from '../api';

export default function Admin(){
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({title:'', description:'', date:'', time:'', image_url:''});
  const [editing, setEditing] = useState(null);

  useEffect(()=>{ load(); }, []);
  const load = ()=> API.get('/events').then(res=>setEvents(res.data)).catch(()=>{});

  const add = async ()=> {
    try {
      if (editing) {
        await API.put(`/events/${editing}`, form);
        setEditing(null);
      } else {
        await API.post('/events', form);
      }
      setForm({title:'', description:'', date:'', time:'', image_url:''});
      load();
    } catch (err) { alert('Action failed: ' + (err.response?.data?.detail || err.message)); }
  };

  const startEdit = (ev) => {
    setEditing(ev.id);
    setForm({title:ev.title, description:ev.description, date:ev.date, time:ev.time, image_url:ev.image_url});
  };

  const remove = async (id)=> {
    if (!confirm('Delete this event?')) return;
    try {
      await API.delete(`/events/${id}`);
      load();
    } catch (err) { alert('Delete failed'); }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin - Manage Events</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">{editing ? 'Edit Event' : 'Create Event'}</h3>
          <div className="space-y-2">
            <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="w-full p-2 border rounded" />
            <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="w-full p-2 border rounded" />
            <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="w-full p-2 border rounded" />
            <input type="time" value={form.time} onChange={e=>setForm({...form, time:e.target.value})} className="w-full p-2 border rounded" />
            <input placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})} className="w-full p-2 border rounded" />
            <div className="flex gap-2">
              <button onClick={add} className="bg-blue-600 text-white px-4 py-2 rounded">{editing ? 'Save' : 'Add Event'}</button>
              {editing && <button onClick={()=>{setEditing(null); setForm({title:'', description:'', date:'', time:'', image_url:''})}} className="px-4 py-2 border rounded">Cancel</button>}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Existing Events</h3>
          <div className="space-y-3">
            {events.map(ev=>(
              <div key={ev.id} className="card flex justify-between items-center">
                <div>
                  <div className="font-semibold">{ev.title}</div>
                  <div className="text-sm text-slate-600">{ev.date} {ev.time}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>startEdit(ev)} className="px-3 py-1 border rounded">Edit</button>
                  <button onClick={()=>remove(ev.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
