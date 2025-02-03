import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { Error404_page } from "./pages/Error404_page/Error404_page";
// import MappingForm from "./OnlyTesting";

function App() {
  // Persistent Login State
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) ||
     false
  );

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
   <>
   {/* <MappingForm/> */}
    <Router>
<Routes>

  <Route path="/error" element={<Error404_page />} />


  <Route
    path="/"
    element={
      isLoggedIn ? <Navigate to="/home/sms" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />
    }
  />


  <Route
    path="/home/*"
    element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" replace />}
  />


  <Route path="*" element={<Navigate to="/error" replace />} />
</Routes>
</Router>  


   </>
  );
}

export default App;







//  <Router>
// <Routes>
//   {/* Error Page Route */}
//   <Route path="/error" element={<Error404_page />} />

//   {/* Login or Home Redirect */}
//   <Route
//     path="/"
//     element={
//       isLoggedIn ? <Navigate to="/home/sms" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />
//     }
//   />

//   {/* Protected Routes */}
//   <Route
//     path="/home/*"
//     element={isLoggedIn ? <Home /> : <Navigate to="/" replace />}
//   />

//   {/* Fallback Route */}
//   <Route path="*" element={<Navigate to="/error" replace />} />
// </Routes>
// </Router> 