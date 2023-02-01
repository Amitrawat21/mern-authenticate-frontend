import React, { useState } from 'react'
import "./mix.css"
import {NavLink , useNavigate} from "react-router-dom"


const Login = () => {

  const[passShow ,  setPassShow] = useState(false)

  const [input  , setInput] = useState({
  
    email : "",
    password : "",
 

  })
   const history = useNavigate()
 

  const setVal = (e)=>{
    
    const {name , value} =e.target
  
    setInput({
      ...input ,
      [name] : value
    })
  }


  const loginUser =  async(e)=>{
    e.preventDefault()
    const { email , password } = input
   
     if(email === ""){
      alert("please enter your email")

    }
    else if(!email.includes("@")){
      alert("enter valid email")
    }
    else if(password === ""){
      alert("please enter your password")

    }
  
    else if(password.length<6){
      alert("password must me 6 char")
    }
  
    else{
      

      const data = await fetch("/login", {
        method : "POST",
        headers : {
          "content-type" : "application/Json"
        },
        body : JSON.stringify({
           email , password 

        })
      });
      const res =await data.json();
      console.log(res)
     
     
      if(res.status === 201){
       
        localStorage.setItem("userdatatoken" , res.result.token)
         history("/dashboard")
        alert("user login sucessfully")
        setInput({ ...input , email : "", password : "" });

      }

      else{
        alert("user password or email invalid")
      }
    }
    

  }

  return (

    <>
    <section>
      <div className='form_data'>
        <div className='form_heading'>
          <h1>welcome back log In</h1>
          <p>hey we are gald that your are back</p>
        
        </div>
       <form >
        <div className='form_input'>
        <label htmlFor='email'>Email</label>
        <input type = "email" name  = "email"  id = "email" placeholder='enter your email addresss' value={input.email} onChange={setVal}/>
        </div>


        <div className='form_input'>
        <label htmlFor='password'>password</label>
        <div className='two'>
        <input type = {!passShow ? "password" : "text"} name  = "password"  id = "password" placeholder='enter your password' value={input.password} onChange={setVal}/>
        <div className='showpass' onClick={()=>setPassShow(!passShow)}>
          { !passShow ? "show" : "hide"}
          
        </div>
        </div>
        </div>
        <button className='btn' onClick={loginUser}>LOGIN</button>
        <p>don't have account?  <NavLink to = "/register">signup</NavLink> </p>
        <p style = {{color : "black"  , fontWeight : "bold"}}>Forgot passowrd?  <NavLink to = "/password-reset">click here</NavLink> </p>
       </form>


      </div>

    </section>
    </>
  )
}

export default Login
