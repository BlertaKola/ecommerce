import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import styled from '@emotion/styled';

const OrdersContainer = styled.div`
  margin: 20px;
`;

const StyledHeader = styled(Typography)`
  font-family: Arial, sans-serif;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Orders = () => {
    return (
        <OrdersContainer>
            <StyledHeader variant="h4">Orders</StyledHeader>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Total Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Sample data for illustration */}
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>John Doe</TableCell>
                                <TableCell>Product A</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>$50</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2</TableCell>
                                <TableCell>Jane Smith</TableCell>
                                <TableCell>Product B</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>$30</TableCell>
                            </TableRow>
                            {/* Add more rows as needed */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </OrdersContainer>
    );
};

export default Orders;
