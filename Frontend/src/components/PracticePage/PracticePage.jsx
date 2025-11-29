import Header from "../HomePage/Header";
import IdInput from "./IdInput";
import AiQuiz from "./AiQuiz";

const PracticePage = () => {
   return (
      <div className="min-h-screen">
         <Header />
         
         <div className="container" style={{ paddingTop: 'var(--spacing-3xl)', paddingBottom: 'var(--spacing-3xl)' }}>
            <div className="text-center mb-5">
               <h1 className="hero-title">Choose Your Quest</h1>
               <p className="hero-subtitle">
                  Take an existing quiz or generate a new one with AI
               </p>
            </div>
            
            <div className="row justify-content-center">
               <div className="col-md-5">
                  <div className="card text-center">
                     <div className="card-header">
                        <h3 className="card-title">📝 Take Existing Quiz</h3>
                        <p className="card-description">
                           Enter a quiz ID to start an existing quiz
                        </p>
                     </div>
                     <div className="card-body">
                        <IdInput />
                     </div>
                  </div>
               </div>
               
               <div className="col-md-2 d-flex align-items-center justify-content-center">
                  <div className="text-center">
                     <div style={{ 
                        height: '2px', 
                        background: 'var(--gradient-primary)', 
                        width: '100px',
                        margin: '0 auto 20px'
                     }}></div>
                     <h4 style={{ 
                        color: 'var(--text-secondary)', 
                        fontStyle: 'italic',
                        margin: '20px 0'
                     }}>
                        OR
                     </h4>
                     <div style={{ 
                        height: '2px', 
                        background: 'var(--gradient-primary)', 
                        width: '100px',
                        margin: '0 auto'
                     }}></div>
                  </div>
               </div>
               
               <div className="col-md-5">
                  <div className="card text-center">
                     <div className="card-header">
                        <h3 className="card-title">🤖 AI Generated Quiz</h3>
                        <p className="card-description">
                           Create a personalized quiz with AI
                        </p>
                     </div>
                     <div className="card-body">
                        <AiQuiz />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PracticePage;
