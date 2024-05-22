import { Grid, Paper, Box, Typography } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BugReportIcon from '@mui/icons-material/BugReport';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Overview = () => {
    const data = [
        { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
    ];

    const pieData = [
        { name: 'Sales', value: 400 },
        { name: 'Expenses', value: 300 },
        { name: 'Profit', value: 300 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (<>
        <h4 class="MuiTypography-root MuiTypography-h4 css-1axpcc0">Hi, Welcome back 👋</h4>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" padding={2} bgcolor="#0088FE" color="white">
                        <Box>
                            <LocalMallIcon />
                            <Typography variant="h4">714k</Typography>
                        </Box>
                        <Typography variant="subtitle2">Weekly Sales</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" padding={2} bgcolor="#00C49F" color="white">
                        <Box>
                            <AccountCircleIcon />
                            <Typography variant="h4">1.35m</Typography>
                        </Box>
                        <Typography variant="subtitle2">New Users</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" padding={2} bgcolor="#FFBB28" color="white">
                        <Box>
                            <ShoppingCartIcon />
                            <Typography variant="h4">1.72m</Typography>
                        </Box>
                        <Typography variant="subtitle2">Item Orders</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" padding={2} bgcolor="#FF8042" color="white">
                        <Box>
                            <BugReportIcon />
                            <Typography variant="h4">234</Typography>
                        </Box>
                        <Typography variant="subtitle2">Bug Reports</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3}>
                    <Box>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3}>
                    <Box>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    // innerRadius={60}
                                    // outerRadius={80}
                                    fill="#8884d8"
                                    // paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
        </>
    );
}

export default Overview;
