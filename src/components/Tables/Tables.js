import { message, Space, Table, Switch } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryCache } from "react-query";
import { FetchApi } from "../../api/FetchAPI";
import { STRINGS } from "../../constants/Strings";
import {
  AlertService,
  Container,
  ModalCustomService,
  LoadingView,
  ErrorView,
} from "../../elements";
import { PlusCircleOutlined } from "@ant-design/icons";
import commonColor from "../../util/variables.scss";
import CustomButton from "../../util/components/CustomButton";
import Add from "./items/Add";
import Edit from "./items/Edit";
import PaginationWithSizeChange from "../../elements/PaginationWithSizeChange";
import { CommonFunction } from "../../util/CommonFunction";
import { useScrollByMouse } from "../../util/hooks/useScrollByMouse";

export default function Tables() {
  const [pagination, setPagination] = useState({ size: 10, page: 1 });
  const cache = useQueryCache();
  const timeout = useRef("");
  const { data, refetch, isFetching, isLoading } = useQuery(
    [`Tables-${pagination.size}-${pagination.page}`],
    () => FetchApi.getTable({ page: pagination.page, size: pagination.size })
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
      title: "Table name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Seat",
      dataIndex: "seat",
      key: "seat",
      align: "center",
    },
    {
      title: "Available",
      key: "available",
      dataIndex: "available",
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
              onClick={onEdit(record)}
            >
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
              onClick={removeItem(record)}
            >
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
      cache.cancelQueries(`Tables-${pagination.size}-${pagination.page}`);
      cache.setQueryData(`Tables-${pagination.size}-${pagination.page}`, () => {
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

  return (
    <Container
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
      )}
    >
      <Table
        loading={isFetching || isLoading}
        rowKey={"id"}
        columns={columns}
        dataSource={data?.tableDTOS || []}
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
