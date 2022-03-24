import { Button, Col, DatePicker, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { COLORS } from "../../../constants";
import { STRINGS, LOGIC } from "../../../constants/Strings";
import { Svgs } from "../../../constants/Svgs";
import { ModalCustomService } from "../../../elements/ModalCustom/ModalCustomService";
import ModalAddBooking from "./ModalAddBooking";

function HeaderSchedule({
  selectedDate,
  setSelectedDate,
  onCellScale,
  refetchBookings,
}) {
  const [zoomType, setZoomType] = useState("zoomIn");
  const onZoomOut = () => {
    onCellScale("zoomOut")();
    setZoomType("zoomOut");
  };
  const onZoomIn = () => {
    onCellScale("zoomIn")();
    setZoomType("zoomIn");
  };
  const onAbleModalAddOrder = () => {
    ModalCustomService.set({
      title: "Add booking",
      wrapperStyle: { width: "auto" },
      contentWrapperStyle: { width: "fit-content" },
      contentStyle: { maxHeight: "80vh", padding: 0 },
      content: <ModalAddBooking refetchBookings={refetchBookings} />,
    });
  };
  const isDisabled = moment(selectedDate).isBefore(moment().subtract(1, "day"));
  let color = "#FF8000";
  let borderColor = "1px solid #FF8000";
  if (isDisabled) {
    color = COLORS.disabled;
    borderColor = `1px solid ${COLORS.disabled}`;
  }
  return (
    <Row
      style={{
        backgroundColor: "white",
        padding: 18,
        justifyContent: "space-between",
      }}
    >
      <Col xl={12} sx={24}>
        <DatePicker
          defaultValue={selectedDate}
          suffixIcon={Svgs.datepicker({ width: 19, height: 21 })}
          style={{
            width: 250,
            borderRadius: 4,
            padding: "6px 10px",
            marginRight: 20,
          }}
          allowClear={false}
          onChange={(e) => setSelectedDate(moment(e))}
          format={(e) => {
            return `${moment(e).format(LOGIC.dateFormat)} (${
              LOGIC.day[moment(e).weekday() || 7]
            })`;
          }}
          picker={"date"}
        />
      </Col>
      <Col>
        <Row>
          <Button
            onClick={onZoomIn}
            className="btn-zoom"
            shape="circle"
            style={{
              borderColor: zoomType === "zoomIn" ? COLORS.secondary : "gray",
              backgroundColor:
                zoomType === "zoomIn" ? COLORS.secondary : "gray",
              color: "white",
              marginRight: 8,
            }}
            icon={<MinusOutlined style={{ fontWeight: "bold" }} />}
          />
          <Button
            onClick={onZoomOut}
            shape="circle"
            className="btn-zoom"
            style={{
              borderColor: zoomType === "zoomOut" ? COLORS.secondary : "gray",
              backgroundColor:
                zoomType === "zoomOut" ? COLORS.secondary : "gray",
              color: "white",
            }}
            icon={<PlusOutlined />}
          />
          <Button
            disabled={isDisabled}
            onClick={onAbleModalAddOrder}
            style={{
              marginLeft: 20,
              width: "fit-content",
              padding: "5px 20px",
              borderRadius: 4,
              color: color,
              border: borderColor,
              alignItems: "center",
              height: "auto",
            }}
          >
            {"+  Add order"}
          </Button>
        </Row>
      </Col>
    </Row>
  );
}

export default HeaderSchedule;
