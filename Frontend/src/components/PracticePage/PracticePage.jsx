import Header from "../HomePage/Header";
import IdInput from "./IdInput";
import AiQuiz from "./AiQuiz";

const PracticePage = () => {
   return (
      <div className="min-h-screen">
         <Header />
         
         <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
               <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.5rem',
                  background: 'rgba(31, 110, 235, 0.15)',
                  borderRadius: 'var(--radius-xl)',
                  marginBottom: 'var(--spacing-md)',
                  border: '1px solid rgba(31, 110, 235, 0.3)'
               }}>
                  <span style={{ color: '#79c0ff', fontWeight: 700, fontSize: 'clamp(0.75rem, 1vw, 0.875rem)', letterSpacing: '1px' }}>🎯 PRACTICE MODES</span>
               </div>
               <h1 style={{
                  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #f0f6fc 0%, #79c0ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: 'var(--spacing-md)',
                  lineHeight: 1.2
               }}>Choose Your Quest</h1>
               <p style={{
                  color: '#8b949e',
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: 1.6
               }}>
                  Take an existing quiz or generate a new one powered by AI
               </p>
            </div>
            
            <div className="row justify-content-center" style={{ gap: 'var(--spacing-lg)' }}>
               <div className="col-md-5">
                  <div className="card" style={{
                     borderTop: '3px solid #1f6feb',
                     borderRadius: 'var(--radius-2xl)',
                     background: 'linear-gradient(135deg, rgba(31, 110, 235, 0.05) 0%, rgba(121, 192, 255, 0.02) 100%)',
                     transition: 'all 0.3s ease',
                     textAlign: 'center',
                     padding: 'var(--spacing-lg)'
                  }}>
                     <div style={{
                        fontSize: '3rem',
                        marginBottom: 'var(--spacing-md)'
                     }}>📝</div>
                     <h3 style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                        fontWeight: 700,
                        marginBottom: 'var(--spacing-sm)',
                        color: '#f0f6fc'
                     }}>Take Existing Quiz</h3>
                     <p style={{
                        color: '#8b949e',
                        fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
                        marginBottom: 'var(--spacing-lg)',
                        lineHeight: 1.6
                     }}>
                        Enter a quiz ID to start taking an existing quiz
                     </p>
                     <IdInput />
                  </div>
               </div>
               
               <div className="col-md-1 d-flex align-items-center justify-content-center" style={{ minWidth: '100px' }}>
                  <div style={{ width: '100%', textAlign: 'center' }}>
                     <div style={{ 
                        height: '60px',
                        background: 'linear-gradient(180deg, transparent 0%, #1f6feb 50%, transparent 100%)',
                        width: '2px',
                        margin: '0 auto 10px'
                     }}></div>
                     <h4 style={{ 
                        color: '#79c0ff',
                        fontStyle: 'italic',
                        fontWeight: 600,
                        fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                        margin: '0'
                     }}>
                        OR
                     </h4>
                     <div style={{ 
                        height: '60px',
                        background: 'linear-gradient(180deg, transparent 0%, #1f6feb 50%, transparent 100%)',
                        width: '2px',
                        margin: '10px auto 0'
                     }}></div>
                  </div>
               </div>
               
               <div className="col-md-5">
                  <div className="card" style={{
                     borderTop: '3px solid #79c0ff',
                     borderRadius: 'var(--radius-2xl)',
                     background: 'linear-gradient(135deg, rgba(121, 192, 255, 0.05) 0%, rgba(88, 166, 255, 0.02) 100%)',
                     transition: 'all 0.3s ease',
                     textAlign: 'center',
                     padding: 'var(--spacing-lg)'
                  }}>
                     <div style={{
                        fontSize: '3rem',
                        marginBottom: 'var(--spacing-md)'
                     }}>🤖</div>
                     <h3 style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                        fontWeight: 700,
                        marginBottom: 'var(--spacing-sm)',
                        color: '#f0f6fc'
                     }}>AI Generated Quiz</h3>
                     <p style={{
                        color: '#8b949e',
                        fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
                        marginBottom: 'var(--spacing-lg)',
                        lineHeight: 1.6
                     }}>
                        Create a personalized quiz with AI intelligence
                     </p>
                     <AiQuiz />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PracticePage;
