import React from "react";
import { calcTotalPrice } from "../../utils/utils";
import { Modal, Spinner, Box, Button, Text } from "gestalt";

const confirmationModal = ({
  cartItems,
  handleSubmitOrder,
  closeModal,
  orderProcessing
}) => {  

  return (
    <Modal
      accessibilityCloseLabel="close"
      accessibilityModalLabel="Confirm Your Order"
      heading="Confirm Your Order"
      onDismiss={closeModal}
      role="alertdialog"
      size="sm"
      footer={
        <Box
          display="flex"
          justifyContent="center"
          marginRight={-1}
          marginLeft={-1}
        >
          <Box padding={1}>
            <Button
              size="lg"
              color="blue"
              text="Submit"
              disabled={orderProcessing}
              onClick={handleSubmitOrder}
            />
          </Box>
          <Box padding={1}>
            <Button
              size="lg"
              color="red"
              text="Cancel"
              disabled={orderProcessing}
              onClick={closeModal}
            />
          </Box>
        </Box>
      }
    >
      {/* order summary */}
      {!orderProcessing && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          direction="column"
          padding={2}
          color="lightWash"
        >
          {/* cart items */}
          {cartItems.map(({ _id, name, quantity, price }) => {
            return (
              <Box
                key={_id}
                display="flex"
                alignItems="center"
                justifyContent="between"
                padding={1}
              >
                <Box padding={2}>
                  <Text color="midnight" align="center">
                    {name} x {quantity} - ${(quantity * price).toFixed(2)}
                  </Text>
                </Box>
              </Box>
            );
          })}
          {/* total price */}
          <Box paddingY={2}>
            <Text size="lg" bold>
              Total: ${calcTotalPrice(cartItems)}
            </Text>
          </Box>
        </Box>
      )}
      {/* loading spinner */}
      {orderProcessing && (
        <Box padding={2} marginTop={2} marginBottom={2}>
          <Spinner
            show={orderProcessing}
            accessibilityLabel="Order processing spinner"
          />

          <Text align="center" italic>
            Submitting order...
          </Text>
        </Box>
      )}
    </Modal>
  );
};

export default confirmationModal;
