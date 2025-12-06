import { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import "./QuizCreate.css";
import Spinner from "../HomePage/Spinner";
import "react-toastify/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const QuizCreate = () => {
   const h = useNavigate();
   const initialData = {
      title: "",
      subject: "",
      duration: "",
      difficulty: "",
      date: "",
   };

   const initialQuestion = Array(5).fill({
      questionNo: "",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correct: "",
      points: "",
   });

   const [data, setData] = useState(initialData);

   const [question, setQuestion] = useState(initialQuestion);
   const [showSpinner, setShowSpinner] = useState(false);
       // Note: These state variables are defined but not currently used
    // const [ignore, setIgnore] = useState(true);
    // const [respose, setResponse] = useState(false);
   const [quizId, setQuizId] = useState();
   const dataChange = (event) => {
      const { name, value } = event.target;
      setData((prevData) => ({
         ...prevData,
         [name]: name === "duration" ? (value * 60).toString() : value,
      }));
   };

   const handleChange = (index, event) => {
      const { name, value } = event.target;
      setQuestion((prevQuestions) => {
         const updatedQuestions = [...prevQuestions];
         updatedQuestions[index] = {
            ...updatedQuestions[index],
            [name]: name === "correct" || name === "points" ? value.toString() : value,
         };
         return updatedQuestions;
      });
   };
   const addMore = (event) => {
      event.preventDefault();
      setQuestion((prev) => [
         ...prev,
         {
            questionNo: "",
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correct: "",
            points: "",
         },
      ]);
   };

   const removeQuestion = (event, index) => {
      event.preventDefault();
      setQuestion((prevQuestion) => {
         const updatedQuestion = prevQuestion.filter((_, i) => i !== index);
         return updatedQuestion;
      });
   };

   const formSubmit = async (event) => {
      event.preventDefault();
      setShowSpinner(true);
      try {
         if (
            data.title.length === 0 ||
            data.subject.length === 0 ||
            data.difficulty.length === 0 ||
            data.duration === 0
         ) {
            setShowSpinner(false);
            notifyError("Some Quiz information fields are missing!");
            return;
         }
         for (let i = 0; i < question.length; i++) {
            if (isEmpty(question[i])) {
               setShowSpinner(false);
               notifyError("Some Q-" + (i + 1) + " fields are missing!");
               return;
            }
            question[i].questionNo = "" + (i + 1);
         }
                   data.date = new Date().toLocaleDateString();
         const completeQuiz = {
            quiz: { ...data },
            questions: question,
         };
         const jsonData = JSON.stringify(completeQuiz);
         const url = "http://localhost:8080/quiz/create";
         const res = await fetch(url, {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("pid")}`,
               "Content-Type": "application/json",
            },
            method: "POST",
            body: jsonData,
         });
         const resData = await res.text();
         setShowSpinner(false);
         if (res.status === 401) {
            notifyError("Login to create Quiz");
         } else if (res.status === 500) {
            notifyError("Unable to create quiz at the moment!");
         } else if (res.status === 404) {
            notifyError("Something went wrong!");
         } else if (res.status === 201) {
            setData(initialData);
            setQuestion(initialQuestion);
            setQuizId(resData);
            toast.success("Quiz created", {
               autoClose: 2000,
            });
         }
             } catch (error) {
          toast.error("Something went wrong! Try Again");
          setShowSpinner(false);
       }
      setShowSpinner(false);
   };

   const isEmpty = (item) => {
      for (let key in item) {
         if (item[key] === "" && key !== "questionNo") {
            return true;
         }
      }
      return false;
   };

   const notifyError = (msg) => toast.error(msg);

   useEffect(() => {
      if (showSpinner) {
         document.body.classList.add("no-scroll");
      } else {
         document.body.classList.remove("no-scroll");
      }
   });

   return (
      <>
         <Header />
         {showSpinner && (
            <div className="quiz-creation">
               <Spinner />
            </div>
         )}
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
         <div>
            <section className="container" style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-lg)' }}>
               <div className="card">
                  <h2 className="card-title" style={{
                     fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
                     fontWeight: 800,
                     marginBottom: 'var(--spacing-lg)'
                  }}>✏️ Create Your Quiz</h2>
                  <form className="w-100">
                     <div className="row">
                        <div className="col-md-6">
                           <div className="quiz">
                              <label htmlFor="title" style={{
                                 fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                                 fontWeight: 600
                              }}>Quiz Title</label>
                              <input type="text" name="title" onChange={dataChange} required={true} />
                           </div>
                        </div>
                        <div className="col-md-6">
                           <div className="quiz">
                              <label style={{
                                 fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                                 fontWeight: 600
                              }}>Subject</label>
                              <input type="text" name="subject" onChange={dataChange} required={true} />
                           </div>
                        </div>
                     </div>
                     <div className="row" style={{ marginTop: 'var(--spacing-lg)' }}>
                        <div className="col-md-6">
                           <div className="quiz">
                              <label htmlFor="duration" style={{
                                 fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                                 fontWeight: 600
                              }}>Duration (minutes)</label>
                              <input type="number" name="duration" onChange={dataChange} required={true} />
                           </div>
                        </div>
                        <div className="col-md-6">
                           <div className="quiz">
                              <label htmlFor="difficulty" style={{
                                 fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                                 fontWeight: 600
                              }}>Difficulty Level</label>
                              <input type="text" name="difficulty" onChange={dataChange} required={true} />
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </section>
            <div style={{
               margin: 'var(--spacing-xl) auto',
               width: '80%',
               borderTop: '2px solid #1f6feb',
               opacity: 0.3
            }} />
            <div className="container" style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-md)' }}>
               <h3 style={{
                  fontSize: 'clamp(1.5rem, 4vw, 1.75rem)',
                  fontWeight: 700,
                  margin: 0
               }}>📝 Questions</h3>
            </div>
            {question !== undefined && (
               <section className="container" style={{ paddingBottom: 'var(--spacing-lg)' }}>
                  <form
                     className="w-100"
                     onSubmit={(event) => {
                        event.preventDefault();
                     }}
                  >
                     <ul className="list-group" style={{ listStyle: 'none', padding: 0, gap: 'var(--spacing-md)' }}>
                        {question.map((item, index) => (
                           <li className="list-group-item" style={{
                              listStyle: 'none',
                              padding: 'var(--spacing-lg)',
                              borderRadius: 'var(--radius-lg)',
                              border: '1px solid rgba(31, 110, 235, 0.3)',
                              backgroundColor: 'rgba(31, 110, 235, 0.05)'
                           }}>
                               <div className="d-flex align-items-center w-100" style={{ gap: 'var(--spacing-md)' }}>
                                  <span className="m-0" style={{
                                     whiteSpace: 'nowrap',
                                     fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                                     fontWeight: 700,
                                     color: '#1f6feb'
                                  }}>Q-{index + 1}</span>
                                  <div className="d-flex align-items-center" style={{ width: '100%', position: 'relative' }}>
                                     <input
                                        type="text"
                                        name="question"
                                        style={{
                                           width: '100%',
                                           paddingRight: '40px',
                                           fontSize: 'clamp(0.95rem, 1.5vw, 1rem)'
                                        }}
                                        placeholder="Enter Question"
                                        required={true}
                                        value={question[index].question}
                                        onChange={(event) => {
                                           handleChange(index, event);
                                        }}
                                     />
                                     <button
                                        aria-label="Remove question"
                                        className="btn btn-secondary"
                                        style={{
                                           position: 'absolute',
                                           right: '0.5rem',
                                           top: '50%',
                                           transform: 'translateY(-50%)',
                                           padding: '0.25rem 0.5rem',
                                           fontSize: '1.25rem'
                                        }}
                                        onClick={(event) => {
                                           removeQuestion(event, index);
                                        }}
                                     >
                                        ×
                                     </button>
                                  </div>
                               </div>
                              <div className="ms-5 ps-3" style={{ marginTop: 'var(--spacing-lg)' }}>
                                 <h5 style={{
                                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                                    fontWeight: 600,
                                    marginBottom: 'var(--spacing-md)',
                                    color: '#79c0ff'
                                 }}>Options</h5>
                                 <div>
                                      <ul style={{ paddingLeft: 0, margin: 0 }}>
                                       {[...Array(4)].map((_, innerIndex) => (
                                          <li className="py-2" style={{
                                             listStyle: 'none',
                                             display: 'flex',
                                             alignItems: 'center',
                                             gap: '0.5rem'
                                          }}>
                                             <span style={{
                                                minWidth: '1.75rem',
                                                fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                                                color: '#8b949e'
                                             }}>○ {innerIndex + 1}:</span>
                                             <input
                                                type="text"
                                                name={`option${innerIndex + 1}`}
                                                placeholder={`option ${innerIndex + 1}`}
                                                style={{
                                                   width: '50%',
                                                   fontSize: 'clamp(0.9rem, 1.3vw, 0.95rem)'
                                                }}
                                                required={true}
                                                value={question[index][`option${innerIndex + 1}`]}
                                                onChange={(event) => {
                                                   handleChange(index, event);
                                                }}
                                             />
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                                 <div className="d-flex mt-4" style={{
                                    gap: 'var(--spacing-xl)',
                                    flexWrap: 'wrap'
                                 }}>
                                    <div className="d-flex align-items-center" style={{ gap: 'var(--spacing-sm)' }}>
                                       <label style={{
                                          margin: 0,
                                          fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                                          fontWeight: 600,
                                          whiteSpace: 'nowrap'
                                       }}>✓ Correct:</label>
                                       <input
                                          type="number"
                                          name="correct"
                                          placeholder="1-4"
                                          style={{
                                             width: '80px',
                                             fontSize: 'clamp(0.9rem, 1.3vw, 0.95rem)'
                                          }}
                                          required={true}
                                          value={question[index].correct}
                                          onChange={(event) => {
                                             handleChange(index, event);
                                          }}
                                       />
                                    </div>
                                    <div className="d-flex align-items-center" style={{ gap: 'var(--spacing-sm)' }}>
                                       <label style={{
                                          margin: 0,
                                          fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                                          fontWeight: 600,
                                          whiteSpace: 'nowrap'
                                       }}>⭐ Points:</label>
                                       <input
                                          type="number"
                                          name="points"
                                          placeholder="Enter points"
                                          style={{
                                             width: '100px',
                                             fontSize: 'clamp(0.9rem, 1.3vw, 0.95rem)'
                                          }}
                                          required={true}
                                          value={question[index].points}
                                          onChange={(event) => {
                                             handleChange(index, event);
                                          }}
                                       />
                                    </div>
                                 </div>
                              </div>
                           </li>
                        ))}
                     </ul>
                     <div className="d-flex justify-content-center" style={{
                        padding: 'var(--spacing-xl) 0',
                        gap: 'var(--spacing-lg)',
                        flexWrap: 'wrap'
                     }}>
                        <button className="btn btn-success" type="submit" onClick={formSubmit} style={{
                           padding: '0.75rem 1.5rem',
                           fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                           fontWeight: 600,
                           borderRadius: 'var(--radius-lg)'
                        }}>
                           ✓ Create Quiz
                        </button>
                        <button className="btn btn-primary" onClick={addMore} style={{
                           padding: '0.75rem 1.5rem',
                           fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                           fontWeight: 600,
                           borderRadius: 'var(--radius-lg)'
                        }}>
                           + Add Question
                        </button>
                     </div>
                  </form>
               </section>
            )}
         </div>
         {quizId !== undefined && (
            <div className="login-form">
               <div style={{
                  maxWidth: '420px',
                  width: '90%',
                  backgroundColor: '#0d1117',
                  borderRadius: 'var(--radius-2xl)',
                  border: '2px solid #1f6feb',
                  boxShadow: '0 20px 60px rgba(31, 110, 235, 0.4)',
                  animation: 'slideInDown 0.4s ease-out'
               }}>
                  <div className="d-flex justify-content-end" style={{ padding: 'var(--spacing-lg)' }}>
                     <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={(e) => {
                           e.preventDefault();
                           setQuizId();
                           h("/Creations");
                        }}
                     ></button>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center" style={{
                     paddingBottom: 'var(--spacing-xl)',
                     paddingLeft: 'var(--spacing-lg)',
                     paddingRight: 'var(--spacing-lg)'
                  }}>
                     <h4 style={{
                        fontSize: 'clamp(1.5rem, 4vw, 1.75rem)',
                        fontWeight: 700,
                        marginBottom: 'var(--spacing-md)',
                        color: '#3fb950',
                        textAlign: 'center'
                     }}>✓ Quiz Created Successfully!</h4>
                     <p style={{
                        fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
                        color: '#8b949e',
                        marginBottom: 'var(--spacing-lg)',
                        textAlign: 'center'
                     }}>Share your quiz ID with others to let them take it</p>
                     <div style={{
                        backgroundColor: 'rgba(63, 185, 80, 0.1)',
                        border: '2px solid #3fb950',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--spacing-lg)',
                        marginBottom: 'var(--spacing-lg)',
                        minWidth: '200px',
                        textAlign: 'center'
                     }}>
                        <p style={{
                           fontSize: 'clamp(0.8rem, 1.2vw, 0.85rem)',
                           color: '#8b949e',
                           margin: '0 0 var(--spacing-sm) 0',
                           textTransform: 'uppercase',
                           fontWeight: 600
                        }}>Quiz ID</p>
                        <p style={{
                           fontSize: 'clamp(1.5rem, 3vw, 1.75rem)',
                           fontWeight: 700,
                           color: '#3fb950',
                           margin: 0,
                           fontFamily: 'monospace'
                        }}>{quizId}</p>
                     </div>
                     <button
                        className="btn btn-info"
                        onClick={(e) => {
                           e.preventDefault();
                           navigator.clipboard.writeText(quizId);
                           toast.info("Copied to clipboard", {
                              autoClose: 2000,
                           });
                        }}
                        style={{
                           padding: '0.75rem 1.5rem',
                           fontSize: 'clamp(0.9rem, 1.3vw, 0.95rem)',
                           fontWeight: 600,
                           borderRadius: 'var(--radius-lg)'
                        }}
                     >
                        📋 Copy ID
                     </button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default QuizCreate;
