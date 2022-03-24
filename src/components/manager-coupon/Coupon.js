import { message, Space, Table, Switch, Image } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryCache } from "react-query";
import { FetchApi } from "../../api/FetchAPI";
import { STRINGS } from "../../constants/Strings";
import { AlertService, Container, ModalCustomService } from "../../elements";
import { PlusCircleOutlined } from "@ant-design/icons";
import commonColor from "../../util/variables.scss";
import CustomButton from "../../util/components/CustomButton";
import Add from "./items/Add";
import Edit from "./items/Edit";
import PaginationWithSizeChange from "../../elements/PaginationWithSizeChange";
import { CommonFunction } from "../../util/CommonFunction";
import { useScrollByMouse } from "../../util/hooks/useScrollByMouse";
import moment from "moment";

export default function Coupon() {
  const [pagination, setPagination] = useState({ size: 10, page: 1 });
  const cache = useQueryCache();
  const timeout = useRef("");
  const { data, refetch, isFetching, isLoading } = useQuery(
    [`getCoupon-${pagination.size}-${pagination.page}`],
    () =>
      FetchApi.getCoupon({
        page: pagination.page,
        size: pagination.size,
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
    //     message.error(res.message || "Something wrong. Please try again.");
    //     setData(data?.data);
    //   } else {
    //     message.success(STRINGS.done_successful);
    //   }
    // }, 250);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      align: "center",
      render: (e) => <Image src={e} style={{ width: 120, height: 120 }} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Start time",
      dataIndex: "startDate",
      key: "startDate",
      align: "center",
      render: (e) => moment(e).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "End time",
      dataIndex: "endDate",
      key: "endDate",
      align: "center",
      render: (e) => moment(e).format("DD/MM/YYYY HH:mm"),
    },
    // {
    //   key: "action",
    //   fixed: "right",
    //   render: (text, record) => {
    //     return (
    //       <Space size={10}>
    //         <button
    //           style={{
    //             border: 0,
    //             backgroundColor: "transparent",
    //           }}
    //           onClick={onEdit(record)}
    //         >
    //           <img
    //             style={{ width: 20, height: 20 }}
    //             src={require("../../assets/img/edit.png")}
    //             alt="edit"
    //           />
    //         </button>
    //         <button
    //           style={{
    //             border: 0,
    //             backgroundColor: "transparent",
    //           }}
    //           onClick={removeItem(record)}
    //         >
    //           <img
    //             alt="delete"
    //             style={{ width: 20, height: 20 }}
    //             src={require("../../assets/img/delete.png")}
    //           />
    //         </button>
    //       </Space>
    //     );
    //   },
    // },
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
      cache.cancelQueries(`Foods-${pagination.size}-${pagination.page}`);
      cache.setQueryData(`Foods-${pagination.size}-${pagination.page}`, () => {
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
    // renderRight={() => (
    //   <CustomButton
    //     onSubmit={onAdd}
    //     icon={<PlusCircleOutlined />}
    //     custom={{
    //       text: "Add new",
    //       color: "white",
    //       backgroundColor: commonColor.textColor,
    //       borderRadius: "6px",
    //       height: "40px",
    //       paddingLeft: "20px",
    //       paddingRight: "20px",
    //     }}
    //   />
    // )}
    >
      <Table
        loading={isFetching || isLoading}
        rowKey={"id"}
        columns={columns}
        dataSource={data?.couponDTOList || []}
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
