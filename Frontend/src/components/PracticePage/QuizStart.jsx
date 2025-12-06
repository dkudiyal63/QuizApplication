import { useEffect, useState, useCallback } from "react";
import Spinner from "../HomePage/Spinner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../utils/api";
const QuizStart = (props) => {
   const location = useLocation();
   const duration = location.state ?? Number(sessionStorage.getItem("quizDuration")) ?? 0;
   const params = useParams();
   const navigate = useNavigate();
   const [timeLeft, setTimeLeft] = useState(duration);
   const [index, setIndex] = useState(0);
   const [questions, setQuestions] = useState(null);
   const [answers, setAnswers] = useState(null);
   const [showSpinner, setShowSpinner] = useState(true);
   const [loadingText, setLoadingText] = useState("Loading Quiz...");
   const [responseData, setResponseData] = useState();
   const handleChange = (index, option) => {
      setAnswers((prev) => ({
         ...prev,
         [index + 1]: option,
      }));
   };

   const fetchQuestions = useCallback(async (quizId) => {
      setShowSpinner(true);
      try {
         const url = API_ENDPOINTS.QUIZ_START;
         if (localStorage.getItem("pid") === null) {
            toast.error("Kindly login or register");
            navigate("/Practice");
         }
         let p = localStorage.getItem("pid");
         const temp = { quizId: quizId };
         const req = JSON.stringify(temp);
         const res = await fetch(url, {
            headers: {
               "Authorization": `Bearer ${p}`,
               "Content-Type": "application/json",
            },
            body: req,
            method: "POST",
         });
         if (res.status === 404) {
            toast.error("Nothing Found");
            navigate("/Practice");
         } else if (res.ok) {
            const data = await res.json();
            setQuestions(data);
            setAnswers(Array(data.length).fill(null));
            toast.success("Quiz loaded");
         }
         setShowSpinner(false);
      } catch (error) {
         navigate("/Practice");
         toast.error("Unable to load Quiz! Try Again");
      }
      setShowSpinner(false);
   }, [navigate]);

   const submitQuiz = useCallback(async () => {
      setShowSpinner(true);
      setLoadingText("Submitting Quiz...");
      const req = {
         quizId: params.quizId,
         date: new Date().toLocaleDateString(),
         answers: answers,
      };
      if (localStorage.getItem("pid") === null) {
         toast.error("Kindly login or register");
         navigate("/Practice");
      }
      let p = localStorage.getItem("pid");
      try {
         const url = API_ENDPOINTS.QUIZ_SUBMIT;
         const res = await fetch(url, {
            headers: {
               "Authorization": `Bearer ${p}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
            method: "POST",
         });
         if (res.ok) {
            const data = await res.json();
            setResponseData(data);
            toast.success("Quiz submitted");
         } else if (res.status === 401) {
            toast.error("Session expired. Please login again.");
            navigate("/");
         } else {
            toast.error("Submission failed. Try again.");
         }
      } catch (error) {
         toast.error("Network error during submission.");
       }
      setShowSpinner(false);
   }, [navigate, params.quizId, answers]);

   const proceedQuiz = () => {
      navigate("/");
   };

   useEffect(() => {
      fetchQuestions(params.quizId);
   }, [fetchQuestions, params.quizId]);

   useEffect(() => {
      if (timeLeft <= 0) {
         if (timeLeft !== 0) setTimeLeft(0);
         submitQuiz();
         return;
      }
      const timer = setInterval(() => {
         setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
   }, [timeLeft, submitQuiz]);

   useEffect(() => {
      if (props.changeCount === 3) {
         submitQuiz();
      }
   }, [props.changeCount, submitQuiz]);

   return (
      <>
         {showSpinner && (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
               <>
                  <div>
                     <Spinner />
                  </div>
                  <div>
                     <p style={{
                        marginTop: 'var(--spacing-md)',
                        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                        fontStyle: 'italic',
                        color: '#79c0ff'
                     }}>
                        {loadingText}
                     </p>
                  </div>
               </>
            </div>
         )}
         {!showSpinner && questions !== null && (
            <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)' }}>
               <div style={{
                  padding: 'var(--spacing-lg)',
                  minHeight: '75vh',
                  display: 'flex',
                  flexDirection: 'column'
               }}>
                  <div className="d-flex justify-content-between align-items-start" style={{
                     marginBottom: 'var(--spacing-lg)',
                     gap: 'var(--spacing-lg)',
                     flexWrap: 'wrap'
                  }}>
                     <div style={{
                        padding: 'var(--spacing-md) var(--spacing-lg)',
                        borderRadius: 'var(--radius-lg)',
                        border: '2px solid #79c0ff',
                        backgroundColor: 'rgba(121, 192, 255, 0.05)'
                     }}>
                        <span style={{
                           fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
                           fontWeight: 600,
                           color: '#8b949e',
                           textTransform: 'uppercase'
                        }}>
                           Points:
                        </span>
                        <span style={{
                           fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                           fontWeight: 700,
                           color: '#79c0ff',
                           marginLeft: 'var(--spacing-sm)'
                        }}>
                           {questions[index].points}
                        </span>
                     </div>
                     <div style={{
                        padding: 'var(--spacing-md) var(--spacing-lg)',
                        borderRadius: 'var(--radius-lg)',
                        border: '2px solid #f85149',
                        backgroundColor: 'rgba(248, 81, 73, 0.05)',
                        textAlign: 'right'
                     }}>
                        <p style={{
                           margin: 0,
                           fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
                           fontWeight: 600,
                           color: '#8b949e',
                           textTransform: 'uppercase'
                        }}>
                           Time Left
                        </p>
                        <p style={{
                           fontSize: 'clamp(1.5rem, 3vw, 1.75rem)',
                           fontWeight: 700,
                           color: '#f85149',
                           margin: 0,
                           fontFamily: 'monospace'
                        }}>
                           {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`}
                        </p>
                     </div>
                  </div>

                  <div style={{
                     flex: 1,
                     maxWidth: '800px',
                     margin: '0 auto',
                     width: '100%',
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center'
                  }}>
                     <div style={{
                        padding: 'var(--spacing-lg)',
                        borderRadius: 'var(--radius-lg)',
                        border: '2px solid rgba(31, 110, 235, 0.3)',
                        backgroundColor: 'rgba(31, 110, 235, 0.05)',
                        marginBottom: 'var(--spacing-xl)'
                     }}>
                        <div style={{
                           fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                           fontWeight: 600,
                           color: '#79c0ff',
                           marginBottom: 'var(--spacing-sm)'
                        }}>
                           Q-{index + 1}:
                        </div>
                        <div style={{
                           fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                           fontWeight: 600,
                           color: '#f0f6fc',
                           lineHeight: 1.6
                        }}>
                           {questions[index].question}
                        </div>
                     </div>

                     <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-md)'
                     }}>
                        {[1, 2, 3, 4].map((optionNum) => (
                           <div key={optionNum} style={{
                              padding: 'var(--spacing-md)',
                              borderRadius: 'var(--radius-lg)',
                              border: answers[index + 1] === String(optionNum)
                                 ? '2px solid #1f6feb'
                                 : '2px solid rgba(31, 110, 235, 0.3)',
                              backgroundColor: answers[index + 1] === String(optionNum)
                                 ? 'rgba(31, 110, 235, 0.1)'
                                 : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--spacing-md)',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                           }}>
                              <input
                                 onChange={() => {
                                    handleChange(index, String(optionNum));
                                 }}
                                 id={`option${optionNum}`}
                                 type="radio"
                                 checked={answers[index + 1] === String(optionNum)}
                                 name="answer"
                                 style={{
                                    cursor: 'pointer',
                                    width: '20px',
                                    height: '20px',
                                    accentColor: '#1f6feb'
                                 }}
                              />
                              <label htmlFor={`option${optionNum}`} style={{
                                 fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                                 cursor: 'pointer',
                                 margin: 0,
                                 flex: 1
                              }}>
                                 {questions[index][`option${optionNum}`]}
                              </label>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 'var(--spacing-lg)',
                  padding: 'var(--spacing-xl)',
                  borderTop: '2px solid rgba(31, 110, 235, 0.2)',
                  flexWrap: 'wrap'
               }}>
                  {index > 0 && (
                     <button
                        style={{
                           background: 'none',
                           border: '0',
                           fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                           color: '#79c0ff',
                           cursor: 'pointer',
                           padding: 'var(--spacing-sm)',
                           transition: 'all 0.3s ease'
                        }}
                        onClick={(e) => {
                           e.preventDefault();
                           setIndex(index - 1);
                        }}
                     >
                        ← Previous
                     </button>
                  )}
                  <button className="btn btn-success" onClick={submitQuiz} style={{
                     padding: '0.75rem 1.5rem',
                     fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
                     fontWeight: 600,
                     borderRadius: 'var(--radius-lg)'
                  }}>
                     ✓ Submit
                  </button>
                  <button className="btn btn-warning" onClick={(e) => {
                     e.preventDefault();
                     handleChange(index, null);
                  }} style={{
                     padding: '0.75rem 1.5rem',
                     fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
                     fontWeight: 600,
                     borderRadius: 'var(--radius-lg)',
                     color: '#000'
                  }}>
                     ↻ Reset
                  </button>
                  {index < questions.length - 1 && (
                     <button
                        style={{
                           background: 'none',
                           border: '0',
                           fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                           color: '#79c0ff',
                           cursor: 'pointer',
                           padding: 'var(--spacing-sm)',
                           transition: 'all 0.3s ease'
                        }}
                        onClick={(e) => {
                           e.preventDefault();
                           setIndex(index + 1);
                        }}
                     >
                        Next →
                     </button>
                  )}
               </div>
            </div>
         )}
         {responseData !== undefined && (
            <div style={{
               position: 'fixed',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               backgroundColor: 'rgba(0, 0, 0, 0.8)',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               zIndex: 1000
            }}>
               <div style={{
                  maxWidth: '420px',
                  width: '90%',
                  padding: 'var(--spacing-xl)',
                  backgroundColor: '#0d1117',
                  borderRadius: 'var(--radius-2xl)',
                  border: '2px solid #3fb950',
                  boxShadow: '0 20px 60px rgba(63, 185, 80, 0.3)',
                  textAlign: 'center'
               }}>
                  <h2 style={{
                     fontSize: 'clamp(1.5rem, 3vw, 1.75rem)',
                     fontWeight: 700,
                     marginBottom: 'var(--spacing-md)',
                     color: '#3fb950'
                  }}>
                     ✓ Quiz Submitted!
                  </h2>
                  <div style={{
                     backgroundColor: 'rgba(63, 185, 80, 0.1)',
                     border: '2px solid #3fb950',
                     borderRadius: 'var(--radius-lg)',
                     padding: 'var(--spacing-lg)',
                     marginBottom: 'var(--spacing-lg)'
                  }}>
                     <p style={{
                        fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                        color: '#8b949e',
                        margin: '0 0 var(--spacing-sm) 0',
                        textTransform: 'uppercase'
                     }}>
                        Total Score
                     </p>
                     <h3 style={{
                        fontSize: 'clamp(2rem, 4vw, 2.25rem)',
                        fontWeight: 800,
                        color: '#3fb950',
                        margin: 0
                     }}>
                        {responseData.points}/{responseData.totalPoints}
                     </h3>
                  </div>
                  <button className="btn btn-success" onClick={proceedQuiz} style={{
                     width: '100%',
                     padding: '0.75rem',
                     fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
                     fontWeight: 600,
                     borderRadius: 'var(--radius-lg)'
                  }}>
                     → Continue
                  </button>
               </div>
            </div>
         )}
      </>
   );
};

export default QuizStart;
