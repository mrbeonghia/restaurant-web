import React from "react";
import { Button, Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function CustomTag({
  style,
  textStyle,
  iconStyle,
  icon,
  onRemove,
  data,
  disabled,
}) {
  return (
    <Tooltip
      placement="top"
      title={
        <div style={{ display: "grid" }}>
          Table: {data.table.name}
          <br />
          Seat: {data.table.seat}
        </div>
      }>
      <div
        style={{
          border: "1px solid #F2F2F2 ",
          borderRadius: 14,
          padding: "4px 15px",
          marginRight: 14,
          marginTop: 14,
          overflow: "hidden",
          alignItems: "center",
          ...style,
        }}>
        <span
          style={{
            fontSize: 15,
            paddingRight: 12,
            color: "#E39319",
            ...textStyle,
          }}>
          {data ? `Table: ${data.table.name}` : ""}
        </span>
        {!disabled && (
          <Button
            style={{
              borderWidth: 0,
              color: "#ACACAC",
              padding: 0,
              ...iconStyle,
            }}
            onClick={() => onRemove(data)}>
            {icon || <CloseOutlined />}
          </Button>
        )}
      </div>
    </Tooltip>
  );
}

export { CustomTag };
export default CustomTag;
