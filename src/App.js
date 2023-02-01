import Login from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";
import {Routes , Route} from "react-router-dom"
import Dashboard from './components/Dashboard.js';
import Error from "./components/Error";
import {useNavigate} from "react-router-dom"
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import { loginContext } from "./components/ContextProvider/Context";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect , useContext , useState } from "react";



function App() {
  
  const [data, setData] = useState(false);
  const { logindata, setLoginData } = useContext(loginContext)
  let history = useNavigate()
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
  

    if (data.status == 401 || !data) {
      console.log("error page")
  
    } else {
      console.log("user verify");
      setLoginData(data)
      history("/dashboard");
    }


  }


  useEffect(()=>{
  setTimeout(()=>{
    dashBoard()
    setData(true)
  }, 2000)

  },[])

  return (

   <>
   {
    data ? (
    <>
   <Header/>
   <Routes>
    <Route path="/" element= {<Login/>}/>
    <Route path="/register" element= {<Register/>}/>
    <Route path="/dashboard" element= {<Dashboard/>}/>
    <Route path= "*" element= {<Error/>}/>
    <Route path="/forgotpassowrd/:id/:token" element= {<ForgotPassword/>}/>
    <Route path="/password-reset" element= {<PasswordReset/>}/>
   </Routes>
   </>
    ) :  <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
    Loading... &nbsp;
    <CircularProgress />
  </Box>
  
}


   </>
  );
}

export default App;
