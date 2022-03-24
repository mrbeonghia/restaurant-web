import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const BlockUI = forwardRef((props, ref) => {
  const [blockUI, setBlockUI] = useState(false);

  useImperativeHandle(ref, () => ({
    setBlockUI: setBlockUI,
  }));

  if (!blockUI) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(46, 49, 49, 0.3)",
        zIndex: 2,
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 250,
          height: 220,
          borderRadius: 40,
          backgroundColor: "white",
          zIndex: 100,
          top: "30%",
          position: "relative",
          ...props.style,
        }}>
        <Spin
          size="large"
          style={{ color: "#FF7777" }}
          indicator={<LoadingOutlined />}
        />
      </div>
    </div>
  );
});

export { BlockUI };
