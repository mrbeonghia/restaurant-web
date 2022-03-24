import { Col, Form, Input, Row, message, Select, DatePicker } from "antd";
import React from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { FetchApi } from "../../../api/FetchAPI";
import { STRINGS } from "../../../constants/Strings";
import {
  ButtonCustom,
  ImageUpload,
  LoadingAbsolute,
  ModalCustomService,
} from "../../../elements";
import { Validate } from "../../../elements/Validate";
import { CommonFunction } from "../../../util/CommonFunction";
import CommonColor from "../StaffManagement.scss";

const Add = ({ data, setData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onAdd = async () => {
    try {
      await form.validateFields();
      const fieldData = form.getFieldValue();
      setLoading(true);
      const result = await FetchApi.createStaff(fieldData);
      if (result.success) {
        ModalCustomService.close();
        setData([result.staffDTO, ...(data?.staffs || [])]);
        message.success(STRINGS.registered_common);
      } else if (result.code === 4002) {
        setLoading(false);
        message.warning("This staff already exists");
      } else {
        setLoading(false);
        CommonFunction.logError(result);
      }
    } catch (error) {
      setLoading(false);
      message.warning("Please fill required fields");
    }
  };

  return (
    <Col className="staff-form">
      <Form layout="vertical" form={form}>
        <Form.Item
          style={{ marginBottom: 10, paddingRight: 20 }}
          name="avatarUrl"
          label="Avatar">
          <ImageUpload aspect={1 / 1} />
        </Form.Item>
        {[
          {
            name: "name",
            label: "Name",
            required: true,
            rules: [Validate.emptyContent],
          },
          {
            name: "phoneNumber",
            label: "Phone number",
            required: true,
            rules: [Validate.emptyContent],
          },
          { name: "email", label: "Email" },
        ].map((item, index) => {
          return (
            <Form.Item
              key={`${index}`}
              style={{ marginBottom: 10 }}
              name={item.name}
              label={item.label}
              required={item.required}
              rules={item.rules}>
              <Input />
            </Form.Item>
          );
        })}
        <Form.Item name="birthday" label="Date of birth">
          <DatePicker
            style={{ width: "100%" }}
            format={"DD/MM/YYYY"}
            placeholder=" "
          />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Select
            suffixIcon={<CaretDownOutlined style={{ color: "#6E6E6E" }} />}>
            {[
              { name: "Kitchen", id: "KITCHEN" },
              { name: "Waiter", id: "WAITER" },
              { name: "Receptionist", id: "RECEPTIONIST" },
            ].map((item, index) => (
              <Select.Option key={"" + item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Select
            suffixIcon={<CaretDownOutlined style={{ color: "#6E6E6E" }} />}>
            {[
              { name: "Male", id: "male" },
              { name: "Female", id: "female" },
            ].map((item, index) => (
              <Select.Option key={"" + item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Row justify="center" style={{ margin: "20px 0px" }}>
        <ButtonCustom
          onClick={() => ModalCustomService.close()}
          style={{
            minWidth: 120,
            fontSize: 16,
            marginRight: 10,
            padding: "4px 14px",
            backgroundColor: CommonColor.grey1,
            borderColor: CommonColor.grey2,
          }}>
          {"Cancel"}
        </ButtonCustom>
        <ButtonCustom
          onClick={onAdd}
          style={{
            minWidth: 120,
            fontSize: 16,
            backgroundColor: CommonColor.textColor,
            borderColor: CommonColor.textColor,
            color: "white",
          }}>
          {"Save"}
        </ButtonCustom>
      </Row>
      {loading && <LoadingAbsolute />}
    </Col>
  );
};

export default Add;
