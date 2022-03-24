import React, { useState, forwardRef, useImperativeHandle } from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./FormInput.scss";
import Modal from "react-modal";
import { LoadingOutlined } from "@ant-design/icons";
import { STRINGS } from "../../constants/Strings";

const FormInput = forwardRef((props, ref) => {
  const {
    children,
    title,
    onConfirm,
    onClose,
    textCancel,
    textConfirm,
    loading,
    width,
    renderButton = true,
    isOpen,
    className,
  } = props;
  const [isShowed, setIsShowed] = useState(isOpen);
  const [isLoading, setIsLoading] = useState(false);

  const show = () => {
    setIsShowed(true);
  };

  const hide = () => {
    onClose && onClose();
    setIsShowed(false);
  };

  const setLoading = (bool) => {
    setIsLoading(bool);
  };

  useImperativeHandle(ref, () => ({
    show,
    hide,
    setLoading,
  }));

  const onConfirmHandle = async () => {
    onConfirm && onConfirm();
  };

  return (
    <Modal
      className={`ac-2 ${className}`}
      isOpen={isShowed}
      onRequestClose={hide}
      style={{
        overlay: { zIndex: 2 },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          width: width ? width : "65%",
          padding: 0,
          overflow: "unset",
          zIndex: 1000,
          border: "none",
          position: "absolute",
        },
      }}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
    >
      {isShowed && (
        <div className="formWrapper">
          <div className="header-model">
            <h3>{title}</h3>
            <button onClick={() => hide()}>
              <CloseOutlined
                className="close"
                style={{ fontSize: "16px", color: "#fff" }}
              />
            </button>
          </div>
          <div className="content-model">{children}</div>
          {renderButton && (
            <div className="footer-model">
              <button className="toggle-button" onClick={() => hide()}>
                {textCancel || "Cancel"}
              </button>
              <button
                className="toggle-button confirm-button"
                onClick={onConfirmHandle}
                disabled={loading}
              >
                {textConfirm || "Save"}
              </button>
            </div>
          )}
          {isLoading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                opacity: 0.3,
              }}
            >
              <LoadingOutlined
                style={{
                  fontSize: 40,
                  position: "absolute",
                  top: "50%",
                  width: "100%",
                }}
                spin
              />
            </div>
          )}
        </div>
      )}
    </Modal>
  );
});

export { FormInput };
