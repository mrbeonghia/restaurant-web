import React, { useState } from "react";

import logoLogin from "../../assets/img/salon-logo.png";
import logoMassage from "../../assets/img/massage.png";
import { Form, Input, Button, message, Row, Col } from "antd";
import "antd/dist/antd.css";
import "./Login.scss";
import { FetchApi } from "../../api/FetchAPI";
import { useHistory } from "react-router-dom";
import Auth from "../../store/Authentication";
import { STRINGS } from "../../constants/Strings";
import { Validate } from "../../elements/Validate";
import { CommonFunction } from "../../util/CommonFunction";

function Login() {
  let history = useHistory();
  const [forgetPass, setForgetPass] = useState(false);

  const login = async (values) => {
    if (values && values.username && values.password) {
      const data = {
        phone: values.username,
        password: values.password,
      };
      const result = await FetchApi.login(data);
      if (result && result.success && result.code === 200) {
        Auth.setToken(result.loginResult);
        Auth.setCurrentUser(result.staffDTO);
        history.push("/");
      } else if (result.message == "Password staff incorrect") {
        message.error("Phone or password is incorrect");
      } else {
        message.error("Login unsuccesful");
      }
    }
  };
  const onForget = async (values) => {
    const { email } = values;
    if (email) {
      const res = await FetchApi.resetPasswordEmail(email);
      if (res.success) {
        message.success("Please check your sms");
        setForgetPass(false);
      } else if (res.message === "User can't found") {
        message.warning("Can not found this user");
      } else {
        CommonFunction.logError(res);
      }
    }
  };

  return (
    <Row className="login-web" justify="space-around" align="middle">
      {/* <Col>
        <img className="image-left" src={logoMassage} alt="logo" />
      </Col> */}
      <div className="authen-box">
        <div className="title">
          <img src={logoLogin} alt="logo" />
        </div>
        {!forgetPass ? (
          <Form layout="vertical" className="form-login" onFinish={login}>
            <Form.Item
              label={"Phone number"}
              name="username"
              required
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}>
              <Input className="form-input" style={{ width: 320 }} />
            </Form.Item>
            <Form.Item
              name="password"
              label={"Password"}
              required
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}>
              <Input.Password
                className="form-input"
                style={{ width: 320 }}
                visibilityToggle={false}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                onClick={login}
                className="button-login"
                type="primary"
                style={{ width: 320 }}>
                {"Login"}
              </Button>
            </Form.Item>
            <div
              onClick={() => setForgetPass(true)}
              className="forgot-password">
              {"Forgot password"}
            </div>
          </Form>
        ) : (
          <Form layout="vertical" className="form-login" onFinish={onForget}>
            <Form.Item
              label={"Phone"}
              name="email"
              required
              rules={[Validate.emptyContent]}>
              <Input className="form-input" style={{ width: 320 }} />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                onClick={onForget}
                className="button-login"
                type="primary"
                style={{ width: 320 }}>
                {"Confirm"}
              </Button>
            </Form.Item>
            <div
              onClick={() => setForgetPass(false)}
              className="forgot-password">
              {"Login"}
            </div>
          </Form>
        )}
      </div>
    </Row>
  );
}
export default Login;
