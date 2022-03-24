import { Col, Input, Row, Select } from "antd";
import React from "react";
import Auth from "../../../store/Authentication";

export default function DropdownFoods({ value, onChange, foodList, disabled }) {
  const userAdmin = JSON.parse(Auth.getCurrentUser());

  const onChangeFood = (e) => {
    onChange({ ...value, foodId: e });
  };
  const onChangeQuantity = (e) => {
    e.preventDefault();
    onChange({ ...value, quantity: e.target.value });
  };

  return (
    <Row gutter={20}>
      <Col span={10}>
        <Select
          style={{ marginBottom: 0 }}
          disabled={disabled}
          defaultValue={value?.foodId}
          onChange={(e) => onChangeFood(e)}
          value={value?.foodId}
        >
          {foodList.map((item) => {
            return (
              <Select.Option key={`${item.id}`} value={item.id}>
                <Row align="center">{item.name}</Row>
              </Select.Option>
            );
          })}
        </Select>
      </Col>
      <Col span={4}>
        <Input
          value={value?.quantity}
          onChange={onChangeQuantity}
          type="number"
        />
      </Col>
      <Col span={4}>
        <Input
          contentEditable={false}
          style={{ borderWidth: 0 }}
          value={
            foodList.reduce((previousValue, currentValue) => {
              if (currentValue.id === value?.foodId) {
                return (
                  previousValue + currentValue.price * (value?.quantity || 0)
                );
              } else {
                return previousValue;
              }
            }, 0) || 0
          }
        />
      </Col>
      <Col span={6}>
        <Select
          style={{ marginBottom: 0 }}
          disabled={disabled || userAdmin.role !== "KITCHEN"}
          defaultValue={value?.status || "ORDER"}
        >
          {["ORDER", "DONE"].map((item) => {
            return (
              <Select.Option key={`${item}`} value={item}>
                <Row align="center">{item}</Row>
              </Select.Option>
            );
          })}
        </Select>
      </Col>
    </Row>
  );
}
