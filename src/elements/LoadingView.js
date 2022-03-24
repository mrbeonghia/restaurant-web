import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingView = () => {
  return (
    <Spin
      style={{ width: "100%", marginTop: 40 }}
      indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
    />
  );
};

export { LoadingView };
