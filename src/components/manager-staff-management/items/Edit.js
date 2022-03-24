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
import moment from "moment";

const Edit = ({ data, setData, item }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onEdit = async () => {
    try {
      await form.validateFields();
      const fieldData = form.getFieldValue();
      setLoading(true);
      const result = await FetchApi.updateStaff({ ...fieldData, id: item.id });
      if (result.success) {
        const index = data.staffs.findIndex((itm) => itm.id === item.id);
        const clone = JSON.parse(JSON.stringify({ ...data }));
        clone.staffs[index] = result.staffDTO;
        setData(clone.staffs);
        ModalCustomService.close();
        message.success("Saved successfully");
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
  console.log("item.birthday", item.birthday);
  return (
    <Col className="staff-form">
      <Form layout="vertical" form={form}>
        <Form.Item
          style={{ marginBottom: 10, paddingRight: 20, width: 240 }}
          name="avatarUrl"
          label="Avatar"
          initialValue={item.avatarUrl}>
          <ImageUpload aspect={1 / 1} />
        </Form.Item>
        {[
          { name: "name", label: "Name", initialValue: item.name },
          {
            name: "phoneNumber",
            label: "Phone number",
            initialValue: item.phoneNumber,
          },
          { name: "email", label: "Email", initialValue: item.email },
        ].map((item, index) => {
          return (
            <Form.Item
              key={`${index}`}
              style={{ marginBottom: 10 }}
              name={item.name}
              label={item.label}
              required
              rules={[Validate.emptyContent]}
              initialValue={item.initialValue}>
              <Input />
            </Form.Item>
          );
        })}
        <Form.Item
          name="birthday"
          label="Date of birth"
          initialValue={
            moment(item.birthday).isValid() ? moment(item.birthday) : undefined
          }>
          <DatePicker
            style={{ width: "100%" }}
            format={"DD/MM/YYYY"}
            placeholder=" "
          />
        </Form.Item>
        <Form.Item label="Role" name="role" initialValue={item.role}>
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
