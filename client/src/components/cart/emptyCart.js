import React from "react";
import { Box, Heading, Text } from "gestalt";

const emptyCart = () => {
  return (
    <Box
      display="flex"
      direction="column"
      justifyContent="around"
      alignItems="center"
      color="darkWash"
      margin={4}
      padding={4}
      shape="rounded"
    >
      {/* heading */}
      <Heading color="midnight">Checkout</Heading>
      <Box margin={2}>
        <Heading color="watermelon" size="xs">
          Your Cart is Empty
        </Heading>
      </Box>
      <Box margin={2}>
        <Text align="center" italic color="green">
          Add some brews!
        </Text>
      </Box>
    </Box>
  );
};

export default emptyCart;
