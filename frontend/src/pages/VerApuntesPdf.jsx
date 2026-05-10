import React, { useState, useEffect } from 'react';
import { API } from '../api';

function VerApuntesPdf() {
  const [apuntes, setApuntes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApunte, setSelectedApunte] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch(API.apuntesPdfList)
      .then(res => res.json())
      .then(data => {
        setApuntes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching PDFs:', err);
        setLoading(false);
      });
  }, []);

  const openModal = (apunte) => {
    setSelectedApunte(apunte);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApunte(null);
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
      const res = await fetch(API.contactMessagesPdf, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apunte: selectedApunte.id,
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
    <div className="ver-apuntes-page" style={styles.page}>
      <style>{`
        @media (max-width: 768px) {
          .ver-apuntes-page .hero-section { flex-direction: column !important; padding: 24px 20px !important; gap: 20px !important; margin: 16px 16px 24px !important; }
          .ver-apuntes-page .hero-section h1 { font-size: 28px !important; }
          .ver-apuntes-page .hero-section .hero-illust { display: none !important; }
          .ver-apuntes-page .content-area { padding: 0 16px 24px !important; }
          .ver-apuntes-page .modal-content { padding: 20px !important; margin: 10px !important; }
          .ver-apuntes-page .modal-content h2 { font-size: 20px !important; }
        }
      `}</style>
      <section className="hero-section" style={styles.hero}>
        <div style={styles.heroText}>
          <span style={styles.heroLabel}>PDF Notes Available</span>
          <h1 style={styles.heroH1}>Study with<br/><span style={{color:'#8b7fc8'}}>PDF notes</span></h1>
          <p style={styles.heroP}>Browse our collection of PDF study materials shared by the community. Download and learn at your own pace.</p>
          <button style={styles.heroBtn}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff" style={{marginLeft:'3px'}}><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Browse Notes
          </button>
        </div>
        <div className="hero-illust" style={styles.heroIllust}>
          <svg viewBox="0 0 320 240" fill="none" width="320" height="240">
            <circle cx="160" cy="120" r="100" fill="rgba(139,127,200,.1)"/>
            <circle cx="160" cy="120" r="70" fill="rgba(139,127,200,.08)"/>
            <rect x="70" y="80" width="180" height="130" rx="8" fill="#fff" stroke="#8b7fc8" strokeWidth="2"/>
            <rect x="80" y="95" width="160" height="100" rx="4" fill="#e8e4f5"/>
            <rect x="95" y="108" width="60" height="6" rx="3" fill="#8b7fc8" opacity=".5"/>
            <rect x="95" y="120" width="100" height="4" rx="2" fill="#8b7fc8" opacity=".3"/>
            <rect x="95" y="130" width="80" height="4" rx="2" fill="#8b7fc8" opacity=".3"/>
            <rect x="95" y="140" width="90" height="4" rx="2" fill="#8b7fc8" opacity=".3"/>
            <rect x="95" y="150" width="70" height="4" rx="2" fill="#8b7fc8" opacity=".3"/>
            <rect x="95" y="160" width="110" height="4" rx="2" fill="#8b7fc8" opacity=".3"/>
            <rect x="95" y="170" width="50" height="4" rx="2" fill="#8b7fc8" opacity=".3"/>
            <rect x="60" y="208" width="200" height="8" rx="4" fill="#d4c8f0"/>
            <g transform="translate(230, 50) scale(.9)">
              <rect x="0" y="0" width="40" height="50" rx="4" fill="#e74c3c" stroke="#c0392b" strokeWidth="1.5"/>
              <rect x="6" y="6" width="28" height="4" rx="1" fill="#fff" opacity=".8"/>
              <rect x="6" y="14" width="28" height="4" rx="1" fill="#fff" opacity=".8"/>
              <rect x="6" y="22" width="20" height="4" rx="1" fill="#fff" opacity=".8"/>
              <rect x="6" y="30" width="28" height="4" rx="1" fill="#fff" opacity=".8"/>
              <rect x="6" y="38" width="28" height="4" rx="1" fill="#fff" opacity=".8"/>
            </g>
            <circle cx="60" cy="50" r="6" fill="#d4c8f0" opacity=".6"/>
            <circle cx="260" cy="180" r="8" fill="#e8e4f5" opacity=".5"/>
            <rect x="40" y="160" width="12" height="12" rx="3" fill="#d4c8f0" opacity=".4" transform="rotate(15 46 166)"/>
            <rect x="270" y="60" width="10" height="10" rx="2" fill="#c4b5e0" opacity=".4" transform="rotate(-10 275 65)"/>
          </svg>
        </div>
      </section>

      <div className="content-area" style={styles.content}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionH2}>Available PDF Notes</h2>
          <a href="#" style={styles.sectionLink}>View all →</a>
        </div>
        {loading ? (
          <div style={styles.loading}>Loading PDF notes...</div>
        ) : (
          <div style={styles.coursesGrid}>
            {apuntes.map(apunte => (
              <PdfCard
                key={apunte.id}
                apunte={apunte}
                onClick={() => openModal(apunte)}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && selectedApunte && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div className="modal-content" style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeModal}>×</button>
            <h2 style={styles.modalTitle}>{selectedApunte.name}</h2>
            <p style={styles.modalDesc}>{selectedApunte.description}</p>
            <div style={styles.videoContainer}>
              {selectedApunte.pdf_url ? (
                <embed
                  src={selectedApunte.pdf_url}
                  type="application/pdf"
                  style={{width:'100%', height:'70vh', borderRadius:'8px'}}
                />
              ) : (
                <div style={styles.noVideo}>No PDF available for this note</div>
              )}
              <div style={styles.pdfActions}>
                <a href={selectedApunte.pdf_url || '#'} target="_blank" rel="noopener noreferrer" style={styles.pdfDownloadBtn}>
                  📄 Open in new tab
                </a>
              </div>
            </div>
            <div style={styles.modalMeta}>
              <span>By: {selectedApunte.author_name || 'Anónimo'}</span>
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

function PdfCard({ apunte, onClick }) {
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.cardThumb}>
        <div style={styles.pdfPreview}>
          <PdfIcon />
        </div>
        <div style={styles.playBtn}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#e74c3c" style={{marginLeft:'2px'}}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
            <path d="M14 2v6h6" fill="none" stroke="#fff" strokeWidth="1.5"/>
            <rect x="9" y="13" width="6" height="4" rx="1" fill="#fff"/>
          </svg>
        </div>
      </div>
      <div style={styles.cardBody}>
        <div style={styles.cardTitle}>{apunte.name}</div>
        <div style={styles.cardDesc}>{apunte.description}</div>
        <div style={styles.cardFooter}>
          <div style={styles.cardAuthor}>
            <div style={styles.cardAuthorImg}></div>
            <span style={styles.cardAuthorName}>{apunte.author_name || 'Anónimo'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const PdfIcon = () => (
  <svg viewBox="0 0 40 50" width="40" height="50" fill="none">
    <rect x="2" y="2" width="36" height="46" rx="4" fill="#e74c3c" stroke="#c0392b" strokeWidth="1.5"/>
    <rect x="8" y="10" width="24" height="4" rx="1" fill="#fff" opacity=".8"/>
    <rect x="8" y="18" width="24" height="4" rx="1" fill="#fff" opacity=".8"/>
    <rect x="8" y="26" width="16" height="4" rx="1" fill="#fff" opacity=".8"/>
    <rect x="8" y="34" width="24" height="4" rx="1" fill="#fff" opacity=".8"/>
    <rect x="8" y="42" width="24" height="4" rx="1" fill="#fff" opacity=".8"/>
  </svg>
);

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
  pdfPreview: { display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', background:'linear-gradient(145deg,#1a1625,#23203a)' },
  playBtn: { position:'absolute', width:'52px', height:'52px', background:'rgba(255,255,255,.92)', borderRadius:'50%', display:'grid', placeItems:'center', zIndex:'2', boxShadow:'0 4px 16px rgba(0,0,0,.3)' },
  cardBody: { padding:'16px 18px 18px' },
  cardTitle: { fontSize:'15px', fontWeight:700, lineHeight:'1.3', marginBottom:'6px' },
  cardDesc: { fontSize:'12.5px', color:'#6b6890', lineHeight:'1.5', marginBottom:'12px' },
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
  pdfActions: { marginTop:'12px', textAlign:'center' },
  pdfDownloadBtn: { display:'inline-flex', alignItems:'center', gap:'6px', padding:'10px 20px', background:'#e74c3c', color:'#fff', borderRadius:'10px', fontSize:'14px', fontWeight:600, textDecoration:'none', transition:'.2s' },
  modalMeta: { display:'flex', gap:'16px', fontSize:'13px', color:'#6b6890', marginBottom:'16px' },
  messageBtn: { display:'flex', alignItems:'center', gap:'6px', padding:'10px 20px', background:'#8b7fc8', color:'#fff', border:'none', borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer', transition:'.2s' },
  messageForm: { marginTop:'12px', display:'flex', flexDirection:'column', gap:'10px' },
  messageInput: { width:'100%', padding:'12px', border:'1.5px solid #e8e4f5', borderRadius:'10px', fontSize:'14px', fontFamily:'inherit', resize:'vertical', boxSizing:'border-box', outline:'none' },
  messageActions: { display:'flex', gap:'10px', justifyContent:'flex-end' },
  messageCancel: { padding:'8px 18px', border:'1.5px solid #e8e4f5', background:'#fff', borderRadius:'8px', fontSize:'13px', fontWeight:600, color:'#666', cursor:'pointer' },
  messageSubmit: { padding:'8px 18px', border:'none', background:'#8b7fc8', color:'#fff', borderRadius:'8px', fontSize:'13px', fontWeight:600, cursor:'pointer' },
  messageSent: { color:'#38a169', fontWeight:600, fontSize:'14px', marginTop:'12px' },
};

export default VerApuntesPdf;
