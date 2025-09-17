import React, {useEffect, useState} from 'react';
import API from '../api';
import EventCard from '../components/EventCard';

export default function Home(){
  const [events, setEvents] = useState([]);
  useEffect(()=>{
    API.get('/events').then(res=>setEvents(res.data)).catch(err=>console.error(err));
  }, []);
  return (
    <div>
      <h2>Upcoming Events</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:12, marginTop:12}}>
        {events.map(e => <EventCard key={e.id} event={e} />)}
      </div>
    </div>
  );
}
