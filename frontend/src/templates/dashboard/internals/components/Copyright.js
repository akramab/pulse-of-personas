import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={[
        {
          color: "text.secondary",
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/mfarhan0304/">
        Pulse of Personas
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
