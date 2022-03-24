import { Button, Row } from "antd";
import React, { useState } from "react";
import { COLORS } from "../../../constants";

function RadioCustom({ value, onChange, list, style, disabled, enabledItem }) {
  const [state, setState] = useState(value);

  return (
    <Row>
      {list.map((item, index) => {
        let backgroundColor = "white";
        let borderColor = "gray";
        let disabledButton = false;
        if (state === item.value) {
          backgroundColor = COLORS.primary;
          borderColor = COLORS.primary;
          if (disabled) {
            backgroundColor = COLORS.disabled;
            borderColor = COLORS.disabled;
          }
          if (enabledItem?.value === item.value) {
            backgroundColor = COLORS.primary;
            borderColor = COLORS.primary;
          }
        }
        if (disabled) {
          disabledButton = true;
        }
        if (enabledItem?.value === item.value) {
          disabledButton = false;
        }
        return (
          <Button
            disabled={disabledButton}
            key={`${index}`}
            onClick={() => {
              setState(item.value);
              onChange(item.value);
            }}
            style={{
              width: 120,
              marginRight: 10,
              borderWidth: 1,
              borderRadius: 4,
              borderColor,
              backgroundColor,
              color: state === item.value ? "white" : "black",
              ...style,
            }}>
            {item.label}
          </Button>
        );
      })}
    </Row>
  );
}

export default RadioCustom;
