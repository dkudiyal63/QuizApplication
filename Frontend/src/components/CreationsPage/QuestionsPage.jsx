import { useEffect, useState, useCallback } from "react";
import Spinner from "../HomePage/Spinner";
import { useLocation } from "react-router-dom";

const QuestionsPage = (props) => {
   const [questions, setQuestions] = useState([]);
   const [showSpinner, setShowSpinner] = useState(false);
   const location = useLocation();
   const getQuestions = useCallback(async () => {
      // const quizId = "272021";
      setShowSpinner(true);
      try {
         const url = "http://localhost:8080/user/creations/" + props.quizId + "/questions";

         const res = await fetch(url, {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("pid")}`,
               "Content-type": "application/json",
            },
         });
                   if (res.status === 401) {
             // Unauthorized
          } else if (res.status === 404) {
             // Quiz Not found
          } else if (res.status === 302) {
             const data = await res.json();
             setQuestions(data);
             setShowSpinner(false);
          }
       } catch (error) {
          setShowSpinner(false);
       }
   }, [props.quizId]);

   useEffect(() => {
      setQuestions([]);
   }, [location]);
   useEffect(() => {
      setQuestions([]);
      getQuestions();
   }, [getQuestions]);
   return (
      <>
         {showSpinner && (
            <div style={{
               border: '2px solid rgba(31, 110, 235, 0.3)',
               borderRadius: 'var(--radius-lg)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               height: '300px',
               backgroundColor: 'rgba(31, 110, 235, 0.05)',
               marginTop: 'var(--spacing-lg)'
            }}>
               <Spinner />
            </div>
         )}
         {!showSpinner && questions !== undefined && (
            <div style={{
               marginTop: 'var(--spacing-lg)',
               borderRadius: 'var(--radius-lg)',
               border: '2px solid rgba(31, 110, 235, 0.3)',
               overflow: 'hidden'
            }}>
               <ul className="list-group" style={{
                  overflow: 'auto',
                  maxHeight: '500px',
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
               }}>
                  {questions.map((item, idx) => (
                     <li key={idx} style={{
                        borderBottom: '1px solid rgba(31, 110, 235, 0.2)',
                        padding: 'var(--spacing-lg)',
                        backgroundColor: idx % 2 === 0 ? 'rgba(31, 110, 235, 0.02)' : 'transparent'
                     }}>
                        <div style={{
                           display: 'flex',
                           flexDirection: 'column',
                           gap: 'var(--spacing-md)'
                        }}>
                           <div>
                              <span style={{
                                 fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                                 fontWeight: 700,
                                 color: '#79c0ff'
                              }}>
                                 Q-{item.questionNo}.
                              </span>
                              <span style={{
                                 fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                                 color: '#f0f6fc',
                                 marginLeft: 'var(--spacing-sm)'
                              }}>
                                 {item.question}
                              </span>
                           </div>
                           <div>
                              <p style={{
                                 fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                                 fontWeight: 600,
                                 color: '#8b949e',
                                 margin: '0 0 var(--spacing-sm) 0',
                                 textTransform: 'uppercase'
                              }}>
                                 Options:
                              </p>
                              <ul style={{
                                 paddingLeft: 'var(--spacing-lg)',
                                 margin: 0,
                                 listStyle: 'disc'
                              }}>
                                 {[1, 2, 3, 4].map((optNum) => (
                                    <li key={optNum} style={{
                                       fontSize: 'clamp(0.9rem, 1.3vw, 0.95rem)',
                                       color: '#8b949e',
                                       marginBottom: 'var(--spacing-xs)',
                                       paddingLeft: 'var(--spacing-sm)'
                                    }}>
                                       {item[`option${optNum}`]}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           <div style={{
                              padding: 'var(--spacing-md)',
                              borderRadius: 'var(--radius-lg)',
                              backgroundColor: 'rgba(63, 185, 80, 0.1)',
                              border: '1px solid rgba(63, 185, 80, 0.3)'
                           }}>
                              <p style={{
                                 fontSize: 'clamp(0.8rem, 1.2vw, 0.85rem)',
                                 fontWeight: 600,
                                 color: '#8b949e',
                                 margin: '0 0 var(--spacing-xs) 0',
                                 textTransform: 'uppercase'
                              }}>
                                 ✓ Correct Answer:
                              </p>
                              <span style={{
                                 fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
                                 fontWeight: 600,
                                 color: '#3fb950'
                              }}>
                                 Option {item.correct}
                              </span>
                           </div>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </>
   );
};
export default QuestionsPage;
