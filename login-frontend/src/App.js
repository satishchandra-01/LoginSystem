/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Login} from './pages/login/Login';
import axios from 'axios';
import {WelcomeAdmin} from './pages/welcome/WelcomeAdmin'
import {WelcomeUser} from './pages/welcome/WelcomeUser'
import ProtectedRoute from './ProtectedRoute';


function App() {
  // var getToken={token : localStorage.getItem('token')}
  // var fetchUserData = await axios.post(`${process.env.REACT_APP_API_URL}/tokenData/getData`,getToken,{headers:{
  //     'Content-Type': 'application/json',
  //     'Authorization': getToken
  //   }});
  var [isLoginChecked,setIsLoginChecked]= useState(false);
  var [user,setUser] = useState();
  async function fetchData(){
  var getToken={token : localStorage.getItem('token')}
  if(getToken.token!=null){
    console.log(getToken)
    var fetchUserData = await axios.post(`${process.env.REACT_APP_API_URL}/tokenData/getData`,getToken,{headers:{
      'Authorization': getToken.token
    }});
    setIsLoginChecked(true)
    console.log(isLoginChecked)
    setUser(fetchUserData.data.data);
  }
  }
  useEffect(() => {
    fetchData();
  },[])
  console.log(user)
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login user={user}/>} exact />
      <Route path="*" element={<Login user={user}/>} exact />
        <Route path="/login" key='user' element={<Login user={user} />} exact />
        <Route path="/admin-login" key='admin' element={<Login user={user} />} exact />
        <Route path="/welcomeUser" key='user' element={<ProtectedRoute component={WelcomeUser}
          user={user} requiredRoles={['user','admin']} isLoginChecked={isLoginChecked}
          userRole={user?.role}
        />} exact />        <Route path="/welcomeAdmin" key='admin' element={<ProtectedRoute component={WelcomeAdmin}
          user={user} requiredRoles={['admin']} isLoginChecked={isLoginChecked}
          userRole={user?.role}
        />} exact />
      </Routes>
    </Router>
  )
}

export default App;