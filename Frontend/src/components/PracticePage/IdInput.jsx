import { useState } from "react";
import { Link } from "react-router-dom";

const IdInput = () => {
   const regex = /^\d{6}$/;
   const [quizId, setQuizId] = useState("");
   const [invalid, setInvalid] = useState(false);
   
   return (
      <div className="d-flex flex-column align-items-center">
         <div className="mb-4" style={{ width: '100%', maxWidth: '400px' }}>
            <label style={{
               color: '#f0f6fc',
               fontWeight: '600',
               marginBottom: 'var(--spacing-md)',
               display: 'block',
               fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)'
            }}>
               📝 Enter Quiz ID
            </label>
            <input
               type="tel"
               placeholder="Enter 6-digit ID"
               className="form-control text-center"
               style={{
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                  padding: 'var(--spacing-md) var(--spacing-lg)',
                  backgroundColor: '#1a1f2e',
                  borderColor: quizId.length > 0 && !regex.test(quizId) ? '#f85149' : '#3a4660',
                  color: '#f0f6fc',
                  borderWidth: '2px',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease'
               }}
               value={quizId}
               onChange={(e) => {
                  setQuizId(e.target.value);
                  if (e.target.value.length > 6) {
                     setInvalid("⚠️ Length Exceeded!");
                  } else if (e.target.value.length === 6) {
                     regex.test(e.target.value) ? setInvalid("") : setInvalid("❌ Invalid Input");
                  } else if (e.target.value.length < 6) {
                     setInvalid("");
                  }
               }}
               maxLength={6}
            />
            {invalid && (
               <p style={{
                  color: '#f85149',
                  marginTop: 'var(--spacing-sm)',
                  marginBottom: 0,
                  fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                  fontWeight: 500
               }}>
                  {invalid}
               </p>
            )}
         </div>

         <Link
            className={`btn ${regex.test(quizId) ? 'btn-primary' : 'btn-secondary'}`}
            to={`/Practice/${quizId}`}
            style={{
               pointerEvents: regex.test(quizId) ? 'auto' : 'none',
               opacity: regex.test(quizId) ? 1 : 0.6,
               padding: '0.75rem 1.5rem',
               fontSize: 'clamp(0.95rem, 1.3vw, 1rem)',
               fontWeight: 600,
               borderRadius: 'var(--radius-lg)',
               transition: 'all 0.3s ease'
            }}
         >
            ▶️ Start Quiz
         </Link>
      </div>
   );
};

export default IdInput;
