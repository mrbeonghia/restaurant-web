import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Dropdown, Menu, Layout, Row, Col, Button } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";

import { COLORS, STRINGS } from "../../../constants";
import { HeaderService } from "../../../services/HeaderService";
import Auth from "../../../store/Authentication";
import { AccountService } from "../../../services/AccountService";
import logo from "../../../assets/img/salon-logo.png";
import { MenuCollapsingService } from "../../../services/MenuCollapsingService";
import { useHistory } from "react-router-dom";
import { HeaderStaffScheduleService } from "../../../services/HeaderStaffScheduleService";

const { Header } = Layout;

function MainHeader({ handleLogout, setSelectedKey, collapsed }) {
  const history = useHistory();
  const userAdmin = JSON.parse(Auth.getCurrentUser());
  const [userName, setUserName] = useState(userAdmin?.name || "");
  const [header, setHeader] = useState("");
  const [zoomType, setZoomType] = useState();

  useEffect(() => {
    AccountService.onChange("MainHeader", (n) => {
      setUserName(n.name);
    });
    HeaderService.onChange("MainHeader", (headerName) => {
      setHeader(headerName);
      setZoomType();
    });
    return () => {
      HeaderService.deleteKey("MainHeader");
      AccountService.deleteKey("MainHeader");
    };
  }, []);

  const onZoomOut = useCallback(() => {
    setZoomType("zoomOut");
    HeaderStaffScheduleService.set("zoomOut");
  }, []);
  const onZoomIn = useCallback(() => {
    setZoomType("zoomIn");
    HeaderStaffScheduleService.set("zoomIn");
  }, []);
  const handleAbleModalSearch = useCallback(
    () => HeaderStaffScheduleService.set("onAbleModalSearch"),
    []
  );

  const setServiceHeader = (e) => {
    HeaderService.set(e.key);
    setSelectedKey(null);
  };

  const menu = (
    <Menu className="profile-dropdown" style={{ top: -12 }}>
      {userAdmin && userAdmin.type === "SYSTEM_ADMIN" && (
        <>
          <Menu.Item
            key="profile"
            onClick={(e) => {
              setServiceHeader(e);
              window.location.href = "/profile";
            }}>
            {STRINGS.profile}
          </Menu.Item>
          <Menu.Divider />
        </>
      )}
      <Menu.Item key="logout" onClick={handleLogout}>
        {STRINGS.logout}
      </Menu.Item>
    </Menu>
  );

  const renderHeaderStaffSchedule = () => {
    return (
      <Row style={{ justifyContent: "flex-end", alignItems: "center" }}>
        <Col style={{ alignSelf: "center", marginRight: 20 }}>
          <Row>
            <Button
              onClick={onZoomOut}
              shape="circle"
              className="btn-zoom"
              style={{
                borderColor:
                  zoomType === "zoomOut" ? COLORS.secondary : "black",
                backgroundColor:
                  zoomType === "zoomOut" ? COLORS.secondary : "white",
                color: zoomType === "zoomOut" ? "white" : "black",
              }}
              icon={<MinusOutlined style={{ fontWeight: "bold" }} />}></Button>
            <Button
              onClick={onZoomIn}
              className="btn-zoom"
              shape="circle"
              style={{
                borderColor: zoomType === "zoomIn" ? COLORS.secondary : "black",
                backgroundColor:
                  zoomType === "zoomIn" ? COLORS.secondary : "white",
                color: zoomType === "zoomIn" ? "white" : "black",
              }}
              icon={<PlusOutlined />}></Button>
          </Row>
        </Col>

        <Button
          icon={<SearchOutlined />}
          onClick={handleAbleModalSearch}
          style={{
            height: "fit-content",
            fontSize: 20,
            alignSelf: "flex-start",
            borderRadius: 4,
            border: "1px solid #FF8000",
            backgroundColor: "#FF8000",
            color: "white",
            padding: "4px 12px",
            fontWeight: "bold",
            marginRight: 10,
          }}>
          検索
        </Button>
        <Button
          onClick={() => history.push("staff-booking")}
          style={{
            height: "fit-content",
            fontSize: 20,
            alignSelf: "flex-start",
            borderRadius: 4,
            border: `1px solid ${COLORS.secondary}`,
            backgroundColor: COLORS.secondary,
            color: "white",
            padding: "4px 12px",
            fontWeight: "bold",
            marginRight: 20,
          }}>
          予約
        </Button>
      </Row>
    );
  };

  if (userAdmin.type !== "SYSTEM_ADMIN" && userAdmin.type !== "STORE_ADMIN") {
    return (
      <Header className="header">
        <Row
          style={{
            padding: "0px 0px",
            width: "100%",
            justifyContent: "space-between",
          }}>
          <Row style={{ alignSelf: "center" }}>
            <Row
              onClick={() => MenuCollapsingService.set()}
              style={{
                width: "fit-content",
                alignSelf: "center",
                padding: "10px 20px",
                marginLeft: 16,
                borderRadius: 5,
                cursor: "pointer",
                backgroundColor: COLORS.primary,
              }}>
              {collapsed ? (
                <MenuUnfoldOutlined
                  style={{ color: "white", transform: `scale(1.5)` }}
                />
              ) : (
                <MenuFoldOutlined
                  style={{ color: "white", transform: `scale(1.5)` }}
                />
              )}
            </Row>
            <Col
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 0,
                fontFamily: "sans-serif",
                marginLeft: 200,
              }}>
              {header}
            </Col>
          </Row>

          {header == STRINGS.online_reservation_reception && (
            <Col style={{ alignSelf: "center" }}>
              {renderHeaderStaffSchedule()}
            </Col>
          )}
        </Row>
      </Header>
    );
  }

  return (
    <Header className="header">
      <Dropdown overlay={menu} trigger={["click"]}>
        <div className="profile-header">
          <Avatar
            className="avatar-profile-header"
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
          <div className="profile-name">{userName}</div>
        </div>
      </Dropdown>
      <img
        onClick={() => (window.location.href = "/")}
        style={{
          width: 100,
          height: 70,
          alignSelf: "center",
          cursor: "pointer",
        }}
        src={logo}
        alt="logo"
      />
      <div className="label-header">{header}</div>
    </Header>
  );
}

export default MainHeader;
