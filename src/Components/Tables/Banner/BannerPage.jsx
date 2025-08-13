import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

import BannerForm from "./BannerForm";
import { apiDelete, apiGet } from "../../../api/apiMethods";

const BannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchBanners = async () => {
    try {
      const res = await apiGet("api/banner");
      setBanners(res.data || []);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await apiDelete(`api/banner/${id}`);
        fetchBanners();
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    }
  };

  const handleOpenForm = (banner = null) => {
    setEditData(banner);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setEditData(null);
    setOpenForm(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Banner Management
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddPhotoAlternateOutlinedIcon />}
        onClick={() => handleOpenForm()}
        sx={{ mb: 2 }}
      >
        Add Banner
      </Button>

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners.map((banner, index) => (
              <TableRow key={banner._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{banner.page}</TableCell>
                <TableCell>
                  <img
                    src={banner.imageUrl}
                    alt="banner"
                    style={{ width: "60px", height: "40px", borderRadius: "4px" }}
                  />
                </TableCell>
                <TableCell>{banner.altText}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenForm(banner)}>
                    <EditNoteOutlinedIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(banner._id)}>
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openForm && (
        <BannerForm
          open={openForm}
          onClose={handleCloseForm}
          bannerData={editData}
          fetchBanners={fetchBanners}
        />
      )}
    </div>
  );
};

export default BannerPage;
