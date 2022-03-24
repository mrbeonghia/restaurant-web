import React, { useRef } from "react";
import { Row, Col, Form, Button, Input, message } from "antd";
import { STRINGS } from "../../../constants/Strings";
import "./ChangePassword.scss";
import { Validate } from "../../../elements/Validate";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function ChangePassword() {
  const password = useRef("");
  const newPass = useRef("");
  const confirmPass = useRef("");

  const [form] = Form.useForm();

  const validatePassword = ({ getFieldValue }) => ({
    validator(rule, value) {
      form.validateFields(["confirmPass"]);
      const re = /(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]*$/;
      if (value === undefined || value.length === 0) {
        return Promise.reject(STRINGS.this_field_is_required);
      } else if (!re.test(value)) {
        return Promise.reject("数字、英字をそれぞれ1文字以上含めてください。");
      } else if (value.length < 8 || value.length > 32) {
        return Promise.reject("8文字以上32文字以内で入力してください。");
      } else {
        return Promise.resolve();
      }
    },
  });

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(rule, value) {
      const re = /(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]*$/;
      if (value === undefined || value.length === 0) {
        return Promise.reject(STRINGS.this_field_is_required);
      } else if (value !== form.getFieldValue("newPass")) {
        return Promise.reject("パスワードが統一していません。");
      } else {
        return Promise.resolve();
      }
    },
  });

  const onChangePass = async () => {
    try {
      const values = await form.validateFields();
      // const result = await ProfileApi.changePassword(
      //   password.current,
      //   newPass.current
      // );
      // if (result.success) {
      //   message.success(STRINGS.update_profile_completed);
      //   form.resetFields();
      // } else {
      //   if (result.code === 40009) {
      //     message.error("現在のパスワードが正しくありません。");
      //   } else {
      //     message.error(STRINGS.update_profile_error);
      //   }
      // }
    } catch (errorInfo) {}
  };

  return (
    <div className="change-passwrod">
      <Row>
        <Col span={20} offset={2}>
          <Col span={20}>
            <Form form={form} {...layout}>
              <Form.Item
                label={STRINGS.old_password}
                name="password"
                required
                rules={[Validate.emptyContent]}
                initialValue={password.current}
              >
                <Input.Password
                  onChange={(e) => {
                    password.current = e.target.value;
                  }}
                />
              </Form.Item>
              <Form.Item
                label={STRINGS.new_password}
                name="newPass"
                required
                rules={[validatePassword]}
                initialValue={newPass.current}
              >
                <Input.Password
                  onChange={(e) => {
                    newPass.current = e.target.value;
                  }}
                />
              </Form.Item>
              <Form.Item
                label={STRINGS.confirm_password}
                name="confirmPass"
                required
                rules={[validateConfirmPassword]}
                initialValue={confirmPass.current}
              >
                <Input.Password
                  onChange={(e) => {
                    confirmPass.current = e.target.value;
                  }}
                />
              </Form.Item>
            </Form>
            <Col offset={8}>
              <Form.Item style={{ margin: 0 }}>
                <Button
                  style={{
                    backgroundColor: "#1F0427",
                    color: "white",
                    borderRadius: 5,
                    height: 36,
                  }}
                  htmlType="submit"
                  onClick={onChangePass}
                >
                  {STRINGS.change}
                </Button>
              </Form.Item>
            </Col>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default ChangePassword;
