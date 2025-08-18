

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
import { Editor } from "@tinymce/tinymce-react";
import { Snackbar, Alert } from "@mui/material";

const BannerForm = ({ open, onClose, bannerData, fetchBanners }) => {
  const [title, setTitle] = useState(""); // sent as page
  const [description, setDescription] = useState(""); // sent as altText
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
const [snackbarMessage, setSnackbarMessage] = useState('');
const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success | error
const [snackbarOpen, setSnackbarOpen] = useState(false);

  const referenceWebsite = import.meta.env.VITE_API_REFERENCE_WEBSITE;

  useEffect(() => {
    if (bannerData) {
      setTitle(bannerData.page || "");
      setDescription(bannerData.altText || ""); // HTML from API
      setPreview(bannerData.imageUrl || "");
    } else {
      setTitle("");
      setDescription("");
      setPreview("");
      setImage(null);
    }
  }, [bannerData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // const file = e.target.files
    console.log(file)
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };


//   const handleSubmit = async () => {
//   const formData = new FormData();
//   formData.append("page", title);
//   formData.append("altText", description);
//   formData.append("referenceWebsite", referenceWebsite);

//   if (image) {
//     // New image selected
//     formData.append("image", image);
//   } else if (bannerData?.imageUrl) {
//     // No new image selected → send old image URL
//     formData.append("image", bannerData.imageUrl);
//   }

//   try {
//     if (bannerData) {
//       await apiPut(`api/banner/${bannerData._id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     } else {
//       await apiPost("api/banner", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     }
//     fetchBanners();
//     onClose();
//   } catch (error) {
//     console.error("Error saving banner:", error);
//   }
// };
   

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("page", title);
  formData.append("altText", description);
  formData.append("referenceWebsite", referenceWebsite);

  if (image) {
    formData.append("image", image);
  } else if (bannerData?.imageUrl) {
    formData.append("image", bannerData.imageUrl);
  }

  try {
    if (bannerData) {
      await apiPut(`api/banner/${bannerData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSnackbarMessage("✅ Banner updated successfully!");
      setSnackbarSeverity("success");
    } else {
      await apiPost("api/banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSnackbarMessage("🎉 Banner added successfully!");
      setSnackbarSeverity("success");
    }

    setSnackbarOpen(true);
    fetchBanners();
    onClose();
  } catch (error) {
    console.error("Error saving banner:", error);
    setSnackbarMessage("❌ Failed to save banner. Please try again.");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  }
};

  return (
    <>
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

        {/* TinyMCE Editor for altText */}
<Editor
  apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
  value={description}
  init={{
    height: 300,
    menubar: true,
    plugins: [
      "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
      "searchreplace", "visualblocks", "code", "fullscreen",
      "insertdatetime", "media", "table", "code", "help", "wordcount",
      "emoticons", "codesample"
    ],
    toolbar: `
      undo redo | formatselect fontselect fontsizeselect |
      bold italic underline strikethrough forecolor backcolor |
      alignleft aligncenter alignright alignjustify |
      bullist numlist outdent indent | link image media table codesample |
      removeformat | help
    `,
    fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
    font_family_formats:
      "Arial=arial,helvetica,sans-serif;" +
      "Courier New=courier new,courier,monospace;" +
      "Georgia=georgia,palatino;" +
      "Tahoma=tahoma,arial,helvetica,sans-serif;" +
      "Times New Roman=times new roman,times;" +
      "Verdana=verdana,geneva",
  }}
  onEditorChange={(content) => setDescription(content)}
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
   <Snackbar
  open={snackbarOpen}
  autoHideDuration={3000}
  onClose={() => setSnackbarOpen(false)}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert
    onClose={() => setSnackbarOpen(false)}
    severity={snackbarSeverity}
    sx={{ width: "100%" }}
  >
    {snackbarMessage}
  </Alert>
</Snackbar>

   </>
  );
};

export default BannerForm;
