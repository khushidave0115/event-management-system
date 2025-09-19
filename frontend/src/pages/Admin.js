import React, { useState, useEffect } from 'react';
import API from '../api';

export default function Admin() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', image_url: '' });
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => { load(); }, []);

  const load = () => {
    API.get('/events')
      .then(res => setEvents(res.data))
      .catch(() => setEvents([]));
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await API.put(`/events/${editing}`, form);
        setMessage("✅ Event updated successfully!");
        setEditing(null);
      } else {
        await API.post('/events', form);
        setMessage("✅ Event created successfully!");
      }
      setForm({ title: '', description: '', date: '', time: '', image_url: '' });
      load();
    } catch (err) {
      setMessage("❌ Action failed: " + (err.response?.data?.detail || err.message));
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const startEdit = (ev) => {
    setEditing(ev.id);
    setForm({
      title: ev.title,
      description: ev.description,
      date: ev.date,
      time: ev.time,
      image_url: ev.image_url
    });
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await API.delete(`/events/${id}`);
      setMessage("🗑️ Event deleted");
      load();
    } catch (err) {
      setMessage("❌ Delete failed");
    }
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Admin Dashboard</h2>

      {message && (
        <div className="mb-4 p-3 rounded bg-gray-100 text-gray-700 shadow">
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Form Section */}
        <div className="p-6 bg-white shadow-lg rounded-xl border">
          <h3 className={`text-lg font-semibold mb-4 ${editing ? 'text-yellow-600' : 'text-green-600'}`}>
            {editing ? '✏️ Edit Event' : '➕ Create Event'}
          </h3>
          <div className="space-y-3">
            <input
              placeholder="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Image URL"
              value={form.image_url}
              onChange={e => setForm({ ...form, image_url: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                {editing ? '💾 Save Changes' : '➕ Add Event'}
              </button>
              {editing && (
                <button
                  onClick={() => { setEditing(null); setForm({ title: '', description: '', date: '', time: '', image_url: '' }); }}
                  className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="p-6 bg-white shadow-lg rounded-xl border">
          <h3 className="text-lg font-semibold mb-4">📅 Existing Events</h3>
          {events.length === 0 ? (
            <p className="text-gray-500">No events found. Create one!</p>
          ) : (
            <div className="space-y-3">
              {events.map(ev => (
                <div key={ev.id} className="p-4 rounded-lg border shadow-sm flex justify-between items-center bg-gray-50 hover:shadow-md transition">
                  <div>
                    <div className="font-semibold text-gray-800">{ev.title}</div>
                    <div className="text-sm text-gray-600">{ev.date} • {ev.time}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(ev)}
                      className="px-3 py-1 border rounded hover:bg-yellow-100 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(ev.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
