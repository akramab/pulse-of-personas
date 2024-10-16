import * as React from "react";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./components/AppNavbar";
import SideMenu from "./components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";
import {
  Typography,
  Button,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera"; // Changed to camera icon
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "./theme/customizations";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function UploadForm(props) {
  const [file, setFile] = React.useState(null);
  const [dragging, setDragging] = React.useState(false);
  const [description, setDescription] = React.useState("");

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic for handling form submission
    console.log("Uploaded file:", file);
    console.log("User description:", description);

    // Redirect to /key-visual after form submission
    navigate("/key-visual");
  };

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
            height: "100vh", // Full viewport height
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "center", // Center vertically
              height: "100%", // Full height
              mx: 3,
            }}
          >
            <Typography variant="h4" sx={{ mt: 4 }}>
              Upload an Image to Generate Your Key Visual
            </Typography>

            <form
              onSubmit={handleSubmit}
              style={{ width: "100%", maxWidth: "600px" }}
            >
              <Stack spacing={2} alignItems="center">
                {/* File drop area */}
                <Paper
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  sx={{
                    border: `2px dashed ${dragging ? "#000" : "#ccc"}`,
                    padding: 4,
                    textAlign: "center",
                    width: "100%",
                    transition: "border-color 0.3s",
                  }}
                >
                  <IconButton size="large">
                    <PhotoCamera fontSize="large" />{" "}
                    {/* Changed to camera icon */}
                  </IconButton>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {file ? file.name : "Upload or drag & drop an image here"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    JPEG, PNG formats, up to 50MB
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: "none" }}
                    id="file-upload"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outlined" component="span" sx={{ mt: 2 }}>
                      Upload Image
                    </Button>
                  </label>
                </Paper>

                {/* Text box for user description */}
                <TextField
                  id="description"
                  label="Add a description or context"
                  multiline
                  rows={4} // 4 rows to make it big enough
                  fullWidth
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ height: 50 }}
                >
                  Generate Key Visual
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
