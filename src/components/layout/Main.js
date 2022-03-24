import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  useLocation,
} from "react-router-dom";

import "./Main.scss";
import Profile from "../manager-profile/Profile";
import Auth from "../../store/Authentication";
import { useHistory } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { HeaderService } from "../../services/HeaderService";
import { STRINGS } from "../../constants/Strings";
import { AccountService } from "../../services/AccountService";
import StaffManagement from "../manager-staff-management/StaffManagement";
import { Svgs } from "../../constants/Svgs";
import { ModalCustomService } from "../../elements/ModalCustom/ModalCustomService";

import { MenuCollapsingService } from "../../services/MenuCollapsingService";

import Users from "../manager-user/Users";
import MainHeader from "./items/MainHeader";
import Foods from "../Foods/Foods";
import FoodCategories from "../FoodCategories/FoodCategories";
import Tables from "../Tables/Tables";
import Bookings from "../Bookings/Bookings";
import BookingHistory from "../BookingHistory/BookingHistory";
import Coupon from "../manager-coupon/Coupon";

const { Content, Sider } = Layout;

const systemAdmin = [
  {
    component: Users,
    url: "/",
  },
  {
    component: StaffManagement,
    url: "/staff-management",
  },
  {
    component: Coupon,
    url: "/manager-coupon",
  },
  {
    component: FoodCategories,
    url: "/manager-categories",
  },
  {
    component: Foods,
    url: "/manager-foods",
  },
  {
    component: Tables,
    url: "/manager-tables",
  },
  {
    component: Bookings,
    url: "/manager-bookings",
  },
  {
    component: BookingHistory,
    url: "/manager-history",
  },
  {
    component: Profile,
    url: "/profile",
  },
];

const kitchenAdmin = [
  {
    component: Bookings,
    url: "/",
  },
  {
    component: Profile,
    url: "/profile",
  },
];
const waiterAdmin = [
  {
    component: Bookings,
    url: "/",
  },
  {
    component: Profile,
    url: "/profile",
  },
];
const receptionistAdmin = [
  {
    component: Users,
    url: "/",
  },
  {
    component: Bookings,
    url: "/manager-bookings",
  },
  {
    component: Profile,
    url: "/profile",
  },
];

const menuItems = [
  {
    key: "users",
    icon: Svgs.user,
    title: "Users",
    linkTo: "/",
  },
  {
    key: "staffs",
    icon: Svgs.staff(),
    title: "Staffs",
    linkTo: "/staff-management",
  },
  {
    key: "coupons",
    icon: Svgs.coupon(),
    title: "Coupons",
    linkTo: "/manager-coupon",
  },
  {
    key: "tables",
    icon: Svgs.push(),
    title: "Tables",
    linkTo: "/manager-tables",
  },
  {
    key: "categories",
    icon: <PictureOutlined />,
    title: "Food Categories",
    linkTo: "/manager-categories",
  },
  {
    key: "foods",
    icon: Svgs.homePage(),
    title: "Foods",
    linkTo: "/manager-foods",
  },
  {
    key: "bookings",
    icon: Svgs.notificationStaff,
    title: "Bookings",
    linkTo: "/manager-bookings",
  },
  {
    key: "bookingsHistory",
    icon: Svgs.visitHistory(),
    title: "Bookings History",
    linkTo: "/manager-history",
  },
];
const menuKitchen = [
  {
    key: "bookings",
    icon: Svgs.notificationStaff,
    title: "Bookings",
    linkTo: "/",
  },
];
const menuWaiter = [
  {
    key: "bookings",
    icon: Svgs.notificationStaff,
    title: "Bookings",
    linkTo: "/",
  },
];
const menuReceptionist = [
  {
    key: "user",
    icon: Svgs.user,
    title: "Users",
    linkTo: "/",
  },
  {
    key: "bookings",
    icon: Svgs.notificationStaff,
    title: "Bookings",
    linkTo: "/manager-bookings",
  },
];

