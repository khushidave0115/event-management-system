
import React from 'react';

export default function EventCard({event}) {
  return (
    <div className="card">
      <img src={event.image_url || 'https://via.placeholder.com/800x300'} alt={event.title} className="w-full h-48 object-cover rounded-md mb-3" />
      <h3 className="text-xl font-semibold">{event.title}</h3>
      <p className="text-sm text-slate-600">{event.date} • {event.time}</p>
      <p className="mt-2 text-slate-700">{event.description}</p>
    </div>
  );
}
