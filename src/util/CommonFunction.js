import { message } from "antd";
import moment from "moment";
import { extend } from "@syncfusion/ej2-base";

import { STRINGS, LOGIC } from "../constants";

const CommonFunction = {
  onPreview: async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  },
  beforeUpload: (file) => {
    const isJpgOrPng =
      (file.type === "image/jpeg" || file.type === "image/png") &&
      !file.name.includes(".gif");
    if (!isJpgOrPng) {
      message.error(STRINGS.only_jpg_png);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(STRINGS.smaller_than_2mb);
    }
    return isJpgOrPng && isLt2M;
  },
  logError: (result) => {
    if (result?.message === STRINGS.network_error) {
      message.error("Network error, please try again");
      return;
    }
    message.error(
      `${"Something is wrong, status code"} ${
        result?.status ? "(" + result?.status + ")" : ""
      }`
    );
  },
  textViewError: (result) => {
    if (result?.message === STRINGS.network_error) {
      return result.message;
    }
    return `${STRINGS.something_wrong} ${
      result?.status ? "(" + result?.status + ")" : ""
    }`;
  },
  dateFormat: "MM/DD/YYYY HH:mm",
  setUpDownLoad: (url, name) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        const blobUrl = window.URL.createObjectURL(xmlHttp.response);
        const e = document.createElement("a");
        e.href = blobUrl;
        e.download = name;
        document.body.appendChild(e);
        e.click();
        document.body.removeChild(e);
      }
    };
    xmlHttp.responseType = "blob";
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
  },
  generateDataSchedule: (dataBookings, refetchCalendarOrder) => {
    let ownerData = [];
    let datas = [];

    (dataBookings.tableBookingDTOS || []).forEach((item) => {
      ownerData.push({
        name: item.name,
        id: item.id,
        startTime: "6:00",
        endTime: "24:00",
        dataBooking: item,
        refetchCalendarOrder: refetchCalendarOrder,
      });
      (item.bookingDTOS || []).forEach((itm, idx) => {
        let color = "#a08060";
        if (itm.status === "payment") {
          color = "gray";
        }
        if (itm.status === "arrived") {
          color = "blue";
        }
        datas.push({
          tableId: item.id,
          id: (Math.random() + 1).toString(36).substring(7),
          title: itm.customerName || "none",
          customerPhone: itm.customerPhone,
          customerName: itm.customerName,
          startTime: moment(itm.bookingTime).toISOString(),
          endTime: moment(itm.bookingTime).add(1, "hours").toISOString(),
          categoryColor: color,
          textColor: "white",
          bookingDetail: itm,
        });
      });
    });

    datas = extend([], datas, null, true);

    return { ownerData, datas };
  },
  renderEventCalendar: (args) => {
    let categoryColor = args.data.categoryColor;
    let bookingStatus = args.data.bookingDetail?.status;

    if (!args.element || !categoryColor) {
      return;
    }
    args.element.style.backgroundColor = categoryColor;
    args.element.style.borderRadius = 0;

    args.element.style.borderColor = "#dcdcdc";
    args.element.style.borderStyle = "solid";
    args.element.style.borderWidth = "1px";

    args.element.style.color = args.data.textColor;
    args.element.style.textAlign = "center";
    args.element.style.pointerEvents = "auto";
    args.element.getElementsByClassName("e-subject")[0].innerHTML = `${
      args.data?.customerName || "ー"
    }`;
    args.element.getElementsByClassName("e-time")[0].innerHTML =
      args.data.customerPhone || "ー";
    args.element.getElementsByClassName("e-location")[0].innerHTML = LOGIC
      .actionBookingType[bookingStatus]
      ? `(${LOGIC.actionBookingType[bookingStatus]})`
      : "";
    args.element.getElementsByClassName(
      "e-appointment-details"
    )[0].style.zIndex = 2;
  },
};

export { CommonFunction };
