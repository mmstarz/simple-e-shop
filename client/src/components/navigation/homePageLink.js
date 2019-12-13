import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Heading, Image } from "gestalt";
import "./homePage.css";

const homePageLink = () => {
  return (
    <NavLink exact activeClassName="home-active" to="/" className="home-link">
      <Box display="flex" alignItems="center">
        <Box margin={2} height={50} width={50}>
          <Image
            alt="logotype"
            src="./icons/logo.svg"
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>
        <div className="home-page-title">
          <Heading size="xs" color="orange">
            OnlineStore
          </Heading>
        </div>
      </Box>
    </NavLink>
  );
};

export default homePageLink;
