import React from 'react';

export default function EventCard({event}) {
  return (
    <div className="card">
      <img src={event.image_url || 'https://via.placeholder.com/600x200'} alt={event.title} style={{width:'100%', height:200, objectFit:'cover', borderRadius:6}} />
      <h3>{event.title}</h3>
      <p style={{color:'#555'}}>{event.date} • {event.time}</p>
      <p>{event.description}</p>
    </div>
  );
}
