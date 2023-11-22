import React, { useState, useEffect, useContext } from 'react';
import './SuperAdmin.css'
import axios from 'axios';
import { ENDPOINTS } from '../../endpoints/endpoints';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../../App';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// import Typography from '@mui/material/Typography';
// import { TableforSuperAdmin } from "./TableforSuperAdmin";
import { Button } from '@mui/material';




function UserRequest() {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(Usercontext);
  console.log(state, 'state')
  const [pendingRequests, setPendingRequests] = useState([]);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const Navigate = useNavigate()
  const [showPendingRequestTable, setShowPendingRequestTable] = useState(false);
  const [updatedRows, setUpdatedRows] = useState([]);


  const [header, setHeader] = useState({});
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [rows, setRows] = useState([]);
  const [showactiveUser, setactiveUser] = useState([]);
  const [showrejectUser, setrejectUser] = useState([]);


  const [modalOpen, setModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)
  const token = localStorage.getItem('token')



  const handleApprove = (requestId) => {
    const requestData = {
      approval: "approved",
      userId: requestId,
    };
    axios
      .put(`${ENDPOINTS}/approval`, requestData, { headers: header })
      .then((resp) => {
        console.log(resp.data);
        getAllactiveUser()
      })
      .catch((error) => {
        console.log(error);
      });
    const updatedRequests = pendingRequests.filter((request) => request._id !== requestId);
    setPendingRequests(updatedRequests);
  };

  const handleReject = (requestId) => {
    const requestData = {
      approval: "rejected",
      userId: requestId,
    };
    axios
      .put(`${ENDPOINTS}/approval`, requestData, { headers: header })
      .then((resp) => {
        console.log(resp.data);
        getAllrejectUser()
      })
      .catch((error) => {
        console.log(error);
      });
    const updatedRequests = pendingRequests.filter((request) => request._id !== requestId);
    setPendingRequests(updatedRequests);
  };
const getAllPendingUser=()=>{
  try {
   
    let headers;
    if (user.role === 'superAdmin') {
      headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${ENDPOINTS}/getPendingUserRegistrations`, { headers }).then(resp => {

        setPendingRequests(resp.data)
      })
      setHeader(headers)
    }
  } catch (error) {
    console.log(error)
  }
}
 
  function handleLogout() {
    localStorage.clear()
    dispatch({ type: "CLEAR", payload: null })
    navigate('/signin')
  }
  const handleCloseUserMenu = (setting) => {
    if (setting === 'Logout') {
      localStorage.clear()
      dispatch({ type: "CLEAR", payload: null })
      Navigate('/signin')
    }

    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#5f82c7',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#5f82c7',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


  const getAllactiveUser = () => {
    try {
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${ENDPOINTS}/getapprovedUserRegistrations`, { headers })
        .then(resp => {
          console.log(resp.data)
          const user = resp.data.filter((role) => {
            return role.role !== "superAdmin";
          });
          console.log(user)
          setactiveUser(user)
        })
    } catch (error) {
      console.log(error)
 
    }
  }



  const getAllrejectUser = (headers) => {
    try {
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${ENDPOINTS}/getRejectedUserRegistrations`, { headers })
        .then(resp => {
          console.log(resp.data)
          const user = resp.data.filter((role) => {
            return role.role !== "superAdmin";
          });
          console.log(user)
          setrejectUser(user)
        })
    } catch (error) {
      console.log(error)

    }
  }
  useEffect(() => {
    getAllPendingUser()
    getAllactiveUser();
    getAllrejectUser();
  }, [])
  return (
    <div className="user-request-container">

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
                  <Avatar alt="superAdmin" src="/static/images/avatar/2.jpg" />
                  <Typography sx={{
                    ml: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 500,
                    color: 'white',
                    textDecoration: 'none',
                  }}>Super Admin</Typography>
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


      <>
        <div className="Testerpage"></div>

        <Button
          onClick={() => setShowPendingRequestTable(!showPendingRequestTable)}>

          <Typography variant="h6"
            noWrap component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              textAlign: 'center',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}>

            Pending Request - {pendingRequests.length}
          </Typography>

        </Button>


        {showPendingRequestTable && (
          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 700, margin: '0 auto' }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell> Name</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">Role</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingRequests.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">{row.role}</StyledTableCell>
                    {/* <StyledTableCell align="right">{row.Status}</StyledTableCell> */}
                    <StyledTableCell align="right">
                      <button onClick={() => handleApprove(row._id)} className="approve-button green-button">Approve</button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <button onClick={() => handleReject(row._id)} className="approve-button red-button">Reject</button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <div style={{ margin: '50px' }}>
          <div className="Testerpage"></div>
        </div>

        <Typography variant="h6" noWrap component="a" href="#app-bar-with-responsive-menu" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
          All Active Request
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 700, margin: '0 auto' }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell> Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Role</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showactiveUser.map((row, index) => (

                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.role}</StyledTableCell>
                  <StyledTableCell align="right">Active</StyledTableCell>
                  {/* <StyledTableCell align="right">{row.Approve}</StyledTableCell> */}
                  {/* <StyledTableCell align="right">{row.Reject}</StyledTableCell> */}

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>




        <div style={{ margin: '50px' }}>
          <div className="Testerpage"></div>
        </div>

        <Typography variant="h6" noWrap component="a" href="#app-bar-with-responsive-menu" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
          All Reject Request
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 700, margin: '0 auto' }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell> Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Role</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showrejectUser.map((row, index) => (

                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.role}</StyledTableCell>
                  <StyledTableCell align="right">Reject</StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
      {/* <Button onClick={() => setModalOpen(true)} variant="contained" className='btn' sx={{ m:4 }}>
          Add new Test Case
        </Button> */}

    </div>
  );
}

export default UserRequest;
