import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Container, Box, Button, Heading } from "gestalt";
import InputField from "../widgets/input/inputField";
import ToastMessage from "../widgets/toast/message";
import { setToken } from "../utils/utils";
import Strapi from "strapi-sdk-javascript/build/main";

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const signin = props => {
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: ""
  });
  const [formData, setFromData] = useState([ 
    {
      id: "username",
      type: "text",
      name: "username",
      placeholder: "Username",
      value: "",
      validation: {
        validationMessage: "",
        validationStatus: false
      },
      touched: false
    },
    {
      id: "password",
      type: "password",
      name: "password",
      placeholder: "Password",
      value: "",
      validation: {
        validationMessage: "",
        validationStatus: false
      },
      touched: false
    }
  ]);

  const handleFieldChange = (value, itemIndex) => {
    let count = -2;
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
    if (item.id === "username" && item.value.length < 4) {
      return {
        ...item,
        validation: {
          validationMessage: "should be at least 4 chracters length",
          validationStatus: false
        }
      };
    } else if (item.id === "password" && item.value.length < 4) {
      return {
        ...item,
        validation: {
          validationMessage: "should be at least 4 chracters length",
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

  const showToast = message => {
    setToast({ show: true, message: message });

    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, [3000]);
  };

  const hanldeSubmit = async event => {
    event.preventDefault();

    if (!validForm) {
      showToast("please fill up all fields");

      return;
    }

    try { 
      const username = formData[0].value;
      const password = formData[1].value;
      // set loading to true
      setLoading(true);
      // send request to register user with from data to strapi
      const response = await strapi.login(username, password);
      // set loading to false
      setLoading(false);
      // put token to manage user session into localStorage
      setToken(response.jwt);
      // console.log(response);
      // redirect to the home page
      redirectUser("/");
    } catch (error) {
      // set loding to false
      setLoading(false);
      console.error(error.message); // ?
      // show erro message with toast
      // showToast(err.message);
    }
  };

  // console.log(formData);

  return (
    <Container>
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: "lightsteelblue"
          }
        }}
        margin={4}
        padding={2}
        shape="rounded"
        display="flex"
        justifyContent="center"
      >
        {/* signin form */}
        <form
          style={{
            display: "inlineBlock",
            textAlign: "center",
            maxWidth: "300px"
          }}
          onSubmit={event => hanldeSubmit(event)}
        >
          {/* heading */}
          <Box
            marginBottom={2}
            display="flex"
            direction="column"
            alignItems="center"
          >
            <Heading color="midnight">Welcome back!</Heading>          
          </Box>
          {formData.map((field, index) => {
            return (
              <InputField
                key={index}
                {...field}
                handleChange={value => handleFieldChange(value, index)}
              />
            );
          })}
          <Button
            inline
            text="Submit"
            type="submit"
            color="blue"
            disabled={!validForm || loading}
          />
        </form>
      </Box>
      <ToastMessage {...toast} />
    </Container>
  );
};

export default withRouter(signin);
