import React, { useEffect, useCallback, useState } from "react";
import Strapi from "strapi-sdk-javascript/build/main";
// import { Link } from "react-router-dom";
import { Box, Heading, SearchField, Icon } from "gestalt";
import "./app.css";
import BrandMain from "../widgets/brand/brandMain";
import Loader from "../widgets/loader/loader";

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const app = () => {
  const [brands, setBrands] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [loading, setLoading] = useState(true);

  const handleGraphQLSearchBrands = useCallback(async () => {
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `query {
                    brands(where: { name_contains: "${searchCriteria}" }) {
                      _id
                      name
                      description
                      image {
                        url
                      }
                    }
                  }
                `
        }
      });

      setLoading(false);
      setBrands(response.data.brands);
    } catch (err) {
      console.error(err);
      setLoading(true);
    }
  }, [searchCriteria]);

  const serverRequest = useCallback(async () => {
    try {
      // strapi request schema: method, endpoint, {graphql query}
      const response = await strapi.request("POST", `${apiUrl}/graphql`, {
        data: {
          query: `query {
                    brands {
                      _id
                      name
                      description              
                      image {                
                        url
                      }
                    }
                  }
                `
        }
      });

      setLoading(false);
      setBrands(response.data.brands);
    } catch (err) {
      console.error(err);
      setLoading(true);
    }
  }, [strapi]);

  useEffect(() => {
    let mount = true;

    if (mount && loading && !searchCriteria.length) {
      serverRequest();
    }

    if (mount && loading && searchCriteria.length) {
      handleGraphQLSearchBrands();
    }

    return () => {
      mount = false;
    };
  }, [serverRequest, loading, handleGraphQLSearchBrands]);

  const handleSearch = ({ value }) => {
    if (value.length) {
      setSearchCriteria(value);
    } else {
      setSearchCriteria("");
    }

    setLoading(true);
  };

  const renderBrands = () => {
    return brands.map(brand => {
      return <BrandMain key={brand._id} credentials={brand} url={apiUrl} />;
    });
  };

  return (
    <Box>
      {/* serarch field */}
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        marginTop={4}
      >
        <SearchField
          id="searchField"
          accessibilityLabel="Brand Search Field"
          placeholder="search Brands"
          value={searchCriteria}
          onChange={event => handleSearch(event)}
        />
        <Box margin={2} alignSelf="center">
          <Icon
            accessibilityLabel="Filter"
            size={20}
            icon="globe"
            color={searchCriteria.length ? "orange" : "gray"}
          />
        </Box>
      </Box>
      {/* brands section */}
      <Box display="flex" direction="column" margin={2}>
        {/* brands header */}
        <Box align="center">
          <Heading align="center" color="midnight" size="md">
            Brew brands
          </Heading>
        </Box>
        {/* brands list container*/}
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#d6c8ec"
            }
          }}
          shape="rounded"
          display="flex"
          justifyContent="around"
          wrap={true}
        >
          {/* brands items */}
          {!loading && renderBrands()}
        </Box>
      </Box>
      <Loader show={loading} />
    </Box>
  );
};

export default app;
