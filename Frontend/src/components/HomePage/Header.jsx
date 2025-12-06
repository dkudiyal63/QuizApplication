import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { API_ENDPOINTS } from "../../utils/api";

function Header() {
   const [activeMenu, setActiveMenu] = useState("home");
   const menuItems = ["Home", "Practice", "Creations", "Recents"];
   const pathMap = {
      Home: "/",
      Practice: "/Practice",
      Creations: "/Creations",
      Recents: "/Recents",
   };
   const [showNavbar, setShowNavbar] = useState(false);
   const [loading, setLoading] = useState(true);

   // Enhanced header styles
   const headerStyles = {
      navContainer: {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'space-between',
         padding: 'var(--spacing-md) var(--spacing-lg)',
         background: 'rgba(13, 17, 23, 0.95)',
         backdropFilter: 'blur(20px)',
         borderBottom: '2px solid',
         borderImage: 'linear-gradient(90deg, #1f6feb 0%, #79c0ff 100%) 1',
         boxShadow: '0 8px 32px rgba(31, 110, 235, 0.15)'
      }
   };
   
   const clickLogout = () => {
      localStorage.removeItem("pid");
      sessionStorage.removeItem("pid");
      setUser("");
   };

   const [loginVisible, setLoginVisible] = useState(false);
   const [user, setUser] = useState("");
   
   const onLogin = (username) => {
      setUser(username);
      setLoginVisible(false);
   };

   const getUser = async () => {
      const pid = localStorage.getItem("pid");
      if (pid !== null && pid !== "") {
         try {
            const res = await fetch(API_ENDPOINTS.GET_USER, {
               headers: {
                  "Authorization": `Bearer ${pid}`,
                  "Content-Type": "application/json",
               },
            });

            if (res.status === 401) {
               // Token is invalid, clear it
               console.warn("Token validation failed (401), clearing authentication");
               setUser("");
               localStorage.removeItem("pid");
            } else if (res.status === 200) {
               const userData = await res.json();
               // Extract display name from the user object
               let displayName = "";
               if (userData.firstName && userData.lastName) {
                  displayName = `${userData.firstName} ${userData.lastName}`;
               } else if (userData.firstName) {
                  displayName = userData.firstName;
               } else if (userData.email) {
                  displayName = userData.email.split("@")[0]; // Use email prefix as fallback
               } else {
                  displayName = "User";
               }
               console.log("User authenticated:", displayName);
               setUser(displayName);
            } else {
               // Handle other error cases
               console.error("Unexpected status from GET_USER:", res.status);
               setUser("");
            }
         } catch (error) {
            console.error("Error fetching user:", error);
            // Don't log out on network errors, keep the token
         }
      } else {
         setUser("");
      }
      setLoading(false);
   };
   
   const setVisibilty = (bool) => {
      setLoginVisible(bool);
   };

   useEffect(() => {
      if (loginVisible) {
         document.body.classList.add("no-scroll");
      } else {
         document.body.classList.remove("no-scroll");
      }
   }, [loginVisible]);

   useEffect(() => {
      // Check if user is already logged in when component mounts
      getUser();
   }, []);

   return (
      <nav className="navbar" style={headerStyles.navContainer}>
         <div className="container d-flex justify-content-between align-items-center" style={{ padding: 0 }}>
            <Link to="/" className="navbar-brand" style={{
               fontSize: '1.75rem',
               fontWeight: 800,
               background: 'linear-gradient(135deg, #1f6feb 0%, #79c0ff 100%)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               backgroundClip: 'text',
               letterSpacing: '-0.5px',
               transition: 'transform 0.3s ease'
            }}>
               ✨ Quizzie
            </Link>
            
            <div className="d-flex align-items-center gap-3">
               <ul className="navbar-nav d-none d-md-flex" style={{ gap: 'var(--spacing-2xl)' }}>
                  {menuItems.map((item) => (
                     <li key={item}>
                        <Link
                           to={pathMap[item]}
                           className={`nav-link ${activeMenu === item ? "active" : ""}`}
                           onClick={() => setActiveMenu(item)}
                           style={{
                              color: activeMenu === item ? '#79c0ff' : '#8b949e',
                              position: 'relative',
                              fontWeight: activeMenu === item ? 600 : 500,
                              textDecoration: 'none'
                           }}
                        >
                           {item}
                           {activeMenu === item && (
                              <div style={{
                                 position: 'absolute',
                                 bottom: '-8px',
                                 left: 0,
                                 right: 0,
                                 height: '2px',
                                 background: 'linear-gradient(90deg, #1f6feb 0%, #79c0ff 100%)',
                                 borderRadius: '1px'
                              }}></div>
                           )}
                        </Link>
                     </li>
                  ))}
               </ul>
               
               <div className="d-flex align-items-center gap-2">
                  {user === "" ? (
                     <button
                        className="btn btn-primary"
                        onClick={() => setVisibilty(true)}
                        style={{
                           padding: '0.5rem 1rem',
                           fontSize: '0.875rem',
                           fontWeight: 600
                        }}
                     >
                        🔐 Login/Register
                     </button>
                  ) : (
                     <div className="d-flex align-items-center gap-2">
                        <div style={{
                           display: 'flex',
                           alignItems: 'center',
                           gap: '0.5rem',
                           padding: '0.5rem 1rem',
                           background: 'rgba(31, 110, 235, 0.1)',
                           borderRadius: 'var(--radius-lg)',
                           border: '1px solid rgba(31, 110, 235, 0.3)'
                        }}>
                           <span style={{ color: '#79c0ff', fontWeight: 600 }}>👤</span>
                           <span className="text-secondary" style={{ fontSize: '0.875rem' }}>{user}</span>
                        </div>
                        <button
                           className="btn btn-secondary"
                           onClick={clickLogout}
                           style={{
                              padding: '0.5rem 1rem',
                              fontSize: '0.875rem'
                           }}
                        >
                           Logout
                        </button>
                     </div>
                  )}
               </div>
               
               <button 
                  className="btn btn-secondary d-md-none"
                  onClick={() => setShowNavbar(!showNavbar)}
                  style={{
                     padding: '0.5rem 0.75rem',
                     fontSize: '1.25rem'
                  }}
               >
                  ☰
               </button>
            </div>
         </div>
         
         {showNavbar && (
            <div className="container-fluid" style={{ borderTop: '1px solid var(--border-color)' }}>
               <div className="row">
                  <div className="col-12">
                     <ul className="navbar-nav d-flex flex-column" style={{ padding: 'var(--spacing-md) 0' }}>
                        {menuItems.map((item) => (
                           <li key={item} style={{ margin: '0.5rem 0' }}>
                              <Link
                                 to={pathMap[item]}
                                 className={`nav-link ${activeMenu === item ? "active" : ""}`}
                                 onClick={() => {
                                    setActiveMenu(item);
                                    setShowNavbar(false);
                                 }}
                              >
                                 {item}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         )}
         
         <Login loginVisible={loginVisible} setVisibilty={setVisibilty} onLogin={onLogin} />
      </nav>
   );
}

export default Header;
