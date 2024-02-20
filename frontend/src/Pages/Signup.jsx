import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import bg_img from "../img/Billdu_Tracking-business-expenses-and-expense-tracker.jpg"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  const [userData,setUserData]=useState({
    name:"",
    passWord:"",
    phoneNo:""
  })
  // const Navigate=useNavigate();
  const submitHandler=async(e)=>{
    e.preventDefault();
    console.log(userData)
    //api call to mongodb to save the user data
    const res = await axios.post("http://localhost:3000/signUp", userData);
    // if(res.data==="done"){
    //   Navigate("/login");
    // }
  }
  return (
    <SignUpStyled>
      <div className="formWrapper">
        <h1>Sign Up</h1>
        <form>
          <input type="text" placeholder="enter username" value={userData.name}  onChange={(e)=>{setUserData({...userData, name:e.target.value})}}/>
          <input type="password" placeholder="password" value={userData.passWord}  onChange={(e)=>{setUserData({...userData, passWord:e.target.value})}}/>
          <input type="number" placeholder='Enter contact Number' value={userData.phoneNo}  onChange={(e)=>{setUserData({...userData, phoneNo:e.target.value})}}/>

          <button onClick={submitHandler}>Sign/Up</button>
          <p>Already an account </p>
        </form>
      </div>
    </SignUpStyled>
  )
}

const SignUpStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 100vh;
  width:100vw ;  /* Full height of the viewport */
  background-image: url(${bg_img});
  background-size: cover;
  .formWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    height: 60vh;
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
`