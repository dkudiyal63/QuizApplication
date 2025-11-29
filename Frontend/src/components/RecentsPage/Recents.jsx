import { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import "./recents.css";
import Spinner from "../HomePage/Spinner";
import Footer from "../HomePage/Footer";
const Recents = () => {
   const [activeIndex, setActiveIndex] = useState(-1);
   const [showSpinner, setShowSpinner] = useState(true);
   const [error, setError] = useState(null);
   const [data, setData] = useState([]);

   const getAttempted = async () => {
      setShowSpinner(true);
      const pid = localStorage.getItem("pid");

      if (pid === null) {
         setShowSpinner(false);
         setError("Please login to view attempted quizzes");
         return;
      }
      try {
         const url = "http://localhost:8080/user/attempted";
         const res = await fetch(url, {
            headers: {
               "Authorization": `Bearer ${pid}`,
               "Content-Type": "application/json",
            },
            method: "GET",
         });
         if (res.status === 404) {
            setError("You have not attempted any quiz ...");
         } else if (res.status === 200) {
            const resData = await res.json();
            const combinedData = resData.attempted.map((item, index) => ({
               ...item,
               ...resData.quizDetails[index],
            }));
            setData(combinedData);
         } else if (res.status === 401) {
            setError("Login to proceed");
         } else {
            setError(`Unexpected response: ${res.status}`);
         }
      } catch (error) {
         setError("Something went wrong! Try Again...");
      }
      setShowSpinner(false);
   };

   const handleClick = (index) => {
      setActiveIndex(index);
   };
   useEffect(() => {
      getAttempted();
   }, []);

   return (
      <>
         <Header />
         {showSpinner && (
            <div
               className="d-flex justify-content-center align-items-center"
               style={{ height: "60vh" }}
            >
               <Spinner />
            </div>
         )}

         {!showSpinner && error !== null && (
            <div
               className="d-flex flex-column justify-content-center align-items-center"
               style={{
                  height: "60vh",
                  background: 'linear-gradient(135deg, rgba(31, 110, 235, 0.05) 0%, rgba(248, 81, 73, 0.05) 100%)',
                  borderRadius: 'var(--radius-2xl)',
                  margin: 'var(--spacing-2xl) auto',
                  maxWidth: '90%',
                  border: '2px dashed rgba(248, 81, 73, 0.3)',
                  padding: 'var(--spacing-lg)'
               }}
            >
               <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-lg)' }}>📭</div>
               <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  color: '#f85149',
                  margin: 0,
                  textAlign: 'center',
                  lineHeight: 1.6
               }}>{error}</p>
            </div>
         )}

         {!showSpinner && error === null && (!data || data.length === 0) && (
            <div
               className="d-flex flex-column justify-content-center align-items-center"
               style={{
                  height: "60vh",
                  background: 'linear-gradient(135deg, rgba(31, 110, 235, 0.05) 0%, rgba(121, 192, 255, 0.05) 100%)',
                  borderRadius: 'var(--radius-2xl)',
                  margin: 'var(--spacing-2xl) auto',
                  maxWidth: '90%',
                  border: '2px dashed rgba(31, 110, 235, 0.3)',
                  padding: 'var(--spacing-lg)'
               }}
            >
               <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-lg)' }}>✨</div>
               <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  color: '#79c0ff',
                  margin: 0,
                  lineHeight: 1.6
               }}>No attempted quizzes yet. Start your first quiz!</p>
            </div>
         )}

         {!showSpinner && error === null && data && data.length > 0 && (
            <div style={{ background: 'linear-gradient(135deg, rgba(31, 110, 235, 0.03) 0%, rgba(121, 192, 255, 0.02) 100%)', minHeight: '100vh' }}>
               <div style={{
                  background: 'linear-gradient(135deg, #1f6feb 0%, #79c0ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  padding: 'var(--spacing-xl) var(--spacing-lg)',
                  textAlign: 'center'
               }}>
                  <h1 style={{
                     fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                     fontWeight: 800,
                     margin: 0,
                     lineHeight: 1.2
                  }}>📊 Your Quiz History</h1>
               </div>
               <div className="container" style={{ paddingTop: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-2xl)' }}>
                  <div className="row" style={{ gap: 'var(--spacing-lg)' }}>
                     <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{
                           background: 'rgba(13, 17, 23, 0.6)',
                           borderRadius: 'var(--radius-2xl)',
                           border: '2px solid rgba(31, 110, 235, 0.3)',
                           overflow: 'hidden'
                        }}>
                           <div style={{
                              padding: 'var(--spacing-lg)',
                              background: 'linear-gradient(135deg, rgba(31, 110, 235, 0.15) 0%, rgba(121, 192, 255, 0.1) 100%)',
                              borderBottom: '1px solid rgba(31, 110, 235, 0.2)'
                           }}>
                              <h3 style={{
                                 color: '#79c0ff',
                                 fontWeight: 700,
                                 margin: 0,
                                 fontSize: 'var(--font-size-lg)'
                              }}>📚 Quizzes Attempted</h3>
                              <p style={{
                                 color: '#8b949e',
                                 fontSize: 'var(--font-size-sm)',
                                 margin: '0.25rem 0 0',
                                 fontStyle: 'italic'
                              }}>Click to view details</p>
                           </div>
                           <ul
                              style={{
                                 listStyle: 'none',
                                 padding: '0.5rem',
                                 maxHeight: '65vh',
                                 overflowY: 'auto',
                                 margin: 0
                              }}
                           >
                              {data && data.map((item, index) => (
                                 <button
                                    type="button"
                                    key={index}
                                    onClick={() => handleClick(index)}
                                    style={{
                                       width: '100%',
                                       padding: 'var(--spacing-md)',
                                       margin: '0.25rem 0',
                                       background: activeIndex === index ? 'rgba(31, 110, 235, 0.25)' : 'rgba(31, 110, 235, 0.05)',
                                       border: activeIndex === index ? '2px solid #1f6feb' : '1px solid rgba(31, 110, 235, 0.2)',
                                       borderRadius: 'var(--radius-lg)',
                                       cursor: 'pointer',
                                       transition: 'all 0.3s ease',
                                       color: '#f0f6fc',
                                       textAlign: 'left',
                                       display: 'flex',
                                       flexDirection: 'column',
                                       gap: '0.5rem',
                                       fontSize: 'var(--font-size-sm)'
                                    }}
                                    onMouseEnter={(e) => {
                                       if (activeIndex !== index) {
                                          e.target.style.background = 'rgba(31, 110, 235, 0.12)';
                                          e.target.style.borderColor = 'rgba(31, 110, 235, 0.4)';
                                       }
                                    }}
                                    onMouseLeave={(e) => {
                                       if (activeIndex !== index) {
                                          e.target.style.background = 'rgba(31, 110, 235, 0.05)';
                                          e.target.style.borderColor = 'rgba(31, 110, 235, 0.2)';
                                       }
                                    }}
                                 >
                                    <div style={{ fontWeight: 700, color: '#79c0ff' }}>{item.title}</div>
                                    <div style={{ color: '#8b949e', fontSize: 'var(--font-size-xs)' }}>
                                       {item.subject} • {item.date}
                                    </div>
                                 </button>
                              ))}
                           </ul>
                        </div>
                     </div>
                     <div className="col-md-8" style={{ display: 'flex' }}>
                        {activeIndex === -1 && (
                           <div
                              style={{
                                 width: '100%',
                                 background: 'linear-gradient(135deg, rgba(31, 110, 235, 0.08) 0%, rgba(121, 192, 255, 0.03) 100%)',
                                 border: '2px dashed rgba(31, 110, 235, 0.3)',
                                 borderRadius: 'var(--radius-2xl)',
                                 display: 'flex',
                                 flexDirection: 'column',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 padding: 'var(--spacing-2xl)'
                              }}
                           >
                              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-lg)' }}>👆</div>
                              <h3 style={{
                                 color: '#8b949e',
                                 fontStyle: 'italic',
                                 textAlign: 'center',
                                 margin: 0
                              }}>
                                 Select a quiz to view detailed results
                              </h3>
                           </div>
                        )}
                        {activeIndex > -1 && (
                           <div
                              style={{
                                 width: '100%',
                                 background: 'linear-gradient(135deg, rgba(31, 110, 235, 0.08) 0%, rgba(121, 192, 255, 0.03) 100%)',
                                 border: '2px solid rgba(31, 110, 235, 0.3)',
                                 borderRadius: 'var(--radius-2xl)',
                                 padding: 'var(--spacing-2xl)',
                                 animation: 'fadeInUp 0.4s ease-out'
                              }}
                           >
                              <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                                 <h2 style={{
                                    fontSize: 'var(--font-size-2xl)',
                                    fontWeight: 800,
                                    color: '#79c0ff',
                                    margin: '0 0 var(--spacing-md)'
                                 }}>{data[activeIndex]?.title || 'Quiz Details'}</h2>
                              </div>
                              <div style={{
                                 display: 'grid',
                                 gridTemplateColumns: '1fr 1fr',
                                 gap: 'var(--spacing-lg)',
                                 marginBottom: 'var(--spacing-2xl)'
                              }}>
                                 <div style={{
                                    background: 'rgba(31, 110, 235, 0.1)',
                                    padding: 'var(--spacing-lg)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid rgba(31, 110, 235, 0.2)'
                                 }}>
                                    <div style={{ color: '#8b949e', fontSize: 'var(--font-size-sm)', marginBottom: '0.5rem' }}>Subject</div>
                                    <div style={{ color: '#f0f6fc', fontWeight: 600, fontSize: 'var(--font-size-lg)' }}>{data[activeIndex].subject}</div>
                                 </div>
                                 <div style={{
                                    background: 'rgba(121, 192, 255, 0.1)',
                                    padding: 'var(--spacing-lg)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid rgba(121, 192, 255, 0.2)'
                                 }}>
                                    <div style={{ color: '#8b949e', fontSize: 'var(--font-size-sm)', marginBottom: '0.5rem' }}>Attempted Date</div>
                                    <div style={{ color: '#f0f6fc', fontWeight: 600, fontSize: 'var(--font-size-lg)' }}>{data[activeIndex].date}</div>
                                 </div>
                                 <div style={{
                                    background: 'rgba(88, 166, 255, 0.1)',
                                    padding: 'var(--spacing-lg)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid rgba(88, 166, 255, 0.2)'
                                 }}>
                                    <div style={{ color: '#8b949e', fontSize: 'var(--font-size-sm)', marginBottom: '0.5rem' }}>Difficulty</div>
                                    <div style={{ color: '#f0f6fc', fontWeight: 600, fontSize: 'var(--font-size-lg)' }}>{data[activeIndex].difficulty}</div>
                                 </div>
                                 <div style={{
                                    background: 'rgba(63, 185, 80, 0.1)',
                                    padding: 'var(--spacing-lg)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid rgba(63, 185, 80, 0.2)'
                                 }}>
                                    <div style={{ color: '#8b949e', fontSize: 'var(--font-size-sm)', marginBottom: '0.5rem' }}>Total Questions</div>
                                    <div style={{ color: '#f0f6fc', fontWeight: 600, fontSize: 'var(--font-size-lg)' }}>{data[activeIndex].totalQuestions}</div>
                                 </div>
                              </div>
                              <div style={{
                                 textAlign: 'center',
                                 background: 'linear-gradient(135deg, rgba(31, 110, 235, 0.15) 0%, rgba(63, 185, 80, 0.1) 100%)',
                                 padding: 'var(--spacing-2xl)',
                                 borderRadius: 'var(--radius-lg)',
                                 border: '2px solid rgba(31, 110, 235, 0.3)'
                              }}>
                                 <div style={{ color: '#8b949e', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-md)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Your Score</div>
                                 <div style={{
                                    fontSize: 'var(--font-size-5xl)',
                                    fontWeight: 900,
                                    background: 'linear-gradient(135deg, #1f6feb 0%, #3fb950 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                 }}>
                                    {data[activeIndex].points}/{data[activeIndex].totalPoints}
                                 </div>
                                 <div style={{
                                    color: '#8b949e',
                                    marginTop: 'var(--spacing-md)',
                                    fontSize: 'var(--font-size-base)',
                                    fontStyle: 'italic'
                                 }}>
                                    {((data[activeIndex].points / data[activeIndex].totalPoints) * 100).toFixed(1)}% Correct
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         )}
         <Footer />
      </>
   );
};

export default Recents;
