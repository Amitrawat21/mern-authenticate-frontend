import React , {useContext } from 'react'
import {useNavigate} from "react-router-dom"
import "./header.css"
import Avatar from "@mui/material/Avatar"
import { loginContext } from './ContextProvider/Context.js'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';






const Header = () => {
  const history = useNavigate()
  const { logindata, setLoginData } = useContext(loginContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  }

  const logoutuser = async () => {
    let token = localStorage.getItem("userdatatoken");

    const res = await fetch("/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
            Accept: "application/json"
        },
        credentials: "include"
    });
    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
        console.log("use logout");
        localStorage.removeItem("userdatatoken");
        setLoginData(false)
        history("/");
    } else {
        console.log("error");
    }
}
  



  const goError = () => {
    history("*")
}

const goDash = () =>{
  history("/dashboard")
}


  return (
   <>
  <header>
    <nav><h1>hp Cloud  </h1>
    <div className='avatar'>

      {
              logindata.ValidUserOne ? <Avatar style={{backgroundColor : "salmon"}}  onClick = {handleClick} >{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar>: 
              <Avatar style={{backgroundColor : "blue"}} onClick = {handleClick}/>
      }


   
    </div>
    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        
                
                        {
                            logindata.ValidUserOne ? (
                                <>
                                    <MenuItem onClick={() => {
                                         goDash()
                                        handleClose()
                                    }}>Profile</MenuItem>




                                    <MenuItem onClick={() => {
                                        logoutuser()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) 
                            
                            : (
                                <>
                                    <MenuItem onClick={() => {
                                            goError()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            )
                        }
                                    
                               
                               
                            
                        

                    </Menu>


    </nav>


  </header>
   
   </>
  )
}

export default Header
