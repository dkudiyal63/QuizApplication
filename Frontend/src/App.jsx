import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/globals.css";
import HomePage from "./components/HomePage/HomePage";
import PracticePage from "./components/PracticePage/PracticePage";
import Login from "./components/HomePage/Login";
import GetQuiz from "./components/PracticePage/GetQuiz";
import Creations from "./components/CreationsPage/Creations";
import QuizCreate from "./components/CreationsPage/QuizCreate";
import FullScreen from "./components/PracticePage/FullScreen";
import Recents from "./components/RecentsPage/Recents";
import AiQuizDisplay from "./components/PracticePage/AiQuizDisplay";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Practice" element={<PracticePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Practice/:quizId" element={<GetQuiz />} />
            <Route path="/Practice/:quizId/start" element={<FullScreen />} />
            <Route path="/Creations" element={<Creations />} />
            <Route path="/Creations/Create-quiz" element={<QuizCreate />} />
            <Route path="/Recents" element={<Recents />} />
            <Route path="/ai-quiz" element={<AiQuizDisplay />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;


