import React, {useState, useEffect} from 'react';
import API from '../api';

export default function Admin(){
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({title:'', description:'', date:'', time:'', image_url:''});

  useEffect(()=>{ load(); }, []);
  const load = ()=> API.get('/events').then(res=>setEvents(res.data)).catch(()=>{});

  const add = async ()=> {
    try {
      await API.post('/events', form);
      setForm({title:'', description:'', date:'', time:'', image_url:''});
      load();
    } catch (err) { alert('Only admin can add. Make sure you are logged in as admin.'); }
  };

  const remove = async (id)=> {
    try {
      await API.delete(`/events/${id}`);
      load();
    } catch (err) { alert('Delete failed'); }
  };

  return (
    <div>
      <h2>Admin - Manage Events</h2>
      <div style={{display:'flex', gap:12, marginTop:12}}>
        <div style={{flex:1}} className="card">
          <h3>Create Event</h3>
          <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} style={{width:'100%', padding:8, marginBottom:6}} />
          <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} style={{width:'100%', padding:8, marginBottom:6}} />
          <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} style={{width:'100%', padding:8, marginBottom:6}} />
          <input type="time" value={form.time} onChange={e=>setForm({...form, time:e.target.value})} style={{width:'100%', padding:8, marginBottom:6}} />
          <input placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})} style={{width:'100%', padding:8, marginBottom:6}} />
          <button onClick={add} style={{background:'#0b5fff', color:'white', padding:'8px 12px'}}>Add Event</button>
        </div>
        <div style={{flex:1}}>
          <h3>Existing Events</h3>
          <div style={{display:'grid', gap:8}}>
            {events.map(ev=>(
              <div key={ev.id} className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <strong>{ev.title}</strong>
                  <div style={{color:'#555'}}>{ev.date} {ev.time}</div>
                </div>
                <div>
                  <button onClick={()=>remove(ev.id)} style={{background:'#dc2626', color:'white', padding:'6px 8px', borderRadius:4}}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
