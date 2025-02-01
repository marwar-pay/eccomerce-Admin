import { Box, Grid, Paper, Typography, AppBar, Toolbar } from '@mui/material';
import CountUp from 'react-countup';
import { useUser } from '../../Context/UserContext';

const UserOverview = ({ users }) => {
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

  const { user } = useUser()

  const gradientBackgrounds = {
    user: 'linear-gradient(to right, #673ab7, #512da8)',
  };

  // Calculate total users
  const totalUsers = users?.reduce(
    (sum, user) => sum + (user.totalUsers || 0),
    0
  );

  return (
    <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
      {/* Header */}
      <AppBar
        position="static"
        sx={{
          borderRadius: '10px',
          background: 'linear-gradient(45deg, #00000073, #673ab7a3)',
          mb: 2,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Overview
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Total Users Summary */}
      {user && user.role === "super-admin" && <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              ...cardStyles,
              background: gradientBackgrounds.user,
            }}
          >
            <Typography sx={{ textTransform: 'uppercase' }} variant="h6">
              Total Users
            </Typography>
            <Typography variant="body1">
              <CountUp end={totalUsers || 0} duration={2} />
            </Typography>
          </Paper>
        </Grid>
      </Grid>}

      {/* User Summary by Reference Website */}
      <Grid container spacing={3}>
        {users &&
          users.map((user, index) => (
            <Grid key={index} item xs={12} md={6}>
              <Paper
                sx={{
                  ...cardStyles,
                  background: gradientBackgrounds.user,
                }}
              >
                <Typography sx={{ textTransform: 'uppercase' }} variant="h6">
                  {user.referenceWebsite}
                </Typography>
                <Typography variant="body1">
                  Total Users: {user.totalUsers || 0}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <CountUp end={user.totalUsers || 0} duration={1.5} />
                </Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default UserOverview;
