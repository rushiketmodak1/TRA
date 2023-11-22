import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../endpoints/endpoints';

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

const handleApprove = (targetIndex) => {
    // Handle approve logic
};

const handleReject = (targetIndex) => {
    // Handle reject logic
};

export const TableforSuperAdmin = ({ rows, deleteRow, editRow, setRows, idx }) => {
    const [showPendingRequestTable, setShowPendingRequestTable] = useState(true);
    const [updatedRows, setUpdatedRows] = useState([]);


   
    

    return (
        <>
            <div className="Testerpage"></div>
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
                Pending Request
            </Typography>

            <button onClick={() => setShowPendingRequestTable(!showPendingRequestTable)}>
                {showPendingRequestTable ? "Hide Pending Request" : "Show Pending Request"}
            </button>

            {showPendingRequestTable && (
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 700, margin: '0 auto' }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell> Login</StyledTableCell>
                                <StyledTableCell align="right">User</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                                <StyledTableCell align="right">Role</StyledTableCell>
                                <StyledTableCell align="right">Pending</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {updatedRows.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.User}</StyledTableCell>
                                    <StyledTableCell align="right">{row.Status}</StyledTableCell>
                                    <StyledTableCell align="right">{row.Role}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <button onClick={() => handleApprove()} className="approve-button">Approve</button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <button onClick={() => handleReject()} className="approve-button">Reject</button>
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
                All User Request
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 700, margin: '0 auto' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell> Login</StyledTableCell>
                            <StyledTableCell align="right">User</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                            <StyledTableCell align="right">Role</StyledTableCell>
                            <StyledTableCell align="right">Pending</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {updatedRows.map((row, index) => (

                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.User}</StyledTableCell>
                                <StyledTableCell align="right">{row.Status}</StyledTableCell>
                                <StyledTableCell align="right">{row.Role}</StyledTableCell>
                                {/* <StyledTableCell align="right">{row.Approve}</StyledTableCell> */}
                                {/* <StyledTableCell align="right">{row.Reject}</StyledTableCell> */}

                                <StyledTableCell align="right">
                                    <button onClick={() => handleApprove()} className="approve-button">Approve</button>
                                </StyledTableCell>

                                <StyledTableCell align="right">
                                    <button onClick={() => handleReject()} className="approve-button">Reject</button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};