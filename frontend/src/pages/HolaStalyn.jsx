import React from 'react';

function HolaStalyn() {
  return (
    <div style={styles.body}>
      {/* Sidebar */}
      <nav style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <SidebarItem active svg={<HomeIcon/>} title="Home"/>
        <SidebarItem svg={<SearchIcon/>} title="Explore"/>
        <SidebarItem svg={<BookIcon/>} title="My Courses"/>
        <SidebarItem svg={<CalendarIcon/>} title="Calendar"/>
        <SidebarItem svg={<MessageIcon/>} title="Messages"/>
        <div style={{flex:1}}></div>
        <SidebarItem svg={<SettingsIcon/>} title="Settings"/>
        <div style={styles.sidebarAvatar}></div>
      </nav>

      {/* Main content */}
      <div style={styles.main}>
        {/* Top nav */}
        <header style={styles.topnav}>
          <div style={styles.searchBox}>
            <SearchIcon color="#6b6890"/>
            <input style={styles.searchInput} type="text" placeholder="Search courses, topics, or instructors..."/>
          </div>
          <div style={styles.topnavRight}>
            <TopNavIcon svg={<BellIcon/>} badge/>
            <TopNavIcon svg={<HeartIcon/>}/>
            <div style={styles.topnavAvatar}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          </div>
        </header>

        {/* Content area */}
        <div style={styles.content}>
          {/* Hero section */}
          <section style={styles.hero}>
            <div style={styles.heroText}>
              <span style={styles.heroLabel}>New Courses Available</span>
              <h1 style={styles.heroH1}>Learn without<br/><span style={{color:'#8b7fc8'}}>limits</span></h1>
              <p style={styles.heroP}>Discover thousands of courses taught by world-class instructors and advance your career with flexible online learning.</p>
              <button style={styles.heroBtn}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff" style={{marginLeft:'3px'}}><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Browse Courses
              </button>
            </div>
            <div style={styles.heroIllust}>
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

          {/* Popular courses */}
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionH2}>Popular Courses</h2>
            <a href="#" style={styles.sectionLink}>View all →</a>
          </div>
          <div style={styles.coursesGrid}>
            <CourseCard
              tag="Design" tagType="purple" title="UI/UX Design Fundamentals for Beginners"
              desc="Learn the core principles of user interface and experience design from scratch."
              rating="4.8" duration="8h" students="2.4k" price="$49" author="Sarah Chen" avatarBg="#c4b5e0"
              time="12:34" progress="35%" bg="linear-gradient(145deg,#1a1625,#23203a)"
            />
            <CourseCard
              tag="Development" tagType="green" title="React & TypeScript Masterclass 2026"
              desc="Build modern web apps with React and TypeScript best practices."
              rating="4.9" duration="24h" students="5.1k" price="$79" author="Alex Morgan" avatarBg="#c6f6e5"
              time="18:22" progress="65%" bg="linear-gradient(145deg,#1e2a3a,#162030)"
            />
            <CourseCard
              tag="Marketing" tagType="orange" title="Digital Marketing Strategy & SEO"
              desc="Master SEO, content marketing, and analytics to grow your business."
              rating="4.7" duration="12h" students="3.8k" price="Free" priceFree author="James Lee" avatarBg="#fbd38d"
              time="6:45" progress="20%" bg="linear-gradient(145deg,#2a1e3a,#201530)"
            />
            <CourseCard
              tag="Data Science" tagType="green" title="Python for Data Analysis & ML"
              desc="Use Python, pandas, and scikit-learn for real-world data projects."
              rating="4.9" duration="32h" students="8.2k" price="$99" author="Dr. Maya Patel" avatarBg="#9ae6b4"
              time="15:10" progress="50%" bg="linear-gradient(145deg,#1a2a1a,#152015)"
            />
          </div>

          {/* Continue Learning */}
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionH2}>Continue Learning</h2>
            <a href="#" style={styles.sectionLink}>View all →</a>
          </div>
          <div style={styles.coursesGrid}>
            <CourseCard
              tag="Photography" tagType="purple" title="Advanced Mobile Photography"
              desc="Take stunning photos with just your smartphone using pro techniques."
              rating="4.6" duration="6h" students="1.5k" price="$39" author="Emma Wilson" avatarBg="#fed7d7"
              time="22:08" progress="78%" bg="linear-gradient(145deg,#2a2020,#201818)"
            />
            <CourseCard
              tag="Development" tagType="green" title="Node.js Backend API Development"
              desc="Build scalable REST APIs with Node.js, Express, and MongoDB."
              rating="4.8" duration="18h" students="4.3k" price="$69" author="Tom Brooks" avatarBg="#c6f6e5"
              time="9:55" progress="42%" bg="linear-gradient(145deg,#1a1a2a,#121220)"
            />
            <CourseCard
              tag="Business" tagType="orange" title="Product Management Essentials"
              desc="Learn to lead products from ideation to launch with agile methods."
              rating="4.7" duration="10h" students="2.9k" price="Free" priceFree author="Lisa Chang" avatarBg="#fbd38d"
              time="14:30" progress="55%" bg="linear-gradient(145deg,#2a251a,#201c15)"
            />
            <CourseCard
              tag="Data Science" tagType="green" title="Machine Learning with TensorFlow"
              desc="Build neural networks and ML models using TensorFlow and Keras."
              rating="4.9" duration="28h" students="6.7k" price="$89" author="Dr. Raj Kumar" avatarBg="#9ae6b4"
              time="11:20" progress="30%" bg="linear-gradient(145deg,#1a2a2a,#152020)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Sub-components --- */
