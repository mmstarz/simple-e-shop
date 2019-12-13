import React from "react";
import { Box, Card, Image, Text, Button } from "gestalt";

const brewItem = ({ brew, url, addToCart }) => {
  const {image, name, description, price } = brew;  

  return (
    <Box
      display="flex"
      direction="column"
      justifyContent="center"
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
          dangerouslySetInlineStyle={{
            __style: {
              display: "grid",
              gridTemplateRows: "3em 8em 3em 3em 1fr",
              gridRowGap: "4px"
            }
          }}
        >
          <Box marginLeft={2} marginRight={2} alignSelf="center">
            <Text bold size="xl">
              {name}
            </Text>
          </Box>

          <Box marginLeft={2} marginRight={2} alignSelf="start" >
            <Text overflow="breakWord" leading="tall">
              {description}
            </Text>
          </Box>

          <Box alignSelf="center">
            <Text size="xl" bold align="center" color="orchid">
              ${price}
            </Text>
          </Box>

          <Box alignSelf="center">
            <Text align="center">
              <Button onClick={() => addToCart(brew)} color="blue" text="Add to Cart" size="md" inline={true} />
            </Text>
          </Box>
          
        </Box>
      </Card>
    </Box>
  );
};

export default brewItem;
