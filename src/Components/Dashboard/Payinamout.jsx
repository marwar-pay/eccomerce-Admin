import { Box, Grid, Paper, Typography, AppBar, Toolbar } from '@mui/material';
import CountUp from 'react-countup';

const Payinout = ({ orders }) => {
  const cardStyles = {
    padding: 2,
    borderRadius: 2,
    boxShadow: 3,
    textAlign: 'center',
    color: '#fff',
    '&:hover': {
      transform: 'scale(1.02)',
      transition: 'transform 0.2s ease-in-out',
    },
  };

  const gradientBackgrounds = {
    overall: 'linear-gradient(to right, #84d9d2, #07cdae)',
    status: 'linear-gradient(to right, #f6e384, #ffd500)',
    payment: 'linear-gradient(to right, #ffc3a0, #ff5733)',
  };

  return (
    <Box>
      {/* Header */}
      <AppBar
        position=""
        sx={{
          borderRadius: '10px',
          background: 'linear-gradient(45deg, #00000073, #2196f3a3)',
          mb: 2,
          mt:3
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            Order Overview
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Order Summary */}
      <Grid container spacing={3}>
        {/* Overall Summary */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              ...cardStyles,
              background: gradientBackgrounds.overall,
            }}
          >
            <Typography sx={{ textTransform: 'uppercase' }} variant="h6">
              Total Orders
            </Typography>
            <Typography variant="body1">{orders?.overall?.totalOrders || 0}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              ₹ <CountUp end={orders?.overall?.totalAmount || 0} decimals={2} duration={2.5} />
            </Typography>
          </Paper>
        </Grid>

        {/* Order Status Overview */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Order Status Overview
          </Typography>
        </Grid>
        {orders?.byStatus.map((item, index) => (
          <Grid key={index} item xs={12} md={3}>
            <Paper
              sx={{
                ...cardStyles,
                background: gradientBackgrounds.status,
              }}
            >
              <Typography sx={{ textTransform: 'uppercase' }} variant="h6">
                {item._id} Orders
              </Typography>
              <Typography variant="body1">{item.totalOrders || 0}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                ₹ <CountUp end={item.totalAmount || 0} decimals={2} duration={2.5} />
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* Payment Status Overview */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
            Payment Status Overview
          </Typography>
        </Grid>
        {orders?.byPaymentStatus.map((item, index) => (
          <Grid key={index} item xs={12} md={3}>
            <Paper
              sx={{
                ...cardStyles,
                background: gradientBackgrounds.payment,
              }}
            >
              <Typography sx={{ textTransform: 'uppercase' }} variant="h6">
                {item._id} Payments
              </Typography>
              <Typography variant="body1">{item.totalOrders || 0}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                ₹ <CountUp end={item.totalAmount || 0} decimals={2} duration={2.5} />
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Payinout;
