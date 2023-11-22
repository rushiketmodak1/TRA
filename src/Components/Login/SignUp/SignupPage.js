import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { FormControlLabel, Button, Typography, Link } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState, useContext } from "react";
import { Usercontext } from "../../../App"
import { ENDPOINTS } from "../../../endpoints/endpoints";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  axios from "axios";
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { ENDPOINTS } from "../../../endpoints/endpoints";
const SignupPage = () => {
  const { state, dispatch } = useContext(Usercontext);
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const handleFormChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post( `${ENDPOINTS}/signup`, formData);
      if(response.status===200){
        toast.success(response.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(()=>{
          navigate('/signin')
        },1000)
       
      }
          
    } catch (error) {   
      toast.error( error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
      
    }
      
  
  };
  const paperStyle = {
    padding: 20,
    width: 350,
    margin: "80px auto",
  };
  const headerStyle = { margin: 0, marginTop: -2 };
  const btnstyle = { margin: "8px 0", textDecoration: "none" };
  const formcontrolstyle = { marginTop: "5px" };
  const logostyle = { marginTop:"14px" };

 
 

  return (
    <>
      <Grid>
        <ToastContainer/>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h2 style={headerStyle}>Register</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account!
            </Typography>
          </Grid>

          <form onSubmit={handleSubmit}>
            <TextField style={logostyle}
              type="text"
              name="name"
              fullWidth
              label="Name"
              placeholder="Enter your name"
              value={formData.name}
            onChange={handleFormChange}
            />

            <TextField style={logostyle}
              type="email"
              name="email"
              fullWidth
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleFormChange}
            />
            <TextField style={logostyle}
              type="password"
              name="password"
              fullWidth
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleFormChange}
            />
          <FormControl fullWidth style={logostyle}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              name="role"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.role}
              label="role"
              onChange={handleFormChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="tester">Tester</MenuItem>
            </Select>
          </FormControl>

            <FormControlLabel
              style={formcontrolstyle}
              control={<Checkbox name="checkedA" />}
              label="I accept the terms and conditions."
            />
            <Button
              style={btnstyle}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
         
          </form>
          <Link
                href="/signin"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
          <Button
              style={btnstyle}
              fullWidth
              variant="contained"
              color="primary"
            >
           
                Login
              
            </Button>
            </Link>
        </Paper>
      </Grid>
    </>
  );
};

export default SignupPage;
