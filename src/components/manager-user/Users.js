import { AutoComplete, Input, message, Space, Table } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryCache } from "react-query";
import { FetchApi } from "../../api/FetchAPI";
import { STRINGS } from "../../constants/Strings";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

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

export default function Users() {
  const [options, setOptions] = useState([]);
  const [pagination, setPagination] = useState({ size: 10, page: 1 });
  const cache = useQueryCache();
  const dataFilter = useRef("");
  const timeout = useRef("");
  const { data, refetch, isFetching, isLoading } = useQuery(
    [`Users-${pagination.size}-${pagination.page}`],
    () =>
      FetchApi.getUsers({
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

  const columns = [
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
      key: "action",
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
      wrapperStyle: { maxWidth: 600 },
      content: <Add data={data} setData={setData} />,
    });
  };
  const onEdit = (record) => () => {
    ModalCustomService.set({
      title: "Edit",
      wrapperStyle: { maxWidth: 600 },
      content: <Edit item={record} data={data} setData={setData} />,
    });
  };

  const [setData] = useMutation(() => {}, {
    onMutate: (newData) => {
      cache.cancelQueries(`Users-${pagination.size}-${pagination.page}`);
      cache.setQueryData(`Users-${pagination.size}-${pagination.page}`, () => {
        const dataClone = { ...data };
        if (dataClone?.users?.length !== newData?.length) {
          refetch();
          return dataClone;
        } else {
          dataClone.users = newData;
          return { ...dataClone };
        }
      });
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
        dataSource={data?.users || []}
        locale={{ emptyText: STRINGS.no_data }}
        pagination={false}
        scroll={{ x: "auto", y: "calc(100vh - 350px)" }}
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
