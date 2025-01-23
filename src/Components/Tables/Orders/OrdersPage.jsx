import { useState, useEffect } from 'react';
import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Grid,
    Button,
    Pagination,
    useMediaQuery,
    IconButton,
    Snackbar,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import { apiGet } from '../../../api/apiMethods';
import UserDetail from '../Users/UserDetail';
import UserRoleForm from '../Users/UserForm';
import OrderForm from './OrderForm';
import OrderDetail from './OrderDetail';

const OrdersPage = () => {
    const [data, setData] = useState([]);
    const [detailOpen, setDetailOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedWebsite, setSelectedWebsite] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [pageSize, setPageSize] = useState(10);
    const [websites, setWebsites] = useState([]);
    const [filterWebsite, setfilterWebsite] = useState('');
    const API_ENDPOINT = `api/order/allorders`;

    const fetchData = async () => {
        try {
            const response = await apiGet(API_ENDPOINT, {
                referenceWebsite: filterWebsite,
                customerName: searchInput,
                page: currentPage,
                limit: pageSize,
            });
            console.log(response)
            const orders = response.data?.orders;
            setData(orders || []);
            setTotalPages(response.data?.totalPages || 1);
        } catch (error) {
            console.error(error.message);
            setData([]);
        }
    };

    const fetchDropdownData = async () => {
        try {
            const [websitesResponse, categoriesResponse] = await Promise.all([
                apiGet('api/website'),
            ]);
            setWebsites(websitesResponse.data?.websites || []);
            setfilterWebsite(websitesResponse.data?.websites[0]._id);
        } catch (error) {
            console.error('Failed to fetch dropdown data:', error.message);
        }
    };
    useEffect(() => {
        fetchDropdownData();
    }, [])

    useEffect(() => {
        if (filterWebsite) {
            fetchData();
        }
    }, [filterWebsite, currentPage, searchInput, pageSize]);

    const openDialog = (id) => {
        setSelectedItemId(id);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedItemId(null);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSortChange = (field) => {
        setSortBy(field);
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <>
            <Grid container alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs>
                    <Typography variant="h5" gutterBottom>Recived orders</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
                <Grid item xs={6} md={3}>
                    <TextField
                        label="Search by Customer"
                        variant="outlined"
                        fullWidth
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Reference Website</InputLabel>
                        <Select
                            value={filterWebsite}
                            defaultValue=''
                            onChange={(e) => setfilterWebsite(e.target.value)}
                            label="Website"
                        >
                            {websites && websites.map((item, index) =>
                                <MenuItem key={index} value={item._id}>{item.websiteName}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', p: 1 }}>
                <Table sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>#</strong></TableCell>
                            <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Customer</strong></TableCell>
                            <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Shipping Address</strong></TableCell>
                            <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Payment status</strong></TableCell>
                            <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Order status</strong></TableCell>
                            <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Price</strong></TableCell>
                            <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Order Date</strong></TableCell>
                            <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={12} align="center">No data available.</TableCell>
                            </TableRow>
                        ) : (
                            data.map((item, index) => (
                                <TableRow key={item._id}>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                                    {index + (currentPage - 1) * pageSize + 1}
                                    </TableCell>
                                    <TableCell onClick={() => {
                                        setSelectedWebsite(item);
                                        setDetailOpen(true)
                                    }
                                    } sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', cursor: 'pointer' }}>
                                        {item.customer?.firstName + ' ' + item.customer?.lastName || 'NA'}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                                        {`${item.shippingAddress?.address} ${item.shippingAddress?.state}, ${item.shippingAddress?.country} ${item.shippingAddress?.pinCode}` || 'NA'}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                                        {item.paymentStatus || '0'}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                                        {item.status}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                                        {item.totalAmount} &#8377;
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                                        {new Date(item.createdAt).toLocaleString()}
                                    </TableCell>
                                    <TableCell sx={{ display: 'flex', border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                                        {/* <OrderForm userId={item._id} currentRole={item.role} userDetails={item} onRoleChange={fetchData}/> */}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer >
            <OrderDetail
                open={detailOpen}
                onClose={() => {
                    setDetailOpen(false);
                    setSelectedWebsite(null);
                }}
                data={selectedWebsite}
            />
            {/* <DeleteDialog
                itemId={selectedItemId}
                open={dialogOpen}
                onClose={closeDialog}
            /> */}
            <Grid container justifyContent="center">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                />
            </Grid>
        </>
    );
};

export default OrdersPage;
