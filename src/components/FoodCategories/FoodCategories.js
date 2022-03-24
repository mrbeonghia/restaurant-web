import { message, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryCache } from "react-query";
import { PlusCircleOutlined } from "@ant-design/icons";
import { FetchApi } from "../../api/FetchAPI";
import {
  Container,
  LoadingView,
  ErrorView,
  ModalCustomService,
} from "../../elements";
import commonColor from "../../util/variables.scss";
import { useScrollByMouse } from "../../util/hooks/useScrollByMouse";
import CustomButton from "../../util/components/CustomButton";
import Add from "./items/Add";
import Edit from "./items/Edit";

export function useGetCategory() {
  const categories = useQuery([`FoodCategories`], () => FetchApi.getCategory());
  return categories;
}

export default function FoodCategories() {
  const { data, refetch, isFetching, isLoading } = useGetCategory();
  const scroll = useScrollByMouse(data);
  const cache = useQueryCache();

  useEffect(() => {
    if (data && !data?.success) {
      message.error(
        data?.message || "Something wrong. Please try again later."
      );
    }
  }, [data]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
              // onClick={removeItem(record)}
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
      content: <Add data={data} refetch={refetch} />,
    });
  };
  const [setData] = useMutation(() => {}, {
    onMutate: (newData) => {
      cache.cancelQueries(`FoodCategories`);
      cache.setQueryData(`FoodCategories`, () => {
        const dataClone = { ...data };
        if (dataClone?.categoryDTOS?.length !== newData?.length) {
          refetch();
          return dataClone;
        } else {
          dataClone.categoryDTOS = newData;
          return { ...dataClone };
        }
      });
    },
  });
  const onEdit = (record) => () => {
    ModalCustomService.set({
      title: "Edit",
      wrapperStyle: { maxWidth: 600 },
      content: <Edit item={record} data={data} setData={setData} />,
    });
  };

  if (isLoading) {
    return <LoadingView />;
  }

  if (data && !data.success) {
    return <ErrorView data={data} />;
  }
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
      )}>
      <Table
        loading={isFetching || isLoading}
        rowKey={"id"}
        columns={columns}
        dataSource={data?.categoryDTOS || []}
        locale={{ emptyText: "No data" }}
        pagination={false}
        scroll={{ x: "auto", y: "calc(100vh - 350px)" }}
      />
    </Container>
  );
}
