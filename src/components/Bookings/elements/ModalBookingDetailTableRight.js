import { Col, Row, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FetchApi } from "../../../api/FetchAPI";
import { COLORS, LOGIC, STRINGS } from "../../../constants";
import PaginationWithSizeChange from "../../../elements/PaginationWithSizeChange";

export default function ModalBookingDetailTableRight({ userId, setNG }) {
  const [pagination, setPagination] = useState({ size: 10, page: 1 });
  const { data, isFetching, isLoading } = useQuery(
    [`TableRight-ModalBookingDetail-${pagination.size}-${pagination.page}`],
    () =>
      FetchApi.historyUserBooking({
        page: pagination.page,
        size: pagination.size,
        userId: userId,
      }),
    {
      enabled: !!userId,
    }
  );

  useEffect(() => {
    if (data?.staffNotGood?.length > 0) {
      setNG(data?.staffNotGood);
    }
  }, [data]);

  const renderFee = (item) => {
    const status = item.status;
    if (status.toString().includes("cancel")) {
      if (status === "cancel_no_contact") {
        return <Col>{STRINGS.cancel_no_contact_fee(item.price || 0)}</Col>;
      }
      return <Col>{STRINGS.cancel_fee[status]}</Col>;
    }
  };
  const renderComment = (item) => {
    if (item.reviewComment || item.status.toString().includes("cancel")) {
      return (
        <Col style={{ marginTop: 10 }}>
          <Row>
            <Row style={{ fontWeight: "900", fontSize: 15 }}>
              {STRINGS.remarks} : <br></br>{" "}
            </Row>
            {!!item.reviewComment && item.reviewComment}
          </Row>
          {renderFee(item)}
        </Col>
      );
    }
  };
  return (
    <Col className="table-right">
      <Row
        className="title"
        style={{ fontSize: 30, letterSpacing: 10, fontWeight: "bold" }}>
        {STRINGS.visit_history}
      </Row>
      <Row className="theader" style={{ marginTop: 20 }}>
        <Col span={3}>{STRINGS.name2}</Col>
        <Col span={6}>{STRINGS.date2}</Col>
        <Col span={5}>{STRINGS.store_management}</Col>
        <Col span={5}>{STRINGS.responsible_person}</Col>
        <Col span={5}>{STRINGS.course}</Col>
      </Row>
      {(data?.orderHistoryDTOS || []).map((item, index) => {
        return (
          <Col
            key={`${index}`}
            className="row-table-custom"
            style={{
              paddingTop: 10,
              borderBottom: "1px solid #b4bbc4",
            }}>
            <Row>
              <Col span={3}>
                {item.chooseStaff ? (
                  <Col
                    style={{
                      marginTop: 5,
                      width: 14,
                      height: 14,
                      left: "40%",
                      borderRadius: 7,
                      borderWidth: 1,
                      borderColor: COLORS.primary,
                      borderStyle: "solid",
                    }}
                  />
                ) : (
                  ""
                )}
              </Col>
              <Col span={6} style={{ alignSelf: "center" }}>
                {moment(item.startTime).format(LOGIC.dateFormat)}
              </Col>
              <Col span={5}>{item.storeName}</Col>
              <Col span={5}>{item.staffName}</Col>
              <Col span={5}>
                {Array.isArray(item.comboOrders) && item.comboOrders.length > 0
                  ? item.comboOrders.map(
                      (itm, idx, arr) =>
                        `${itm.comboName || "none"} (${
                          itm.minutes || "none"
                        })` + (idx !== arr.length - 1 ? ", " : "")
                    )
                  : ""}
              </Col>
            </Row>
            <Row
              style={{ marginLeft: 18, paddingBottom: 10, textAlign: "left" }}>
              {renderComment(item)}
              {/* {!!item.reviewComment && (
                <Col style={{ marginTop: 10 }}>
                  <Row>
                    {STRINGS.remarks} : <br></br> {item.reviewComment}
                  </Row>
                </Col>
              )} */}
            </Row>
          </Col>
        );
      })}

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
    </Col>
  );
}
