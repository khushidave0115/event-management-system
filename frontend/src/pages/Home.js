import React, { useEffect, useState } from 'react';
import API from '../api';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg';


export default function Home() {
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        API.get('/events')
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, []);

    const heroImage = "https://images.unsplash.com/photo-1528605248644-24dd040e2ea9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    const logoImg = "https://i.imgur.com/uCj96eC.png"; // Example logo URL

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
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                        EventSpher
                    </h1>
                    <p className="text-md sm:text-xl font-light mb-8">
                        Crafting unforgettable experiences, one event at a time.
                    </p>
                    <Link
                        to="/events"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
                    >
                        Explore Events
                    </Link>
                </div>
            </header>

            {/* Main Events Section */}
            <main className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Upcoming Events</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Map through events and render each one */}
                    {events.map(e => <EventCard key={e.id} event={e} />)}
                </div>
            </main>
        </div>
    );
}