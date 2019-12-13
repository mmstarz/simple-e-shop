import React from "react";
import { Box, Card, Image, Text } from "gestalt";
import { Link } from "react-router-dom";

const brandMain = ({credentials: { _id, name, image, description }, url}) => {
  return (
    <Box
      display="flex"
      direction="column"
      justifyContent="center"
      paddingY={4}
      width={250}
      margin={2}    
    >
      <Card
        image={
          <Box height={250} width={250}>
            <Image
              fit="cover"
              naturalHeight={1}
              naturalWidth={1}
              alt="Brand"
              src={`${url}${image.url}`}
            />
          </Box>
        }
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Text bold size="xl">
            {name}
          </Text>
          <Text overflow="breakWord" leading="tall">
            {description}
          </Text>
          <Box marginTop={4}>
            <Text bold size="xl" margin="4 0">
              <Link to={`/${_id}`}>Details</Link>
            </Text>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default brandMain;
