import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  InputNumber,
  message,
  Popconfirm,
  Row,
  Select,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import { COLORS, LOGIC, STRINGS } from "../../../constants";
import DropdownCourse from "./DropdownCourse";
import { Validate } from "../../../elements";
import { useQuery } from "react-query";
import { FetchApi } from "../../../api/FetchAPI";

function useGetComboRevenue() {
  const { data } = useQuery([`useGetComboRevenue-${1}`], () =>
    FetchApi.getComboRevenue()
  );
  return {
    dataRevenue: data?.comboRevenueDTOS || [],
  };
}
function useGetComboPacksAvailableWithBooking(id) {
  const { data } = useQuery("DropdownCourseActive", () =>
    FetchApi.getComboPacksAvailableWithBooking(id)
  );
  return {
    dataCombo: data,
  };
}

function ModalBookingDetailTableCombo({
  data,
  disabledForm,
  setTotal,
  originalTotal,
  disabledClick,
}) {
  const [form] = Form.useForm();
  const [combosPicked, setCombosPicked] = useState(
    (data.comboOrders || []).map((item) => item.comboName).length > 1
      ? data.comboOrders.map((item) => item.comboName)
      : []
  );
  const { dataRevenue } = useGetComboRevenue();
  const { dataCombo } = useGetComboPacksAvailableWithBooking(data.id);

  const customerType = {
    GUEST: "priceDefault",
    MEMBER_APP: "priceMemberApp",
    MEMBER_NON_APP: "priceNonApp",
    S_MEMBER: "priceMemberApp",
  };

  const onValuesChange = async () => {
    const { comboOrders } = form.getFieldValue();
    const comboIdsFilter = comboOrders.map((item) => {
      return item.comboPackId;
    });
    setCombosPicked(comboIdsFilter);
    let totalPrice = Number(originalTotal);

    const clone = comboOrders.map((item) => ({
      comboPackId: item.comboPackId,
      minutes: item.minutes,
      priceDefault: item.priceDefault,
      priceMemberApp: item.priceMemberApp,
      priceNonApp: item.priceNonApp,
    }));

    form.getFieldValue().comboOrders.forEach((element, index) => {
      if (element.comboPackId && element.minutes) {
        const i = (dataCombo?.comboDTOS || []).findIndex(
          (it) => it.id == element.comboPackId
        );
        const comboId = dataCombo?.comboDTOS?.[i].comboId;
        const dataRevenueByComboId = dataRevenue.find(
          (it) => it.comboId == comboId
        );
        const minutesBlock = dataRevenueByComboId?.minutesBlock;
        const revenueFixed = dataRevenueByComboId?.revenueFixed;

        const money =
          minutesBlock && revenueFixed
            ? (element.minutes * revenueFixed) / minutesBlock
            : 0;

        totalPrice = totalPrice + money;

        clone[index][customerType[data.customerType]] = money;
      }
    });
    form.setFieldsValue({
      comboOrders: clone,
    });
    setTotal(totalPrice);
  };

  const onSave = async () => {
    const { comboOrders } = form.getFieldValue();
    const obj = {
      bookingId: data.id,
      packs: [],
      price: 0,
      sideEdit: "STORE",
    };

    comboOrders.forEach((item, index) => {
      obj.packs.push({
        id: item.comboPackId,
        minutes: item.minutes,
        [customerType[data.customerType]]:
          item[customerType[data.customerType]],
      });
      obj.price =
        Number(obj.price) + Number(item[customerType[data.customerType]]);
    });

    const result = await FetchApi.changeComboPacksBooking(obj);
    if (result.success) {
      message.success(STRINGS.saved_common);
    } else {
      message.error(result.message);
    }
  };

  return (
    <Form
      form={form}
      initialValues={{
        comboOrders: data.comboOrders || [],
      }}
      onValuesChange={onValuesChange}>
      <Row>
        <Col span={13}>
          <Row className="theader" style={{ marginTop: 0 }}>
            <Col span={11}>{STRINGS.course}</Col>
            <Col span={5}>{STRINGS.minute}</Col>
            <Col span={6}>￥</Col>
          </Row>

          <Form.List name="comboOrders">
            {(fields, { add, remove }) => {
              return (
                <Col>
                  {fields.map((field, index, arr) => (
                    <Col
                      key={field.key}
                      className={field.key === 0 ? "col-wrapper-row-input" : 0}>
                      <Row className="row-table-custom">
                        <Col span={11}>
                          <Form.Item
                            {...field}
                            name={[field.name, "comboPackId"]}
                            fieldKey={[field.fieldKey, "comboPackId"]}
                            rules={[Validate.emptyContent]}>
                            <DropdownCourse
                              comboDTOS={dataCombo?.comboDTOS || []}
                              disabled={disabledForm}
                              combosPicked={combosPicked}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...field}
                            name={[field.name, "minutes"]}
                            fieldKey={[field.fieldKey, "minutes"]}
                            rules={[Validate.emptyContent]}>
                            <Select disabled={disabledForm}>
                              <Select.Option value={10}>
                                10{STRINGS.minute}
                              </Select.Option>
                              <Select.Option value={20}>
                                20{STRINGS.minute}
                              </Select.Option>
                              <Select.Option value={30}>
                                30{STRINGS.minute}
                              </Select.Option>
                              <Select.Option value={40}>
                                40{STRINGS.minute}
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...field}
                            name={[field.name, customerType[data.customerType]]}
                            fieldKey={[
                              field.fieldKey,
                              customerType[data.customerType],
                            ]}>
                            <InputNumber
                              disabled
                              formatter={(value) =>
                                `${LOGIC.currencyYenFormatter(value)}`
                              }
                            />
                          </Form.Item>
                        </Col>
                        {disabledForm || index == 0 ? null : (
                          <Col style={{ marginTop: 2, marginLeft: 10 }}>
                            <Popconfirm
                              placement="topLeft"
                              getPopupContainer={(trigger) =>
                                trigger.parentNode
                              }
                              title={STRINGS.confirm_delete_common}
                              onConfirm={() => remove(field.name)}>
                              <img
                                style={{ width: "20px" }}
                                src={require("../../../assets/img/delete.png")}
                                alt="img-null"
                              />
                            </Popconfirm>
                          </Col>
                        )}
                      </Row>
                    </Col>
                  ))}
                  {!disabledForm && (
                    <Row
                      onClick={add}
                      className="btn-add-combo"
                      style={{
                        marginTop: 20,
                        marginBottom: 25,
                        marginLeft: 65,
                      }}>
                      <PlusCircleOutlined style={{ fontSize: 26 }} />
                      <Row style={{ color: COLORS.primary, fontSize: 26 }}>
                        {STRINGS.extension}
                      </Row>
                    </Row>
                  )}
                </Col>
              );
            }}
          </Form.List>
          <Button
            disabled={disabledForm}
            onClick={onSave}
            style={{
              height: "fit-content",
              fontSize: 20,
              alignSelf: "flex-start",
              borderRadius: 4,
              backgroundColor: disabledClick ? COLORS.disabled : "#FF8000",
              color: "white",
              padding: "4px 12px",
              fontWeight: "bold",
              marginRight: 10,
              marginTop: 15,
            }}>
            {STRINGS.save}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default ModalBookingDetailTableCombo;
