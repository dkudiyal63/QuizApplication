import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Mind Bender Challenge",
      description: "Stretch your cognitive abilities with our collection of brain-teasing puzzles, riddles, and logic-based quizzes.",
      icon: "🧠",
      action: () => navigate("/practice")
    },
    {
      title: "Trivia Time Machine",
      description: "Take a nostalgic trip through time with our trivia quizzes spanning various eras and topics.",
      icon: "⏰",
      action: () => navigate("/practice")
    },
    {
      title: "Explorer's Quest",
      description: "Embark on a knowledge expedition with our Explorer's Quest quizzes.",
      icon: "🗺️",
      action: () => navigate("/practice")
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="fade-in-up">
            <h1 className="hero-title">
              unlock knowledge
              <br />
              Embrace the Quest
            </h1>
            <div className="hero-subtitle">
              Where Every Question Unveils a World of Wisdom, Sparking the Flames of Learning and Illuminating the Path to Intellectual Brilliance!
            </div>
            
            <div className="d-flex justify-content-center gap-3 mt-5">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/practice")}
              >
                Try Quizzie out!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <div className="text-center mb-5">
          <h2 className="d-flex align-items-center justify-content-center gap-2">
            <span>✨</span>
            What Quizzie offers
            <span>✨</span>
          </h2>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="card-title">{feature.title}</h3>
              <p className="card-description">{feature.description}</p>
              <button 
                className="btn btn-primary"
                onClick={feature.action}
              >
                Explore now →
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
