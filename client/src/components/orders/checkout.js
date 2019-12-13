import React, { useState, useEffect, useCallback } from "react";
import { getCart, setCart, clearCart, calcAmount } from "../utils/utils";
import { withRouter } from "react-router-dom";
import { Container, Box, Heading } from "gestalt";
import { Elements, StripeProvider, injectStripe } from "react-stripe-elements";
import Cart from "../cart/cart";
import EmptyCart from "../cart/emptyCart";
import InputField from "../widgets/input/inputField";
import Card from "../widgets/creditCard/card";
import ToastMessage from "../widgets/toast/message";
import ConfirmationModal from "../widgets/modals/confirmationModal";
import { emailCheck } from "../utils/utils";
import "./checkout.css";

import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const _checkoutForm = props => {
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [validForm, setValidForm] = useState(false);
  const [validCard, setValidCard] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: ""
  });
  const [formData, setFromData] = useState([
    {
      id: "address",
      type: "text",
      name: "address",
      placeholder: "Shipping Address",
      value: "",
      validation: {
        validationMessage: "",
        validationStatus: false
      },
      touched: false
    },
    {
      id: "postalCode",
      type: "text",
      name: "postalCode",
      placeholder: "Postal Code",
      value: "",
      validation: {
        validationMessage: "",
        validationStatus: false
      },
      touched: false
    },
    {
      id: "city",
      type: "text",
      name: "city",
      placeholder: "City of Residence",
      value: "",
      validation: {
        validationMessage: "",
        validationStatus: false
      },
      touched: false
    },
    {
      id: "confirmationEmailAddress",
      type: "email",
      name: "confirmationEmailAddress",
      placeholder: "Email Confirmation",
      value: "",
      validation: {
        validationMessage: "",
        validationStatus: false
      },
      touched: false
    }
  ]);

  const getCartItems = useCallback(() => {
    setCartItems(getCart());
  }, [getCart]);

  useEffect(() => {
    let mount = true;

    if (mount) {
      getCartItems();
    }

    return () => {
      mount = false;
    };
  }, [getCartItems]);

  // console.log(cartItems);

  const handleFieldChange = (value, itemIndex) => {
    let count = -4;
    return setFromData([
      ...formData.map((item, index) => {
        if (index === itemIndex) {
          item.value = value;
          item.touched = true;
          item = validation(item);
        }

        if (item.validation.validationStatus) {
          count++;
        }

        if (count === 0) {
          setValidForm(true);
        } else {
          setValidForm(false);
        }

        return item;
      })
    ]);
  };

  const validation = item => {
    if (item.id === "address" && item.value.length < 4) {
      return {
        ...item,
        validation: {
          validationMessage: "should be at least 4 chracters length",
          validationStatus: false
        }
      };
    } else if (item.id === "postalCode" && item.value.length < 4) {
      return {
        ...item,
        validation: {
          validationMessage: "should be at least 4 chracters length",
          validationStatus: false
        }
      };
    } else if (item.id === "city" && item.value.length < 2) {
      return {
        ...item,
        validation: {
          validationMessage: "should be at least 2 chracters length",
          validationStatus: false
        }
      };
    } else if (
      item.id === "confirmationEmailAddress" &&
      !emailCheck(item.value)
    ) {
      return {
        ...item,
        validation: {
          validationMessage: "invalid email address",
          validationStatus: false
        }
      };
    }

    return {
      ...item,
      validation: {
        validationMessage: "",
        validationStatus: true
      }
    };
  };

  const redirectUser = path => props.history.push(path);

  const showToast = (message, redirect = false) => {
    // console.log("toast show starts");
    setToast({ show: true, message: message });

    setTimeout(() => {
      setToast({ show: false, message: "" });
      if (redirect) {
        redirectUser("/");
      }
    }, [3000]);
  };

  const handleSubmitOrder = async () => {
    const address = formData[0].value;
    const postalCode = formData[1].value;
    const city = formData[2].value;
    const confirmationEmailAddress = formData[3].value;

    const amount = calcAmount(cartItems);
    // console.log(amount)
    /* preparations */
    setOrderProcessing(true);

    try {
      // steps
      // create stripe token
      // create order with strapi sdk (request to backend)
      // orderProcessing - false, showModal - false
      // clear user cart
      // show success toast

      // stripe is added to component be stripe elements
      // console.log(props.stripe);
      // https://stripe.com/docs/stripe-js/reference
      // stripe.createToken('bank_account', bankAccountData)
      const response = await props.stripe.createToken();
      // console.log(response);
      // token = response.token.id;
      // console.log(token);

      await strapi.createEntry("orders", {
        amount,
        brews: cartItems,
        city,
        postalCode,
        address,
        token: response.token.id
      });

      // send email with strapi
      await strapi.request("POST", "/email", {
        data: {
          to: confirmationEmailAddress,
          subject: `Order confirmation OnlineStore - ${new Date(Date.now())}`,
          text: "Your order has been processed",
          html:
            "<h3><bold>Expect Your order to arrive in 2-3 shipping days</bold></h3>"
        }
      });

      setOrderProcessing(false);
      setShowModal(false);
      clearCart();

      showToast("Your order has been successfully submitted!", true);
    } catch (err) {
      // orderProcessing - false, showModal - false
      // show error toast
      setOrderProcessing(false);
      setShowModal(false);
      showToast(err.message, false);
    }
  };

  // create stripe token and save to the variable
  const handleChangeCardValidation = status => {
    setValidCard(status);
  };

  const closeModal = () => setShowModal(false);

  const hanldeConfirmOrder = async event => {
    event.preventDefault();

    if (!validForm) {
      showToast("please fill up all fields", false);
      return;
    }

    setShowModal(true);
  };

  const removeItem = id => {
    const updatedCartItems = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCartItems);
    setCart(updatedCartItems);
  };

  // console.log(validCard);

  return (
    <Container>
      {cartItems.length ? (
        <Box
          color="darkWash"
          margin={2}
          padding={2}
          shape="rounded"
          display="flex"
          justifyContent="around"
          alignItems="start"
          wrap={true}
        >
          <Box display="flex" direction="column" alignItems="center" margin={2}>
            {/* heading */}
            <Heading color="midnight">Checkout</Heading>
            {/* user cart */}
            <Cart items={cartItems} remove={removeItem} offLink={true} />
          </Box>
          {/* checkout form */}
          <form
            className="order-checkout-form"
            onSubmit={event => hanldeConfirmOrder(event)}
          >
            {formData.map((field, index) => {
              return (
                <InputField
                  key={index}
                  {...field}
                  handleChange={value => handleFieldChange(value, index)}
                />
              );
            })}
            {/* stripe Credit Card element */}
            <Card
              changeValidation={status => handleChangeCardValidation(status)}
            />
            {/* submit btn */}
            <button
              id="stripe__button"
              className={
                !validForm || !validCard
                  ? "checkout-btn fail"
                  : "checkout-btn success"
              }
              type="submit"
              disabled={!validForm || !validCard}
            >
              Submit
            </button>
          </form>
        </Box>
      ) : (
        <EmptyCart />
      )}
      {/* confirmation modal */}
      {showModal && (
        <ConfirmationModal
          orderProcessing={orderProcessing}
          closeModal={closeModal}
          handleSubmitOrder={handleSubmitOrder}
          cartItems={cartItems}
        />
      )}
      <ToastMessage {...toast} />
    </Container>
  );
};

const CheckoutForm = withRouter(injectStripe(_checkoutForm));

const checkout = () => {
  return (
    <StripeProvider apiKey="pk_test_xaTIuQ3FvjNLtBmR3tKRr3d4">
      <Elements>
        <CheckoutForm />
      </Elements>
    </StripeProvider>
  );
};

export default checkout;
