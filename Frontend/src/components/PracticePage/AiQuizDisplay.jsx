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
            <div className="container mt-5">
               <div className="row justify-content-center">
                  <div className="col-md-8">
                     <div className="card">
                        <div className="card-header text-center">
                           <h3>Quiz Results</h3>
                           <h5>{quizInfo.title}</h5>
                        </div>
                        <div className="card-body text-center">
                           <h2 className="mb-4">Your Score: {score}/{totalPoints}</h2>
                           <div className="progress mb-4" style={{ height: "30px" }}>
                              <div 
                                 className="progress-bar" 
                                 style={{ width: `${percentage}%` }}
                                 role="progressbar"
                              >
                                 {percentage}%
                              </div>
                           </div>
                           <div className="d-flex justify-content-center gap-3">
                              <button className="btn btn-primary" onClick={handleRetake}>
                                 Retake Quiz
                              </button>
                              <button className="btn btn-secondary" onClick={handleBackToPractice}>
                                 Back to Practice
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
         <div className="container mt-5">
            <div className="row justify-content-center">
               <div className="col-md-8">
                  <div className="card">
                     <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                           <h4>{quizInfo.title}</h4>
                           <span>Question {currentQuestion + 1} of {questions.length}</span>
                        </div>
                        <div className="progress mt-2" style={{ height: "10px" }}>
                           <div 
                              className="progress-bar" 
                              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                              role="progressbar"
                           ></div>
                        </div>
                     </div>
                     <div className="card-body">
                        <h5 className="mb-4">{currentQ.question}</h5>
                        <div className="d-flex flex-column gap-3">
                           {['A', 'B', 'C', 'D'].map((option) => (
                              <div key={option} className="form-check">
                                 <input
                                    className="form-check-input"
                                    type="radio"
                                    name={`question-${currentQuestion}`}
                                    id={`option-${option}`}
                                    value={option}
                                    checked={answers[currentQuestion] === option}
                                    onChange={() => handleAnswerSelect(currentQuestion, option)}
                                 />
                                 <label className="form-check-label" htmlFor={`option-${option}`}>
                                    {option}) {currentQ[`option${option === 'A' ? '1' : option === 'B' ? '2' : option === 'C' ? '3' : '4'}`]}
                                 </label>
                              </div>
                           ))}
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                           <button 
                              className="btn btn-secondary" 
                              onClick={handlePrevious}
                              disabled={currentQuestion === 0}
                           >
                              Previous
                           </button>
                           {currentQuestion === questions.length - 1 ? (
                              <button 
                                 className="btn btn-success" 
                                 onClick={handleSubmit}
                                 disabled={Object.keys(answers).length < questions.length}
                              >
                                 Submit Quiz
                              </button>
                           ) : (
                              <button 
                                 className="btn btn-primary" 
                                 onClick={handleNext}
                                 disabled={!answers[currentQuestion]}
                              >
                                 Next
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
