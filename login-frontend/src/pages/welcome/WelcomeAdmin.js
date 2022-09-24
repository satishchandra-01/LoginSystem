import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../login/login.css'

export function WelcomeAdmin(){
    let navigate = useNavigate();
    const logoutHandler = async () => {
        localStorage.removeItem("token")
        navigate('/')
        window.location.reload(false);
      }
    return(
        <>
        <div className='btnContainer10'>
            <h1 style={{"textAlign":'center'}}>Hi Admin</h1>
        <Button variant="contained" className='otp' onClick={logoutHandler}>LogOut</Button>
        </div>
        
        </>
    )
}