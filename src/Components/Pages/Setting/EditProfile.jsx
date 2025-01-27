import { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Avatar, Alert } from '@mui/material';
import Profile from './Profile';
import { apiGet, apiPost } from '../../../api/apiMethods';
import { useUser } from '../../../Context/UserContext';

const EditProfile = () => {
  const { user ,initializeUser} = useUser();
  const [formData, setFormData] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('success');
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Populate formData with user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        mobile: user.mobile || '',
        email: user.email || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiPost(`api/auth/update`, formData);
      if (response.status === 200) {
        setAlertMessage('Profile updated successfully');
        initializeUser()
        setAlertType('success');
        setShowEditProfile(true);
      } else {
        setAlertMessage('Failed to update profile.');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error updating profile', error);
      setAlertMessage('An error occurred while updating the profile.');
      setAlertType('error');
    }
  };

  if (showEditProfile) {
    return <Profile />;
  }

  if (!user) {
    return (
      <Typography variant="h6">
        {isLoading ? 'Loading...' : 'Unable to load user data. Please try again later.'}
      </Typography>
    );
  }

  const userInitials = user
    ? user.firstName.split(' ').map((name) => name[0]).join('')
    : '';

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ paddingTop: '20px' }}>
        Edit Profile
      </Typography>

      {alertMessage && (
        <Alert severity={alertType} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      )}

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={4} container justifyContent="center">
          <Avatar
            alt={user.firstName}
            sx={{ width: 100, height: 100, bgcolor: 'grey[500]' }}
          >
            {userInitials}
          </Avatar>
        </Grid>
        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  value={formData.mobile || ''}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default EditProfile;
