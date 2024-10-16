import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { useNavigate } from "react-router-dom";

export default function CardAlert() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleRedirect = () => {
    navigate("/upload-key-visual"); // Replace with your target path
  };

  return (
    <Card variant="outlined" sx={{ m: 1.5, p: 1.5 }}>
      <CardContent>
        <AutoAwesomeRoundedIcon fontSize="small" />
        <Typography gutterBottom sx={{ fontWeight: 600 }}>
          Optimize Your Campaigns
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          Get 10% more engagement by optimizing your ad strategies today.
        </Typography>
        <Button
          variant="contained"
          size="small"
          fullWidth
          onClick={handleRedirect}
        >
          Optimize Campaigns
        </Button>
      </CardContent>
    </Card>
  );
}
