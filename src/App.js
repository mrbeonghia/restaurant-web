import React from "react";
import "./App.scss";
import Main from "./components/layout/Main";
import Login from "./components/auth/Login";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { AlertModal } from "./elements";
import { ReactQueryConfigProvider } from "react-query";
import { ModalCustom } from "./elements/ModalCustom/ModalCustom";
import { ConfigProvider } from "antd";
import ForgotPassword from "./components/forgot-password/ForgotPassword";
// import NotFoundPage from "./components/NotFoundPage";

//TODO: fix route for change password
function App() {
  const queryConfig = { queries: { refetchOnWindowFocus: false } };

  if (window.location.href.includes("v2/app/forgot_password")) {
    return (
      <ReactQueryConfigProvider config={queryConfig}>
        <ConfigProvider>
          <div className="App">
            <Router>
              <Route
                path="/v2/app/forgot_password"
                component={ForgotPassword}
              />
              <Route path="/login" component={Login} />
              {/* <Route path="*" component={NotFoundPage} /> */}
            </Router>
            <AlertModal />
            <ModalCustom />
          </div>
        </ConfigProvider>
      </ReactQueryConfigProvider>
    );
  }

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <ConfigProvider>
        <div className="App">
          <Router>
            <Route path="/" component={Main} />
            <Route path="/v2/app/forgot_password" component={ForgotPassword} />
            <Route path="/login" component={Login} />
            {/* <Route path="*" component={NotFoundPage} /> */}
          </Router>
          <AlertModal />
          <ModalCustom />
        </div>
      </ConfigProvider>
    </ReactQueryConfigProvider>
  );
}

export default App;
