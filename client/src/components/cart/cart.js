import React from "react";
import { Box, Text, Mask, Heading } from "gestalt";
import { calcTotalPrice } from "../utils/utils";
import { Link } from "react-router-dom";
import CartItem from "./cartItem";

const cart = ({ items, remove, offLink }) => {
  return (
    <Box marginTop={2} alignSelf="end">
      <Mask shape="rounded" wash>
        <Box display="flex" direction="column" alignItems="center" padding={2}>
          {/* user cart heading */}
          <Heading align="center" size="sm">
            Your Cart
          </Heading>
          <Text align="center" color="gray" italic>
            {items.length} items selected
          </Text>
          {/* cart items */}
          <Box marginTop={2} marginBottom={2}>
            {items.map(item => {
              return <CartItem key={item._id} {...item} remove={remove} />;
            })}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Box margin={2}>
              {items.length < 1 && (
                <Text color="red">Please select some brews</Text>
              )}
            </Box>
            {/* total price */}
            <Text bold size="lg">
              Total: ${calcTotalPrice(items)}
            </Text>
            {/* link to orders checkout */}
            {offLink ? null : (
              <Box marginTop={4} align="center">
                <Text bold>
                  <Link to="/orders">Checkout</Link>
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Mask>
    </Box>
  );
};

export default cart;
