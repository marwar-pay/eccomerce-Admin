import { useEffect, useState } from 'react';
import {
  Dialog,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
  SnackbarContent,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
} from '@mui/material';
import { EditNoteOutlined } from '@mui/icons-material';
import { apiPut } from '../../../api/apiMethods';

const UserRoleForm = ({ userId, currentRole, userDetails, onRoleChange }) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(currentRole || 'user');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    setRole(currentRole || 'user');
  }, [currentRole]);

  const handleSubmit = async () => {
    try {
      const response = await apiPut(`api/auth/updateRole/${userId}`, { role });
      if (response.status === 200) {
        setSnackbarMessage('User role updated successfully');
        setSnackbarSeverity('success');
        setOpen(false);
        onRoleChange();
      }
    } catch (error) {
      setSnackbarMessage('Failed to update user role');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(true)} color="primary">
        <EditNoteOutlined />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update User Role</DialogTitle>
        <DialogContent>
          {/* User Card */}
          <Card
            elevation={3}
            style={{
              marginBottom: '20px',
              borderRadius: '10px',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={{ bgcolor: 'primary.main', marginRight: '15px'}}
                  alt={`${userDetails.firstName} ${userDetails.lastName}`}
                >
                  {userDetails.firstName[0]} {userDetails.lastName[0]}
                </Avatar>
                <div>
                  <Typography variant="h6">
                    {userDetails.firstName} {userDetails.lastName}
                  </Typography>
                  <Typography color="textSecondary">{userDetails.email}</Typography>
                </div>
              </Box>
            </CardContent>
          </Card>

          {/* Role Selector */}
          <FormControl fullWidth style={{ marginTop: '20px' }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              defaultValue=''
              onChange={(e) => setRole(e.target.value)}
              style={{ backgroundColor: '#f7f9fc', borderRadius: '8px' }}
            >
              {['user', 'admin', 'vendor'].map((roleOption) => (
                <MenuItem key={roleOption} value={roleOption}>
                  {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{
            backgroundColor: snackbarSeverity === 'success' ? 'green' : 'red',
          }}
        />
      </Snackbar>
    </div>
  );
};

export default UserRoleForm;
