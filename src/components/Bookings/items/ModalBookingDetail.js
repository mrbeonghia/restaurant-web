import {
  Col,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  message,
} from "antd";
import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";

import { FetchApi } from "../../../api/FetchAPI";
import {
  ButtonCustom,
  LoadingAbsolute,
  LoadingView,
  ModalCustomService,
  Validate,
} from "../../../elements";
import moment from "moment";
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
    FetchApi.getCoupon({
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
export default function ModalBookingDetail(props) {
  const idBooking = props.data.id;
  const [form] = Form.useForm();
  const { foodList } = useGetFoods();
  const { couponList } = useGetCoupons();
  const [loading, setLoading] = useState(false);
  const { tableList } = useGetTableAvailable();

  const { data, isLoading, refetch, isFetching } = useQuery(
    [`ModalBookingDetail-${idBooking}`],
    () => FetchApi.getBookingDetail(idBooking)
  );

  const [nameFilters, setNameFilters] = useState(
    (data?.bookingDTO?.tableDTOS || []).map((i) => {
      return {
        table: { ...i },
      };
    })
  );

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

  const updateBooking = async () => {
    try {
      await form.validateFields();
      const fieldData = form.getFieldValue();

      setLoading(true);
      const result = await FetchApi.updateBooking({
        ...fieldData,
        status: "order",
        orderRequests: fieldData.orderDTOS.map((item) => item.food),
        orderDTOS: fieldData.orderDTOS.map((item) => item.food),
        id: idBooking,
      });
      setLoading(false);
      if (result.success) {
        ModalCustomService.close();
        message.success("Update booking success");
        props.refetch();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const changeStatusBooking = async ({ status }) => {
    try {
      await form.validateFields();
      setLoading(true);
      const result = await FetchApi.actionBooking({
        id: idBooking,
        status: status,
      });
      setLoading(false);
      if (result.success) {
        ModalCustomService.close();
        message.success(`${status} success`);
        props.refetchBookings();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (isLoading) {
    return <LoadingView />;
  }

  const onDeleteBooking = () => {
    ModalCustomService.set({
      content: <div>Do you want to delete?</div>,
      textConfirm: "Confirm",
      textCancel: "Cancel",
      wrapperStyle: { width: 420 },
      onConfirm: async () => {
        const result = await FetchApi.deleteBooking(idBooking);
        if (result.success) {
          props.refetch();
          message.success("Deleted Success");
        } else {
          message.error(result.message || "Something wrong. Please try again.");
        }
      },
    });
  };

  return (
    <Col className="form-booking-detail" style={{ padding: 12 }}>
      <Row style={{ justifyContent: "flex-end" }}>
        <ButtonCustom
          onClick={onDeleteBooking}
          style={{
            alignSelf: "flex-end",
            minWidth: 120,
            fontSize: 16,
            marginRight: 20,
            padding: "4px 14px",
            backgroundColor: "red",
            borderColor: "red",
            color: "white",
          }}
        >
          {"Delete"}
        </ButtonCustom>
      </Row>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          orderDTOS: data?.bookingDTO?.orderDTOS
            ? data?.bookingDTO?.orderDTOS.map((item) => ({ food: item }))
            : [],
        }}
      >
        <Row>
          <Form.Item
            style={{ marginBottom: 10, marginRight: 20, minWidth: 220 }}
            name="arrivalTime"
            label="Arrival Time"
            initialValue={
              data?.bookingDTO?.arrivalTime
                ? moment(data?.bookingDTO?.arrivalTime)
                : ""
            }
          >
            <DatePicker
              format={"DD/MM/YYYY HH:mm"}
              style={{ width: "100%" }}
              showTime
            />
          </Form.Item>
          <Col>
            <Form.Item>
              <ButtonCustom
                disabled={
                  data?.bookingDTO?.status === "arrived" ||
                  data?.bookingDTO?.status === "payment"
                }
                onClick={() => changeStatusBooking({ status: "arrived" })}
                style={{
                  minWidth: 200,
                  fontSize: 16,
                  marginTop: 25,
                  backgroundColor:
                    data?.bookingDTO?.status === "payment" ||
                    data?.bookingDTO?.status === "arrived"
                      ? COLORS.disabled
                      : COLORS.primary,
                  borderColor:
                    data?.bookingDTO?.status === "payment" ||
                    data?.bookingDTO?.status === "arrived"
                      ? COLORS.disabled
                      : COLORS.primary,
                  color: "white",
                }}
              >
                {"Check in"}
              </ButtonCustom>
            </Form.Item>
          </Col>
          {/* <Form.Item
            style={{ marginBottom: 10, minWidth: 220 }}
            name="endTime"
            label="Checkout time"
            initialValue={moment(data?.bookingDTO?.arrivalTime)}
          >
            <DatePicker format={"DD/MM/YYYY HH:mm"} style={{ width: "100%" }} />
          </Form.Item> */}
        </Row>

        <Row>
          <Form.Item
            style={{ marginBottom: 10, width: 220, marginRight: 20 }}
            name="bookingTime"
            label="Booking time"
            required
            rules={[Validate.emptyContent]}
            initialValue={moment(data?.bookingDTO?.bookingTime)}
          >
            <DatePicker format={"DD/MM/YYYY HH:mm"} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <ButtonCustom
              disabled={data?.bookingDTO?.status === "payment"}
              onClick={() => changeStatusBooking({ status: "payment" })}
              style={{
                minWidth: 200,
                fontSize: 16,
                marginTop: 25,
                backgroundColor:
                  data?.bookingDTO?.status === "payment"
                    ? COLORS.disabled
                    : COLORS.primary,
                borderColor:
                  data?.bookingDTO?.status === "payment"
                    ? COLORS.disabled
                    : COLORS.primary,
                color: "white",
              }}
            >
              {"Payment"}
            </ButtonCustom>
          </Form.Item>
        </Row>

        <Row>
          <Form.Item
            style={{ marginBottom: 10, marginRight: 20, width: 220 }}
            name="customerName"
            label="Customer name"
            required
            rules={[Validate.emptyContent]}
            initialValue={data?.bookingDTO?.customerName}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 10, width: 220 }}
            name="customerPhone"
            label="Customer phone"
            initialValue={data?.bookingDTO?.customerPhone}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
        </Row>

        <Row>
          <Form.Item
            style={{ marginBottom: 10, width: 220, marginRight: 20 }}
            name="numberOfCustomers"
            label="Number of customers"
            rules={[Validate.isPositiveNumberWithoutRequired]}
            initialValue={data?.bookingDTO?.numberOfCustomers}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 10, width: 220 }}
            name="couponId"
            label="Coupon"
            initialValue={data?.bookingDTO?.couponId}
          >
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

        <div>
          <Form.Item style={{ marginBottom: 10, width: 460 }} label="Table">
            <Select
              showSearch
              filterOption={false}
              onSelect={onSelect}
              optionLabelProp={"title"}
            >
              {(tableList || []).map((item) => {
                return (
                  <Select.Option
                    key={`${item.id}`}
                    value={`${item.id}`}
                    table={item}
                    title={item.name}
                  >
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

        <Row style={{ color: COLORS.secondary }}>Order</Row>
        <Form.List name="orderDTOS">
          {(fields, { add, remove }) => {
            return (
              <Col>
                {fields.map((field, index, arr) => {
                  return (
                    <Col key={field.key}>
                      <Row className="row-table-custom">
                        <Col span={22}>
                          <Form.Item
                            {...field}
                            name={[field.name, "food"]}
                            fieldKey={[field.fieldKey, "food"]}
                            style={{ marginBottom: 10 }}
                          >
                            <DropdownFoods foodList={foodList} />
                          </Form.Item>
                        </Col>
                        {/* <Col span={5}>
                          <Form.Item
                            {...field}
                            name={[field.name, "quantity"]}
                            fieldKey={[field.fieldKey, "quantity"]}
                            style={{ marginBottom: 10 }}
                            rules={[Validate.isPositiveNumberWithoutRequired]}
                          >
                            <Input />
                          </Form.Item>
                        </Col> */}
                        <Col span={2} style={{ marginTop: 2 }}>
                          <Popconfirm
                            placement="topLeft"
                            getPopupContainer={(trigger) => trigger.parentNode}
                            title={"Confirm"}
                            onConfirm={() => remove(field.name)}
                          >
                            <img
                              style={{ width: "20px" }}
                              src={require("../../../assets/img/delete.png")}
                              alt="img-null"
                            />
                          </Popconfirm>
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
                <Row
                  onClick={add}
                  className="btn-add-combo"
                  style={{
                    marginTop: 10,
                    marginBottom: 20,
                    alignItems: "center",
                  }}
                >
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
                    }}
                  >
                    Add food
                  </Row>
                </Row>
              </Col>
            );
          }}
        </Form.List>
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
          }}
        >
          {"Cancel"}
        </ButtonCustom>
        <ButtonCustom
          onClick={updateBooking}
          style={{
            minWidth: 120,
            fontSize: 16,
            backgroundColor: "#f19834",
            borderColor: "#f19834",
            color: "white",
          }}
        >
          {"Save"}
        </ButtonCustom>
      </Row>
      {loading && <LoadingAbsolute />}
    </Col>
  );
}
