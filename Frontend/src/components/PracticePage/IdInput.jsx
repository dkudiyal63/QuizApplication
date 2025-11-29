import { useState } from "react";
import { Link } from "react-router-dom";

const IdInput = () => {
   const regex = /^\d{6}$/;
   const [quizId, setQuizId] = useState("");
   const [invalid, setInvalid] = useState(false);
   
   return (
      <div className="d-flex flex-column align-items-center">
         <div className="mb-4" style={{ width: '100%', maxWidth: '400px' }}>
            <label style={{ color: '#f0f6fc', fontWeight: '600', marginBottom: '0.75rem' }}>
               Enter Quiz ID
            </label>
            <input
               type="tel"
               placeholder="Enter 6-digit Quiz ID"
               className="form-control text-center"
               style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  padding: 'var(--spacing-md)',
                  backgroundColor: '#1a1f2e',
                  borderColor: '#3a4660',
                  color: '#f0f6fc',
                  borderWidth: '2px'
               }}
               value={quizId}
               onChange={(e) => {
                  setQuizId(e.target.value);
                  if (e.target.value.length > 6) {
                     setInvalid("Length Exceeded!");
                  } else if (e.target.value.length === 6) {
                     regex.test(e.target.value) ? setInvalid("") : setInvalid("Invalid Input");
                  } else if (e.target.value.length < 6) {
                     setInvalid("");
                  }
               }}
            />
            {invalid && (
               <p className="text-danger mt-2 mb-0" style={{ fontSize: 'var(--font-size-sm)' }}>
                  {invalid}
               </p>
            )}
         </div>
         
         <Link 
            className={`btn ${regex.test(quizId) ? 'btn-primary' : 'btn-secondary'}`}
            to={`/Practice/${quizId}`}
            style={{ 
               pointerEvents: regex.test(quizId) ? 'auto' : 'none',
               opacity: regex.test(quizId) ? 1 : 0.5
            }}
         >
            Start Quiz →
         </Link>
      </div>
   );
};

export default IdInput;
