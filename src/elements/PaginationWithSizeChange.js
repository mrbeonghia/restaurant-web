import { Button, Dropdown, Menu, Pagination, Row } from "antd";
import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { SuffixIconDown } from "./SuffixIconDown";

const PaginationWithSizeChange = ({
  styles,
  onShowSizeChange,
  size,
  total,
  onChange,
  current,
}) => {
  const [pageSize, setPageSize] = useState(size);

  const menu = (
    <Menu
      onClick={(e) => {
        setPageSize(e.key);
        onShowSizeChange({ size: e.key, page: 1 });
      }}>
      <Menu.Item key="10" style={{ textAlign: "center" }}>
        10
      </Menu.Item>
      <Menu.Item key="20" style={{ textAlign: "center" }}>
        20
      </Menu.Item>
      <Menu.Item key="30" style={{ textAlign: "center" }}>
        30
      </Menu.Item>
    </Menu>
  );

  return (
    <Row
      style={{
        margin: "0px 0px 30px 0px",
        padding: "16px",
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "top",
      }}>
      <Dropdown
        style={{
          fontSize: 16,
          borderRadius: 4,
          padding: "6px 40px",
          height: "fit-content",
        }}
        overlay={menu}
        trigger={["click"]}>
        <Button
          style={{
            marginBottom: 10,
            display: "flex",
            flexDirection: "row",
            padding: "6px 10px",
            width: "150px",
            alignItems: "center",
            justifyContent: "space-between",
            height: "fit-content",
            borderRadius: 4,
            ...styles,
          }}>
          <div></div>
          <span>{pageSize}</span>
          <SuffixIconDown />
        </Button>
      </Dropdown>
      <Pagination
        pageSize={pageSize}
        total={total || 1}
        onChange={onChange}
        current={current}
        showSizeChanger={false}
      />
    </Row>
  );
};

export default PaginationWithSizeChange;
