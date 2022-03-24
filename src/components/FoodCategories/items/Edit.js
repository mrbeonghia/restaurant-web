import { Col, Form, Input, Row, message, Select } from "antd";
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
import CommonColor from "../FoodCategories.scss";

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
        {[{ name: "name", label: "Name", initialValue: item.name }].map(
          (item, index) => {
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
          }
        )}
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
