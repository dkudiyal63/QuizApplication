import { Link, useNavigate } from "react-router-dom";
import Header from "../HomePage/Header";
import Spinner from "../HomePage/Spinner";
import { useEffect, useState } from "react";
import "./Creations.css";
import QuizDetails from "./QuizDetails";
const Creations = () => {
   const [currentQuiz, setCurrentQuiz] = useState();
   const [showSpinner, setShowSpinner] = useState(true);
   const [error, setError] = useState(false);
   const [data, setData] = useState([]);
   const [errorText, setErrorText] = useState("");
   const [showLoginPrompt, setShowLoginPrompt] = useState(false);
   const navigate = useNavigate();
   const getQuizzes = async () => {
      const url = "http://localhost:8080/user/creations";
      try {
         const res = await fetch(url, {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("pid")}`,
               "Content-type": "application/json",
            },
         });
         if (res.status === 204) {
            setErrorText("You have not created any quiz");
            setError(true);
            setShowSpinner(false);
         } else if (res.status === 500) {
            setErrorText("Something went wrong! Try again ");
            setError(true);
            setShowSpinner(false);
         } else if (res.status === 302) {
            const data = await res.json();
            setData(data);
            setShowSpinner(false);
         } else if (res.status === 401) {
            setErrorText("You are not logged in. Kindly login");
            setShowSpinner(false);
         }
         
      } catch (error) {
         setErrorText("Something went wrong! Try again ");
         setError(true);
         setShowSpinner(false);
      }
   };

   useEffect(() => {
      getQuizzes();
   }, []);

   return (
      <div>
         <Header />
         <section className="container mt-4" style={{ marginTop: 'var(--spacing-2xl)' }}>
            <div className="card d-flex justify-content-between align-items-center" style={{
               padding: 'var(--spacing-2xl)',
               borderRadius: 'var(--radius-2xl)',
               borderTop: '3px solid #1f6feb',
               background: 'linear-gradient(135deg, rgba(31, 110, 235, 0.08) 0%, rgba(121, 192, 255, 0.03) 100%)',
               boxShadow: '0 8px 24px rgba(31, 110, 235, 0.15)',
               flexWrap: 'wrap',
               gap: 'var(--spacing-lg)'
            }}>
               <div className="d-flex align-items-center gap-3">
                  <div style={{ fontSize: '2.5rem' }}>✨</div>
                  <div>
                     <h2 className="m-0" style={{
                        fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
                        fontWeight: 800,
                        color: '#f0f6fc'
                     }}>Create Your Next Quiz</h2>
                     <p style={{
                        color: '#8b949e',
                        fontSize: 'clamp(0.875rem, 1.5vw, 0.95rem)',
                        margin: '0.25rem 0 0',
                        lineHeight: 1.5
                     }}>Share your knowledge with the world</p>
                  </div>
               </div>
               <Link to="/Creations/Create-quiz">
                  <button type="button" className="btn btn-primary btn-lg" onClick={(e) => {
                     if (!localStorage.getItem('pid')) {
                        e.preventDefault();
                        setShowLoginPrompt(true);
                     }
                  }} style={{
                     padding: '0.875rem 2rem',
                     fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                     fontWeight: 600,
                     borderRadius: 'var(--radius-lg)',
                     background: 'linear-gradient(135deg, #1f6feb 0%, #388bfd 100%)',
                     border: 'none',
                     boxShadow: '0 8px 20px rgba(31, 110, 235, 0.3)',
                     transition: 'all 0.3s ease',
                     whiteSpace: 'nowrap'
                  }}>
                     ➕ Create Quiz
                  </button>
               </Link>
            </div>
         </section>
         <hr className="container" style={{
            margin: 'var(--spacing-2xl) auto',
            borderColor: 'rgba(31, 110, 235, 0.2)'
         }} />
         <section className="container" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
               <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.5rem',
                  background: 'rgba(31, 110, 235, 0.15)',
                  borderRadius: 'var(--radius-xl)',
                  marginBottom: 'var(--spacing-md)',
                  border: '1px solid rgba(31, 110, 235, 0.3)'
               }}>
                  <span style={{ color: '#79c0ff', fontWeight: 700, fontSize: 'clamp(0.75rem, 1vw, 0.875rem)', letterSpacing: '1px' }}>🎨 AI QUIZ TEMPLATES</span>
               </div>
               <h2 style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 800,
                  color: '#f0f6fc',
                  marginBottom: 'var(--spacing-md)',
                  lineHeight: 1.2
               }}>Quick Start Templates</h2>
               <p style={{
                  color: '#8b949e',
                  fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                  maxWidth: '600px',
                  lineHeight: 1.6
               }}>Choose a template and let AI generate questions instantly</p>
            </div>
            <div className="features-grid">
               {[{
                  title: 'Mind Bender Challenge',
                  description: 'Test cognitive abilities with brain-teasing puzzles, riddles, and logic challenges.',
                  icon: '🧠', subject: 'Logic Puzzles', topic: 'Riddles', color: '#1f6feb'
               },{
                  title: 'Trivia Time Machine',
                  description: 'Journey through history, pop culture, and timeless knowledge spanning eras.',
                  icon: '⏰', subject: 'General Knowledge', topic: 'History & Pop Culture', color: '#79c0ff'
               },{
                  title: "Explorer's Quest",
                  description: 'Explore diverse subjects from science to geography and beyond.',
                  icon: '🗺️', subject: 'Science & Geography', topic: 'Exploration', color: '#58a6ff'
               }].map((f, idx) => (
                  <div key={idx} className="feature-card fade-in-up" style={{
                     borderTop: `3px solid ${f.color}`,
                     background: `linear-gradient(135deg, rgba(31, 110, 235, 0.05) 0%, rgba(121, 192, 255, 0.02) 100%)`,
                     animationDelay: `${idx * 0.15}s`,
                     transition: 'all 0.4s ease',
                     minHeight: '380px',
                     padding: 'var(--spacing-lg)',
                     cursor: 'pointer',
                     display: 'flex',
                     flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-12px)';
                     e.currentTarget.style.boxShadow = `0 20px 50px rgba(31, 110, 235, 0.3)`;
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                  }}>
                     <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>{f.icon}</div>
                     <h3 style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                        fontWeight: 700,
                        marginBottom: 'var(--spacing-md)',
                        color: '#f0f6fc',
                        lineHeight: 1.3
                     }}>{f.title}</h3>
                     <p style={{
                        color: '#8b949e',
                        fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
                        flex: 1,
                        marginBottom: 'var(--spacing-lg)',
                        lineHeight: 1.6
                     }}>{f.description}</p>
                     <button className="btn btn-primary" onClick={async () => {
                        const payload = { grade: 'college', difficulty: 'medium', subject: f.subject, topic: f.title, count: 10 };
                        const res = await fetch('/quiz/generate-ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                        if (res.ok) {
                           const questions = await res.json();
                           localStorage.setItem('aiGeneratedQuestions', JSON.stringify(questions));
                           localStorage.setItem('aiQuizInfo', JSON.stringify({ title: `${f.title} - 10 Questions`, grade: 'college', difficulty: 'medium', subject: f.subject, count: 10 }));
                           window.location.href = '/ai-quiz';
                        } else {
                           alert('Failed to generate quiz.');
                        }
                     }} style={{
                        background: `linear-gradient(135deg, ${f.color} 0%, ${f.color}dd 100%)`,
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        fontWeight: 600,
                        marginTop: 'auto',
                        fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                        borderRadius: 'var(--radius-lg)'
                     }}>
                        Generate Now →
                     </button>
                  </div>
               ))}
            </div>
         </section>

         {showLoginPrompt && (
            <div style={{
               position: 'fixed',
               inset: 0,
               background: 'rgba(0,0,0,0.85)',
               backdropFilter: 'blur(5px)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               zIndex: 2000,
               padding: 'var(--spacing-lg)'
            }}>
               <div className="card" style={{
                  maxWidth: '480px',
                  width: '100%',
                  borderRadius: 'var(--radius-2xl)',
                  borderTop: '3px solid #1f6feb',
                  boxShadow: '0 20px 60px rgba(31, 110, 235, 0.3)',
                  animation: 'slideInDown 0.4s ease-out'
               }}>
                  <h3 className="card-title" style={{
                     fontSize: 'var(--font-size-xl)',
                     marginBottom: 'var(--spacing-md)'
                  }}>🔐 Sign In to Create Quizzes</h3>
                  <p className="card-description">
                     Create an account to build and share your custom quizzes with the community.
                  </p>
                  <div className="d-flex justify-content-end gap-3 mt-4">
                     <button className="btn btn-secondary" onClick={() => setShowLoginPrompt(false)}>
                        Not Now
                     </button>
                     <button className="btn btn-primary" onClick={() => navigate('/login')}>
                        Sign In →
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
export default Creations;
