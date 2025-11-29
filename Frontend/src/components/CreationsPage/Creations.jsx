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
         <section className="container mt-5">
            <div className="card d-flex justify-content-between align-items-center" style={{ padding: 'var(--spacing-xl)' }}>
               <div className="d-flex align-items-center gap-3">
                  <h2 className="m-0">Create your next quiz</h2>
               </div>
               <Link to="/Creations/Create-quiz">
                  <button type="button" className="btn btn-primary btn-lg" onClick={(e) => {
                     if (!localStorage.getItem('pid')) {
                        e.preventDefault();
                        setShowLoginPrompt(true);
                     }
                  }}>Create Quiz</button>
               </Link>
            </div>
         </section>
         <hr className="container" />
         <section className="container">
            <div className="features-grid">
               {[{
                  title: 'Mind Bender Challenge',
                  description: 'Brain-teasing puzzles, riddles, and logic-based quizzes.',
                  icon: '🧠', subject: 'Logic Puzzles', topic: 'Riddles'
               },{
                  title: 'Trivia Time Machine',
                  description: 'Trivia spanning eras and topics.',
                  icon: '⏰', subject: 'General Knowledge', topic: 'History & Pop Culture'
               },{
                  title: "Explorer's Quest",
                  description: 'A knowledge expedition across subjects.',
                  icon: '🗺️', subject: 'Science & Geography', topic: 'Exploration'
               }].map((f, idx) => (
                  <div key={idx} className="feature-card fade-in-up">
                     <div className="feature-icon">{f.icon}</div>
                     <h3 className="card-title">{f.title}</h3>
                     <p className="card-description">{f.description}</p>
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
                     }}>Explore now →</button>
                  </div>
               ))}
            </div>
         </section>

         {showLoginPrompt && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
               <div className="card" style={{ maxWidth: '480px', width: '90%' }}>
                  <h3 className="card-title">Log in to create your own quizzes</h3>
                  <p className="card-description">Sign in to build and share your custom quiz.</p>
                  <div className="d-flex justify-content-end gap-3 mt-3">
                     <button className="btn btn-secondary" onClick={() => setShowLoginPrompt(false)}>Not Now</button>
                     <button className="btn btn-primary" onClick={() => navigate('/login')}>Log in</button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
export default Creations;
