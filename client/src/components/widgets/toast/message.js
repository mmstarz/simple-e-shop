import React from "react";
import { Toast, Box } from "gestalt";

const toastMessage = ({ message, show }) => {
  return (
    show && (
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)"
          }
        }}
        position="fixed"
      >
        <Toast color="orange" text={message} />
      </Box>
    )
  );
};

export default toastMessage;