function SidebarItem({active, svg, title}) {
  return (
    <div title={title} style={{...styles.sidebarItem, ...(active ? styles.sidebarItemActive : {})}}>
      {svg}
    </div>
  );
}
function TopNavIcon({svg, badge}) {
  return <div style={styles.topnavIcon}>{svg}{badge && <span style={styles.badge}></span>}</div>;
}

function CourseCard({tag, tagType, title, desc, rating, duration, students, price, priceFree, author, avatarBg, time, progress, bg}) {
  const tagColors = {
    purple: {bg:'rgba(139,127,200,.12)', color:'#8b7fc8'},
    green: {bg:'rgba(72,187,120,.12)', color:'#38a169'},
    orange: {bg:'rgba(237,137,54,.12)', color:'#c05621'},
  };
  const tc = tagColors[tagType] || tagColors.purple;
  return (
    <div style={styles.card}>
      <div style={{...styles.cardThumb, background: bg || '#1a1625'}}>
        <div style={styles.playBtn}><svg viewBox="0 0 24 24" width="20" height="20" fill="#8b7fc8" style={{marginLeft:'3px'}}><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
        <span style={styles.videoTime}>{time}</span>
        <div style={styles.videoProgress}><div style={{...styles.videoProgressBar, width: progress || '35%'}}></div></div>
      </div>
      <div style={styles.cardBody}>
        <div style={styles.cardTags}><span style={{...styles.cardTag, ...tc}}>{tag}</span></div>
        <div style={styles.cardTitle}>{title}</div>
        <div style={styles.cardDesc}>{desc}</div>
        <div style={styles.cardMeta}>
          <span style={styles.cardRating}><StarIcon/> {rating}</span>
          <span style={styles.cardMetaItem}><ClockIcon/> {duration}</span>
          <span style={styles.cardMetaItem}><UsersIcon/> {students}</span>
        </div>
        <div style={styles.cardFooter}>
          <div style={styles.cardAuthor}><div style={{...styles.cardAuthorImg, background: avatarBg}}></div><span style={styles.cardAuthorName}>{author}</span></div>
          <span style={{...styles.cardPrice, ...(priceFree ? styles.cardPriceFree : {})}}>{price}</span>
        </div>
      </div>
    </div>
  );
}

/* --- Icon components --- */
const HomeIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="#6b6890" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const SearchIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="#6b6890" fill="none" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const BookIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="#6b6890" fill="none" strokeWidth="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const CalendarIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="#6b6890" fill="none" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const MessageIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="#6b6890" fill="none" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const SettingsIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="#6b6890" fill="none" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const BellIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="#6b6890" fill="none" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const HeartIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="#6b6890" fill="none" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const StarIcon = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="#f6c555" stroke="#f6c555" strokeWidth=".5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ClockIcon = () => <svg viewBox="0 0 24 24" width="14" height="14" stroke="#6b6890" fill="none" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const UsersIcon = () => <svg viewBox="0 0 24 24" width="14" height="14" stroke="#6b6890" fill="none" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

