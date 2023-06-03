import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

function AlertService(message, category) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={category} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertService;
