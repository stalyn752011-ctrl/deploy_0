import React, { useState, useEffect } from 'react';
import { API } from '../api';

function VerCursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch(API.cursosList)
      .then(res => res.json())
      .then(data => {
        setCursos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching courses:', err);
        setLoading(false);
      });
  }, []);

  const openModal = (curso) => {
    setSelectedCurso(curso);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCurso(null);
    setShowMessageForm(false);
    setMessageText('');
    setMessageSent(false);
  };

  const handleSendMessage = async () => {
    const stored = localStorage.getItem('user');
    if (!stored || !messageText.trim()) return;
    const user = JSON.parse(stored);
    setSending(true);
    try {
      const res = await fetch(API.contactMessages, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course: selectedCurso.courseID,
          sender_email: user.email,
          message: messageText.trim(),
        }),
      });
      if (res.ok) setMessageSent(true);
    } catch (err) {
      console.error(err);
    }
    setSending(false);
  };

  return (
    <div className="ver-cursos-page" style={styles.page}>
      <style>{`
        @media (max-width: 768px) {
          .ver-cursos-page .hero-section { flex-direction: column !important; padding: 24px 20px !important; gap: 20px !important; margin: 16px 16px 24px !important; }
          .ver-cursos-page .hero-section h1 { font-size: 28px !important; }
          .ver-cursos-page .hero-section .hero-illust { display: none !important; }
          .ver-cursos-page .content-area { padding: 0 16px 24px !important; }
          .ver-cursos-page .modal-content { padding: 20px !important; margin: 10px !important; }
          .ver-cursos-page .modal-content h2 { font-size: 20px !important; }
        }
      `}</style>
      {/* Hero section */}
      <section className="hero-section" style={styles.hero}>
        <div style={styles.heroText}>
          <span style={styles.heroLabel}>New Courses Available</span>
          <h1 style={styles.heroH1}>Learn without<br/><span style={{color:'#8b7fc8'}}>limits</span></h1>
          <p style={styles.heroP}>Discover thousands of courses taught by world-class instructors and advance your career with flexible online learning.</p>
          <button style={styles.heroBtn}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff" style={{marginLeft:'3px'}}><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Browse Courses
          </button>
        </div>
        <div className="hero-illust" style={styles.heroIllust}>
          <svg viewBox="0 0 320 240" fill="none" width="320" height="240">
            <circle cx="160" cy="120" r="100" fill="rgba(139,127,200,.1)"/>
            <circle cx="160" cy="120" r="70" fill="rgba(139,127,200,.08)"/>
            <rect x="80" y="100" width="160" height="100" rx="8" fill="#fff" stroke="#8b7fc8" strokeWidth="2"/>
            <rect x="90" y="110" width="140" height="72" rx="4" fill="#e8e4f5"/>
            <rect x="100" y="120" width="50" height="6" rx="3" fill="#8b7fc8" opacity=".5"/>
            <rect x="100" y="132" width="80" height="4" rx="2" fill="#8b7fc8" opacity=".3"/>
            <rect x="100" y="140" width="60" height="4" rx="2" fill="#8b7fc8" opacity=".3"/>
            <rect x="100" y="148" width="70" height="4" rx="2" fill="#8b7fc8" opacity=".3"/>
            <circle cx="160" cy="146" r="14" fill="#8b7fc8" opacity=".9"/>
            <polygon points="156,138 156,154 170,146" fill="#fff"/>
            <rect x="70" y="198" width="180" height="8" rx="4" fill="#d4c8f0"/>
            <g transform="translate(210, 50)">
              <polygon points="0,30 40,30 50,15 50,0 30,-5 10,0 10,15" fill="#8b7fc8"/>
              <polygon points="0,30 40,30 50,15 10,15" fill="#6c5ca5"/>
              <circle cx="50" cy="15" r="4" fill="#f6c555"/>
              <rect x="48" y="30" width="4" height="20" rx="1" fill="#6c5ca5"/>
              <polygon points="48,50 52,50 50,56" fill="#6c5ca5"/>
            </g>
            <circle cx="60" cy="50" r="6" fill="#d4c8f0" opacity=".6"/>
            <circle cx="260" cy="180" r="8" fill="#e8e4f5" opacity=".5"/>
            <rect x="40" y="160" width="12" height="12" rx="3" fill="#d4c8f0" opacity=".4" transform="rotate(15 46 166)"/>
            <rect x="270" y="60" width="10" height="10" rx="2" fill="#c4b5e0" opacity=".4" transform="rotate(-10 275 65)"/>
          </svg>
        </div>
      </section>

      {/* Courses from API */}
      <div className="content-area" style={styles.content}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionH2}>Available Courses</h2>
          <a href="#" style={styles.sectionLink}>View all →</a>
        </div>
        {loading ? (
          <div style={styles.loading}>Loading courses...</div>
        ) : (
          <div style={styles.coursesGrid}>
            {cursos.map(curso => (
              <CourseCard
                key={curso.courseID}
                curso={curso}
                onClick={() => openModal(curso)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal for video playback */}
      {isModalOpen && selectedCurso && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div className="modal-content" style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeModal}>×</button>
            <h2 style={styles.modalTitle}>{selectedCurso.name}</h2>
            <p style={styles.modalDesc}>{selectedCurso.description}</p>
            <div style={styles.videoContainer}>
              {selectedCurso.video_url ? (
                <video
                  key={selectedCurso.courseID}
                  src={selectedCurso.video_url}
                  style={{width:'100%', height:'auto', maxHeight:'70vh'}}
                  controls
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div style={styles.noVideo}>No video available for this course</div>
              )}
            </div>
            <div style={styles.modalMeta}>
              <span style={styles.modalCategory}>{selectedCurso.category}</span>
              <span>Status: {selectedCurso.status}</span>
              <span>By: {selectedCurso.author_name || 'Anónimo'}</span>
            </div>
            {!showMessageForm ? (
              <button style={styles.messageBtn} onClick={() => setShowMessageForm(true)}>
                ✉️ Send Message
              </button>
            ) : messageSent ? (
              <p style={styles.messageSent}>✓ Message sent!</p>
            ) : (
              <div style={styles.messageForm}>
                <textarea
                  style={styles.messageInput}
                  placeholder="Write your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={3}
                />
                <div style={styles.messageActions}>
                  <button style={styles.messageCancel} onClick={() => setShowMessageForm(false)}>Cancel</button>
                  <button
                    style={styles.messageSubmit}
                    onClick={handleSendMessage}
                    disabled={sending || !messageText.trim()}
                  >
                    {sending ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CourseCard({ curso, onClick }) {
  const tagColors = {
    'Design':    { bg:'rgba(139,127,200,.12)', color:'#8b7fc8' },
    'Development': { bg:'rgba(72,187,120,.12)',  color:'#38a169' },
    'Marketing':   { bg:'rgba(237,137,54,.12)',  color:'#c05621' },
    'Data Science':{ bg:'rgba(72,187,120,.12)',  color:'#38a169' },
    'Photography': { bg:'rgba(139,127,200,.12)', color:'#8b7fc8' },
    'Business':   { bg:'rgba(237,137,54,.12)',  color:'#c05621' },
  };
  const tc = tagColors[curso.category] || { bg:'rgba(139,127,200,.12)', color:'#8b7fc8' };
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.cardThumb}>
        {curso.video_url ? (
          <video src={curso.video_url} style={styles.thumbVideo} muted preload="metadata" />
        ) : (
          <div style={styles.thumbPlaceholder}></div>
        )}
        <div style={styles.playBtn}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#8b7fc8" style={{marginLeft:'3px'}}><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <span style={styles.videoTime}>12:34</span>
        <div style={styles.videoProgress}><div style={styles.videoProgressBar}></div></div>
      </div>
      <div style={styles.cardBody}>
        <div style={styles.cardTags}><span style={{...styles.cardTag, backgroundColor: tc.bg, color: tc.color}}>{curso.category}</span></div>
        <div style={styles.cardTitle}>{curso.name}</div>
        <div style={styles.cardDesc}>{curso.description}</div>
        <div style={styles.cardMeta}>
          <span style={styles.cardRating}><StarIcon/> 4.8</span>
          <span style={styles.cardMetaItem}><ClockIcon/> 8h</span>
          <span style={styles.cardMetaItem}><UsersIcon/> 1.2k</span>
        </div>
            <div style={styles.cardFooter}>
              <div style={styles.cardAuthor}><div style={styles.cardAuthorImg}></div><span style={styles.cardAuthorName}>{curso.author_name || 'Anónimo'}</span></div>
            </div>
      </div>
    </div>
  );
}

const StarIcon = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="#f6c555" stroke="#f6c555" strokeWidth=".5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ClockIcon = () => <svg viewBox="0 0 24 24" width="14" height="14" stroke="#6b6890" fill="none" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const UsersIcon = () => <svg viewBox="0 0 24 24" width="14" height="14" stroke="#6b6890" fill="none" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

const styles = {
  page: { background:'#f8f7fc', color:'#2d2b3a', minHeight:'100vh' },
  hero: { background:'linear-gradient(135deg,#f0ecfa 0%,#e8e4f5 50%,#f5f2fc 100%)', borderRadius:'16px', padding:'48px 56px', display:'flex', alignItems:'center', gap:'48px', margin:'32px 36px 36px', overflow:'hidden' },
  heroText: { flex:'1', position:'relative', zIndex:'2' },
  heroLabel: { display:'inline-block', fontSize:'12px', fontWeight:600, color:'#8b7fc8', background:'rgba(139,127,200,.12)', padding:'4px 12px', borderRadius:'20px', marginBottom:'16px', letterSpacing:'.5px', textTransform:'uppercase' },
  heroH1: { fontSize:'36px', fontWeight:700, lineHeight:'1.2', marginBottom:'14px', color:'#2d2b3a' },
  heroP: { fontSize:'15px', color:'#6b6890', lineHeight:'1.6', marginBottom:'24px', maxWidth:'420px' },
  heroBtn: { display:'inline-flex', alignItems:'center', gap:'8px', padding:'12px 28px', background:'#8b7fc8', color:'#fff', border:'none', borderRadius:'12px', fontSize:'14px', fontWeight:600, cursor:'pointer' },
  heroIllust: { width:'320px', height:'240px', flexShrink:'0' },
  content: { padding:'0 36px 32px' },
  sectionHeader: { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' },
  sectionH2: { fontSize:'20px', fontWeight:700 },
  sectionLink: { fontSize:'13px', color:'#8b7fc8', fontWeight:600 },
  loading: { textAlign:'center', padding:'40px', color:'#6b6890' },
  coursesGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'24px', marginBottom:'36px' },
  card: { background:'#fff', borderRadius:'16px', overflow:'hidden', boxShadow:'0 4px 24px rgba(139,127,200,.12)', transition:'.25s', cursor:'pointer' },
  cardThumb: { position:'relative', width:'100%', aspectRatio:'16/9', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', background:'#1a1625' },
  thumbVideo: { width:'100%', height:'100%', objectFit:'cover' },
  thumbPlaceholder: { width:'100%', height:'100%', background:'linear-gradient(145deg,#1a1625,#23203a)' },
  playBtn: { position:'absolute', width:'52px', height:'52px', background:'rgba(255,255,255,.92)', borderRadius:'50%', display:'grid', placeItems:'center', zIndex:'2', boxShadow:'0 4px 16px rgba(0,0,0,.3)' },
  videoTime: { position:'absolute', bottom:'10px', right:'10px', background:'rgba(0,0,0,.7)', color:'#fff', fontSize:'11px', fontWeight:600, padding:'3px 8px', borderRadius:'6px', zIndex:'2' },
  videoProgress: { position:'absolute', bottom:'0', left:'0', right:'0', height:'3px', background:'rgba(255,255,255,.15)', zIndex:'2' },
  videoProgressBar: { height:'100%', width:'35%', background:'#8b7fc8', borderRadius:'0 2px 2px 0' },
  cardBody: { padding:'16px 18px 18px' },
  cardTags: { display:'flex', gap:'6px', marginBottom:'8px' },
  cardTag: { fontSize:'10px', fontWeight:600, padding:'3px 8px', borderRadius:'6px', textTransform:'uppercase', letterSpacing:'.3px' },
  cardTitle: { fontSize:'15px', fontWeight:700, lineHeight:'1.3', marginBottom:'6px' },
  cardDesc: { fontSize:'12.5px', color:'#6b6890', lineHeight:'1.5', marginBottom:'12px' },
  cardMeta: { display:'flex', alignItems:'center', gap:'12px', fontSize:'12px', color:'#6b6890' },
  cardRating: { display:'flex', alignItems:'center', gap:'4px', fontWeight:600, color:'#2d2b3a' },
  cardMetaItem: { display:'flex', alignItems:'center', gap:'4px' },
  cardFooter: { display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'14px', paddingTop:'14px', borderTop:'1px solid #e8e4f5' },
  cardAuthor: { display:'flex', alignItems:'center', gap:'8px' },
  cardAuthorImg: { width:'26px', height:'26px', borderRadius:'50%', background:'linear-gradient(135deg,#c4b5e0,#8b7fc8)' },
  cardAuthorName: { fontSize:'12px', fontWeight:600 },
  modalOverlay: { position:'fixed', top:'0', left:'0', right:'0', bottom:'0', background:'rgba(0,0,0,.85)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:'1000', padding:'20px' },
  modalContent: { background:'#fff', borderRadius:'16px', padding:'32px', maxWidth:'900px', width:'100%', maxHeight:'90vh', overflow:'auto', position:'relative' },
  modalClose: { position:'absolute', top:'16px', right:'16px', width:'32px', height:'32px', borderRadius:'50%', border:'none', background:'#f8f7fc', fontSize:'24px', cursor:'pointer', display:'grid', placeItems:'center', lineHeight:'1' },
  modalTitle: { fontSize:'24px', fontWeight:700, marginBottom:'8px', color:'#2d2b3a' },
  modalDesc: { fontSize:'14px', color:'#6b6890', marginBottom:'20px', lineHeight:'1.6' },
  videoContainer: { marginBottom:'20px', borderRadius:'12px', overflow:'hidden' },
  noVideo: { padding:'40px', textAlign:'center', color:'#6b6890' },
  modalMeta: { display:'flex', gap:'16px', fontSize:'13px', color:'#6b6890', marginBottom:'16px' },
  modalCategory: { background:'rgba(139,127,200,.12)', color:'#8b7fc8', padding:'4px 12px', borderRadius:'6px', fontWeight:600 },
  messageBtn: { display:'flex', alignItems:'center', gap:'6px', padding:'10px 20px', background:'#8b7fc8', color:'#fff', border:'none', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer', transition:'.2s' },
  messageForm: { marginTop:'12px', display:'flex', flexDirection:'column', gap:'10px' },
  messageInput: { width:'100%', padding:'12px', border:'1.5px solid #e8e4f5', borderRadius:'10px', fontSize:'14px', fontFamily:'inherit', resize:'vertical', boxSizing:'border-box', outline:'none' },
  messageActions: { display:'flex', gap:'10px', justifyContent:'flex-end' },
  messageCancel: { padding:'8px 18px', border:'1.5px solid #e8e4f5', background:'#fff', borderRadius:'8px', fontSize:'13px', fontWeight:600, color:'#666', cursor:'pointer' },
  messageSubmit: { padding:'8px 18px', border:'none', background:'#8b7fc8', color:'#fff', borderRadius:'8px', fontSize:'13px', fontWeight:600, cursor:'pointer' },
  messageSent: { color:'#38a169', fontWeight:600, fontSize:'14px', marginTop:'12px' },
};

export default VerCursos;
