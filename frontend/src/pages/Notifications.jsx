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
    const email = encodeURIComponent(user.email);

    Promise.all([
      fetch(`${API.contactMessagesList}?author_email=${email}`).then(r => r.json()).catch(() => []),
      fetch(`${API.contactMessagesPdfList}?author_email=${email}`).then(r => r.json()).catch(() => []),
    ])
      .then(([courseMsgs, pdfMsgs]) => {
        const all = [
          ...courseMsgs.map(m => ({ ...m, type: 'course', label: m.course_name })),
          ...pdfMsgs.map(m => ({ ...m, type: 'pdf', label: m.apunte_name })),
        ];
        all.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setMessages(all);
      })
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
    <main className="container notifications-page" style={{ paddingTop: 40, maxWidth: 720, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24 }}>Notifications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p style={{ color: '#888' }}>No messages yet.</p>
      ) : (
        <div className="notifications-list" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map(msg => (
            <div
              key={`${msg.type}-${msg.id}`}
              className="notification-card"
              style={{
                background: '#fff',
                border: '1px solid #e8e5ed',
                borderRadius: 12,
                padding: '16px 20px',
                borderLeft: `4px solid ${msg.type === 'pdf' ? '#e74c3c' : '#8b7fc8'}`,
              }}
            >
              <div className="notification-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, gap: 8 }}>
                <strong style={{ fontSize: '0.95rem' }}>
                  {msg.type === 'pdf' ? '📄 ' : '🎬 '}
                  {msg.label}
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#888', whiteSpace: 'nowrap' }}>
                  {new Date(msg.created_at).toLocaleString()}
                </span>
              </div>
              <p style={{ margin: '0 0 6px', fontSize: '0.9rem', color: '#444', wordBreak: 'break-word' }}>{msg.message}</p>
              <small style={{ color: '#888' }}>From: {msg.sender_email}</small>
            </div>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 640px) {
          .notification-card { padding: 12px 14px !important; }
          .notification-header { flex-direction: column; gap: 4px !important; }
        }
      `}</style>
    </main>
  );
}

export default Notifications;
