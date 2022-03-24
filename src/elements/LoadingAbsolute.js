import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingAbsolute = ({ styleSpin }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        opacity: 0.3,
        justifyContent: "center",
      }}>
      <LoadingOutlined
        style={{
          position: "fixed",
          fontSize: 40,
          top: "45%",
          // marginTop: "20%",
          ...styleSpin,
        }}
        spin
      />
    </div>
  );
};

export { LoadingAbsolute };
