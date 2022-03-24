import React from "react";
import { Col, Row, Typography } from "antd";
import CommonColor from "../util/variables.scss";

const Container = ({
  title,
  titleStyle,
  children,
  className,
  childrenStyle,
  renderRight,
  renderLeft,
  hasBorderBottom,
  styleHeader,
}) => {
  let styleBorderBottom = {};
  if (hasBorderBottom) {
    styleBorderBottom = {
      borderBottom: "1px solid #E3E3E3",
      paddingBottom: 15,
    };
  }

  return (
    <Col className={className} style={{ paddingLeft: 20 }}>
      <Row
        justify="space-between"
        align="middle"
        style={{ ...styleBorderBottom, ...styleHeader }}>
        {!!renderLeft ? renderLeft() : !!title ? null : <div />}
        {!!title && (
          <Typography.Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              color: CommonColor.mainColor,
              ...titleStyle,
            }}>
            {title}
          </Typography.Text>
        )}
        {!!renderRight && <Col>{renderRight()}</Col>}
      </Row>
      <Col
        style={{
          marginTop: 10,
          alignItems: "flex-start",
          width: "100%",
          ...childrenStyle,
        }}>
        {children}
      </Col>
    </Col>
  );
};

export { Container };
