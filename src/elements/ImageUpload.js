import React, { useState } from "react";
import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { STRINGS } from "../constants/Strings";
import { CommonFunction } from "../util/CommonFunction";
import { FetchApi } from "../api/FetchAPI";

const ImageUpload = ({
  value,
  onChange,
  title,
  aspect,
  style,
  imageStyle,
  wrapperStyle,
  disabled,
}) => {
  const [loadingImg, setLoadingImg] = useState(false);
  const [imageUrl, setImageUrl] = useState(value);

  const removeImg = () => {
    setImageUrl("");
    onChange && onChange("");
  };

  const handleUpImage = async (file) => {
    setLoadingImg(true);
    let result = await FetchApi.uploadFile(file);
    if (result?.fileUrl) {
      setImageUrl(result.fileUrl);
      setLoadingImg(false);
      onChange && onChange(result.fileUrl);
    } else {
      message.warning(STRINGS.upload_img_failed);
      setLoadingImg(false);
    }
  };

  const uploadButton = (
    <div>
      {loadingImg ? (
        <LoadingOutlined />
      ) : (
        <PlusCircleOutlined style={{ color: "#FFBB00", fontSize: 32 }} />
      )}
      <div className="ant-upload-text">{"Upload"}</div>
    </div>
  );
  return (
    <div style={{ width: "100%", height: "100%", ...wrapperStyle }}>
      {imageUrl && !disabled && (
        <button
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            top: 10,
            right: 10,
            width: "32px",
            height: "32px",
            borderWidth: 0,
            backgroundColor: "white",
            borderRadius: 8,
            overflow: "hidden",
          }}
          onClick={removeImg}>
          <img
            style={{ width: "20px" }}
            src={require("../assets/img/delete.png")}
            alt="img-null"
          />
        </button>
      )}
      <ImgCrop
        modalTitle={STRINGS.editImageCrop}
        modalOk={STRINGS.ok}
        modalCancel={"Cancel"}
        rotate
        aspect={aspect || 2 / 1}>
        <Upload
          disabled={disabled}
          style={{ ...style }}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={CommonFunction.beforeUpload}
          customRequest={handleUpImage}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="img"
              style={{ width: "100%", height: "100%", ...imageStyle }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </ImgCrop>
    </div>
  );
};

export { ImageUpload };
