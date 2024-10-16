import * as React from "react";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SideMenu from "./components/SideMenu";
import AppNavbar from "./components/AppNavbar";
import AppTheme from "../shared-theme/AppTheme";
import ConstructionIcon from "@mui/icons-material/Construction"; // Import the construction icon
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "./theme/customizations";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function UnderConstruction(props) {
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
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh", // Center content vertically
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            {/* Add construction icon */}
            <ConstructionIcon sx={{ fontSize: 100, color: "primary.main" }} />

            {/* "UNDER CONSTRUCTION" text */}
            <Typography variant="h2" align="center">
              UNDER CONSTRUCTION
            </Typography>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
