import {
  AutoComplete,
  Input,
  message,
  Space,
  Table,
  Switch,
  Avatar,
} from "antd";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryCache } from "react-query";
import { FetchApi } from "../../api/FetchAPI";
import { STRINGS } from "../../constants/Strings";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import {
  AlertService,
  Container,
  ModalCustomService,
  Validate,
} from "../../elements";
import { PlusCircleOutlined } from "@ant-design/icons";
import commonColor from "../../util/variables.scss";
import CustomButton from "../../util/components/CustomButton";
import Add from "./items/Add";
import Edit from "./items/Edit";
import PaginationWithSizeChange from "../../elements/PaginationWithSizeChange";
import { CommonFunction } from "../../util/CommonFunction";
import { useScrollByMouse } from "../../util/hooks/useScrollByMouse";

export default function StaffManagement() {
  const [options, setOptions] = useState([]);
  const [pagination, setPagination] = useState({ size: 10, page: 1 });
  const cache = useQueryCache();
  const dataFilter = useRef("");
  const timeout = useRef("");
  const { data, refetch, isFetching, isLoading } = useQuery(
    [`StaffManagement-${pagination.size}-${pagination.page}`],
    () =>
      FetchApi.getStaffs({
        page: pagination.page,
        size: pagination.size,
        search: dataFilter.current,
      })
  );
  const scroll = useScrollByMouse(data);

  useEffect(() => {
    if (data && !data?.success) {
      message.error(
        data?.message || "Something wrong. Please try again later."
      );
    }
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, [data]);

  const onOffActive = (e, checking) => {
    // if (timeout.current) {
    //   clearTimeout(timeout.current);
    // }
    // timeout.current = setTimeout(async () => {
    //   const action = checking ? "ON" : "OFF";
    //   const res = await FetchApi.actionBookingStore(action, e.id);
    //   if (!res.success) {
    //     message.error(res.message || STRINGS.something_wrong);
    //     setData(data?.data);
    //   } else {
    //     message.success(STRINGS.done_successful);
    //   }
    // }, 250);
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      align: "center",
      render: (e) => (
        <Avatar
          src={e}
          icon={<UserOutlined style={{ fontSize: 40, marginTop: 18 }} />}
          style={{ width: 80, height: 80 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
    },
    {
      title: "Date of birth",
      dataIndex: "birthday",
      key: "birthday",
      align: "center",
      render: (e) => {
        if (moment(e).isValid()) {
          return moment(e).format("MM/DD/YYYY");
        }
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Active",
      key: "isActive",
      dataIndex: "isActive",
      render: (active, others) => {
        return (
          <Switch
            defaultChecked={active}
            onChange={(checking) => onOffActive(others, checking)}
          />
        );
      },
      fixed: "right",
      align: "center",
    },
    {
      key: "action",
      fixed: "right",
      render: (text, record) => {
        return (
          <Space size={10}>
            <button
              style={{
                border: 0,
                backgroundColor: "transparent",
              }}
              onClick={onEdit(record)}>
              <img
                style={{ width: 20, height: 20 }}
                src={require("../../assets/img/edit.png")}
                alt="edit"
              />
            </button>
            <button
              style={{
                border: 0,
                backgroundColor: "transparent",
              }}
              onClick={removeItem(record)}>
              <img
                alt="delete"
                style={{ width: 20, height: 20 }}
                src={require("../../assets/img/delete.png")}
              />
            </button>
          </Space>
        );
      },
    },
  ];

  const onAdd = () => {
    ModalCustomService.set({
      title: "Add new",
      wrapperStyle: { maxWidth: 800 },
      content: <Add data={data} setData={setData} />,
    });
  };
  const onEdit = (record) => () => {
    ModalCustomService.set({
      title: "Edit",
      wrapperStyle: { maxWidth: 800 },
      content: <Edit item={record} data={data} setData={setData} />,
    });
  };

  const [setData] = useMutation(() => {}, {
    onMutate: (newData) => {
      cache.cancelQueries(
        `StaffManagement-${pagination.size}-${pagination.page}`
      );
      cache.setQueryData(
        `StaffManagement-${pagination.size}-${pagination.page}`,
        () => {
          const dataClone = { ...data };
          if (dataClone?.users?.length !== newData?.length) {
            refetch();
            return dataClone;
          } else {
            dataClone.users = newData;
            return { ...dataClone };
          }
        }
      );
    },
  });

  const removeItem = (item) => () => {
    AlertService.set({
      title: STRINGS.confirm,
      textConfirm: STRINGS.delete,
      content: `${STRINGS.confirm_delete_common}`,
      onConfirm: async () => {
        let result = await FetchApi.deleteGacha(item.id);
        if (result.success) {
          setData([...data.users, "delete"]);
          message.success(STRINGS.deleted_common);
        } else {
          CommonFunction.logError(result);
        }
      },
    });
  };

  const onSearch = (searchText) => {
    const converted = Validate.removeSpecialCharactors(searchText);
    dataFilter.current = converted;
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      if (pagination.page == 1) {
        refetch();
        return;
      }
      setPagination({ size: 10, page: 1 });
    }, 800);
  };

  return (
    <Container
      renderLeft={() => (
        <AutoComplete options={options} onSearch={onSearch}>
          <Input
            placeholder={"Search"}
            style={{ width: 250, marginTop: 10 }}
            prefix={<SearchOutlined />}
            onPressEnter={(e) => onSearch(e.target.value)}
          />
        </AutoComplete>
      )}
      renderRight={() => (
        <CustomButton
          onSubmit={onAdd}
          icon={<PlusCircleOutlined />}
          custom={{
            text: "Add new",
            color: "white",
            backgroundColor: commonColor.textColor,
            borderRadius: "6px",
            height: "40px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        />
      )}>
      <Table
        loading={isFetching || isLoading}
        rowKey={"id"}
        columns={columns}
        dataSource={data?.staffs || []}
        locale={{ emptyText: STRINGS.no_data }}
        pagination={false}
        scroll={{ x: "1300", y: "calc(100vh - 350px)" }}
      />
      <PaginationWithSizeChange
        size={pagination.size}
        total={data?.pageDto?.totalElements || 0}
        onChange={(pageNumber) => {
          setPagination({ size: pagination.size, page: pageNumber });
        }}
        onShowSizeChange={(e) => {
          setPagination({ size: e.size, page: 1 });
        }}
        current={pagination.page}
      />
    </Container>
  );
}
