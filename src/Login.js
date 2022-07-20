import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const [loginError , setLoginError] = useState(false);

    const user = useContext(UserContext);
    const navigate = useNavigate();

    function loginUser(e) {
      e.preventDefault();
      const data = {email,password};
      axios.post('http://localhost:4000/login', data, {withCredentials:true})
      
      .then(response => {
        user.setEmail(response.data.email);
        setEmail('');
        setPassword('');
        setLoginError(false);
        setRedirect(true);
      })
      .catch(() => {
        setLoginError(true);
      });
     } 
     if (redirect) {
        return navigate("/");
      }
     

  return (
    <form action="" onSubmit={e => loginUser(e)}>
        <div>
        {loginError && (
        <div>LOGIN ERROR! PLEASE CHECK YOUR EMAIL AND PASSWORD</div>
         )}
        </div>
        <br/>
      <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/><br />
      <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/><br />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login