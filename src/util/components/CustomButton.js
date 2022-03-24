import React from "react";
import { Button } from "antd";

function CustomButton({ custom, icon, onSubmit }) {
  return (
    <Button
      icon={icon}
      style={{
        border: 0,
        backgroundColor: custom.backgroundColor,
        color: custom.color,
        height: custom.height,
        width: custom.width,
        borderRadius: custom.borderRadius,
        paddingLeft: custom.paddingLeft,
        paddingRight: custom.paddingRight,
        padding: custom.padding,
        marginTop: custom.marginTop,
      }}
      onClick={onSubmit}>
      {custom.text}
    </Button>
  );
}

export { CustomButton };
export default CustomButton;
