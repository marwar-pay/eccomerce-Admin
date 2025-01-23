import { useEffect, useState } from 'react';
import {
    Dialog, Checkbox, FormControlLabel, DialogActions, DialogContent, DialogTitle,
    Button, TextField, Grid, Snackbar, SnackbarContent, IconButton, Autocomplete, CircularProgress
} from '@mui/material';
import { apiPost, apiPut, apiGet } from '../../../api/apiMethods'; // Ensure you have apiPost, apiPut, and apiGet setup
import { EditNoteOutlined } from '@mui/icons-material';

const NewWebsite = ({ dataHandler, initialData, categories }) => {
    const [open, setOpen] = useState(false);
    const [websiteName, setWebsiteName] = useState('');
    const [websiteDescription, setWebsiteDescription] = useState('');
    const [websiteURL, setWebsiteURL] = useState('');
    const [activeStatus, setActiveStatus] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success | error

    useEffect(() => {
        if (initialData) {
            setWebsiteName(initialData.websiteName || '');
            setWebsiteDescription(initialData.websiteDescription || '');
            setWebsiteURL(initialData.websiteURL || '');
            setActiveStatus(initialData.activeStatus || false);
            setSelectedCategories(initialData.categories || []);
        } else {
            resetForm();
        }
    }, [initialData]);

    const resetForm = () => {
        setWebsiteName('');
        setWebsiteDescription('');
        setWebsiteURL('');
        setActiveStatus(true);
        setSelectedCategories([]);
    };

    const handleSubmit = async () => {
        if (!websiteName || !websiteURL) {
            setSnackbarMessage('Please fill all required fields');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const newWebsite = {
            websiteName,
            websiteDescription,
            websiteURL,
            activeStatus,
            categories: selectedCategories.map((cat) => cat._id), // Pass only the IDs of selected categories
        };

        try {
            const response = initialData
                ? await apiPut(`api/website/${initialData._id}`, newWebsite)
                : await apiPost('api/website/add', newWebsite);

            if (response.status === 200) {
                setSnackbarMessage('Request successfully');
                setSnackbarSeverity('success');
                setOpen(false);
                dataHandler();
            }
        } catch (error) {
            setSnackbarMessage('Request failed');
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm();
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            {initialData ? (
                <IconButton onClick={handleClickOpen}>
                    <EditNoteOutlined />
                </IconButton>
            ) : (
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    New Website
                </Button>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{initialData ? "Update" : "New"} Website</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} marginTop={2}>
                            <TextField
                                fullWidth
                                label="Website Name"
                                variant="outlined"
                                required
                                value={websiteName}
                                onChange={(e) => setWebsiteName(e.target.value)}
                                error={!websiteName && open}
                                helperText={!websiteName && open ? 'Website Name is required' : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Website Description"
                                variant="outlined"
                                value={websiteDescription}
                                onChange={(e) => setWebsiteDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Website URL"
                                variant="outlined"
                                required
                                value={websiteURL}
                                onChange={(e) => setWebsiteURL(e.target.value)}
                                error={!websiteURL && open}
                                helperText={!websiteURL && open ? 'Website URL is required' : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                options={categories}
                                getOptionLabel={(option) => option.name}
                                value={selectedCategories}
                                onChange={(event, newValue) => setSelectedCategories(newValue)}
                                isOptionEqualToValue={(option, value) => option._id === value._id}
                                loading={loadingCategories}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Categories"
                                        variant="outlined"
                                        placeholder="Categories"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {loadingCategories ? <CircularProgress size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={activeStatus}
                                        onChange={(e) => setActiveStatus(e.target.checked)}
                                        size="large"
                                        sx={{
                                            color: activeStatus ? 'green' : 'red',
                                            '&.Mui-checked': {
                                                color: 'green',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 28,
                                            },
                                        }}
                                    />
                                }
                                label="Active"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
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

export default NewWebsite;
