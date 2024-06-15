import React, { useEffect } from "react";

const Snackbar = ({ showSnackbar, message, onHide }) => {
  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => {
        onHide();
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showSnackbar, onHide]);

  return (
    <>
      {showSnackbar && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#333",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            zIndex: "1000",
          }}
        >
          {message}
        </div>
      )}
    </>
  );
};

export default Snackbar;
