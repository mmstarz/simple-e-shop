import React, { useEffect, useCallback, useState } from "react";
import BrewItem from "./brew";
import Loader from "../widgets/loader/loader";
import Cart from "../cart/cart";
import { Box, Heading } from "gestalt";

import { setCart, getCart } from "../utils/utils";

import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const brews = ({ match }) => {
  const [cartItems, setCartItems] = useState([]);
  const [brews, setBrews] = useState([]);
  const [brand, setbrand] = useState("");
  const [loading, setLoading] = useState(true);

  const didMount = useCallback(async () => {
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `
            query {
              brand (id: "${match.params.brandId}") {
                _id
                name
                brews {
                  _id
                  name
                  description
                  image {
                    url
                  }
                  price
                }
              }
            }
        `
        }
      });

      // console.log(response.data.brand);

      setLoading(false);
      setbrand(response.data.brand.name);
      setBrews(response.data.brand.brews);
      setCartItems(getCart());
    } catch (err) {
      console.error(err);
    }
  }, [strapi]);

  useEffect(() => {
    let mount = true;

    if (mount && loading) {
      didMount();
    }

    return () => {
      mount = false;
    };
  }, [didMount]);

  const addtoCart = brew => {
    const alreadyInCart = cartItems.findIndex(item => item._id === brew._id);

    // not in cart
    if (alreadyInCart === -1) {
      const updatedCartItems = cartItems.concat({
        ...brew,
        quantity: 1
      });

      setCartItems(updatedCartItems);
      setCart(updatedCartItems);
    } else {
      const updatedCartItems = [...cartItems];
      cartItems[alreadyInCart].quantity += 1;
      setCartItems(updatedCartItems);
      setCart(updatedCartItems);
    }
  };

  const removeItem = id => {
    const updatedCartItems = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCartItems);
    setCart(updatedCartItems);
  };  

  return (
    <Box
      marginTop={4}
      display="flex"
      justifyContent="around"
      alignItems="start"
      dangerouslySetInlineStyle={{
        __style: {
          flexWrap: "wrap-reverse"
        }
      }}
    >
      {/* brews section */}
      <Box display="flex" alignItems="center" direction="column">
        {/* brands header */}
        <Box align="center" margin={2}>
          <Heading align="center" color="midnight" size="md">
            {brand}
          </Heading>
        </Box>

        {/* brews list */}
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#dbcdd9"
            }
          }}
          shape="rounded"
          padding={2}
          margin={2}
          display="flex"
          justifyContent="center"
          alignItems="start"
          wrap={true}
        >
          {brews.map(brew => {
            return (
              <BrewItem
                key={brew._id}
                brew={brew}
                url={apiUrl}
                addToCart={addtoCart}
              />
            );
          })}
        </Box>
      </Box>
      {/* loader */}
      <Loader show={loading} />
      {/* Cart */}
      <Cart items={cartItems} remove={removeItem} />
    </Box>
  );
};

export default brews;
