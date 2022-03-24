import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, message, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Authentication from "../../../store/Authentication";
import "../components/DetailProfile.scss";
import { FetchApi } from "../../../api/FetchAPI";
import { STRINGS } from "../../../constants/Strings";
import { Validate } from "../../../elements/Validate";
import { AccountService } from "../../../services/AccountService";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function ProfileDetail() {
  const currentUser = JSON.parse(Authentication.getCurrentUser());
  console.log(currentUser);
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);

  const name = useRef(currentUser.name);
  const phoneNumber = useRef(currentUser.phoneNumber);

  const validateForm = async () => {
    try {
      const values = await form.validateFields();
      let data = {
        id: currentUser.id,
        avatarUrl: avatarUrl,
        name: form.getFieldValue("name"),
        phoneNumber: form.getFieldValue("phoneNumber"),
      };
      // const result = await ProfileApi.updateProfile(data);
      // if (result.success) {
      //   message.success(STRINGS.update_profile_completed);
      //   Authentication.setCurrentUser(result.user);
      //   AccountService.set(result.user);
      // } else {
      //   message.error(STRINGS.update_profile_error);
      // }
    } catch (errorInfo) {}
    return;
  };

  const uploadFileToServer = async (event) => {
    let result = await FetchApi.uploadFile({ file: event.target.files[0] });
    if (result?.fileUrl) {
      setAvatarUrl(result.fileUrl);
    } else {
      message.warning(STRINGS.upload_img_failed);
    }
  };

  return (
    <div className="change-profile">
      <Row>
        <Col span={12}>
          <Form form={form} {...layout}>
            <Form.Item
              label={STRINGS.name}
              name="name"
              required
              rules={[Validate.emptyContent]}
              initialValue={name.current}
            >
              <Input
                onChange={(e) => {
                  name.current = e.target.value;
                }}
              />
            </Form.Item>
            <Form.Item
              label={STRINGS.phone_number}
              name="phoneNumber"
              required
              rules={[Validate.phoneNumber]}
              initialValue={phoneNumber.current}
            >
              <Input
                onChange={(e) => {
                  phoneNumber.current = e.target.value;
                }}
              />
            </Form.Item>
          </Form>
          <Col span="8" offset={8}>
            <Form.Item style={{ margin: 0 }}>
              <Button
                style={{
                  backgroundColor: "#1F0427",
                  color: "white",
                  borderRadius: 5,
                  height: 36,
                }}
                htmlType="submit"
                onClick={validateForm}
              >
                {STRINGS.update}
              </Button>
            </Form.Item>
          </Col>
        </Col>
        <Col span={12}>
          <div className="image" style={{ textAlign: "center", zIndex: -1 }}>
            <img
              style={{
                maxWidth: "90%",
                maxHeight: "400px",
                borderRadius: "5px",
              }}
              src={avatarUrl}
              alt="img-profile"
            />
          </div>
          <div className="wrap-input-avatar">
            <label className="custom-file-upload">
              <input type="file" onChange={(e) => uploadFileToServer(e)} />
              <UploadOutlined /> {STRINGS.change_avatar}
            </label>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileDetail;