const Main = memo(() => {
  const history = useHistory();
  const userAdmin = JSON.parse(Auth.getCurrentUser());
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState();
  const allowedRoutes = useRef([]);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    ModalCustomService.set({
      content: <div>Do you want to logout?</div>,
      textConfirm: "Logout",
      textCancel: "Close",
      wrapperStyle: { width: 420 },
      onConfirm: () => {
        Auth.logout();
        history.push("/login");
      },
    });
  };

  const collapseSet = useCallback(() => {
    if (window.innerWidth < 1000) {
      setCollapsed(true);
    }
    if (window.innerWidth >= 1000) {
      setCollapsed(false);
    }
  }, []);

  useEffect(() => {
    AccountService.set(userAdmin);
    MenuCollapsingService.onChange("main", () => {
      setCollapsed((prev) => !prev);
    });
    window.addEventListener("resize", () => collapseSet());
    if (userAdmin?.type === "SYSTEM_ADMIN") {
      allowedRoutes.current = systemAdmin;
      const menuActive = menuItems.find((_item) => {
        return location.pathname === _item.linkTo;
      });
      if (menuActive) {
        HeaderService.set(menuActive.key);
        setSelectedKey(menuActive.key);
      } else {
        if (location.pathname === "/profile") {
          HeaderService.set("profile");
        }
      }
    }
    if (userAdmin?.type === "KITCHEN") {
      allowedRoutes.current = kitchenAdmin;
      const menuActive = menuKitchen.find((_item) => {
        return location.pathname === _item.linkTo;
      });
      if (menuActive) {
        HeaderService.set(menuActive.key);
        setSelectedKey(menuActive.key);
      } else {
        if (location.pathname === "/profile") {
          HeaderService.set("profile");
        }
      }
    }
    if (userAdmin?.type === "WAITER") {
      allowedRoutes.current = waiterAdmin;
      const menuActive = menuWaiter.find((_item) => {
        return location.pathname === _item.linkTo;
      });
      if (menuActive) {
        HeaderService.set(menuActive.key);
        setSelectedKey(menuActive.key);
      } else {
        if (location.pathname === "/profile") {
          HeaderService.set("profile");
        }
      }
    }
    if (userAdmin?.type === "RECEPTIONIST") {
      allowedRoutes.current = receptionistAdmin;
      const menuActive = menuReceptionist.find((_item) => {
        return location.pathname === _item.linkTo;
      });
      if (menuActive) {
        HeaderService.set(menuActive.key);
        setSelectedKey(menuActive.key);
      } else {
        if (location.pathname === "/profile") {
          HeaderService.set("profile");
        }
      }
    }

    return () => {
      HeaderService.deleteKey("main");
      MenuCollapsingService.deleteKey("main");
      AccountService.deleteKey("main");
    };
  }, [collapseSet, history, location, userAdmin]);

  const onClickMenu = (item) => {
    if (item.key === "logout") {
      ModalCustomService.set({
        content: <div>{STRINGS.do_u_want_logout}</div>,
        textConfirm: STRINGS.logout,
        textCancel: STRINGS.close,
        onConfirm: () => {
          Auth.logout();
          history.push("/login");
        },
      });
    } else {
      let clicked;
      if (userAdmin?.type === "SYSTEM_ADMIN") {
        clicked = menuItems.find((_item) => _item.key === item.key);
      } else if (userAdmin?.type === "WAITER") {
        clicked = menuWaiter.find((_item) => _item.key === item.key);
      } else if (userAdmin?.type === "KITCHEN") {
        clicked = menuKitchen.find((_item) => _item.key === item.key);
      } else {
        clicked = menuReceptionist.find((_item) => _item.key === item.key);
      }
      HeaderService.set(item.key);
      setSelectedKey(clicked?.key);
      history.push(clicked?.linkTo);
    }
  };

  if (!Auth.isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }} className="layout-site">
        <MainHeader
          handleLogout={handleLogout}
          setSelectedKey={setSelectedKey}
          collapsed={collapsed}
        />
        <Layout className="layout-content">
          <Sider
            width={235}
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="sider-layout"
            breakpoint="lg"
          >
            <Menu
              className="menu-sider"
              mode="inline"
              style={{
                height: "100%",
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                // backgroundImage: `url(${logo2})`,
              }}
              selectedKeys={[selectedKey]}
              onClick={onClickMenu}
            >
              {userAdmin.type === "SYSTEM_ADMIN" &&
                menuItems.map((item, index) => {
                  return (
                    <Menu.Item
                      key={item.key}
                      icon={item.icon}
                      className="menu-item"
                    >
                      <span>{item.title}</span>
                      <Link to={item.linkTo} />
                    </Menu.Item>
                  );
                })}
              {(userAdmin.type === "KITCHEN" || userAdmin.type === "WAITER") &&
                menuKitchen.map((item, index) => {
                  return (
                    <Menu.Item
                      key={item.key}
                      icon={item.icon}
                      className="menu-item"
                    >
                      <span>{item.title}</span>
                      <Link to={item.linkTo} />
                    </Menu.Item>
                  );
                })}
              {userAdmin.type === "RECEPTIONIST" &&
                menuReceptionist.map((item, index) => {
                  return (
                    <Menu.Item
                      key={item.key}
                      icon={item.icon}
                      className="menu-item"
                    >
                      <span>{item.title}</span>
                      <Link to={item.linkTo} />
                    </Menu.Item>
                  );
                })}
              <Menu.Item
                key="logout2"
                icon={Svgs.logout()}
                className="menu-item"
                onClick={handleLogout}
              >
                <span>{STRINGS.logout}</span>
              </Menu.Item>
            </Menu>

            <div style={{ position: "absolute", right: -24, top: 0 }}>
              {collapsed ? (
                <MenuUnfoldOutlined
                  style={{ fontSize: 22 }}
                  onClick={() => MenuCollapsingService.set()}
                />
              ) : (
                <MenuFoldOutlined
                  style={{ fontSize: 22 }}
                  onClick={() => MenuCollapsingService.set()}
                />
              )}
            </div>
          </Sider>
          <Layout className="content-layout">
            <Content>
              {allowedRoutes.current.map((item, index) => {
                return (
                  <Route
                    key={"" + index}
                    exact
                    path={`${item.url}`}
                    component={item.component}
                  />
                );
              })}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
});

export default Main;
