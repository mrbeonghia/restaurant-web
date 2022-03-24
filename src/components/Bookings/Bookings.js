import React, { useEffect, useRef, useState } from "react";
import {
  TimelineViews,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import { Row } from "antd";
import { useQuery } from "react-query";

import { STRINGS } from "../../constants/Strings";
import moment from "moment";
import "./Bookings.scss";
import HeaderSchedule from "./items/HeaderSchedule";
import ResourceHeaderTemplate from "./items/ResourceHeaderTemplate";
import { ErrorView, LoadingView, ModalCustomService } from "../../elements";
import ModalBookingDetail from "./items/ModalBookingDetail";
import { HeaderStaffScheduleService } from "../../services/HeaderStaffScheduleService";
import { CommonFunction } from "../../util/CommonFunction";
import { FetchApi } from "../../api/FetchAPI";

export const useGetBookings = (selectedDate) => {
  const { data, isLoading, refetch, isFetching } = useQuery(
    [`useGetBookings-${selectedDate}`],
    () => FetchApi.getTableBooking(selectedDate)
  );
  return {
    dataBookings: data,
    refetchBookings: refetch,
    isLoadingBookings: isLoading,
    isFetchingBookings: isFetching,
  };
};

export default function Bookings() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const scheduleObj = useRef();
  const timeout = useRef();
  const {
    dataBookings,
    isLoadingBookings,
    refetchBookings,
    isFetchingBookings,
  } = useGetBookings(selectedDate.format("MM/DD/YYYY"));

  const onCellScale = (type) => () => {
    if (type === "zoomIn") {
      if (scheduleObj.current.timeScale.slotCount < 6) {
        scheduleObj.current.timeScale.slotCount = 6;
        scheduleObj.current.cssClass = "schedule-cell-dimension";
        timeout.current = setTimeout(() => {
          scheduleObj.current.scrollTo(
            moment().subtract(1.5, "hours").format("HH:mm")
          );
        }, 0);
      }
    }
    if (type === "zoomOut") {
      if (scheduleObj.current.timeScale.slotCount > 2) {
        scheduleObj.current.timeScale.slotCount = 2;
        scheduleObj.current.cssClass = "";
        timeout.current = setTimeout(() => {
          scheduleObj.current.scrollTo(
            moment().subtract(1.5, "hours").format("HH:mm")
          );
        }, 0);
      }
    }
  };

  useEffect(() => {
    HeaderStaffScheduleService.onChange("StaffSchedule", (functionName) => {
      if (
        scheduleObj.current &&
        (functionName == "zoomOut" || functionName == "zoomIn")
      ) {
        onCellScale(functionName)();
      }
    });
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  if (isLoadingBookings || isFetchingBookings) {
    return <LoadingView />;
  }

  if (dataBookings && !dataBookings.success) {
    return <ErrorView data={dataBookings} />;
  }

  const onCellClick = (args) => {
    args.cancel = true;
    if (args.event.title) {
      ModalCustomService.set({
        title: "Detail booking",
        wrapperStyle: { width: "auto" },
        contentWrapperStyle: { width: "fit-content" },
        contentStyle: { maxHeight: "80vh", padding: 0 },
        content: (
          <ModalBookingDetail
            refetch={refetchBookings}
            data={args.event.bookingDetail}
          />
        ),
      });
    }
  };

  const { ownerData, datas } = CommonFunction.generateDataSchedule(
    dataBookings,
    refetchBookings
  );

  let height = 0;
  if (80 * ownerData.length > window.innerHeight * 0.8) {
    height = window.innerHeight * 0.77;
  } else {
    height = 80 * ownerData.length + 80;
  }

  return (
    <div className="staff-schedule">
      <HeaderSchedule
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onCellScale={onCellScale}
        refetchBookings={refetchBookings}
      />
      <ScheduleComponent
        cssClass="schedule-cell-dimension"
        timeScale={{
          enable: true,
          interval: 60,
          slotCount: 6,
          majorSlotTemplate: (e) => {
            const time = moment(e.date).format("HH");
            return time > 9 ? time : "\xa0" + time.substring(1, 2);
          },
          minorSlotTemplate: (e) => (
            <div
              style={{
                paddingBottom: moment(e.date).format("mm") == 30 ? 3 : 7,
              }}
            >
              {"\xa0\xa0\xa0"}
            </div>
          ),
        }}
        cellClick={onCellClick}
        eventClick={onCellClick}
        popupOpen={(args) => (args.cancel = true)}
        startHour={"05:00"}
        endHour={"24:00"}
        ref={scheduleObj}
        showHeaderBar={false}
        headerIndentTemplate={() => (
          <Row
            style={{
              marginLeft: 20,
              height: 60,
              alignItems: "center",
              fontWeight: "bold",
              fontSize: 22,
            }}
          >
            Table name
          </Row>
        )}
        resourceHeaderTemplate={(e) => (
          <ResourceHeaderTemplate
            selectedDate={selectedDate}
            resourceData={e.resourceData}
            refetchBookings={refetchBookings}
          />
        )}
        timeFormat={"HH:mm"}
        eventRendered={CommonFunction.renderEventCalendar}
        height={height}
        width="100%"
        selectedDate={selectedDate}
        eventSettings={{
          enableMaxHeight: true,
          dataSource: datas,
          fields: {
            id: "id",
            subject: { title: "title", name: "title" },
            startTime: { name: "startTime" },
            endTime: { name: "endTime" },
          },
        }}
        group={{ enableCompactView: false, resources: ["Order"] }}
      >
        <ResourcesDirective>
          <ResourceDirective
            dataSource={ownerData}
            idField="id"
            field="tableId"
            name="Order"
            textField="name"
            startHourField="startTime"
            endHourField="endTime"
            allowMultiple={true}
          />
        </ResourcesDirective>
        <ViewsDirective>
          <ViewDirective option="TimelineDay" interval={1} />
        </ViewsDirective>
        <Inject services={[TimelineViews]} />
      </ScheduleComponent>
    </div>
  );
}
