import * as React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppNavbar from "./components/AppNavbar";
import SideMenu from "./components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";
import { Typography, Button, Snackbar } from "@mui/material"; // Import Snackbar from Material UI
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

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

export default function Dashboard(props) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <SideMenu />
        <AppNavbar />
        <SwipeCards />
      </Box>
    </AppTheme>
  );
}

const SwipeCards = () => {
  const [cards, setCards] = useState(cardData);
  const [toastMessage, setToastMessage] = useState(null); // For finalize message
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleSwipe = (direction) => {
    // Show accepted/rejected toast message using Toastify
    if (direction === "left") {
      toast.error("Skipped this one, rejected!", {
        autoClose: 500, // Close after 500ms
        position: "top-center", // Position in the center
      });
    } else {
      toast.success("Added to your picks!", {
        autoClose: 500, // Close after 500ms
        position: "top-center", // Position in the center
      });
    }
  };

  const handleFinalize = () => {
    // Set the toast message
    setToastMessage(
      "Key Visual Finalized. Please look forward to our completed prototype in the near future!",
    );

    // Redirect to the dashboard after a short delay
    setTimeout(() => {
      navigate("/"); // Navigate back to the dashboard
    }, 1000); // Delay before navigation
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        padding: 3,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Swipe left to reject, swipe right to accept key visual.
      </Typography>

      {/* Render Cards */}
      <div className="grid h-[500px] w-full place-items-center">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              cards={cards}
              setCards={setCards}
              {...card}
              onSwipe={handleSwipe}
            />
          );
        })}
      </div>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3, width: "300px", height: "50px" }}
        onClick={handleFinalize} // Call finalize handler
      >
        Finalize Key Visual
      </Button>

      {/* Snackbar for Finalize message */}
      <Snackbar
        open={!!toastMessage} // Show when there's a toast message
        message={toastMessage}
        autoHideDuration={3000} // Show the message for 3 seconds
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position the toast
        onClose={() => setToastMessage(null)} // Clear the message when the snackbar closes
      />

      {/* Toastify Container */}
      <ToastContainer />
    </Box>
  );
};

const Card = ({ id, url, setCards, cards, onSwipe }) => {
  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;

    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((pv) => pv.filter((v) => v.id !== id));
      onSwipe(x.get() > 0 ? "right" : "left"); // Call onSwipe with the direction
    }
  };

  return (
    <motion.img
      src={url}
      alt="Placeholder alt"
      className="h-96 w-72 origin-bottom rounded-lg bg-white object-cover hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    />
  );
};

const cardData = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2224&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1570464197285-9949814674a7?q=80&w=2273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1578608712688-36b5be8823dc?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
