import { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Avatar } from '@mui/material';
import EditProfile from './EditProfile'; 
import { useUser } from '../../../Context/UserContext';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false); 
  const { user } = useUser();

  // const userInitial = user ? user.firstName.charAt(0).toUpperCase() : '';
  const userInitial= user ? user.firstName : user?.ownerName;

  if (isEditing) {
    return <EditProfile />; // Render the EditProfile component when editing
  }
  if(!user){
    return(<h5>loading</h5>)
  }

  return (
    <>
      <Grid container spacing={3} sx={{paddingTop:'20px'}}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>Profile Information</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Field</strong></TableCell>
                  <TableCell><strong>Value</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>{user.firstName ? user.firstName :  user?.ownerName +' '+ user.lastName}</TableCell>
                </TableRow>
              
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                </TableRow>
                {user.role === "vendor" && (
  <>
    <TableRow>
      <TableCell>Business Category</TableCell>
      <TableCell>{user.businessCategory}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Description</TableCell>
      <TableCell>{user.description}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Current Balance</TableCell>
      <TableCell>{user.currentBalance}</TableCell>
    </TableRow>
  </>
)}

                
                <TableRow>
                  <TableCell>Member Type</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>Details</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Field</strong></TableCell>
                  <TableCell><strong>Value</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>{user.address}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={4} container direction="column" alignItems="center">
          <Avatar
            alt={user.firstName}
            sx={{ width: 150, height: 150, mb: 2, bgcolor: 'grey.300', color: 'grey.800' }}
          >
            {userInitial}
          </Avatar>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}  // Set editing mode
          >
            Edit Profile
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
