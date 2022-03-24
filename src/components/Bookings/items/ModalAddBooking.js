import {
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
} from "antd";
import React, { useState, useRef } from "react";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";

import { FetchApi } from "../../../api/FetchAPI";
import {
  ButtonCustom,
  LoadingAbsolute,
  ModalCustomService,
  Validate,
} from "../../../elements";
import DropdownFoods from "./DropdownFoods";
import { COLORS } from "../../../constants";
import "../Bookings.scss";
import { CustomTag } from "../../../util/components";

const useGetFoods = () => {
  const { data, refetch, isFetching, isLoading } = useQuery([`Foods`], () =>
    FetchApi.getFood({
      page: 1,
      size: 200,
    })
  );
  return { foodList: data?.foodDTOS || [] };
};
const useGetCoupons = () => {
  const { data, refetch, isFetching, isLoading } = useQuery([`getCoupon`], () =>
    FetchApi.getCouponAvailable({
      page: 1,
      size: 100,
    })
  );
  return { couponList: data?.couponDTOList || [] };
};
const useGetTableAvailable = () => {
  const { data, refetch, isFetching, isLoading } = useQuery(
    [`Table-Available`],
    () => FetchApi.getTableAvaliable({})
  );
  return { tableList: data?.tableDTOS || [] };
};
export default function ModalAddBooking({ refetchBookings }) {
  const [form] = Form.useForm();
  const { foodList } = useGetFoods();
  const { couponList } = useGetCoupons();
  const { tableList } = useGetTableAvailable();
  const [nameFilters, setNameFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const onSelect = (value, item) => {
    if (item) {
      let checkSameId = nameFilters.findIndex((itm) => {
        return itm.table?.id === item.table.id;
      });

      if (checkSameId > -1) {
        return;
      }
      setNameFilters([...nameFilters, item]);
    }
  };

  const onRemoveTag = (item) => {
    let arrFilter = nameFilters.filter((itm) => {
      return item.table?.id != itm.table?.id;
    });
    setNameFilters(arrFilter);
  };
  const onAdd = async () => {
    try {
      await form.validateFields();
      const fieldData = form.getFieldValue();
      if (fieldData.numberOfCustomers) {
        fieldData.numberOfCustomers = parseInt(fieldData.numberOfCustomers);
      } else {
        delete fieldData.numberOfCustomers;
      }
      setLoading(true);
      const result = await FetchApi.createBooking({
        ...fieldData,
        status: "order",
        tableIds: nameFilters.map((i) => i.table?.id),
      });
      setLoading(false);
      if (result.success) {
        ModalCustomService.close();
        message.success("Create booking success");
        refetchBookings();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Col className="form-booking-detail" style={{ padding: 12 }}>
      <Form layout="vertical" form={form} initialValues={{ orderDTOS: [] }}>
        {/* <Row>
          <Form.Item
            style={{ marginBottom: 10, marginRight: 20, minWidth: 220 }}
            name="arrivalTime"
            label="Arrival Time"
          >
            <DatePicker format={"DD/MM/YYYY HH:mm"} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 10, minWidth: 220 }}
            name="endTime"
            label="Checkout time"
          >
            <DatePicker format={"DD/MM/YYYY HH:mm"} style={{ width: "100%" }} />
          </Form.Item>
        </Row> */}

        <Form.Item
          style={{ marginBottom: 10, width: 220 }}
          name="bookingTime"
          label="Booking time"
          required
          rules={[Validate.emptyContent]}>
          <DatePicker
            format={"DD/MM/YYYY HH:mm"}
            style={{ width: "100%" }}
            showTime
          />
        </Form.Item>

        <Row>
          <Form.Item
            style={{ marginBottom: 10, marginRight: 20, width: 220 }}
            name="customerName"
            label="Customer name"
            required
            rules={[Validate.emptyContent]}>
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 10, width: 220 }}
            name="customerPhone"
            label="Customer phone"
            required
            rules={[Validate.emptyContent]}>
            <Input style={{ width: "100%" }} />
          </Form.Item>
        </Row>

        <Row>
          <Form.Item
            style={{ marginBottom: 10, width: 220, marginRight: 20 }}
            name="numberOfCustomers"
            label="Number of customers"
            rules={[Validate.isPositiveNumberWithoutRequired]}>
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 10, width: 220 }}
            name="couponId"
            label="Coupon">
            <Select>
              {couponList.map((item) => {
                return (
                  <Select.Option key={`${item.id}`} value={item.id}>
                    <Row align="center">{item.title}</Row>
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Row>
        <Row>
          <div>
            <Form.Item style={{ marginBottom: 10, width: 460 }} label="Table">
              <Select
                showSearch
                filterOption={false}
                onSelect={onSelect}
                optionLabelProp={"title"}>
                {(tableList || []).map((item) => {
                  return (
                    <Select.Option
                      key={`${item.id}`}
                      value={`${item.id}`}
                      table={item}
                      title={item.name}>
                      <div style={{ borderWidth: 20 }}>
                        <div style={{ fontWeight: "bold" }}>
                          Table: {item.name} - Seat: {item.seat}
                        </div>
                      </div>
                    </Select.Option>
                  );
                })}
              </Select>
              {nameFilters.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {nameFilters.map((item, index) => {
                    return (
                      <CustomTag
                        key={"" + index}
                        data={item}
                        onRemove={onRemoveTag}
                        style={{ paddingTop: 7 }}
                      />
                    );
                  })}
                </div>
              )}
            </Form.Item>
          </div>
        </Row>
        {/* <Row style={{ color: COLORS.secondary }}>Order</Row> */}
        {/* <Form.List name="orderDTOS">
          {(fields, { add, remove }) => {
            return (
              <Col>
                {fields.map((field, index, arr) => (
                  <Col key={field.key}>
                    <Row className="row-table-custom" gutter={20}>
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          name={[field.name, "foodId"]}
                          fieldKey={[field.fieldKey, "foodId"]}
                          style={{ marginBottom: 10 }}>
                          <DropdownFoods foodList={foodList} />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...field}
                          name={[field.name, "quantity"]}
                          fieldKey={[field.fieldKey, "quantity"]}
                          style={{ marginBottom: 10 }}
                          rules={[Validate.isPositiveNumberWithoutRequired]}>
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col style={{ marginTop: 2, marginLeft: 10 }}>
                        <Popconfirm
                          placement="topLeft"
                          getPopupContainer={(trigger) => trigger.parentNode}
                          title={"Confirm"}
                          onConfirm={() => remove(field.name)}>
                          <img
                            style={{ width: "20px" }}
                            src={require("../../../assets/img/delete.png")}
                            alt="img-null"
                          />
                        </Popconfirm>
                      </Col>
                    </Row>
                  </Col>
                ))}
                <Row
                  onClick={add}
                  className="btn-add-combo"
                  style={{
                    marginTop: 10,
                    marginBottom: 20,
                    alignItems: "center",
                  }}>
                  <PlusCircleOutlined
                    style={{
                      fontSize: 18,
                      color: COLORS.primary,
                      marginRight: 10,
                    }}
                  />
                  <Row
                    style={{
                      color: COLORS.primary,
                      fontSize: 18,
                      cursor: "pointer",
                    }}>
                    Add table
                  </Row>
                </Row>
              </Col>
            );
          }}
        </Form.List> */}
      </Form>
      <Row justify="center" style={{ margin: "20px 0px" }}>
        <ButtonCustom
          onClick={() => ModalCustomService.close()}
          style={{
            minWidth: 120,
            fontSize: 16,
            marginRight: 10,
            padding: "4px 14px",
            backgroundColor: "#efefef",
            borderColor: "#757575",
          }}>
          {"Cancel"}
        </ButtonCustom>
        <ButtonCustom
          onClick={onAdd}
          style={{
            minWidth: 120,
            fontSize: 16,
            backgroundColor: "#f19834",
            borderColor: "#f19834",
            color: "white",
          }}>
          {"Save"}
        </ButtonCustom>
      </Row>
      {loading && <LoadingAbsolute />}
    </Col>
  );
}
