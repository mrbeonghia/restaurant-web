import React, { useState, useEffect } from "react";
import "./Modal.scss";
import { ModalCustomService } from "./ModalCustomService";
import { CloseOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import { STRINGS } from "../../constants/Strings";
import { Button } from "antd";

const ModalCustom = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    onCancel: () => {},
    onConfirm: () => {},
    confirmWithoutClose: false,
    textCancel: "",
    textConfirm: "",
    contentStyle: {},
    wrapperStyle: {},
    contentWrapperStyle: {},
  });

  useEffect(() => {
    ModalCustomService.addEventListener("ModalCustom", (newData) => {
      setData(newData);
    });
    return () => {
      ModalCustomService.removeEventListener("ModalCustom");
    };
  }, []);

  if (!data.content && !data.title) {
    return <></>;
  }

  return (
    <Modal
      className="ac"
      isOpen={true}
      onRequestClose={() => {
        ModalCustomService.set({});
      }}
      style={{
        overlay: { zIndex: 2 },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: 0,
          zIndex: 3000,
          position: "absolute",
          border: "0px solid transparent",
          maxHeight: "90vh",
          textAlign: "-webkit-center",
          ...data.wrapperStyle,
        },
      }}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      <div className="alert-wrapper" style={data.contentWrapperStyle}>
        {data.title && (
          <div className="titleBar">
            <h3>{data.title}</h3>
            <button
              onClick={() => {
                ModalCustomService.set({});
                data.onCancel && data.onCancel();
              }}
            >
              <CloseOutlined
                className="close"
                style={{ fontSize: "16px", color: "#fff" }}
              />
            </button>
          </div>
        )}
        <div className="alert-modal">
          <div
            className="content"
            style={{ maxHeight: "80vh", ...data.contentStyle }}
          >
            {data.content}
          </div>
          {(!!data.textCancel || !!data.textConfirm) && (
            <div className="actions">
              {data.textCancel && (
                <Button
                  className="btn-close"
                  onClick={() => {
                    ModalCustomService.set({});
                    data.onCancel && data.onCancel();
                  }}
                >
                  {data.textCancel || "Cancel"}
                </Button>
              )}
              {data.textConfirm && (
                <Button
                  className="btn-confirm"
                  onClick={() => {
                    if (data.confirmWithoutClose) {
                      data.onConfirm && data.onConfirm();
                    } else {
                      ModalCustomService.set({});
                      data.onConfirm && data.onConfirm();
                    }
                  }}
                >
                  {data.textConfirm || STRINGS.confirm}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export { ModalCustom };
