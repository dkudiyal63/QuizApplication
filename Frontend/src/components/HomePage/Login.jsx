import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/api";
import { toast } from "react-toastify";

const Login = (props) => {
   const [showSpinner, setShowSpinner] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loginError, setLoginError] = useState("");
   const [passVisible, setPassVisible] = useState(false);

   const [firstName, setFirstName] = useState();
   const [lastName, setLastName] = useState();

   const [showRegister, setShowRegister] = useState(false);
   const navigate = useNavigate();

   // Support both header-modal usage and direct routed usage at /login
   const routedUsage = typeof props.loginVisible === 'undefined';
   const [internalVisible, setInternalVisible] = useState(true);
   const isLoggedIn = props.isLoggedIn ?? Boolean(localStorage.getItem('pid'));
   const visible = routedUsage ? internalVisible : (props.loginVisible ?? false);
   	async function login(e) {
		setShowSpinner(true);
		let url = API_ENDPOINTS.LOGIN;
      e.preventDefault();
      try {
         const data = {
            email: email,
            password: password,
         };
         const res = await fetch(url, {
            method: "POST",
            headers: {
               "Content-type": "application/json",
            },
            body: JSON.stringify(data),
         });
         if (res.status === 404) {
            setLoginError("User Not Found!");
            toast.error("User not found");
         } else if (res.status === 400) {
            setLoginError("Password is incorrect!");
            toast.error("Incorrect password");
         } else if (res.status === 200) {
            const id = await res.json();
            console.log("your id is : "+id["token"]);
            localStorage.setItem("pid", id["token"]);
            sessionStorage.removeItem("pid");
            toast.success(`Welcome ${id["username"] || ""}`);
            // Small delay to ensure localStorage is written
            setTimeout(() => {
               if (typeof props.onLogin === 'function') {
                  props.onLogin(id["username"]);
               } else {
                  // Routed usage: go to home after login
                  navigate('/');
               }
            }, 100);
         }
         setShowSpinner(false);
             } catch (error) {
          setShowSpinner(false);
          setLoginError("Something Went Wrong! Try Again");
         toast.error("Login failed. Please try again.");
       }
   }

   	async function register(e) {
		setShowSpinner(true);
		e.preventDefault();
		const url = API_ENDPOINTS.REGISTER;
      const data = {
         email: email,
         password: password,
         firstName: firstName,
         lastName: lastName,
      };
      try {
         const res = await fetch(url, {
            body: JSON.stringify(data),
            headers: {
               "Content-Type": "application/json",
            },
            method: "POST",
         });
         if (res.status === 409) {
            setLoginError("Email already registered");
            toast.error("Email already registered");
         } else if (res.status === 400) {
            const txt = await res.text();
            setLoginError(txt || "Invalid input");
            toast.error(txt || "Invalid input");
         } else if (res.status === 201) {
            setLoginError("Registered. Login with your account");
            toast.success("Registered successfully. Please login.");
            setShowRegister(false);
         }
      } catch (error) {
         setLoginError("Something went wrong...");
         toast.error("Registration failed. Please try again.");
      }
      setShowSpinner(false);
   }

   return (
      <>
         {visible && (
            <div style={{
               position: 'fixed',
               top: 0,
               left: 0,
               width: '100%',
               height: '100vh',
               background: 'rgba(0, 0, 0, 0.85)',
               backdropFilter: 'blur(5px)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               zIndex: 10000,
               padding: 'var(--spacing-2xl) var(--spacing-lg)',
               overflowY: 'auto'
            }}>
               <div className="card" style={{
                  maxWidth: '480px',
                  width: '100%',
                  borderRadius: 'var(--radius-2xl)',
                  borderTop: '3px solid #1f6feb',
                  boxShadow: '0 20px 60px rgba(31, 110, 235, 0.3)',
                  animation: 'slideInDown 0.4s ease-out',
                  padding: 'var(--spacing-xl)'
               }}>
                  {!showRegister ? (
                     <form onSubmit={(e) => login(e)}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                           <div>
                              <h3 className="mb-1" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.75rem)', fontWeight: 800 }}>Welcome Back</h3>
                              <p style={{ color: '#8b949e', margin: 0, fontSize: 'clamp(0.875rem, 1.5vw, 0.95rem)' }}>Sign in to your account</p>
                           </div>
                           <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => {
                                 if (routedUsage) {
                                    setInternalVisible(false);
                                    navigate(-1);
                                 } else {
                                    props.setVisibilty(false);
                                 }
                                 setLoginError("");
                                 setEmail("");
                                 setPassword("");
                              }}
                              style={{
                                 padding: '0.5rem',
                                 minWidth: 'auto',
                                 fontSize: '1.25rem'
                              }}
                           >
                              ✕
                           </button>
                        </div>
                        
                        {loginError && (
                           <div className="mb-3" style={{
                              color: '#f85149',
                              fontSize: 'clamp(0.875rem, 1.5vw, 0.95rem)',
                              padding: 'var(--spacing-md)',
                              background: 'rgba(248, 81, 73, 0.1)',
                              borderRadius: 'var(--radius-lg)',
                              border: '1px solid rgba(248, 81, 73, 0.3)',
                              lineHeight: 1.5
                           }}>
                              ⚠️ {loginError}
                           </div>
                        )}
                        
                        <div className="mb-4">
                           <label className="form-label" style={{
                              fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              color: '#f0f6fc'
                           }}>Email Address</label>
                           <input
                              type="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              style={{
                                 padding: 'var(--spacing-md) var(--spacing-lg)',
                                 borderRadius: 'var(--radius-lg)',
                                 fontSize: 'clamp(0.95rem, 1.5vw, 1rem)'
                              }}
                           />
                        </div>
                        
                        <div className="mb-4">
                           <div className="d-flex justify-content-between align-items-center mb-2">
                              <label className="form-label" style={{
                                 fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                                 fontWeight: 600,
                                 textTransform: 'uppercase',
                                 letterSpacing: '0.5px',
                                 color: '#f0f6fc',
                                 margin: 0
                              }}>Password</label>
                           </div>
                           <div className="d-flex" style={{ gap: '0.5rem' }}>
                              <input
                                 type={passVisible ? "text" : "password"}
                                 className="form-control"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 placeholder="••••••••"
                                 style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    borderRadius: 'var(--radius-lg)',
                                    flex: 1,
                                    fontSize: 'clamp(0.95rem, 1.5vw, 1rem)'
                                 }}
                              />
                              <button
                                 type="button"
                                 className="btn btn-secondary"
                                 onClick={() => setPassVisible(!passVisible)}
                                 style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    minWidth: 'auto',
                                    fontSize: '1.1rem'
                                 }}
                              >
                                 {passVisible ? '👁️' : '👁️‍🗨️'}
                              </button>
                           </div>
                        </div>

                        {showSpinner && (
                           <div className="text-center mb-3">
                              <div className="spinner" style={{ margin: '0 auto' }}></div>
                           </div>
                        )}
                        
                        <button type="submit" className="btn btn-primary w-100 mb-3" style={{
                           padding: '0.875rem',
                           fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                           fontWeight: 600,
                           borderRadius: 'var(--radius-lg)',
                           marginTop: 'var(--spacing-md)'
                        }}>
                           🔐 Sign In
                        </button>
                        
                        <button
                           type="button"
                           className="btn btn-secondary w-100"
                           onClick={(e) => {
                              e.preventDefault();
                              setShowRegister(true);
                              setLoginError("");
                           }}
                           style={{
                              padding: '0.875rem',
                              fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                              fontWeight: 600,
                              borderRadius: 'var(--radius-lg)'
                           }}
                        >
                           Don't have an account? Register →
                        </button>
                     </form>
                  ) : (
                     <form onSubmit={(e) => register(e)}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                           <div>
                              <h3 className="mb-1" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.75rem)', fontWeight: 800 }}>Create Account</h3>
                              <p style={{ color: '#8b949e', margin: 0, fontSize: 'clamp(0.875rem, 1.5vw, 0.95rem)' }}>Join our learning community</p>
                           </div>
                           <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => {
                                 if (routedUsage) {
                                    setInternalVisible(false);
                                    navigate(-1);
                                 } else {
                                    props.setVisibilty(false);
                                 }
                                 setLoginError("");
                                 setEmail("");
                                 setPassword("");
                              }}
                              style={{
                                 padding: '0.5rem',
                                 minWidth: 'auto',
                                 fontSize: '1.25rem'
                              }}
                           >
                              ✕
                           </button>
                        </div>
                        
                        {loginError && (
                           <div className="mb-3" style={{
                              color: '#f85149',
                              fontSize: 'clamp(0.875rem, 1.5vw, 0.95rem)',
                              padding: 'var(--spacing-md)',
                              background: 'rgba(248, 81, 73, 0.1)',
                              borderRadius: 'var(--radius-lg)',
                              border: '1px solid rgba(248, 81, 73, 0.3)',
                              lineHeight: 1.5
                           }}>
                              ⚠️ {loginError}
                           </div>
                        )}
                        
                        <div className="d-flex gap-2 mb-4">
                           <div className="flex-1">
                              <label className="form-label" style={{
                                 fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                                 fontWeight: 600,
                                 textTransform: 'uppercase',
                                 letterSpacing: '0.5px'
                              }}>First Name</label>
                              <input
                                 type="text"
                                 className="form-control"
                                 onChange={(e) => setFirstName(e.target.value)}
                                 placeholder="First"
                                 style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    borderRadius: 'var(--radius-lg)',
                                    fontSize: 'clamp(0.95rem, 1.5vw, 1rem)'
                                 }}
                              />
                           </div>
                           <div className="flex-1">
                              <label className="form-label" style={{
                                 fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                                 fontWeight: 600,
                                 textTransform: 'uppercase',
                                 letterSpacing: '0.5px'
                              }}>Last Name</label>
                              <input
                                 type="text"
                                 className="form-control"
                                 onChange={(e) => setLastName(e.target.value)}
                                 placeholder="Last"
                                 style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    borderRadius: 'var(--radius-lg)',
                                    fontSize: 'clamp(0.95rem, 1.5vw, 1rem)'
                                 }}
                              />
                           </div>
                        </div>
                        
                        <div className="mb-4">
                           <label className="form-label" style={{
                              fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                           }}>Email Address</label>
                           <input
                              type="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              style={{
                                 padding: 'var(--spacing-md) var(--spacing-lg)',
                                 borderRadius: 'var(--radius-lg)',
                                 fontSize: 'clamp(0.95rem, 1.5vw, 1rem)'
                              }}
                           />
                        </div>
                        
                        <div className="mb-4">
                           <label className="form-label" style={{
                              fontSize: 'clamp(0.8rem, 1.2vw, 0.875rem)',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                           }}>Password</label>
                           <div className="d-flex" style={{ gap: '0.5rem' }}>
                              <input
                                 type={passVisible ? "text" : "password"}
                                 className="form-control"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 placeholder="••••••••"
                                 style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    borderRadius: 'var(--radius-lg)',
                                    flex: 1,
                                    fontSize: 'clamp(0.95rem, 1.5vw, 1rem)'
                                 }}
                              />
                              <button
                                 type="button"
                                 className="btn btn-secondary"
                                 onClick={() => setPassVisible(!passVisible)}
                                 style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    minWidth: 'auto',
                                    fontSize: '1.1rem'
                                 }}
                              >
                                 {passVisible ? '👁️' : '👁️‍🗨️'}
                              </button>
                           </div>
                        </div>
                        
                        {showSpinner && (
                           <div className="text-center mb-3">
                              <div className="spinner" style={{ margin: '0 auto' }}></div>
                           </div>
                        )}
                        
                        <button type="submit" className="btn btn-primary w-100 mb-3" style={{
                           padding: '0.875rem',
                           fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                           fontWeight: 600,
                           borderRadius: 'var(--radius-lg)',
                           marginTop: 'var(--spacing-md)'
                        }}>
                           ✓ Create Account
                        </button>
                        
                        <button
                           type="button"
                           className="btn btn-secondary w-100"
                           onClick={(e) => {
                              e.preventDefault();
                              setShowRegister(false);
                              setLoginError("");
                           }}
                           style={{
                              padding: '0.875rem',
                              fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
                              fontWeight: 600,
                              borderRadius: 'var(--radius-lg)'
                           }}
                        >
                           Already have an account? Sign In →
                        </button>
                     </form>
                  )}
               </div>
            </div>
         )}
      </>
   );
};

export default Login;
