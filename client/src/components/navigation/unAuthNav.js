import React from "react";
import { Box, Text } from "gestalt";
import { NavLink } from "react-router-dom";
import HomePageLink from "./homePageLink";

const unAuthNav = () => {
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
        justifyContent="around"        
        padding={1}
        margin={1}
      >
        {/* Sign in Link */}
        <NavLink className="navlink" activeClassName="active" to="/signin">
          <Text size="xl" color="white" align="center">
            Signin
          </Text>
        </NavLink>
        {/* Sign up Link */}
        <NavLink className="navlink" activeClassName="active" to="/signup">
          <Text size="xl" color="white" align="center">
            Signup
          </Text>
        </NavLink>
      </Box>
    </Box>
  );
};

export default unAuthNav;
