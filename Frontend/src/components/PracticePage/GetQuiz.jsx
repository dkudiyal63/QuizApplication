import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../HomePage/Spinner";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../utils/api";

const GetQuiz = () => {
   const { quizId } = useParams();
   const [subject, setSubject] = useState("");
   const [duration, setDuration] = useState();
   const [questions, setQuestions] = useState("");
   const [difficulty, setDifficulty] = useState("");
   const [title, setTitle] = useState("");
   const [showSpinner, setShowSpinner] = useState(true);
   const [noError, setNoError] = useState(true);
   const [unauthorized, setUnauthorized] = useState(false);
   const [attempted, setAttempted] = useState(false);
   const [notFound, setNotFound] = useState(false);
   const loadInstructions = useCallback(async () => {
      const url = API_ENDPOINTS.QUIZ_ATTEMPT + "/" + quizId;
      try {
         const res = await fetch(url, {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("pid")}`,
               "Content-Type": "application/json",
            },
         });
         if (res.status === 401) {
            setUnauthorized(true);
            toast.error("Please login to continue");
         } else if (res.status === 409) {
            setAttempted(true);
            toast.info("You already attempted this quiz");
         } else if (res.status === 404) {
            setNotFound(true);
            toast.error("Quiz not found");
         } else if (res.status === 200) {
            const data = await res.json();
            setTitle(data["title"]);
            let t = parseInt(data["duration"], 10);
            t = t / 60;
            setDuration(t);
            setDifficulty(data["difficulty"]);
            setQuestions(data["totalQuestions"]);
            // persist duration for refresh fallback in QuizStart
            sessionStorage.setItem("quizDuration", String(t * 60));
            setSubject(data["subject"]);
         }
         setShowSpinner(false);
      } catch (error) {
         setNoError(false);
         setShowSpinner(false);
         toast.error("Network error. Please try again.");
      }
   }, [quizId]);

   useEffect(() => {
      loadInstructions();
   }, [loadInstructions]);

   return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)' }}>
         <div style={{ width: 'fit-content', margin: 'auto', paddingTop: 'var(--spacing-xl)' }}>
            <h1 style={{
               padding: 'var(--spacing-lg)',
               paddingBottom: 'var(--spacing-md)',
               fontSize: 'clamp(2rem, 5vw, 2.5rem)',
               fontWeight: 800,
               borderBottom: '3px solid #f85149',
               color: '#f85149',
               margin: 0
            }}>
               📋 Quiz Instructions
            </h1>
         </div>

         {showSpinner && (
            <div style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               width: '100%',
               height: '80vh'
            }}>
               <Spinner />
            </div>
         )}

         {unauthorized && (
            <div style={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               width: '100%',
               height: '80vh',
               gap: 'var(--spacing-lg)'
            }}>
               <h2 style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 700,
                  color: '#f85149',
                  textAlign: 'center'
               }}>
                  🔐 You are Not Logged In!
               </h2>
               <p style={{
                  fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                  color: '#8b949e',
                  textAlign: 'center'
               }}>
                  Kindly Login To attempt the Quiz
               </p>
               <Link to="/">
                  <button className="btn btn-primary" style={{
                     padding: '0.75rem 1.5rem',
                     fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
                     fontWeight: 600,
                     borderRadius: 'var(--radius-lg)'
                  }}>
                     → Go To Login Page
                  </button>
               </Link>
            </div>
         )}

         {!noError && (
            <div style={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               width: '100%',
               height: '80vh',
               gap: 'var(--spacing-lg)'
            }}>
               <h2 style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#f85149',
                  textAlign: 'center'
               }}>
                  ⚠️ Something Went Wrong!
               </h2>
               <p style={{
                  fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                  color: '#8b949e',
                  textAlign: 'center'
               }}>
                  Please Refresh The Page
               </p>
            </div>
         )}

         {attempted && (
            <div style={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               width: '100%',
               height: '80vh',
               gap: 'var(--spacing-lg)'
            }}>
               <h2 style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#f85149',
                  textAlign: 'center'
               }}>
                  ✓ Quiz Already Attempted!
               </h2>
               <p style={{
                  fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                  color: '#8b949e',
                  textAlign: 'center'
               }}>
                  Try with another quiz
               </p>
            </div>
         )}

         {notFound && (
            <div style={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               width: '100%',
               height: '80vh',
               gap: 'var(--spacing-lg)'
            }}>
               <h2 style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#3fb950',
                  textAlign: 'center'
               }}>
                  🔍 Quiz Not Found
               </h2>
               <p style={{
                  fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                  color: '#8b949e',
                  textAlign: 'center'
               }}>
                  Re-Enter Quiz ID
               </p>
               <Link to="/Practice">
                  <button className="btn btn-primary" style={{
                     padding: '0.75rem 1.5rem',
                     fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
                     fontWeight: 600,
                     borderRadius: 'var(--radius-lg)'
                  }}>
                     ← Re-Enter ID
                  </button>
               </Link>
            </div>
         )}

         {!showSpinner && noError && !unauthorized && !attempted && !notFound && (
            <div style={{ paddingBottom: 'var(--spacing-2xl)' }}>
               <div className="d-flex justify-content-between" style={{
                  margin: 'var(--spacing-lg) var(--spacing-xl)',
                  gap: 'var(--spacing-lg)',
                  flexWrap: 'wrap'
               }}>
                  <div style={{
                     padding: 'var(--spacing-md) var(--spacing-lg)',
                     borderRadius: 'var(--radius-lg)',
                     border: '2px solid #79c0ff',
                     backgroundColor: 'rgba(121, 192, 255, 0.05)'
                  }}>
                     <h3 style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        fontWeight: 600,
                        color: '#79c0ff',
                        margin: 0
                     }}>
                        📚 Subject: <span style={{ color: '#f0f6fc' }}>{subject}</span>
                     </h3>
                  </div>

                  <div style={{
                     padding: 'var(--spacing-md) var(--spacing-lg)',
                     borderRadius: 'var(--radius-lg)',
                     border: '2px solid #79c0ff',
                     backgroundColor: 'rgba(121, 192, 255, 0.05)'
                  }}>
                     <h3 style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        fontWeight: 600,
                        color: '#79c0ff',
                        margin: 0
                     }}>
                        ⏱️ Duration: <span style={{ color: '#f0f6fc' }}>{duration} min</span>
                     </h3>
                  </div>
               </div>

               <div style={{ width: 'fit-content', margin: 'var(--spacing-lg) auto' }}>
                  <h2 style={{
                     fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                     fontWeight: 800,
                     color: '#3fb950',
                     borderBottom: '3px solid #3fb950',
                     padding: 'var(--spacing-md)',
                     margin: 0,
                     textAlign: 'center'
                  }}>
                     {title}
                  </h2>
               </div>

               <div className="d-flex justify-content-between" style={{
                  margin: 'var(--spacing-xl) auto',
                  gap: 'var(--spacing-xl)',
                  paddingLeft: 'var(--spacing-lg)',
                  paddingRight: 'var(--spacing-lg)',
                  flexWrap: 'wrap-reverse'
               }}>
                  <div style={{ flex: '1', minWidth: '250px', maxWidth: '600px' }}>
                     <ol className="list-group list-group-flush list-group-numbered" style={{
                        backgroundColor: 'transparent',
                        gap: 'var(--spacing-sm)'
                     }}>
                        {[
                           {
                              title: 'Quiz Format',
                              points: [
                                 'This quiz consists of multiple-choice questions.',
                                 'Each question has a single correct answer.'
                              ]
                           },
                           {
                              title: 'Time Limit',
                              points: [
                                 `Time Limit for the quiz: ${duration} minutes`,
                                 'Make sure to answer all questions within allocated time.'
                              ]
                           },
                           {
                              title: 'Answer Submission',
                              points: [
                                 'Click the "Submit" button to finalize your answers.',
                                 'Once submitted, you cannot change your answers.'
                              ]
                           },
                           {
                              title: 'Scoring',
                              points: [
                                 'Your score will be calculated based on correct answers.',
                                 'Incorrect answers will not be penalized.'
                              ]
                           }
                        ].map((item, idx) => (
                           <li
                              key={idx}
                              className="list-group-item"
                              style={{
                                 backgroundColor: 'rgba(31, 110, 235, 0.08)',
                                 border: '1px solid rgba(31, 110, 235, 0.3)',
                                 borderRadius: 'var(--radius-lg)',
                                 padding: 'var(--spacing-lg)',
                                 fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                                 fontWeight: 600,
                                 color: '#79c0ff'
                              }}
                           >
                              {item.title}
                              <ul style={{
                                 marginTop: 'var(--spacing-md)',
                                 marginBottom: 0,
                                 paddingLeft: 'var(--spacing-lg)',
                                 fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                                 fontWeight: 400,
                                 color: '#8b949e',
                                 listStyle: 'disc'
                              }}>
                                 {item.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                 ))}
                              </ul>
                           </li>
                        ))}
                     </ol>
                  </div>

                  <div style={{
                     flex: '0 1 250px',
                     display: 'flex',
                     flexDirection: 'column',
                     gap: 'var(--spacing-lg)',
                     padding: 'var(--spacing-lg)',
                     borderRadius: 'var(--radius-lg)',
                     border: '2px solid rgba(31, 110, 235, 0.3)',
                     backgroundColor: 'rgba(31, 110, 235, 0.05)',
                     height: 'fit-content'
                  }}>
                     <div>
                        <p style={{
                           fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                           fontWeight: 600,
                           color: '#8b949e',
                           margin: '0 0 var(--spacing-sm) 0',
                           textTransform: 'uppercase'
                        }}>
                           Total Questions
                        </p>
                        <h3 style={{
                           fontSize: 'clamp(1.5rem, 3vw, 1.75rem)',
                           fontWeight: 700,
                           color: '#79c0ff',
                           margin: 0
                        }}>
                           {questions}
                        </h3>
                     </div>
                     <div style={{
                        borderTop: '1px solid rgba(31, 110, 235, 0.2)',
                        paddingTop: 'var(--spacing-lg)'
                     }}>
                        <p style={{
                           fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                           fontWeight: 600,
                           color: '#8b949e',
                           margin: '0 0 var(--spacing-sm) 0',
                           textTransform: 'uppercase'
                        }}>
                           Difficulty Level
                        </p>
                        <h3 style={{
                           fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                           fontWeight: 700,
                           color: '#79c0ff',
                           margin: 0
                        }}>
                           {difficulty}
                        </h3>
                     </div>
                  </div>
               </div>

               <div className="d-flex justify-content-center" style={{
                  gap: 'var(--spacing-lg)',
                  marginTop: 'var(--spacing-xl)',
                  flexWrap: 'wrap'
               }}>
                  <Link to={`/Practice/${quizId}/start`} state={duration * 60}>
                     <button type="button" className="btn btn-success" style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-lg)'
                     }}>
                        ▶️ Start Quiz
                     </button>
                  </Link>
                  <Link to="/">
                     <button type="button" className="btn btn-secondary" style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-lg)'
                     }}>
                        ← Exit
                     </button>
                  </Link>
               </div>
            </div>
         )}
      </div>
   );
};
export default GetQuiz;
