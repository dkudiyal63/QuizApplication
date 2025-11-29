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
            <section className="container" style={{ paddingTop: 'var(--spacing-2xl)' }}>
               <div className="card">
                  <h2 className="card-title mb-4">Create Quiz</h2>
                  <form className="w-100">
                     <div className="row">
                        <div className="col-md-6">
                           <div className="quiz">
                              <label htmlFor="title">Title</label>
                              <input type="text" name="title" onChange={dataChange} required={true} />
                           </div>
                        </div>
                        <div className="col-md-6">
                           <div className="quiz">
                              <label>Subject</label>
                              <input type="text" name="subject" onChange={dataChange} required={true} />
                           </div>
                        </div>
                     </div>
                     <div className="row mt-3">
                        <div className="col-md-6">
                           <div className="quiz">
                              <label htmlFor="duration">Duration (minutes)</label>
                              <input type="number" name="duration" onChange={dataChange} required={true} />
                           </div>
                        </div>
                        <div className="col-md-6">
                           <div className="quiz">
                              <label htmlFor="difficulty">Difficulty</label>
                              <input type="text" name="difficulty" onChange={dataChange} required={true} />
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </section>
            <hr className="m-auto w-75 justify-content-center my-5 border border-2 border-dark rounded-5" />
            <div className="container mt-4">
               <h3>Questions</h3>
            </div>
            {question !== undefined && (
               <section className="container mt-3" style={{ height: "30rem" }}>
                  <form
                     className="w-100 pt-3"
                     onSubmit={(event) => {
                        event.preventDefault();
                     }}
                  >
                     <ul className="list-group" style={{ listStyle: 'none' }}>
                        {question.map((item, index) => (
                           <li className="list-group-item" style={{ listStyle: 'none' }}>
                               <div className="d-flex align-items-center w-100" style={{ gap: '12px' }}>
                                  <span className="m-0" style={{ whiteSpace: 'nowrap', fontSize: '1.25rem', fontWeight: 600 }}>Q-{index + 1}</span>
                                  <div className="d-flex align-items-center" style={{ width: '100%', position: 'relative' }}>
                                     <input
                                        type="text"
                                        name="question"
                                        className="ms-2"
                                        style={{ width: '100%', paddingRight: '40px' }}
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
                                        style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                                        onClick={(event) => {
                                           removeQuestion(event, index);
                                        }}
                                     >
                                        ×
                                     </button>
                                  </div>
                               </div>
                              <div className="ms-5 ps-4 mt-3">
                                 <h5>Options</h5>
                                 <div>
                                      <ul style={{ paddingLeft: 0 }}>
                                       {[...Array(4)].map((_, innerIndex) => (
                                          <li className="py-2" style={{ listStyle: 'none' }}>
                                             <input
                                                type="text"
                                                name={`option${innerIndex + 1}`}
                                                placeholder={`option ${innerIndex + 1}`}
                                                 style={{ width: '40%' }}
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
                                 <div className="d-flex mt-3" style={{ gap: '24px' }}>
                                    <div className="d-flex align-items-center" style={{ gap: '8px' }}>
                                       <h5 className="m-0">Correct Option</h5>
                                       <input
                                          type="number"
                                          name="correct"
                                          placeholder="1-4"
                                          className="ms-2"
                                          required={true}
                                          value={question[index].correct}
                                          onChange={(event) => {
                                             handleChange(index, event);
                                          }}
                                       />
                                    </div>
                                    <div className="d-flex align-items-center" style={{ gap: '8px' }}>
                                       <h5 className="m-0">Points</h5>
                                       <input
                                          type="number"
                                          name="points"
                                          placeholder="Enter points"
                                          className="ms-2"
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
                     <div className="d-flex justify-content-center p-4">
                        <button className="btn btn-success me-5" type="submit" onClick={formSubmit}>
                           Create Quiz
                        </button>
                        <button className="btn btn-primary" onClick={addMore}>
                           Add more
                        </button>
                     </div>
                  </form>
               </section>
            )}
         </div>
         {quizId !== undefined && (
            <div className="login-form ">
               <div className="bg-body-secondary w-25 border border-3 rounded-5">
                  <div className="d-flex justify-content-end pt-4 pe-4">
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
                  <div className="d-flex flex-column justify-content-center pb-5 align-items-center  ">
                     <h4 className="fs-2 text-success fst-italic font-monospace">Quiz Id:</h4>
                     <p className=" fs-2 text-success">{quizId}</p>
                     <button
                        className="btn btn-info px-4"
                        onClick={(e) => {
                           e.preventDefault();
                           navigator.clipboard.writeText(quizId);
                           toast.info("Copied to clipboard", {
                              autoClose: 2000,
                           });
                        }}
                     >
                        Copy
                     </button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default QuizCreate;
