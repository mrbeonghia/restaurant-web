import React, { useState, useEffect } from "react";
import "./Modal.scss";
import { AlertService } from "./AlertService";
import { CloseOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import { STRINGS } from "../../constants/Strings";

const AlertModal = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    onCancel: () => {},
    onConfirm: () => {},
    textCancel: "",
    textConfirm: "",
  });

  useEffect(() => {
    AlertService.addEventListener("AlertModal", (newData) => {
      setData(newData);
    });
    return () => {
      AlertService.removeEventListener("AlertModal");
    };
  }, []);

  return (
    <Modal
      isOpen={data.content || data.title ? true : false}
      onRequestClose={() => {
        AlertService.set({});
      }}
      style={{
        overlay: { zIndex: 2 },
        content: {
          top: "40%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          padding: 0,
          zIndex: 20000,
          border: "none",
        },
      }}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      <div className="titleBar">
        <h3>{data.title}</h3>
        <button
          onClick={() => {
            AlertService.set({});
            data.onCancel && data.onCancel();
          }}
        >
          <CloseOutlined
            className="close"
            style={{ fontSize: "16px", color: "#fff" }}
          />
        </button>
      </div>
      <div className="content">{data.content}</div>
      <div className="actions">
        <button
          className="toggle-button"
          onClick={() => {
            AlertService.set({});
            data.onCancel && data.onCancel();
          }}
        >
          {data.textCancel || "Cancel"}
        </button>
        <button
          className="toggle-button confirm-button"
          onClick={() => {
            AlertService.set({});
            data.onConfirm && data.onConfirm();
          }}
        >
          {data.textConfirm || STRINGS.confirm}
        </button>
      </div>
    </Modal>
  );
};

export { AlertModal };
