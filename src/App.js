import {Route,Routes,Link} from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Register from './Register';
import Home from "./Home";
import Login from './Login';
import UserContext from './UserContext';

function App() {
  const [email,setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/user', {withCredentials:true})
      .then(response => {
        setEmail(response.data.email);
      });
  }, []);

  function logout() {
    axios.post('http://localhost:4000/logout', {}, {withCredentials:true})
      .then(() => setEmail(''));
  }

  return (
    <div className="App">

      <UserContext.Provider value={{email,setEmail}}>
      <nav>
          <Link to={'/'}>Home</Link>
          {!email && (
            <>
              <Link to={'/login'}>Login</Link>
              <Link to={'/register'}>Register</Link>
            </>
          )}
          {!!email && (
            <a onClick={e => {e.preventDefault();logout();}} style={{cursor:"pointer"}}>Logout</a>
          )}
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route  path='/register' element={<Register/>} />
            <Route  path='/login' element={<Login/>} />
          </Routes>
        </main>
      
      </UserContext.Provider>
      
       
        {/* <main>
          <Routes>
            <Route path='/' element={} />
            <Route exact path={'/register'} component={Register} />
            <Route exact path={'/login'} component={Login} />
          </Routes>
        </main> */}
  
    </div>
  );
}

export default App;
