import { Col, message, Row, Space, Table } from "antd";
import moment from "moment";
import React, { useRef, useEffect } from "react";
import { useQuery } from "react-query";

import { FetchApi } from "../../api/FetchAPI";
import { STRINGS, LOGIC } from "../../constants/Strings";
import {
  BlockUI,
  Container,
  ButtonCustom,
  AlertService,
} from "../../elements/";
import PaginationWithSizeChange from "../../elements/PaginationWithSizeChange";
import CommonColor from "../../util/variables.scss";
import { FilterByTime } from "../../elements/FilterByTime";
import "./BookingHistory.scss";

const formatsu = "DD/MM/YYYY";

export default function BookingHistory() {
  const blockUI = useRef();
  const page = useRef(1);
  const size = useRef(10);
  const startTimeRef = useRef(moment().subtract(1, "days").format(formatsu));
  const endTimeRef = useRef(moment().format(formatsu));

  const { data, refetch, isLoading } = useQuery([`BookingHistory`], () =>
    FetchApi.getHistoryBooking({
      size: size.current,
      page: page.current,
      startDate: startTimeRef.current,
      endDate: endTimeRef.current,
    })
  );

  useEffect(() => {
    if (data && !data?.success) {
      message.error(
        data?.message || "Something wrong. Please try again later."
      );
    }
  }, [data]);

  const columns = [
    {
      title: "Arrival time",
      dataIndex: "bookingTime",
      key: "bookingTime",
      render: (startTime) => moment(startTime).format(LOGIC.timeFormat),
      align: "center",
    },
    {
      title: "Checkout time",
      dataIndex: "endTime",
      key: "endTime",
      render: (endTime) => moment(endTime).format(LOGIC.timeFormat),
      align: "center",
    },
    {
      title: "Customer name",
      dataIndex: "customerName",
      key: "customerName",
      align: "center",
    },
    {
      title: "Customer phone",
      dataIndex: "customerPhone",
      key: "customerPhone",
      align: "center",
    },
    {
      title: "Number of customers",
      dataIndex: "numberOfCustomers",
      key: "numberOfCustomers",
      align: "center",
    },
    {
      title: "Coupon",
      dataIndex: "couponName",
      key: "couponName",
      align: "center",
    },
    {
      title: "Table names",
      dataIndex: "tableDTOS",
      key: "tableDTOS",
      align: "center",
      render: (e) =>
        Array.isArray(e) &&
        e.map((item, index) => {
          return (
            <div>
              {item.name}
              {index !== e.length - 1 ? ", " : ""}
            </div>
          );
        }),
    },
    {
      title: "Foods",
      dataIndex: "orderDTOS",
      key: "orderDTOS",
      render: (e) =>
        Array.isArray(e) &&
        e.map((item, index) => {
          return (
            <div>
              {item.foodName}: {item.quantity}
              {index !== e.length - 1 ? ", " : ""}
              {"\n"}
            </div>
          );
        }),
    },
    {
      title: "Bill",
      dataIndex: "bill",
      key: "bill",
      // render: (e) =>
      //   Array.isArray(e) &&
      //   e.map((item, index) => {
      //     return (
      //       <div>
      //         {item.foodName}: {item.quantity}
      //         {index !== e.length - 1 ? ", " : ""}
      //         {"\n"}
      //       </div>
      //     );
      //   }),
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
              onClick={onRemove(record)}>
              <img
                alt="delete"
                style={{ width: 20, height: 20 }}
                src={require("../../assets/img/delete.png")}
              />
            </button>
          </Space>
        );
      },
      fixed: "right",
      width: 60,
    },
  ];

  const onRemove = (item) => () => {
    AlertService.set({
      title: STRINGS.confirm,
      textConfirm: STRINGS.delete,
      content: STRINGS.confirm_delete_common,
      onConfirm: async () => {
        let result = await FetchApi.deleteHistoryVisitStore(item.orderId);
        console.log(result);
        if (result.success) {
          refetch();
          message.success(STRINGS.delete_success);
        } else {
          message.warning(result.message || STRINGS.delete_failed);
        }
      },
    });
  };

  const renderLeft = () => {
    return (
      <Row align="bottom" style={{ marginBottom: 4 }}>
        <Col>
          <FilterByTime
            key={endTimeRef.current + startTimeRef.current}
            label="Start time"
            onChange={(e) => (startTimeRef.current = e)}
            picker="date"
            format={LOGIC.dateFormat}
            formatOnChange={formatsu}
            value={startTimeRef.current}
            allowClear={false}
          />
        </Col>
        <Col style={{ margin: "0px 10px" }}>
          <FilterByTime
            key={endTimeRef.current + startTimeRef.current}
            picker="date"
            label="End time"
            onChange={(e) => (endTimeRef.current = e)}
            format={LOGIC.dateFormat}
            formatOnChange={formatsu}
            value={endTimeRef.current}
            allowClear={false}
          />
        </Col>
        <ButtonCustom
          style={{
            backgroundColor: CommonColor.textColor,
            borderColor: CommonColor.textColor,
            color: "white",
            padding: "5.5px 10px",
          }}
          onClick={() => {
            if (
              moment(endTimeRef.current).isBefore(moment(startTimeRef.current))
            ) {
              const end = endTimeRef.current;
              endTimeRef.current = startTimeRef.current;
              startTimeRef.current = end;
            }
            refetch();
          }}>
          {STRINGS.filter}
        </ButtonCustom>
      </Row>
    );
  };

  return (
    <Container
      className="history-store"
      renderLeft={renderLeft}
      childrenStyle={{ marginTop: 10 }}>
      <BlockUI ref={blockUI} />
      <Table
        loading={isLoading}
        rowKey={(record) =>
          record.id + record.customerName + record.arrivalTime
        }
        columns={columns}
        dataSource={data?.bookingDTOS}
        locale={{ emptyText: STRINGS.no_data }}
        pagination={false}
        scroll={{ x: 1500, y: "calc(100vh - 320px)" }}
      />
      <PaginationWithSizeChange
        size={size.current}
        total={data?.pageDto?.totalElements || 0}
        onChange={(pageNumber) => {
          page.current = pageNumber;
          refetch();
        }}
        onShowSizeChange={(e) => {
          size.current = e.size;
          page.current = 1;
          refetch();
        }}
        current={page.current}
      />
    </Container>
  );
}
