import {
  Col,
  Form,
  Input,
  Row,
  message,
  Select,
  Dateicker,
  InputNumber,
} from "antd";
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
import CommonColor from "../Foods.scss";
import { useGetCategory } from "../../FoodCategories/FoodCategories";

const Edit = ({ data, setData, item }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const categories = useGetCategory();
  const onEdit = async () => {
    try {
      await form.validateFields();
      const fieldData = form.getFieldValue();
      setLoading(true);
      const result = await FetchApi.updateFood({ ...fieldData, id: item.id });
      if (result.success) {
        const index = data.foodDTOS.findIndex((itm) => itm.id === item.id);
        const clone = JSON.parse(JSON.stringify({ ...data }));
        clone.foodDTOS[index] = result.foodDTO;
        setData(clone.foodDTOS);
        ModalCustomService.close();
        message.success("Saved successfully");
      } else if (result.code === 4005) {
        setLoading(false);
        message.warning("Food is already exists");
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
    <Col className="foods-form">
      <Form layout="vertical" form={form}>
        <Form.Item
          style={{ marginBottom: 10, paddingRight: 20 }}
          name="imageUrl"
          label="Avatar"
          initialValue={item.imageUrl}>
          <ImageUpload aspect={1 / 1} />
        </Form.Item>
        {[
          {
            name: "name",
            label: "Name",
            initialValue: item.name,
            rules: [Validate.emptyContent],
          },
          {
            name: "description",
            label: "Description",
            initialValue: item.description,
          },
        ].map((item, index) => {
          return (
            <Form.Item
              key={`${index}`}
              style={{ marginBottom: 10 }}
              name={item.name}
              label={item.label}
              required={item.rules ? true : false}
              rules={item.rules}
              initialValue={item.initialValue}>
              <Input />
            </Form.Item>
          );
        })}
        <Form.Item
          required
          label="Price"
          name={"price"}
          rules={[Validate.isPositiveNumber]}
          initialValue={item.price}>
          <InputNumber
            style={{ width: "100%", borderRadius: 4 }}
            formatter={(value) =>
              `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $`
            }
            parser={(value) =>
              value
                .replace("$", "")
                .replace(" ", "")
                .replace(/\$\s?|(,*)/g, "")
            }
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          required
          rules={[Validate.emptyContent]}
          initialValue={item.category}>
          <Select
            suffixIcon={<CaretDownOutlined style={{ color: "#6E6E6E" }} />}>
            {(categories?.data?.categoryDTOS || []).map((item, index) => (
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
