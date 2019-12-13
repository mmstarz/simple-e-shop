import React from "react";
import { HashLoader } from "react-spinners";
import { Box } from "gestalt";

const loader = ({show}) => {
  return (
    show && <Box
      position="fixed"
      dangerouslySetInlineStyle={{
        __style: {
          top: '60%',
          left: "50%",
          transform: "translateX(-50%)"
        }
      }}
    >
      <HashLoader color={"#BD10E0"} size={100} />
    </Box>
  );
};

export default loader;
