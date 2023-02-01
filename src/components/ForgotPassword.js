import React , {useEffect , useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useParams , useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const {id,token}= useParams()
    const history = useNavigate()
    const [password, setPassword] = useState("");
    const [message , SetMessage] = useState("")

    const userValid = async () => {
        const res = await fetch(`/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json()
        console.log(data)

        if (data.status == 201) {
            setPassword("")
            SetMessage(true)
            console.log("user valid")
        } else {
            toast.error("! token expire please generate new link")
            history("*")
        }
    }


    const setval = (e) => {
        setPassword(e.target.value)
    }


    const sendPassword = async (e)=>{
        e.preventDefault()
        const res = await fetch(`/${id}/${token}` , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body :JSON.stringify({password})
        })

        const data = await res.json()
        console.log(data)

        if(data.status == 201){
            console.log("user amit valid ")
        }

        else {
            history("*")
        }

    }




    useEffect(() => {
        userValid()
    }, [])

  
  return (
   <>
      <section>
      <div className='form_data'>
        <div className='form_heading'>
          <h1>Enter Your New Password</h1>
         
        
        </div>

        
       
       <form >
        
       <ToastContainer />
        <div className='form_input'>
        <label htmlFor='email'> New Password</label>
        <input type = "password" name  = "password"  id = "email" placeholder="enter your new password" value = {password} onChange={setval}/>
        </div>
        <button  className='btn' onClick={sendPassword}>Send</button>


       </form>


      </div>

    </section>
   
   </>
  )
}

export default ForgotPassword
