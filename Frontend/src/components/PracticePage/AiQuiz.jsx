import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/api";

const AiQuiz = () => {
   const [grade, setGrade] = useState("");
   const [difficulty, setDifficulty] = useState("");
   const [subject, setSubject] = useState("");
   const [numQuestions, setNumQuestions] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleGenerateQuiz = async () => {
      // Validate inputs
      if (!grade || !difficulty || !subject || !numQuestions) {
         setError("Please fill in all fields");
         return;
      }
      const n = parseInt(numQuestions, 10);
      if (isNaN(n) || n < 1 || n > 20) {
         setError("Enter a valid number of questions (1-20)");
         return;
      }

      setLoading(true);
      setError("");

      try {
         const response = await fetch(API_ENDPOINTS.GENERATE_AI_QUIZ, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               grade,
               difficulty,
               subject,
               count: n,
            }),
         });

         if (response.ok) {
            const questions = await response.json();
            // Store questions in localStorage for the quiz component to use
            localStorage.setItem("aiGeneratedQuestions", JSON.stringify(questions));
            localStorage.setItem("aiQuizInfo", JSON.stringify({
               title: `AI Generated Quiz - ${subject} (${n} questions)`,
               grade,
               difficulty,
               subject,
               count: n
            }));
            navigate("/ai-quiz");
         } else {
            const errorText = await response.text();
            setError(`Failed to generate quiz: ${errorText}`);
         }
      } catch (error) {
         setError("Network error. Please check your connection.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="d-flex flex-column align-items-center">
         <div className="mb-4">
            <div className="d-flex gap-2 mb-3">
               <select
                  name="grade-select"
                  id="grade-select"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="form-control"
               >
                  <option value="">Select your grade...</option>
                  <option value="1st grade">1st grade</option>
                  <option value="2nd grade">2nd grade</option>
                  <option value="3rd grade">3rd grade</option>
                  <option value="4th grade">4th grade</option>
                  <option value="5th grade">5th grade</option>
                  <option value="6th grade">6th grade</option>
                  <option value="7th grade">7th grade</option>
                  <option value="8th grade">8th grade</option>
                  <option value="9th grade">9th grade</option>
                  <option value="10th grade">10th grade</option>
                  <option value="11th grade">11th grade</option>
                  <option value="12th grade">12th grade</option>
                  <option value="bachelor's scholar">Bachelor's</option>
                  <option value="master's scholar">Master's</option>
                  <option value="phd scholar">Phd</option>
               </select>
               <select 
                  name="difficulty-select" 
                  id="difficulty-select" 
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="form-control"
               >
                  <option value="">Select difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
               </select>
            </div>
            
            <div className="d-flex gap-2 mb-4">
               <input 
                  type="text" 
                  name="subject" 
                  id="subject" 
                  placeholder="Enter subject name" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="form-control"
               />
               <input 
                  type="number" 
                  min="1"
                  max="20"
                  name="count" 
                  id="count" 
                  placeholder="Number of questions (1-20)" 
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                  className="form-control"
               />
            </div>
         </div>
         
         <button 
            className={`btn ${grade && difficulty && subject && numQuestions ? 'btn-primary' : 'btn-secondary'}`}
            onClick={handleGenerateQuiz}
            disabled={loading || !grade || !difficulty || !subject || !numQuestions}
            style={{ 
               pointerEvents: (grade && difficulty && subject && numQuestions) ? 'auto' : 'none',
               opacity: (grade && difficulty && subject && numQuestions) ? 1 : 0.5
            }}
         >
            {loading ? (
               <>
                  <div className="spinner" style={{ width: '16px', height: '16px', marginRight: '8px' }}></div>
                  Generating...
               </>
            ) : (
               'Generate AI Quiz →'
            )}
         </button>
         
         {error && (
            <div className="mt-3 text-center">
               <span className="text-danger" style={{ fontSize: 'var(--font-size-sm)' }}>
                  {error}
               </span>
            </div>
         )}
      </div>
   );
};

export default AiQuiz;
