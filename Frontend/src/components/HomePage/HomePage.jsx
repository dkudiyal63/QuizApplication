import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Mind Bender Challenge",
      description: "Stretch your cognitive abilities with brain-teasing puzzles, riddles, and logic-based quizzes that push your mental limits.",
      icon: "🧠",
      color: "#1f6feb",
      action: () => navigate("/practice")
    },
    {
      title: "Trivia Time Machine",
      description: "Journey through time with engaging trivia spanning history, pop culture, science, and everything in between.",
      icon: "⏰",
      color: "#79c0ff",
      action: () => navigate("/practice")
    },
    {
      title: "Explorer's Quest",
      description: "Embark on thrilling knowledge expeditions across diverse subjects and dive deeper into topics you love.",
      icon: "🗺️",
      color: "#58a6ff",
      action: () => navigate("/practice")
    }
  ];

  const heroCardStyles = {
    container: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'var(--radius-2xl)',
      padding: 'var(--spacing-3xl) var(--spacing-2xl)',
      background: 'linear-gradient(135deg, rgba(31, 110, 235, 0.1) 0%, rgba(121, 192, 255, 0.05) 100%)',
      border: '2px solid rgba(31, 110, 235, 0.3)',
      backdropFilter: 'blur(10px)',
      marginBottom: 'var(--spacing-3xl)'
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Optimized Hero Section */}
      <section className="hero" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
        <div className="container">
          <div className="fade-in-up">
            <h1 className="hero-title" style={{
              fontSize: 'clamp(2rem, 8vw, 3.5rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #f0f6fc 0%, #79c0ff 50%, #1f6feb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-1px',
              marginBottom: 'var(--spacing-md)',
              lineHeight: 1.1
            }}>
              Unlock Your Knowledge
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #1f6feb 0%, #79c0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Embrace the Quest</span>
            </h1>
            <div className="hero-subtitle" style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: '#8b949e',
              marginBottom: 'var(--spacing-2xl)',
              maxWidth: '700px',
              margin: '0 auto var(--spacing-2xl)',
              lineHeight: 1.7,
              fontWeight: 500
            }}>
              Dive into a world where every question sparks curiosity, challenges your thinking, and illuminates new paths of learning.
            </div>
            
            <div className="d-flex justify-content-center gap-3 mt-4" style={{ flexWrap: 'wrap', marginBottom: 'var(--spacing-lg)' }}>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/practice")}
                style={{
                  padding: '0.875rem 2.5rem',
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-xl)',
                  background: 'linear-gradient(135deg, #1f6feb 0%, #388bfd 100%)',
                  border: 'none',
                  boxShadow: '0 12px 30px rgba(31, 110, 235, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 20px 40px rgba(31, 110, 235, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 12px 30px rgba(31, 110, 235, 0.3)';
                }}
              >
                🚀 Start Quiz Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            background: 'rgba(31, 110, 235, 0.15)',
            borderRadius: 'var(--radius-xl)',
            marginBottom: 'var(--spacing-md)',
            border: '1px solid rgba(31, 110, 235, 0.3)'
          }}>
            <span style={{ color: '#79c0ff', fontWeight: 700, fontSize: 'clamp(0.75rem, 1vw, 0.875rem)', letterSpacing: '1px' }}>✨ FEATURES ✨</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
            fontWeight: 800,
            color: '#f0f6fc',
            marginBottom: 'var(--spacing-md)',
            lineHeight: 1.2
          }}>
            What Quizzie Offers
          </h2>
          <p style={{
            color: '#8b949e',
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Explore diverse quiz categories and challenge yourself to grow
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card fade-in-up" style={{
              animationDelay: `${index * 0.15}s`,
              borderTop: `3px solid ${feature.color}`,
              background: `linear-gradient(135deg, rgba(31, 110, 235, 0.05) 0%, rgba(121, 192, 255, 0.02) 100%)`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              minHeight: '380px',
              display: 'flex',
              flexDirection: 'column',
              padding: 'var(--spacing-lg)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px)';
              e.currentTarget.style.boxShadow = `0 20px 50px rgba(31, 110, 235, 0.3)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
            }}>
              <div className="feature-icon" style={{
                fontSize: '3rem',
                marginBottom: 'var(--spacing-md)',
                animation: 'bounce 3s ease-in-out infinite'
              }}>{feature.icon}</div>
              <h3 className="card-title" style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                fontWeight: 700,
                marginBottom: 'var(--spacing-md)',
                color: '#f0f6fc',
                lineHeight: 1.3
              }}>{feature.title}</h3>
              <p className="card-description" style={{
                color: '#8b949e',
                fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
                marginBottom: 'var(--spacing-lg)',
                flex: 1,
                lineHeight: 1.6
              }}>{feature.description}</p>
              <button 
                className="btn btn-primary"
                onClick={feature.action}
                style={{
                  background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  marginTop: 'auto',
                  fontSize: 'var(--font-size-base)',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                Explore Now →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* New Section: Stats/Highlights */}
      <section className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(31, 110, 235, 0.1) 0%, rgba(121, 192, 255, 0.05) 100%)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid rgba(31, 110, 235, 0.2)',
          padding: 'var(--spacing-2xl)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--spacing-lg)'
        }}>
          {[
            { icon: '👥', title: '10K+', subtitle: 'Active Learners' },
            { icon: '📚', title: '500+', subtitle: 'Quiz Templates' },
            { icon: '⭐', title: '4.8★', subtitle: 'User Rating' },
            { icon: '🚀', title: '100%', subtitle: 'Free to Use' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              textAlign: 'center',
              padding: 'var(--spacing-lg)',
              background: 'rgba(13, 17, 23, 0.4)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(31, 110, 235, 0.15)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(31, 110, 235, 0.15)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(13, 17, 23, 0.4)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>{stat.icon}</div>
              <div style={{
                fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
                fontWeight: 800,
                color: '#79c0ff',
                marginBottom: 'var(--spacing-xs)'
              }}>{stat.title}</div>
              <div style={{
                color: '#8b949e',
                fontSize: 'clamp(0.875rem, 1.5vw, 0.95rem)',
                fontWeight: 500
              }}>{stat.subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
            fontWeight: 800,
            color: '#f0f6fc',
            marginBottom: 'var(--spacing-md)',
            lineHeight: 1.2
          }}>
            How It Works
          </h2>
          <p style={{
            color: '#8b949e',
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Get started in just a few simple steps
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--spacing-lg)',
          alignItems: 'center'
        }}>
          {[
            { step: '1', title: 'Choose a Quiz', desc: 'Browse our collection or create your own' },
            { step: '2', title: 'Test Yourself', desc: 'Answer questions and learn new concepts' },
            { step: '3', title: 'Track Progress', desc: 'View detailed insights and improvements' },
            { step: '4', title: 'Share & Compete', desc: 'Challenge friends and build community' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'linear-gradient(135deg, rgba(31, 110, 235, 0.08) 0%, rgba(121, 192, 255, 0.03) 100%)',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid rgba(31, 110, 235, 0.2)',
              padding: 'var(--spacing-lg)',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#1f6feb';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(31, 110, 235, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(31, 110, 235, 0.2)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #1f6feb 0%, #79c0ff 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#ffffff',
                fontSize: 'var(--font-size-lg)',
                boxShadow: '0 4px 12px rgba(31, 110, 235, 0.3)'
              }}>{item.step}</div>
              <h3 style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                fontWeight: 700,
                color: '#f0f6fc',
                marginBottom: 'var(--spacing-sm)',
                marginTop: 'var(--spacing-md)'
              }}>{item.title}</h3>
              <p style={{
                color: '#8b949e',
                fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
                margin: 0,
                lineHeight: 1.5
              }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
