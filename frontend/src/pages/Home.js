import React, { useEffect, useState } from 'react';
import API from '../api';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';

export default function Home() {
  const [events, setEvents] = useState([]);

  // 🔹 10 Demo Events
  const sampleEvents = [
    {
      id: 1,
      title: "Tech Conference 2025",
      description: "Latest trends in AI, Web, and Cloud Computing.",
      date: "2025-10-05",
      time: "10:00 AM",
      image_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df"
    },
    {
      id: 2,
      title: "Music Festival",
      description: "A night of electrifying performances and great vibes.",
      date: "2025-10-10",
      time: "7:00 PM",
      image_url: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
    },
    {
      id: 3,
      title: "Startup Pitch Day",
      description: "Innovative startups showcase their products.",
      date: "2025-10-15",
      time: "2:00 PM",
      image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    },
  ];

  // Load events from backend, fallback to demo
  useEffect(() => {
    API.get('/events')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setEvents(res.data);
        } else {
          setEvents(sampleEvents); // fallback
        }
      })
      .catch(() => setEvents(sampleEvents));
  }, []);

  const heroImage = "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1950&q=80";
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center h-[70vh] sm:h-[80vh] flex items-center justify-center text-white p-4"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center animate-fade-in-up">
          <h1 className="text-5xl font-extrabold mb-4">EventSpher</h1>
          <p className="text-lg mb-8">Crafting unforgettable experiences, one event at a time.</p>
          <Link
            to="/events"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Explore Events
          </Link>
        </div>
      </header>

      {/* Events Section */}
      <main className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Upcoming Events</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      </main>
    </div>
  );
}
