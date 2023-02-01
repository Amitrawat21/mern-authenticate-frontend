import React , {useState} from 'react'
import {NavLink} from "react-router-dom"
// import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const[passShow ,  setPassShow] = useState(false)
  const [CpassShow ,  setCPassShow] = useState(false)

  const [input  , setInput] = useState({
    fname : "",
    email : "",
    password : "",
    cpassword : ""

  });


  const setVal = (e)=>{
    
    const {name , value} =e.target
  
    setInput({
      ...input ,
      [name] : value
    })
  }


  const addUserdata = async (e)=>{
    e.preventDefault()
    const {fname , email , password , cpassword} = input
    if(fname === ""){
      alert("please enter your name")
    }
    else if(email === ""){
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
    else if(cpassword === ""){
      alert("please enter your confirm password")

    }
    else if(cpassword.length<6){
      alert("password must me 6 char")
    }
   
    else if(password!== cpassword){
      alert("password and confirm password do not match")

    }
    else{
      // alert(" user registration sucessfully done")

      const data = await fetch("/register", {
        method : "POST",
        headers : {
          "content-type" : "application/Json"
        },
        body : JSON.stringify({
          fname , email , password , cpassword

        })
      });
      const res =await data.json();
      console.log(res)
     
      if(res.status === 200){
        alert("user registration sucessfully")
        setInput({ ...input , fname : "", email : "", password : "" , cpassword : "" });

      }
    }
    

  }

  
  return (
    <>
    <section>
      <div className='form_data'>
        <div className='form_heading'>
          <h1>SIGN UP</h1>
          <p style={{textAlign : "center"}} >fill all the details</p>
        </div>


       <form >

       <div className='form_input'>
        <label htmlFor='fname'>Name</label>
        <input type = "fname" name  = "fname"  id = "fname" placeholder='enter your name' value={input.fname} onChange={setVal}/>
        </div>

        <div className='form_input'>
        <label htmlFor='email'>Email</label>
        <input type = "email" name  = "email"  id = "email" placeholder='enter your email addresss'  value={input.email} onChange={setVal}/>
        </div>


        <div className='form_input'>


        <label htmlFor='password'>password</label>
        <div className='two'>
        <input type = {!passShow ? "password" : "text"} name  = "password"  id = "password" placeholder='enter your password'  value={input.password} onChange={setVal} />
        <div className='showpass' onClick={()=>setPassShow(!passShow)}>
          { !passShow ? "show" : "hide"}
        </div>
        </div>

       
        <label htmlFor='password'>confirm-password</label>
        <div className='two'>
        <input type = {!CpassShow ? "password" : "text"} name  = "cpassword"  id = "cpassword" placeholder='enter your confirm password'  value={input.cpassword} onChange={setVal}/>
        <div className='showpass' onClick={()=>setCPassShow(!CpassShow)}>
          { !CpassShow ? "show" : "hide"}
        </div>
        </div>

        </div>


        <button className='btn' onClick={addUserdata}>Sign up</button>
        <p>Already have an account ?  <NavLink to = "/">Log In</NavLink> </p>
    
       </form>


      </div>

    </section>
    </>
  )
}

export default Register
