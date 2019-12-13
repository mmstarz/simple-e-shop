import React, { useState } from "react";
import { Box, Label, Text, Icon } from "gestalt";
import { CardElement } from "react-stripe-elements";
import './card.css';

const card = ({ changeValidation }) => {
  const [edited, setEdited] = useState(false);
  const [validationStatus, setValidationStatus] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const handleCardChange = async ({ empty, complete, error }) => {
    if (!error && complete && !empty) {
      setEdited(true);
      setValidationStatus(true);
      setValidationMessage("");
      changeValidation(true);
    } else if (!error && !complete && empty) {
      setEdited(false);
      setValidationStatus(false);
      setValidationMessage("Please fill up all field");
      changeValidation(false);
    } else if (!error && !complete && !empty) {
      setEdited(true);
      setValidationStatus(false);
      setValidationMessage("Please fill up all field");
      changeValidation(false);
    } else if (error) {
      setEdited(true);
      setValidationStatus(false);
      setValidationMessage(error);
      changeValidation(false);
    }

    return;
  };

  const renderError = () => {
    return (
      <Box marginBottom={2}>
        <Label htmlFor="stripe__input">
          <Text color="red">{validationMessage}</Text>
        </Label>
      </Box>
    );
  };

  const renderIcons = () => {
    if (!edited) {
      return (
        <Icon
          accessibilityLabel="pending"
          color="olive"
          icon="clock"
          size={20}
        />
      );
    }

    if (validationStatus && edited) {
      return (
        <Icon
          accessibilityLabel="valid"
          color="green"
          icon="check-circle"
          size={20}
        />
      );
    }

    if (!validationStatus && edited) {
      return (
        <Icon accessibilityLabel="invalid" color="red" icon="clear" size={20} />
      );
    }
  };

  return (
    <Box
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="start"
    >
      {!validationStatus && validationMessage.length ? renderError() : null}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="between"
        width="100%"
      >
        <CardElement
          id="stripe__input"
          onChange={event => handleCardChange(event)}
          onReady={input => input.focus()}
        />
        {renderIcons()}
      </Box>
    </Box>
  );
};

export default card;
