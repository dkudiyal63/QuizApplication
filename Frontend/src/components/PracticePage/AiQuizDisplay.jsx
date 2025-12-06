import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../HomePage/Header";

const AiQuizDisplay = () => {
   const [questions, setQuestions] = useState([]);
   const [currentQuestion, setCurrentQuestion] = useState(0);
   const [answers, setAnswers] = useState({});
   const [quizInfo, setQuizInfo] = useState({});
   const [loading, setLoading] = useState(true);
   const [showResults, setShowResults] = useState(false);
   const [score, setScore] = useState(0);
   const [totalPoints, setTotalPoints] = useState(0);
   const navigate = useNavigate();

   useEffect(() => {
      const storedQuestions = localStorage.getItem("aiGeneratedQuestions");
      const storedQuizInfo = localStorage.getItem("aiQuizInfo");
      
      if (storedQuestions && storedQuizInfo) {
         setQuestions(JSON.parse(storedQuestions));
         setQuizInfo(JSON.parse(storedQuizInfo));
         setTotalPoints(JSON.parse(storedQuestions).length); // Each question is worth 1 point
      } else {
         navigate("/practice");
      }
      setLoading(false);
   }, [navigate]);

   const handleAnswerSelect = (questionIndex, answer) => {
      setAnswers(prev => ({
         ...prev,
         [questionIndex]: answer
      }));
   };

   const handleNext = () => {
      if (currentQuestion < questions.length - 1) {
         setCurrentQuestion(currentQuestion + 1);
      }
   };

   const handlePrevious = () => {
      if (currentQuestion > 0) {
         setCurrentQuestion(currentQuestion - 1);
      }
   };

   const handleSubmit = () => {
      let totalScore = 0;
      questions.forEach((question, index) => {
         if (answers[index] === question.correct) {
            totalScore += 1; // Each correct answer is worth 1 point
         }
      });
      setScore(totalScore);
      setShowResults(true);
   };

   const handleRetake = () => {
      setAnswers({});
      setCurrentQuestion(0);
      setShowResults(false);
      setScore(0);
   };

   const handleBackToPractice = () => {
      localStorage.removeItem("aiGeneratedQuestions");
      localStorage.removeItem("aiQuizInfo");
      navigate("/practice");
   };

   if (loading) {
      return (
         <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="spinner-border text-primary" role="status">
               <span className="visually-hidden">Loading...</span>
            </div>
         </div>
      );
   }

   if (showResults) {
      const percentage = Math.round((score / totalPoints) * 100);
      return (
         <div>
            <Header />
            <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
               <div className="row justify-content-center">
                  <div className="col-md-8">
                     <div className="card" style={{
                        borderRadius: 'var(--radius-2xl)',
                        borderTop: '3px solid #3fb950',
                        boxShadow: '0 20px 60px rgba(63, 185, 80, 0.2)'
                     }}>
                        <div className="card-header text-center" style={{
                           background: 'linear-gradient(135deg, rgba(63, 185, 80, 0.1) 0%, rgba(79, 195, 247, 0.05) 100%)',
                           borderBottom: '2px solid rgba(31, 110, 235, 0.2)',
                           padding: 'var(--spacing-xl)'
                        }}>
                           <h3 style={{
                              fontSize: 'clamp(1.75rem, 4vw, 2rem)',
                              fontWeight: 700,
                              marginBottom: 'var(--spacing-sm)',
                              color: '#3fb950'
                           }}>✓ Quiz Results</h3>
                           <h5 style={{
                              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                              fontWeight: 500,
                              margin: 0,
                              color: '#8b949e'
                           }}>{quizInfo.title}</h5>
                        </div>
                        <div className="card-body text-center" style={{ padding: 'var(--spacing-xl)' }}>
                           <h2 style={{
                              fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                              fontWeight: 800,
                              marginBottom: 'var(--spacing-lg)',
                              background: 'linear-gradient(135deg, #3fb950, #79c0ff)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent'
                           }}>
                              {score}/{totalPoints}
                           </h2>
                           <p style={{
                              fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                              color: '#8b949e',
                              marginBottom: 'var(--spacing-lg)'
                           }}>Your Score</p>
                           <div className="progress" style={{
                              height: 'clamp(24px, 3vw, 32px)',
                              marginBottom: 'var(--spacing-xl)',
                              borderRadius: 'var(--radius-lg)',
                              backgroundColor: 'rgba(31, 110, 235, 0.1)',
                              border: '1px solid rgba(31, 110, 235, 0.2)'
                           }}>
                              <div 
                                 className="progress-bar" 
                                 style={{
                                    width: `${percentage}%`,
                                    background: `linear-gradient(90deg, #3fb950, #79c0ff)`,
                                    borderRadius: 'var(--radius-lg)',
                                    fontSize: 'clamp(0.9rem, 1.3vw, 0.95rem)',
                                    fontWeight: 600,
                                    color: '#fff'
                                 }}
                                 role="progressbar"
                              >
                                 {percentage}%
                              </div>
                           </div>
                           <div className="d-flex justify-content-center" style={{
                              gap: 'var(--spacing-lg)',
                              flexWrap: 'wrap'
                           }}>
                              <button className="btn btn-primary" onClick={handleRetake} style={{
                                 padding: '0.75rem 1.5rem',
                                 fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
                                 fontWeight: 600,
                                 borderRadius: 'var(--radius-lg)'
                              }}>
                                 🔄 Retake Quiz
                              </button>
                              <button className="btn btn-secondary" onClick={handleBackToPractice} style={{
                                 padding: '0.75rem 1.5rem',
                                 fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
                                 fontWeight: 600,
                                 borderRadius: 'var(--radius-lg)'
                              }}>
                                 ← Back to Practice
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   const currentQ = questions[currentQuestion];

   return (
      <div>
         <Header />
         <div className="container" style={{ paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
            <div className="row justify-content-center">
               <div className="col-md-8">
                  <div className="card" style={{
                     borderRadius: 'var(--radius-2xl)',
                     borderTop: '3px solid #1f6feb',
                     boxShadow: '0 20px 60px rgba(31, 110, 235, 0.2)'
                  }}>
                     <div className="card-header" style={{
                        background: 'linear-gradient(135deg, rgba(31, 110, 235, 0.1) 0%, rgba(120, 192, 255, 0.05) 100%)',
                        borderBottom: '2px solid rgba(31, 110, 235, 0.2)',
                        padding: 'var(--spacing-lg)'
                     }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                           <h4 style={{
                              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                              fontWeight: 700,
                              margin: 0,
                              color: '#79c0ff'
                           }}>{quizInfo.title}</h4>
                           <span style={{
                              fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
                              fontWeight: 600,
                              color: '#8b949e',
                              backgroundColor: 'rgba(31, 110, 235, 0.1)',
                              padding: '0.5rem var(--spacing-md)',
                              borderRadius: 'var(--radius-lg)',
                              border: '1px solid rgba(31, 110, 235, 0.3)'
                           }}>
                              Q {currentQuestion + 1}/{questions.length}
                           </span>
                        </div>
                        <div className="progress" style={{
                           height: '8px',
                           borderRadius: 'var(--radius-lg)',
                           backgroundColor: 'rgba(31, 110, 235, 0.1)',
                           border: '1px solid rgba(31, 110, 235, 0.2)',
                           overflow: 'hidden'
                        }}>
                           <div 
                              className="progress-bar" 
                              style={{
                                 width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                                 background: 'linear-gradient(90deg, #1f6feb, #79c0ff)',
                                 borderRadius: 'var(--radius-lg)'
                              }}
                              role="progressbar"
                           ></div>
                        </div>
                     </div>
                     <div className="card-body" style={{ padding: 'var(--spacing-xl)' }}>
                        <h5 style={{
                           fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                           fontWeight: 600,
                           marginBottom: 'var(--spacing-lg)',
                           color: '#f0f6fc',
                           lineHeight: 1.6
                        }}>
                           {currentQ.question}
                        </h5>
                        <div className="d-flex flex-column" style={{ gap: 'var(--spacing-md)' }}>
                           {['A', 'B', 'C', 'D'].map((option) => (
                              <div key={option} className="form-check" style={{
                                 padding: 'var(--spacing-md)',
                                 borderRadius: 'var(--radius-lg)',
                                 border: answers[currentQuestion] === option 
                                    ? '2px solid #1f6feb' 
                                    : '2px solid rgba(31, 110, 235, 0.3)',
                                 backgroundColor: answers[currentQuestion] === option 
                                    ? 'rgba(31, 110, 235, 0.1)' 
                                    : 'transparent',
                                 cursor: 'pointer',
                                 transition: 'all 0.3s ease'
                              }}>
                                 <input
                                    className="form-check-input"
                                    type="radio"
                                    name={`question-${currentQuestion}`}
                                    id={`option-${option}`}
                                    value={option}
                                    checked={answers[currentQuestion] === option}
                                    onChange={() => handleAnswerSelect(currentQuestion, option)}
                                    style={{ cursor: 'pointer' }}
                                 />
                                 <label className="form-check-label" htmlFor={`option-${option}`} style={{
                                    fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                                    cursor: 'pointer',
                                    marginBottom: 0,
                                    marginLeft: '0.5rem'
                                 }}>
                                    <strong>{option})</strong> {currentQ[`option${option === 'A' ? '1' : option === 'B' ? '2' : option === 'C' ? '3' : '4'}`]}
                                 </label>
                              </div>
                           ))}
                        </div>
                        <div className="d-flex justify-content-between" style={{
                           marginTop: 'var(--spacing-xl)',
                           gap: 'var(--spacing-lg)',
                           flexWrap: 'wrap'
                        }}>
                           <button 
                              className="btn btn-secondary" 
                              onClick={handlePrevious}
                              disabled={currentQuestion === 0}
                              style={{
                                 padding: '0.75rem 1.5rem',
                                 fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
                                 fontWeight: 600,
                                 borderRadius: 'var(--radius-lg)'
                              }}
                           >
                              ← Previous
                           </button>
                           {currentQuestion === questions.length - 1 ? (
                              <button 
                                 className="btn btn-success" 
                                 onClick={handleSubmit}
                                 disabled={Object.keys(answers).length < questions.length}
                                 style={{
                                    padding: '0.75rem 1.5rem',
                                    fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
                                    fontWeight: 600,
                                    borderRadius: 'var(--radius-lg)'
                                 }}
                              >
                                 ✓ Submit Quiz
                              </button>
                           ) : (
                              <button 
                                 className="btn btn-primary" 
                                 onClick={handleNext}
                                 disabled={!answers[currentQuestion]}
                                 style={{
                                    padding: '0.75rem 1.5rem',
                                    fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
                                    fontWeight: 600,
                                    borderRadius: 'var(--radius-lg)'
                                 }}
                              >
                                 Next →
                              </button>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AiQuizDisplay;
