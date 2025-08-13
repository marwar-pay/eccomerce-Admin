import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    Grid,
    Snackbar,
    SnackbarContent,
    Typography,
    IconButton
} from '@mui/material';
import { apiPost, apiPut } from '../../../api/apiMethods';
import { EditNoteOutlined } from '@mui/icons-material';

const CategoryForm = ({ dataHandler, initialData }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success | error

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setPreviewImage(initialData.image || null);
        } else {
            setName('');
            setDescription('');
            setPreviewImage(null);
        }
        setImageFile(null);
    }, [initialData]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!name) {
            setSnackbarMessage('Please fill all required fields');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (imageFile) {
            formData.append('categoryImage', imageFile);
        }

        try {
            const response = initialData
                ? await apiPut(`api/categories/${initialData._id}`, formData, {
                      headers: { 'Content-Type': 'multipart/form-data' },
                  })
                : await apiPost('api/categories', formData, {
                      headers: { 'Content-Type': 'multipart/form-data' },
                  });

            if (response.status === 200) {
                setSnackbarMessage(response.data.message || 'Request successfully');
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

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSnackbarClose = () => setSnackbarOpen(false);

    return (
        <div>
            {initialData ? (
                <IconButton onClick={handleClickOpen}>
                    <EditNoteOutlined />
                </IconButton>
            ) : (
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    New Category
                </Button>
            )}

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle paddingBottom={2} fontSize={22}>
                    {initialData ? 'Update' : 'New'} Category
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} paddingTop={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={!name && open}
                                helperText={!name && open ? 'Name is required' : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                variant="outlined"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined" component="label">
                                {imageFile ? imageFile.name : 'Upload Category Image'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </Button>
                            {previewImage && (
                                <div style={{ marginTop: 10 }}>
                                    <Typography variant="body2" color="textSecondary">
                                        Preview:
                                    </Typography>
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        style={{
                                            width: '100%',
                                            maxHeight: 200,
                                            objectFit: 'contain',
                                            marginTop: 5,
                                            borderRadius: 4,
                                        }}
                                    />
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        Submit
                    </Button>
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

export default CategoryForm;
