// src/components/common/FormButton.jsx
import React from "react";
import { Button } from "@mui/material";

const FormButton = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      type="submit"
      className="w-full md:max-w-[280px]"
      sx={{
        borderRadius: "4px",
        backgroundColor: "var(--primary)",
        color: "white",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default FormButton;
