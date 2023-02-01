import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const PasswordReset = () => {
  const [email , SetEmail] = useState("")
  const [message , SetMessage] = useState("")

  const setVal = (e)=>{
    SetEmail(e.target.value)

  }

  const sendLink = async (e)=>{
    e.preventDefault();

    const res = await fetch("/sendpasswordLink" , {
      method  : "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body : JSON.stringify({email})

    })

    const data  = await res.json()

    if(data.status == 201){
      SetEmail("")
      SetMessage(true)
    }

    else {
      toast.error("invalid")
    }

  }
  return (
    <>
        <section>
      <div className='form_data'>
        <div className='form_heading'>
          <h1>Enter Your Email</h1>
         
        
        </div>

        
         { message ?<p style={{color : "green" , fontWeight : "bold"}}>password resetlinksucesfully sent to your email addersss</p> : ""}
        
       <form >
        
       <ToastContainer />
        <div className='form_input'>
        <label htmlFor='email'>Email</label>
        <input type = "email" name  = "email"  id = "email" placeholder='enter your email addresss' value={email} onChange={setVal}/>
        </div>
        <button  className='btn' onClick={sendLink}>login</button>


       </form>


      </div>

    </section>
    
    </>
  )
}

export default PasswordReset
