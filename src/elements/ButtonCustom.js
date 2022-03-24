import React from "react";
import { Button } from "antd";

const ButtonCustom = ({ className, style, onClick, disabled, children }) => {
  return (
    <button
      className={className}
      style={{
        padding: "4px 30px",
        borderRadius: 5,
        borderWidth: 1,
        cursor: "pointer",
        height: "fit-content",
        borderStyle: "solid",
        ...style,
      }}
      disabled={disabled}
      onClick={() => {
        onClick && onClick();
      }}
      type="button">
      {children}
    </button>
  );
};

export { ButtonCustom };
