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
               background: 'rgba(0, 0, 0, 0.8)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               zIndex: 10000,
               padding: 'var(--spacing-2xl) var(--spacing-lg)',
               overflowY: 'auto'
            }}>
               <div className="card" style={{ maxWidth: '480px', width: '100%' }}>
                  {!showRegister ? (
                     <form onSubmit={(e) => login(e)}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                           <h3 className="mb-0">Welcome Back</h3>
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
                           >
                              ✕
                           </button>
                        </div>
                        
                        {loginError && (
                           <div className="mb-3" style={{ color: '#ef4444', fontSize: 'var(--font-size-sm)' }}>
                              {loginError}
                           </div>
                        )}
                        
                        <div className="mb-3">
                           <label className="form-label">Email address</label>
                           <input
                              type="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email"
                           />
                        </div>
                        
                        <div className="mb-4">
                           <label className="form-label">Password</label>
                           <div className="d-flex">
                              <input
                                 type={passVisible ? "text" : "password"}
                                 className="form-control"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 placeholder="Enter your password"
                              />
                              <button
                                 type="button"
                                 className="btn btn-secondary ms-2"
                                 onClick={() => setPassVisible(!passVisible)}
                              >
                                 {passVisible ? '👁️' : '👁️‍🗨️'}
                              </button>
                           </div>
                        </div>

                        {showSpinner && (
                           <div className="text-center mb-3">
                              <div className="spinner"></div>
                           </div>
                        )}
                        
                        <button type="submit" className="btn btn-primary w-100 mb-3">
                           Login
                        </button>
                        
                        <button
                           type="button"
                           className="btn btn-secondary w-100"
                           onClick={() => setShowRegister(true)}
                        >
                           Need an account? Register
                        </button>
                     </form>
                  ) : (
                     <form onSubmit={(e) => register(e)}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                           <h3 className="mb-0">Create Account</h3>
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
                           >
                              ✕
                           </button>
                        </div>
                        
                        {loginError && (
                           <div className="mb-3" style={{ color: '#ef4444', fontSize: 'var(--font-size-sm)' }}>
                              {loginError}
                           </div>
                        )}
                        
                        <div className="d-flex gap-2 mb-3">
                           <div className="flex-1">
                              <label className="form-label">First Name</label>
                              <input
                                 type="text"
                                 className="form-control"
                                 onChange={(e) => setFirstName(e.target.value)}
                                 placeholder="First name"
                              />
                           </div>
                           <div className="flex-1">
                              <label className="form-label">Last Name</label>
                              <input
                                 type="text"
                                 className="form-control"
                                 onChange={(e) => setLastName(e.target.value)}
                                 placeholder="Last name"
                              />
                           </div>
                        </div>
                        
                        <div className="mb-3">
                           <label className="form-label">Email address</label>
                           <input
                              type="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email"
                           />
                        </div>
                        
                        <div className="mb-4">
                           <label className="form-label">Password</label>
                           <div className="d-flex">
                              <input
                                 type={passVisible ? "text" : "password"}
                                 className="form-control"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 placeholder="Create a password"
                              />
                              <button
                                 type="button"
                                 className="btn btn-secondary ms-2"
                                 onClick={() => setPassVisible(!passVisible)}
                              >
                                 {passVisible ? '👁️' : '👁️‍🗨️'}
                              </button>
                           </div>
                        </div>
                        
                        {showSpinner && (
                           <div className="text-center mb-3">
                              <div className="spinner"></div>
                           </div>
                        )}
                        
                        <button type="submit" className="btn btn-primary w-100 mb-3">
                           Register
                        </button>
                        
                        <button
                           type="button"
                           className="btn btn-secondary w-100"
                           onClick={() => setShowRegister(false)}
                        >
                           Already have an account? Login
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
