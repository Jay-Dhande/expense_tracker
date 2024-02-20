import React from 'react'
import styled from 'styled-components';
import axios from 'axios';
// import {  Link } from "react-router-dom";
// import {bg_img} from '../img/bg_img.png'
import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
const Login = (props) => {
  const {setUser} = useGlobalContext() ; 
  
  const [userData,setuserData]=useState({name:"", passWord:""})
  const loginHandler=async(e)=>{
    e.preventDefault();
    // console.log(userData)
    //api call to check the user
    const resp =await axios.get("http://localhost:3000/login" ,{params:{userData}})
    if(resp.data==="verified"){
      // localstorage.saveItem(userData.name)
      localStorage.setItem("name",userData.name);
      //make islogged in true
      props.setIsLoggedIn(true)
      // props.setUserName(localStorage.getItem("name")) ;
      console.log("logged in" , setUser(localStorage.getItem("name")))  ; 
      
    }
    else{
      
    }
  }
  return (
    <LoginStyled>
      <div className="formWrapper">
        <h1>Log In</h1>
        <form>
          <input type="text" placeholder="enter username"  value={userData.name}  onChange={(e)=>{setuserData({...userData, name:e.target.value})}}/>
          <input type="password" placeholder="password"  value={userData.passWord}  onChange={(e)=>{setuserData({...userData, passWord:e.target.value})}}/>
          <button onClick={loginHandler}>Login</button>
          <p>don't have an account <a href="">SignUp</a></p>
          
        </form>
      </div>
    </LoginStyled>
  );
};

const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width:100vw ;  /* Full height of the viewport */
  
  
  .formWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    height: 50vh;
    width: 30vw;
    max-width: 400px; /* Optional: Set a max-width to limit the form width */
    border-radius: 20px;
    background-color: #5aa9efc0;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  input {
    padding: 10px;
    margin: 10px;
    font-size: x-large;
    border-radius: 10px;
    border: 0px solid black;
  }

  button {
    width: max-content;
    padding: 10px;
    text-align: center;
    margin: auto;
    background-color: aliceblue;
    border-radius: 5px;
    border: 0px solid black;
  }
  p{
    text-align: center;
  }
`;

export default Login;
