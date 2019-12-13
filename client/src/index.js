import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { getToken } from "./components/utils/utils";
import "gestalt/dist/gestalt.css";
import "./index.css";
import Navbar from "./components/navigation/navbar";
import App from "./components/app/app";
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import Checkout from "./components/orders/checkout";
import Brews from "./components/brews/brews";
import registerServiceWorker from "./registerServiceWorker";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return getToken() !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

const Root = () => {
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route component={App} exact path="/" />
          <PrivateRoute component={Checkout} path="/orders" />
          <Route component={Signin} path="/signin" />
          <Route component={Signup} path="/signup" />
          <Route component={Brews} path="/:brandId" />
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        </Switch>
      </React.Fragment>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
