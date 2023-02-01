import React, { useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { loginContext } from './ContextProvider/Context'




const Dashboard = () => {
  const { logindata, setLoginData } = useContext(loginContext)
  console.log(logindata)

  const history = useNavigate()

  const dashBoard = async () => {
    let token = localStorage.getItem("userdatatoken")



    const res = await fetch("/validuser", {

      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });



    const data = await res.json()
    console.log(data)

    if (data.status == 401 || !data) {
      console.log("error page")
      history("*");
    } else {
      console.log("user verify");
      setLoginData(data)
      history("/dashboard");
    }


  }



  useEffect(() => {
    dashBoard()
  }, [])



  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <img src='./user.png' alt="" style={{ width: "400px", marginTop: "20px", height: "500px", backgroundColor: "blue" }} />
      
         <h1> UserEmail :{logindata ?logindata.ValidUserOne.email : ""}</h1> 



    </div>
  )
}

export default Dashboard
