import { Col, Form, Input, Row, message, Select, DatePicker } from "antd";
import React from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { FetchApi } from "../../../api/FetchAPI";
import { STRINGS } from "../../../constants/Strings";
import {
  ButtonCustom,
  LoadingAbsolute,
  ModalCustomService,
} from "../../../elements";
import { Validate } from "../../../elements/Validate";
import { CommonFunction } from "../../../util/CommonFunction";
import CommonColor from "../Users.scss";
import moment from "moment";

const Edit = ({ data, setData, item }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onEdit = async () => {
    try {
      await form.validateFields();
      const fieldData = form.getFieldValue();
      setLoading(true);
      const result = await FetchApi.updateUser({ ...fieldData, id: item.id });
      if (result.success) {
        const index = data.users.findIndex((itm) => itm.id === item.id);
        const clone = JSON.parse(JSON.stringify({ ...data }));
        clone.users[index] = result.user;
        setData(clone.users);
        ModalCustomService.close();
        message.success("Saved successfully");
      } else if (result.message === "This user already exists") {
        setLoading(false);
        message.warning("This user already exists");
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
    <Col className="gacha-form">
      <Form layout="vertical" form={form}>
        {[
          {
            name: "name",
            label: "Name",
            initialValue: item.name,
            required: true,
            rules: [Validate.emptyContent],
          },
          {
            name: "phoneNumber",
            label: "Phone number",
            initialValue: item.phoneNumber,
            required: true,
            rules: [Validate.emptyContent],
          },
          {
            name: "birthday",
            label: "Date of birth",
            initialValue: item.birthday,
          },
          { name: "email", label: "Email", initialValue: item.email },
        ].map((item, index) => {
          if (item.name === "birthday") {
            return (
              <Form.Item
                key={`${index}`}
                style={{ marginBottom: 10 }}
                name={item.name}
                label={item.label}
                initialValue={moment(item.initialValue)}>
                <DatePicker format={"MM/DD/YYYY"} style={{ width: "100%" }} />
              </Form.Item>
            );
          }
          return (
            <Form.Item
              key={`${index}`}
              style={{ marginBottom: 10 }}
              name={item.name}
              label={item.label}
              required={item.required}
              rules={item.rules}
              initialValue={item.initialValue}>
              <Input />
            </Form.Item>
          );
        })}
        <Form.Item label="Gender" name="gender" initialValue={item.gender}>
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
          onClick={onEdit}
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

export default Edit;
