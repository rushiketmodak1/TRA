import * as React from 'react';
import { useEffect, useState ,useContext} from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import EditButton from "./EditButton";
import Testadd from './Testadd';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import AddingTextfield from './ScenarioVideos/AddingTextfield.mp4';
import axios from 'axios';
import './TestTable.css';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import MenuItem from '@mui/material/MenuItem';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../../App';
import { ENDPOINTS } from '../../endpoints/endpoints';
import LoginPage from '../Login/SignUp/LoginPage';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d261",
    color: "black",
    fontSize: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    // backgroundColor: "white",
  },
}));

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
    height: "25px"
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Actions = styled('span')({
  display: 'flex',
  justifyContent: 'space-around',
});

const DeleteButton = styled(BsFillTrashFill)({
  cursor: 'pointer',
  color: '#e10d05',
});


// const EditButton = styled(BsFillPencilFill)({
//   cursor: 'pointer',
// });

// function createData(result, status, remarks, bugId, imageUp, videoUp, testerName) {
//   return { result, status, remarks, bugId, imageUp, videoUp, testerName };
// }


function exportToExcel(data) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'createData.xlsx');
}
// const rows = [
//   createData('Frozen yoghurt', 'pgvhjvcgfcgfc', 6.0, 24, 'abc', 'bca', 'Komal'),
//   createData('Ice cream sandwich', 'ghhjhjijiohgvgh', 9.0, 37, 'abc', 'bca', 'Komal'),
//   createData('Eclair', 'hgghhhjhjhj', 16.0, 24, 'abc', 'bca', 'Kaveri'),
//   createData('Cupcake', 'ghhjhjh', 3.7, 67, 'abc', 'bca', 'Kaveri'),
//   createData('Gingerbread', 'gfcghhjjh', 16.0, 49, 'abc', 'bca', 'Srilaxmi'),
// ];

export default function TestsTable() {
  const { state, dispatch } = useContext(Usercontext);
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  
  const getAllTestCases = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      console.log(user)
      axios.get(`${ENDPOINTS}/releasedTestCases`)
      .then((resp) => {
        
    const data=resp.data.filter((name,i)=>name.testerEmails===user.email)
    setRows(data)
      })
      
    } catch (error) {
      console.log(error)
    }
    }
    
  
  useEffect(() => {
    getAllTestCases()
  }, [])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    if(setting==='Logout'){
      localStorage.clear()
      dispatch({type:"CLEAR",payload:null})
      navigate('/signin')
    }
  
    setAnchorElUser(null);
  };
  
  const handleUpdateData = (updatedData) => {
    // Update the table data with the new data
    // setRows(updatedData);
    console.log("khalid",updatedData)
  };

  return (
    <>
        <AppBar position="static" sx={{mb:4}}>
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
                <Avatar alt="Tester" src="/static/images/avatar/2.jpg" />
                <Typography   sx={{
                  ml:2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 500,
              color: 'white',
              textDecoration: 'none',
             }}>Tester</Typography>
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
                <MenuItem key={setting} onClick={(e)=>handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
         </Toolbar>
         </Container>
         </AppBar> 
      <TableContainer style={{ marginTop: "10px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead  >
            <TableRow>
              <StyledTableCell>Requirement ID</StyledTableCell>
              <StyledTableCell>Section Name</StyledTableCell>
              <StyledTableCell>Requirement </StyledTableCell>
              <StyledTableCell>Test Goal</StyledTableCell>
              <StyledTableCell>Test Case ID</StyledTableCell>
              <StyledTableCell>Pre Condition</StyledTableCell>
              <StyledTableCell>Test Description</StyledTableCell>
              <StyledTableCell>Expected Result</StyledTableCell>
              <StyledTableCell>Actual Result</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Remarks</StyledTableCell>
              <StyledTableCell align="center">Bug ID</StyledTableCell>
              <StyledTableCell align="center">Image Upload</StyledTableCell>
              <StyledTableCell align="center">Video Upload</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="center" style={{ backgroundColor: "#9c9b9a30" }}>{row.requirementID}</StyledTableCell>
                <StyledTableCell align="center" style={{ backgroundColor: "#9c9b9a30" }}>{row.sectionName}</StyledTableCell>
                <StyledTableCell align="center" style={{ backgroundColor: "#9c9b9a30" }}>{row.requirement}</StyledTableCell>
                <StyledTableCell align="center" style={{ backgroundColor: "#9c9b9a30" }}>{row.testGoals}</StyledTableCell>
                <StyledTableCell align="center" style={{ backgroundColor: "#9c9b9a30" }}>{row.testCaseID}</StyledTableCell>
                <StyledTableCell align="center" style={{ backgroundColor: "#9c9b9a30" }}>{row.preCondition}</StyledTableCell>
                <StyledTableCell align="center" style={{ backgroundColor: "#9c9b9a30" }}>{row.testDescription}</StyledTableCell>
                <StyledTableCell align='center' style={{ backgroundColor: "#9c9b9a30" }}>{row.expectedResult}</StyledTableCell>

                <StyledTableCell component="th" scope="row">{row.actualResult}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="center">{row.remarks}</StyledTableCell>
                <StyledTableCell align="center">{row.bugId}</StyledTableCell>
                <StyledTableCell align="center">

                  {/* <input type="file" id="myFile" name="filename" /> */}
                  {/* <input type="submit"/> */}

                </StyledTableCell>
                <StyledTableCell align="center">
                 
                     {/* <input type="file" id="myFile" name="filename" /> */}
                
                </StyledTableCell>
                {/* <StyledTableCell align="center">{row.TestersName}</StyledTableCell> */}
                <StyledTableCell style={{ width: "65px" }}>
                  <Actions onClick={()=>handleUpdateData(row._id)}>
                    {/* <DeleteButton className="delete-btn"
                    /> */}
                    <EditButton onUpdateData={handleUpdateData} id={row._id} index={index} rows={rows} setRows={setRows}/>
                  </Actions>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
      <Button startIcon={<FileDownloadIcon />} className="btn1" variant="contained" sx={{ m:4}} onClick={() => exportToExcel(rows)}>Export data to an Excel sheet</Button>
      
      </div>


      {/* <div className="App1">
      <button className="btn1" onClick={() => exportToExcel(rows)}>Export data to an Excel sheet</button>
      </div> */}
    </>
  );
}
