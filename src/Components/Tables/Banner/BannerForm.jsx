import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { apiPost, apiPut } from "../../../api/apiMethods";

const BannerForm = ({ open, onClose, bannerData, fetchBanners }) => {
  const [title, setTitle] = useState(""); // UI field, sent as page in API
  const [description, setDescription] = useState(""); // UI field, sent as altText in API
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const referenceWebsite = import.meta.env.VITE_API_REFERENCE_WEBSITE; // from env



  useEffect(() => {
  if (bannerData) {
    setTitle(bannerData.page || "");
    setDescription(bannerData.altText || "");
    setPreview(bannerData.imageUrl || ""); // <-- use imageUrl from API
  }
}, [bannerData]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("page", title);
  formData.append("altText", description);
  formData.append("referenceWebsite", referenceWebsite);

  if (image) {
    formData.append("image", image);
  }

  try {
    if (bannerData) {
      await apiPut(`api/banner/${bannerData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    } else {
      await apiPost("api/banner", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    }
    fetchBanners();
    onClose();
  } catch (error) {
    console.error("Error saving banner:", error);
  }
};


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{bannerData ? "Edit Banner" : "Add New Banner"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: "10px" }}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BannerForm;
