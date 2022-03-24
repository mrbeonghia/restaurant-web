import React, { useEffect, useState } from "react";
import { Result, Col, Row, Form, Input, Button, message } from "antd";
import massage from "../../assets/img/massage.png";
import { FetchApi } from "../../api/FetchAPI";
import { STRINGS } from "../../constants/Strings";
import CommonColor from "../../util/variables.scss";

// 'http://localhost:3000/v2/app/forgot_password?code=L98CPGekCikGDIxJVoQnkT35jiQuq7yA&email=host44@yopmail.com'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    // console.log(query); //"app=article&act=news_content&aid=160990"
    var vars = query.split("&");
    // console.log(vars); //[ 'app=article', 'act=news_content', 'aid=160990' ]
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      // console.log(pair); //[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }
  const [form] = Form.useForm();

  const code = getQueryVariable("code");
  const email = getQueryVariable("email");

  useEffect(() => {
    let isMounted = true;
    const checkBeforeResetPass = async () => {
      const result = await FetchApi.confirmEmailResetPassword({
        code,
        email,
      });
      isMounted && setLoading(false);
      if (result.success) {
      } else if (result.code == 4003) {
        setError("パスワードが変更されました。");
      } else {
        isMounted && setError(STRINGS.something_wrong);
      }
    };
    checkBeforeResetPass();
    return () => {
      isMounted = false;
    };
  }, []);

  //   const validatePassword = ({ getFieldValue }) => ({
  //     validator(rule, value) {
  //       form.validateFields(["confirmPass"]);
  //       const re = /(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]*$/;
  //       if (value === undefined || value.length === 0) {
  //         return Promise.reject(STRINGS.this_field_is_required);
  //       } else if (!re.test(value)) {
  //         return Promise.reject("数字、英字をそれぞれ1文字以上含めてください。");
  //       } else if (value.length < 8 || value.length > 32) {
  //         return Promise.reject("8文字以上32文字以内で入力してください。");
  //       } else {
  //         return Promise.resolve();
  //       }
  //     },
  //   });
  //   const validateConfirmPassword = ({ getFieldValue }) => ({
  //     validator(rule, value) {
  //       const re = /(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]*$/;
  //       if (value === undefined || value.length === 0) {
  //         return Promise.reject(STRINGS.this_field_is_required);
  //       } else if (value !== form.getFieldValue("newPass")) {
  //         return Promise.reject("パスワードが統一していません。");
  //       } else {
  //         return Promise.resolve();
  //       }
  //     },
  //   });

  const validateNewPassword = ({ getFieldValue }) => ({
    validator(rule, value) {
      const re = /(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]*$/;
      if (value === undefined || value.length === 0) {
        return Promise.reject(STRINGS.this_field_is_required);
      }
      if (!re.test(value)) {
        return Promise.reject("数字、英字をそれぞれ1文字以上含めてください。");
      }
      if (value.length < 8 || value.length > 32) {
        return Promise.reject("8文字以上32文字以内で入力してください。");
      }
      return Promise.resolve();
    },
  });

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (value === undefined || value.length === 0) {
        return Promise.reject(STRINGS.this_field_is_required);
      }
      if (value !== form.getFieldValue("newPassword")) {
        return Promise.reject("パスワードが統一していません。");
      }
      return Promise.resolve();
    },
  });

  const onChangePass = async () => {
    try {
      await form.validateFields();
      const { newPassword } = form.getFieldValue();
      const result = await FetchApi.confirmChangePassword({
        code,
        email,
        password: newPassword,
      });
      if (result.success) {
        message.success(STRINGS.done_successful);
        window.location.href = "/login";
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.log("object", error);
      message.warning(STRINGS.please_fill_required_fields);
    }
  };

  return (
    <Row
      style={{ width: "100vw", height: "100vh" }}
      align="middle"
      justify="center">
      <Col style={{ textAlign: "-webkit-center" }}>
        <div className="title">
          <img src={massage} alt="logo" style={{ width: 400 }} />
        </div>
        {loading && <Result title="Waiting..." />}
        {!!error && <Result title={error} />}
        {!loading && !error && (
          <Form
            layout="vertical"
            form={form}
            style={{ width: "400px", marginTop: 30 }}>
            <Form.Item
              label={STRINGS.new_password}
              name="newPassword"
              required
              rules={[validateNewPassword]}>
              <Input.Password
                onChange={() => form.validateFields(["confirmPass"])}
              />
            </Form.Item>
            <Form.Item
              label={STRINGS.confirm_password}
              name="confirmPass"
              required
              rules={[validateConfirmPassword]}>
              <Input.Password />
            </Form.Item>
            <Button
              style={{
                marginTop: 10,
                height: 40,
                backgroundColor: CommonColor.textColor,
                color: "white",
                width: "100%",
                borderRadius: 5,
                height: 36,
              }}
              onClick={onChangePass}>
              {STRINGS.change}
            </Button>
          </Form>
        )}
      </Col>
    </Row>
  );
};

export default ForgotPassword;
