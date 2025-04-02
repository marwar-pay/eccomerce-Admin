import { useState, useEffect } from "react";
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
} from "@mui/material";
import { apiGet } from "../../../api/apiMethods";

const WalletPage = () => {
  const [data, setData] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Data from API
  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const API_URL = "api/vendor-wallet";
      const response = await apiGet(API_URL, { page: currentPage, limit: 10 });
      
      console.log("API Response:", response.data); // Debugging

      if (response.data.success) {
        setData(response.data.data || []);
        setTotalPages(Math.ceil(response.data.limit / 10));
      } else {
        setData([]);
    
      }
    } catch (err) {
  
      console.error(err);
    }

    setLoading(false);
  };

  // Fetch data on component mount and when currentPage changes
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Handle Search
  const handleSearch = () => {
    if (!searchDate) return;
    const filteredData = data.filter((item) => item._id === searchDate);
    setData(filteredData);
  };

  // Handle Page Change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Grid container alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs>
          <Typography variant="h5" gutterBottom>
            Vendor Wallet
          </Typography>
        </Grid>
      </Grid>

      {/* Search & Filters */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}>
          <TextField
            label="Search by Date (YYYY-MM-DD)"
            variant="outlined"
            fullWidth
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={handleSearch} fullWidth>
            Search
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="outlined" onClick={fetchData} fullWidth>
            Reset
          </Button>
        </Grid>
      </Grid>

      {/* Data Table */}
      <TableContainer component={Paper} sx={{ border: "1px solid #ddd", p: 1 }}>
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                <strong>#</strong>
              </TableCell>
              <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                <strong>Date</strong>
              </TableCell>
              <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                <strong>Total Amount (₹)</strong>
              </TableCell>
              <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                <strong>Order IDs</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} align="center" style={{ color: "red" }}>
                  {error}
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data available.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                    {item._id}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                    {item.totalAmount} ₹
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd", padding: "8px" }}>
                    {item.orderIds.join(", ")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
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

export default WalletPage;
