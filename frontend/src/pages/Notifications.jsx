import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../api';

function Notifications() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) { setLoading(false); return; }
    const user = JSON.parse(stored);

    fetch(`${API.contactMessagesList}?author_email=${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  }, []);

  const stored = localStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : null;

  if (!user) {
    return (
      <main className="container" style={{ textAlign: 'center', paddingTop: 60 }}>
        <h2>Notifications</h2>
        <p>Please <Link to="/login">log in</Link> to see your notifications.</p>
      </main>
    );
  }

  return (
    <main className="container" style={{ paddingTop: 40, maxWidth: 720, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24 }}>Notifications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p style={{ color: '#888' }}>No messages yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                background: '#fff',
                border: '1px solid #e8e5ed',
                borderRadius: 12,
                padding: '16px 20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <strong style={{ fontSize: '0.95rem' }}>{msg.course_name}</strong>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>
                  {new Date(msg.created_at).toLocaleString()}
                </span>
              </div>
              <p style={{ margin: '0 0 6px', fontSize: '0.9rem', color: '#444' }}>{msg.message}</p>
              <small style={{ color: '#888' }}>From: {msg.sender_email}</small>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Notifications;
