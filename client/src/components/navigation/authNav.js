import React from "react";
import { Box, Text, Button } from "gestalt";
import { NavLink } from "react-router-dom";
import HomePageLink from "./homePageLink";

const authNav = ({ handleLogout }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="between"
      wrap={true}
      color="midnight"
      shape="roundedBottom"
    >
      {/* Home page Link */}
      <HomePageLink />

      {/* navigation */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="between"
        padding={1}
        margin={1}
      >
        {/* Orders Link */}
        <NavLink className="navlink" activeClassName="active" to="/orders">
          <Text size="xl" color="white" align="center">
            Orders
          </Text>
        </NavLink>
        {/* Logout button */}
        <Box padding={1} marginLeft={1} marginRight={1}>
          <Button
            text="Logout"
            color="transparent"
            inline
            size="lg"
            onClick={() => handleLogout()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default authNav;
