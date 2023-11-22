import * as React from 'react';
import './admin.css';
import { useEffect, useState } from "react";
import { Tablesnavbar } from "./Tablesnavbar";
import { Modal } from "./Modal";
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './admin.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// import AdbIcon from '@mui/icons-material/Adb';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { useContext } from "react";
import { Usercontext } from "../../App"
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../../endpoints/endpoints';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';
import { Button, MenuList } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
const AdminComponent = () => {

  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)
  const token = localStorage.getItem('token')
  let headers;

  const { state, dispatch } = useContext(Usercontext);
  const Navigate = useNavigate()
  const [adminState, setAdminState] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);


  const [releaseFormOpen, setReleaseFormOpen] = useState(false);
  const [textField1, setTextField1] = useState('');
  const [textField2, setTextField2] = useState('');
  const [textField3, setTextField3] = useState('');
  const [textField4, setTextField4] = useState('');
  const [sprintName, setSprintName] = useState('');
  const [releaseForm, setReleaseForm] = useState('');
  const [personName, setPersonName] = React.useState('');
  const [testerName, setTesterName] = useState([]);
  const theme = useTheme();

  const [personid, setPersonid] = React.useState([]);
  const [selectidpersonName, setSelectidpersonName] = useState([]);


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [testers, setTesters] = useState({
    kaveri: false,
    komal: false,
    sri: false,
  });
  const [taskIDs, setTaskIDs] = useState({
    task1: false,
    task2: false,
    task3: false,
  });

  const names = [
    'Kaveri',
    'Komal',
    'Sri',
  ];


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value
      // On autofill we get a stringified value.
      // typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleReleaseFormSubmit = (e) => {
    e.preventDefault();
    release()
    console.log("Field 1:", textField1);
    console.log("Field 2:", textField2);
    console.log("Field 3:", textField3);
    console.log("Field 4:", textField4);
    setReleaseFormOpen(false);
  };

  const closeForm = () => {
    setReleaseFormOpen(false);
  };

  const handleTesterChange = (event) => {
    const { name, checked } = event.target;
    setTesters({ ...testers, [name]: checked });
  };

  const handleTaskIDChange = (event) => {
    const { name, checked } = event.target;
    setTaskIDs({ ...taskIDs, [name]: checked });
  };

 


  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



  const handleDeleteRow = (targetIndex) => {

    // alert("Successfull deleted test case");
    console.log("rows inside delete", rows);
    axios.delete(`${ENDPOINTS}/deleteCase/${targetIndex}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }

      })
      .then(TestCaseData => { console.log("DEleted data", TestCaseData.data) })
      .catch(err => console.log("err", err))
    console.log("rows outside delete", rows.filter((testC) => testC._id !== targetIndex));
    setRows(rows.filter((testC) => testC._id !== targetIndex));
  };



  // const submitrelease = (e) => {
  //   e.preventDefault();
  //   const data =
  //   {
  //     requirementID: parseInt(formState.RequirementID),
  //     sprintName:formState.SprintName, 
  //     testerEmails: formState.TesterEmails
  //   }
  //   console.log("Inside Submit button:", data);
  //   if (!validateForm()) return;
  //   axios
  //     .post(`${ENDPOINTS}/addTestCases`, data,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         }

  //       })
  //     .then((response) => {

  //       toast.success("Test case added successfully", {
  //         position: toast.POSITION.TOP_CENTER,
  //       });

  //       //     else{
  //       // toast.error("Network Error", {
  //       //   position: toast.POSITION.TOP_CENTER,
  //       // });

  //     })
  //     .catch((error) => {
  //       toast.error(error.response.data.error, {
  //         position: toast.POSITION.TOP_CENTER,
  //       });

  //     });

  //   closeModal();
  // };


  const handleDownloadcsv = () => {
    console.log("DB Data::", rows);
  }

  const handleEditRow = (targetIndex) => {
console.log("editiing")
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === 'Logout') {
      localStorage.clear()
      dispatch({ type: "CLEAR", payload: null })
      Navigate('/signin')
    }

    setAnchorElUser(null);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
        rows.map((currRow, idx) => {
          if (idx !== rowToEdit) return currRow;

          return newRow;
        })
      );
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  function getStyles(name, selectidpersonName, theme) {
    return {
      fontWeight:
        selectidpersonName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const selectIdhandleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value,"value")
    setPersonid(value
      // On autofill we get a stringified value.
      // typeof value === 'number' ? value.split(',') : value,
    );
  };
console.log(personName,"personName")

const release=()=>{
  const data =
  {
   sectionName:personid,
   sprintName:sprintName,
   testerEmails:personName
  }
  console.log("Inside Submit button:", data);
 try {
  axios
   .post(`${ENDPOINTS}/release`,data)
    .then((resp) => {
console.log(resp.data)
    })
 } catch (error) {
  console.log(error)
 }   
}
const getTesters=()=>{
  axios.get(`${ENDPOINTS}/testersList`)
  .then((resp)=>{
    // console.log(resp.data,"testers")
    if(resp.data.message){
      return
    }
   const email= resp?.data?.map((email,i)=>{
     return email.email
    })
    setTesterName(email)
    
  })
}
const getTestCases=()=>{
  try {
    if (user.role === 'admin') {
      headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${ENDPOINTS}/getAllTestCase`, { headers })
      .then(resp => {
  
        setRows(resp.data)
        
  const sectionArray=resp.data.map((section,i)=> {
  if(section.isRelease===false){
    return section.sectionName
  }
  })
  const filteredArray=[...new Set(sectionArray)]
  setSelectidpersonName(filteredArray)
       
        console.log("DAta a ", filteredArray)
      })
  }} catch (error) {
    console.log(error)
  }
}
useEffect(() => {
getTesters()
getTestCases()
}, [])
console.log(testerName,"in selectidpersonName " ,selectidpersonName);
  return (<>
    <div className="App">

      <AppBar position="static" sx={{ mb: 4 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
            Pester-Automate
            </Typography>
            <Box sx={{ flexGrow: 0 }} className="Profile">
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="A" src="/static/images/avatar/2.jpg" />
                  <Typography sx={{
                    ml: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 500,
                    color: 'white',
                    textDecoration: 'none',
                  }}>Admin</Typography>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={(e) => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* {adminState && ( */}
      <Tablesnavbar rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      {/* )} */}

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Button onClick={() => setModalOpen(true)} variant="contained" className='btn' sx={{ m: 4 }}>
          Add new Test Case
        </Button>

        <Button
          onClick={() => setReleaseFormOpen(true)}
          variant="contained"
          className="btn"
          sx={{ m: 4 }}
        >
          Add new Release Case
        </Button>
      </div>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setAdminState(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          rows={rows}
          setRows={setRows}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
          getTestCases={getTestCases()}
        />
      )}

      {releaseFormOpen && (
          <form style={{ background: "white" }} onSubmit={handleReleaseFormSubmit} onClick={(e) => e.stopPropagation()}>
            <TextField
              label="Release Name"
              variant="outlined"
              value={sprintName}
              onChange={(e) => setSprintName(e.target.value)}
              fullWidth
              margin="normal"
            />

            <div>
              <label>Select tester: </label>

              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tester</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  // multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected}
                  MenuProps={MenuProps}
                >
                  {testerName.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>



            <div>
              <label>Select Sections: </label>

              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Ids</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personid}
                  onChange={selectIdhandleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {selectidpersonName.map((id) => (
                    
                    <MenuItem
                      key={id}
                      value={id}
                      style={getStyles(id, selectidpersonName, theme)}
                    >
                      {id}
                    </MenuItem>
                    ))}
                </Select>
              </FormControl>

            </div>
            <Button type="submit" variant="contained" className="btn" sx={{ m: 4 }} onClick={handleReleaseFormSubmit}>
              Submit
            </Button>
          </form>
          
      )}
    </div>



  </>);
}

export default AdminComponent;
// .form-container {
//   background-color: white;
//   padding: 16px;
//   border-radius: 4px;
//   box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
// }