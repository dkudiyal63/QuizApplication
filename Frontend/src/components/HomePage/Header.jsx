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
      <nav className="navbar">
         <div className="container d-flex justify-content-between align-items-center">
            <Link to="/" className="navbar-brand">
               Quizzie
            </Link>
            
            <div className="d-flex align-items-center gap-3">
               <ul className="navbar-nav d-none d-md-flex">
                  {menuItems.map((item) => (
                     <li key={item}>
                        <Link
                           to={pathMap[item]}
                           className={`nav-link ${activeMenu === item ? "active" : ""}`}
                           onClick={() => setActiveMenu(item)}
                        >
                           {item}
                        </Link>
                     </li>
                  ))}
               </ul>
               
               <div className="d-flex align-items-center gap-2">
                  {user === "" ? (
                     <button
                        className="btn btn-secondary"
                        onClick={() => setVisibilty(true)}
                     >
                        Login/Register
                     </button>
                  ) : (
                     <div className="d-flex align-items-center gap-2">
                        <span className="text-secondary">Welcome, {user}</span>
                        <button
                           className="btn btn-secondary"
                           onClick={clickLogout}
                        >
                           Logout
                        </button>
                     </div>
                  )}
               </div>
               
               <button 
                  className="btn btn-secondary d-md-none"
                  onClick={() => setShowNavbar(!showNavbar)}
               >
                  ☰
               </button>
            </div>
         </div>
         
         {showNavbar && (
            <div className="container-fluid">
               <div className="row">
                  <div className="col-12">
                     <ul className="navbar-nav d-flex flex-column">
                        {menuItems.map((item) => (
                           <li key={item}>
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
