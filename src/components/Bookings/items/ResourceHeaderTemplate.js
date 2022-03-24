import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import { ModalCustomService } from "../../../elements/ModalCustom/ModalCustomService";

function ResourceHeaderTemplate(props) {
  const { dataBooking, refetchBookings } = props.resourceData;
  const [shiftStatus, setShiftStatus] = useState(dataBooking.available);

  const onGoDetailStaffSchedule = () => {
    ModalCustomService.set({
      wrapperStyle: { width: "auto" },
      contentWrapperStyle: { width: "fit-content" },
      contentStyle: { maxHeight: "80vh", padding: 0 },
      content: <div>123</div>,
    });
  };

  return (
    <Row
      style={{
        padding: 0,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Col
        span={10}
        style={{
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        {dataBooking.name}
      </Col>
      <Col span={14} style={{ textAlign: "right" }}>
        <Button
          className="btn-resourceHeaderTemplate"
          style={{
            padding: "4px 16px",
            borderRadius: 6,
            backgroundColor: "#FF8000",
            border: `1px solid #FF8000`,
            fontSize: 13,
          }}
        >
          {shiftStatus ? "Available" : "Unavailable"}
        </Button>
      </Col>
    </Row>
  );
}

export default ResourceHeaderTemplate;
