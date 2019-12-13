import React from "react";
import {Box, Text, IconButton } from 'gestalt';

const cartitem = ({_id, name, quantity, price, remove}) => {
  return (
    <Box
      key={_id}
      display="flex"
      alignItems="center"
      width="100%"
      justifyContent="between"
      padding={1}
    >
      <Box padding={2}>
        <Text color="midnight" align="center">
          {name} x {quantity} - $
          {(quantity * price).toFixed(2)}
        </Text>
      </Box>

      <IconButton
        color="red"
        icon="cancel"
        size="sm"
        accessibilityLabel="Delete item"
        bgColor="white"
        iconColor="red"
        onClick={() => {
          // remove item
          remove(_id);
        }}
      />
    </Box>
  );
};

export default cartitem;
