import React, { useState } from "react";
import { Box, Label, Text, Icon } from "gestalt";
import "./inputField.css";

const inputField = ({
  id,
  type,
  name,
  placeholder,
  value,
  handleChange,
  validation,
  touched
}) => {
  const [fieldValue, setFieldValue] = useState(value);
  const [edited, setEdited] = useState(touched);  

  // custom version
  const handleFieldChange = event => {
    event.persist();
    setFieldValue(event.target.value);
    handleChange(event.target.value);
    setEdited(true);
  };

  const renderError = () => {
    return (
      <Box marginBottom={2}>
        <Label htmlFor={id}>
          <Text color="red">{validation.validationMessage}</Text>
        </Label>
      </Box>
    );
  };

  const renderValidationIcons = () => {
    if (!edited) {
      return (
        <Icon accessibilityLabel="pending" color="olive" icon="clock" size={20} />
      );
    }

    if (validation.validationStatus && edited) {
      return (
        <Icon
          accessibilityLabel="valid"
          color="green"
          icon="check-circle"
          size={20}
        />
      );
    }

    if (!validation.validationStatus && edited) {
      return (
        <Icon accessibilityLabel="invalid" color="red" icon="clear" size={20} />
      );
    }
  };

  // console.log(edited);

  return (
    <Box marginBottom={2}>
      <Box marginBottom={2}>
        <Label htmlFor={id}>
          <Text>{placeholder}</Text>
        </Label>
      </Box>
      {!validation.validationStatus ? renderError() : null}
      <Box display="flex" alignItems="center" justifyContent="between">
        <input
          className="inputField"
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={fieldValue}
          onChange={event => handleFieldChange(event)}
        />
        {renderValidationIcons()}
      </Box>
    </Box>
  );
};

export default inputField;
