import { useEffect, useState } from "react";
import QuestionsPage from "./QuestionsPage";

const QuizDetails = (props) => {
   const [quiz, setQuiz] = useState();

   useEffect(() => {
      setQuiz(props.data);
   }, [props.data]);

   return (
      <>
         {quiz === undefined && (
            <div style={{
               border: '2px solid rgba(31, 110, 235, 0.3)',
               borderRadius: 'var(--radius-2xl)',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               height: '300px',
               backgroundColor: 'rgba(31, 110, 235, 0.05)'
            }}>
               <p style={{
                  fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                  fontWeight: 600,
                  color: '#79c0ff',
                  margin: 0,
                  textAlign: 'center',
                  padding: 'var(--spacing-lg)'
               }}>
                  📋 Click on a quiz to view Complete Info
               </p>
            </div>
         )}

         {quiz !== undefined && (
            <div style={{
               border: '2px solid rgba(31, 110, 235, 0.3)',
               borderTop: '3px solid #1f6feb',
               borderRadius: 'var(--radius-lg)',
               padding: 'var(--spacing-lg)',
               backgroundColor: 'rgba(31, 110, 235, 0.05)'
            }}>
               <div className="d-flex justify-content-center mb-4">
                  <h3 style={{
                     borderBottom: '3px solid #79c0ff',
                     paddingBottom: 'var(--spacing-sm)',
                     fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                     fontWeight: 700,
                     color: '#79c0ff',
                     margin: 0,
                     textAlign: 'center'
                  }}>
                     {quiz.title}
                  </h3>
               </div>

               <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'var(--spacing-lg)',
                  marginBottom: 'var(--spacing-lg)'
               }}>
                  <div>
                     <p style={{
                        fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                        fontWeight: 600,
                        color: '#8b949e',
                        margin: '0 0 var(--spacing-sm) 0',
                        textTransform: 'uppercase'
                     }}>
                        Subject
                     </p>
                     <p style={{
                        fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                        color: '#f0f6fc',
                        margin: 0
                     }}>
                        {quiz.subject}
                     </p>
                  </div>
                  <div>
                     <p style={{
                        fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                        fontWeight: 600,
                        color: '#8b949e',
                        margin: '0 0 var(--spacing-sm) 0',
                        textTransform: 'uppercase'
                     }}>
                        Date Created
                     </p>
                     <p style={{
                        fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                        color: '#f0f6fc',
                        margin: 0
                     }}>
                        {quiz.date}
                     </p>
                  </div>
               </div>

               <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'var(--spacing-lg)',
                  marginBottom: 'var(--spacing-lg)'
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
                     <p style={{
                        fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                        color: '#f0f6fc',
                        margin: 0
                     }}>
                        {quiz.totalQuestions}
                     </p>
                  </div>
                  <div>
                     <p style={{
                        fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                        fontWeight: 600,
                        color: '#8b949e',
                        margin: '0 0 var(--spacing-sm) 0',
                        textTransform: 'uppercase'
                     }}>
                        Total Points
                     </p>
                     <p style={{
                        fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                        color: '#f0f6fc',
                        margin: 0
                     }}>
                        {quiz.totalPoints}
                     </p>
                  </div>
               </div>

               <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'var(--spacing-lg)'
               }}>
                  <div>
                     <p style={{
                        fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                        fontWeight: 600,
                        color: '#8b949e',
                        margin: '0 0 var(--spacing-sm) 0',
                        textTransform: 'uppercase'
                     }}>
                        Difficulty Level
                     </p>
                     <p style={{
                        fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                        color: '#f0f6fc',
                        margin: 0
                     }}>
                        {quiz.difficulty}
                     </p>
                  </div>
                  <div>
                     <p style={{
                        fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                        fontWeight: 600,
                        color: '#8b949e',
                        margin: '0 0 var(--spacing-sm) 0',
                        textTransform: 'uppercase'
                     }}>
                        Duration
                     </p>
                     <p style={{
                        fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                        color: '#f0f6fc',
                        margin: 0
                     }}>
                        {quiz.duration / 60} min
                     </p>
                  </div>
               </div>
            </div>
         )}

         {quiz !== undefined && <QuestionsPage quizId={quiz.quizId} />}
      </>
   );
};

export default QuizDetails;
