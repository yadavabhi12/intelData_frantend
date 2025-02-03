// 



// Components/Login/Login.js
import { useContext, useId, useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import axios from 'axios';
import { ListContext } from '../ContextAPI/ListContext';

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const {url}=useContext(ListContext);

  const [error, setError] = useState(""); // To handle login errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(`${url}login`, formData);
      if (response.status === 200 &&response.data.token) {
       console.log(response)
        localStorage.setItem("userId",response.data.userId)
        localStorage.setItem("token",response.data.token)
        setIsLoggedIn(true);
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while logging in.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    loginUser();
  };

  return (
    <div className="login-main-body">
      <div className="form-container">
        
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="form-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// import { useState } from 'react';
// import './Login.css'; // Import the CSS file
// import logo from '../../assets/logo.png'


// const Login = ({setIsLoggedIn }) => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
    
 

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = (e) => {
//   const {email ,password}=formData;
//         e.preventDefault();
//         if(!email||!password){
//             setIsLoggedIn (false)
//             alert('Invalid credentials');

//         }else{
//             setIsLoggedIn (true);
           
            
//         }
        
//     };

//     return (
//        <div className="login-main-body">
//          <div className="form-container">
//            <div className="logo"> <img src={logo} alt="logo" /></div>
//             <h2 className="form-title">Login</h2>
//             <form onSubmit={handleSubmit} className="form">
//                 <div className="form-group">
//                     <label htmlFor="email">Email address</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                           placeholder=' Enter User Email'
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         placeholder='Enter User Password'
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="form-button">Login</button>
//             </form>
           
//         </div>
//        </div>
//     );
// };

// export default Login;
