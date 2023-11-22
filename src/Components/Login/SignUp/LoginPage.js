
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import { Usercontext } from "../../../App";
import axios from 'axios';
import { ENDPOINTS } from '../../../endpoints/endpoints';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function showToast(message, duration = 4000) {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
}


const LoginPage = () => {
  //Authentication check
  const { state, dispatch } = useContext(Usercontext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to store the error message

  const navigate = useNavigate();

  const checkAuth = (e) => {
    e.preventDefault();
    const userData={
      email:email,
      password:password
    }  
axios
.post(`${ENDPOINTS}/signin`, userData)
.then((response) => {
  if(response.status===200){
    toast.success("Login Successful", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  localStorage.setItem("token",response.data.token)
  localStorage.setItem("user",JSON.stringify(response.data.user))
  if(response.data.user.role=="superAdmin"){
    navigate('/superAdmin')
  }
  if(response.data.user.role=="admin"){
    navigate('/admin')
  }
  if(response.data.user.role=="tester"){
    navigate('/tester')
  }
  
  dispatch({ type: "USER", payload: response.data.user });
})
.catch((error) => {
  toast.error( error.response.data.error, {
    position: toast.POSITION.TOP_CENTER,
  });
 
});
    
  }

  const paperStyle = {
    padding: 20,
    width: 350,
    margin: "80px auto",
  };

  const btnstyle = { margin: "8px 0" };
  const headerStyle = { marginTop: -2 };
  const formcontrolstyle = { marginTop: "5px" };
  const logostyle = { top: "9px" };



  return (
    <>
     <ToastContainer/>
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Log In</h2>
        </Grid>
        {/* Error message */}
        {error && (
          <Typography variant="body2" color="error" style={{margin: "7% 0px"}}>
            {error}
          </Typography>
        )}
        <form>
          <TextField
            type="email"
            name="email"
            label="Email"
            placeholder="Enter Email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            style={logostyle}
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControlLabel
            style={formcontrolstyle}
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={checkAuth}
          >
            Log in
          </Button>
       
        </form>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>

        <Typography>
          Do you have an account ?
          <Link href="/signup">Register</Link>
        </Typography>
      </Paper>
     
    </Grid>
    </>
  );
};

export default LoginPage;
