const Footer = () => {
   return (
      <footer style={{
         background: 'linear-gradient(180deg, rgba(13, 17, 23, 0.5) 0%, rgba(22, 27, 34, 0.8) 100%)',
         borderTop: '2px solid rgba(31, 110, 235, 0.2)',
         backdropFilter: 'blur(10px)',
         padding: 'var(--spacing-3xl) var(--spacing-lg)',
         marginTop: 'var(--spacing-3xl)'
      }}>
         <div className="container">
            <div style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
               gap: 'var(--spacing-2xl)',
               marginBottom: 'var(--spacing-2xl)',
               paddingBottom: 'var(--spacing-2xl)',
               borderBottom: '1px solid rgba(31, 110, 235, 0.15)'
            }}>
               <div>
                  <h3 style={{
                     fontSize: 'var(--font-size-lg)',
                     fontWeight: 700,
                     color: '#79c0ff',
                     marginBottom: 'var(--spacing-md)',
                     background: 'linear-gradient(135deg, #1f6feb 0%, #79c0ff 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     backgroundClip: 'text'
                  }}>✨ Quizzie</h3>
                  <p style={{
                     color: '#8b949e',
                     fontSize: 'var(--font-size-sm)',
                     lineHeight: 1.6,
                     margin: 0
                  }}>
                     Empowering learners through interactive quizzes and AI-powered learning experiences.
                  </p>
               </div>
               <div>
                  <h4 style={{
                     color: '#f0f6fc',
                     fontSize: 'var(--font-size-base)',
                     fontWeight: 700,
                     marginBottom: 'var(--spacing-md)'
                  }}>Quick Links</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                     <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                        <a href="/" style={{
                           color: '#8b949e',
                           textDecoration: 'none',
                           fontSize: 'var(--font-size-sm)',
                           transition: 'color 0.3s ease'
                        }} onMouseEnter={(e) => e.target.style.color = '#79c0ff'} onMouseLeave={(e) => e.target.style.color = '#8b949e'}>Home</a>
                     </li>
                     <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                        <a href="/practice" style={{
                           color: '#8b949e',
                           textDecoration: 'none',
                           fontSize: 'var(--font-size-sm)',
                           transition: 'color 0.3s ease'
                        }} onMouseEnter={(e) => e.target.style.color = '#79c0ff'} onMouseLeave={(e) => e.target.style.color = '#8b949e'}>Practice</a>
                     </li>
                     <li>
                        <a href="/creations" style={{
                           color: '#8b949e',
                           textDecoration: 'none',
                           fontSize: 'var(--font-size-sm)',
                           transition: 'color 0.3s ease'
                        }} onMouseEnter={(e) => e.target.style.color = '#79c0ff'} onMouseLeave={(e) => e.target.style.color = '#8b949e'}>Create</a>
                     </li>
                  </ul>
               </div>
               <div>
                  <h4 style={{
                     color: '#f0f6fc',
                     fontSize: 'var(--font-size-base)',
                     fontWeight: 700,
                     marginBottom: 'var(--spacing-md)'
                  }}>Features</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                     <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                        <a href="#" style={{
                           color: '#8b949e',
                           textDecoration: 'none',
                           fontSize: 'var(--font-size-sm)',
                           transition: 'color 0.3s ease'
                        }} onMouseEnter={(e) => e.target.style.color = '#79c0ff'} onMouseLeave={(e) => e.target.style.color = '#8b949e'}>AI Powered Quizzes</a>
                     </li>
                     <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                        <a href="#" style={{
                           color: '#8b949e',
                           textDecoration: 'none',
                           fontSize: 'var(--font-size-sm)',
                           transition: 'color 0.3s ease'
                        }} onMouseEnter={(e) => e.target.style.color = '#79c0ff'} onMouseLeave={(e) => e.target.style.color = '#8b949e'}>Learning Analytics</a>
                     </li>
                     <li>
                        <a href="#" style={{
                           color: '#8b949e',
                           textDecoration: 'none',
                           fontSize: 'var(--font-size-sm)',
                           transition: 'color 0.3s ease'
                        }} onMouseEnter={(e) => e.target.style.color = '#79c0ff'} onMouseLeave={(e) => e.target.style.color = '#8b949e'}>Community</a>
                     </li>
                  </ul>
               </div>
            </div>
            <div style={{
               textAlign: 'center',
               paddingTop: 'var(--spacing-lg)'
            }}>
               <p style={{
                  color: '#8b949e',
                  fontSize: 'var(--font-size-sm)',
                  margin: 0,
                  marginBottom: 'var(--spacing-sm)'
               }}>
                  © {new Date().getFullYear()} Quizzie. Where Knowledge Meets Adventure.
               </p>
               <p style={{
                  color: '#6e7681',
                  fontSize: 'var(--font-size-xs)',
                  margin: 0
               }}>
                  Crafted with ❤️ for learners everywhere
               </p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
