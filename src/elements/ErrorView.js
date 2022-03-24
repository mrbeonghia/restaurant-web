import React from "react";
import { Row } from "antd";
import { CommonFunction } from "../util/CommonFunction";

const ErrorView = ({ data }) => {
  return (
    <Row style={{ marginTop: 10, color: "red" }}>
      {CommonFunction.textViewError(data)}
    </Row>
  );
};

export { ErrorView };
