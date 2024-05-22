import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography } from '@mui/material';
import styled from '@emotion/styled';
import axios from 'axios';

const StyledTableContainer = styled(TableContainer)`
  max-width: 800px;
  margin: auto;
  margin-top: 20px;
`;

const StyledHeader = styled.h1`
  text-align: center;
`;

const StyledTableCell = styled(TableCell)`
  border: 1px solid #e0e0e0; /* Set border color */
  padding: 12px; /* Add padding */
`;

const StyledTable = styled(Table)`
  border-collapse: separate; /* Separate table borders */
  border-spacing: 0; /* Set border spacing */
  width: 100%;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f9f9f9; /* Alternate row background color */
  }
`;

const StyledTypography = styled(Typography)`
  font-weight: bold;
  font-size: 14px;
`;

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <StyledHeader>Customers</StyledHeader>
      <StyledTableContainer component={Paper}>
        <StyledTable aria-label="Customers table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>

            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : users
            ).map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell><StyledTypography>{user.first_name}</StyledTypography></StyledTableCell>
                <StyledTableCell><StyledTypography>{user.last_name}</StyledTypography></StyledTableCell>
                <StyledTableCell><StyledTypography>{user.email}</StyledTypography></StyledTableCell>
                <StyledTableCell><StyledTypography>{user.address}</StyledTypography></StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledTableContainer>
    </>
  );
};

export default Customers;
