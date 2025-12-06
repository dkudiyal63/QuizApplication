// API configuration - supports CRA (REACT_APP_) and Vite (import.meta.env)
const viteEnv = typeof import.meta !== 'undefined' ? import.meta.env : {};
const API_BASE_URL =
  (viteEnv && (viteEnv.VITE_API_URL || viteEnv.REACT_APP_API_URL)) ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:8080';

export const API_ENDPOINTS = {
  // User endpoints
  LOGIN: `${API_BASE_URL}/user/login`,
  REGISTER: `${API_BASE_URL}/user/register`,
  GET_USER: `${API_BASE_URL}/user/getUser`,
  USER_CREATIONS: `${API_BASE_URL}/user/creations`,
  USER_ATTEMPTED: `${API_BASE_URL}/user/attempted`,
  
  // Quiz endpoints
  CREATE_QUIZ: `${API_BASE_URL}/quiz/create`,
  GET_QUIZ: `${API_BASE_URL}/quiz`,
  QUIZ_ATTEMPT: `${API_BASE_URL}/quiz/attempt`,
  QUIZ_START: `${API_BASE_URL}/quiz/start`,
  QUIZ_SUBMIT: `${API_BASE_URL}/quiz/submit`,
  GENERATE_AI_QUIZ: `${API_BASE_URL}/quiz/generate-ai`,
  
  // Questions endpoints
  // Specific quiz questions for a creator: /user/creations/{quizId}/questions
  GET_QUESTIONS: (quizId) => `${API_BASE_URL}/user/creations/${quizId}/questions`,
};

export default API_BASE_URL;