/* --- Styles --- */
const styles = {
  body: {fontFamily:'Segoe UI,system-ui,-apple-system,sans-serif',background:'#f8f7fc',color:'#2d2b3a',minHeight:'100vh',display:'flex'},
  sidebar: {width:'72px',background:'#fff',borderRight:'1px solid #e8e4f5',display:'flex',flexDirection:'column',alignItems:'center',padding:'20px 0',gap:'8px',position:'fixed',left:0,top:0,height:'100vh',zIndex:100},
  sidebarLogo: {width:'36px',height:'36px',background:'linear-gradient(135deg,#8b7fc8,#6c5ca5)',borderRadius:'10px',display:'grid',placeItems:'center',marginBottom:'20px'},
  sidebarItem: {width:'44px',height:'44px',borderRadius:'12px',display:'grid',placeItems:'center',cursor:'pointer',transition:'.2s'},
  sidebarItemActive: {background:'#e8e4f5'},
  sidebarAvatar: {width:'36px',height:'36px',borderRadius:'50%',background:'linear-gradient(135deg,#d4c8f0,#a89fd0)'},
  main: {marginLeft:'72px',flex:1,display:'flex',flexDirection:'column'},
  topnav: {background:'#fff',borderBottom:'1px solid #e8e4f5',padding:'12px 32px',display:'flex',alignItems:'center',gap:'20px',position:'sticky',top:0,zIndex:50},
  searchBox: {flex:1,maxWidth:'480px',position:'relative'},
  searchInput: {width:'100%',padding:'10px 16px 10px 40px',border:'1.5px solid #e8e4f5',borderRadius:'12px',fontSize:'14px',background:'#f8f7fc',outline:'none'},
  topnavRight: {display:'flex',alignItems:'center',gap:'16px',marginLeft:'auto'},
  topnavIcon: {width:'38px',height:'38px',borderRadius:'10px',display:'grid',placeItems:'center',cursor:'pointer',position:'relative'},
  badge: {position:'absolute',top:'4px',right:'4px',width:'8px',height:'8px',background:'#f56565',borderRadius:'50%'},
  topnavAvatar: {width:'36px',height:'36px',borderRadius:'50%',background:'linear-gradient(135deg,#c4b5e0,#8b7fc8)',display:'grid',placeItems:'center',cursor:'pointer'},
  content: {padding:'32px 36px',flex:1},
  hero: {background:'linear-gradient(135deg,#f0ecfa 0%,#e8e4f5 50%,#f5f2fc 100%)',borderRadius:'16px',padding:'48px 56px',display:'flex',alignItems:'center',gap:'48px',marginBottom:'36px',overflow:'hidden'},
  heroText: {flex:1,position:'relative',zIndex:2},
  heroLabel: {display:'inline-block',fontSize:'12px',fontWeight:600,color:'#8b7fc8',background:'rgba(139,127,200,.12)',padding:'4px 12px',borderRadius:'20px',marginBottom:'16px',letterSpacing:'.5px',textTransform:'uppercase'},
  heroH1: {fontSize:'36px',fontWeight:700,lineHeight:1.2,marginBottom:'14px',color:'#2d2b3a'},
  heroP: {fontSize:'15px',color:'#6b6890',lineHeight:1.6,marginBottom:'24px',maxWidth:'420px'},
  heroBtn: {display:'inline-flex',alignItems:'center',gap:'8px',padding:'12px 28px',background:'#8b7fc8',color:'#fff',border:'none',borderRadius:'12px',fontSize:'14px',fontWeight:600,cursor:'pointer'},
  heroIllust: {width:'320px',height:'240px',flexShrink:0},
  sectionHeader: {display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'},
  sectionH2: {fontSize:'20px',fontWeight:700},
  sectionLink: {fontSize:'13px',color:'#8b7fc8',fontWeight:600},
  coursesGrid: {display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'24px',marginBottom:'36px'},
  card: {background:'#fff',borderRadius:'16px',overflow:'hidden',boxShadow:'0 4px 24px rgba(139,127,200,.12)',transition:'.25s',cursor:'pointer'},
  cardThumb: {position:'relative',width:'100%',aspectRatio:'16/9',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'},
  playBtn: {width:'52px',height:'52px',background:'rgba(255,255,255,.92)',borderRadius:'50%',display:'grid',placeItems:'center',zIndex:2,boxShadow:'0 4px 16px rgba(0,0,0,.3)'},
  videoTime: {position:'absolute',bottom:'10px',right:'10px',background:'rgba(0,0,0,.7)',color:'#fff',fontSize:'11px',fontWeight:600,padding:'3px 8px',borderRadius:'6px',zIndex:2},
  videoProgress: {position:'absolute',bottom:0,left:0,right:0,height:'3px',background:'rgba(255,255,255,.15)',zIndex:2},
  videoProgressBar: {height:'100%',background:'#8b7fc8',borderRadius:'0 2px 2px 0'},
  cardBody: {padding:'16px 18px 18px'},
  cardTags: {display:'flex',gap:'6px',marginBottom:'8px'},
  cardTag: {fontSize:'10px',fontWeight:600,padding:'3px 8px',borderRadius:'6px',textTransform:'uppercase',letterSpacing:'.3px'},
  cardTitle: {fontSize:'15px',fontWeight:700,lineHeight:1.3,marginBottom:'6px',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'},
  cardDesc: {fontSize:'12.5px',color:'#6b6890',lineHeight:1.5,marginBottom:'12px',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'},
  cardMeta: {display:'flex',alignItems:'center',gap:'12px',fontSize:'12px',color:'#6b6890'},
  cardRating: {display:'flex',alignItems:'center',gap:'4px',fontWeight:600,color:'#2d2b3a'},
  cardMetaItem: {display:'flex',alignItems:'center',gap:'4px'},
  cardFooter: {display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'14px',paddingTop:'14px',borderTop:'1px solid #e8e4f5'},
  cardAuthor: {display:'flex',alignItems:'center',gap:'8px'},
  cardAuthorImg: {width:'26px',height:'26px',borderRadius:'50%'},
  cardAuthorName: {fontSize:'12px',fontWeight:600},
  cardPrice: {fontSize:'14px',fontWeight:700,color:'#8b7fc8'},
  cardPriceFree: {color:'#38a169'},
};

export default HolaStalyn;
