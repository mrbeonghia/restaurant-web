import { message } from "antd";
import React, { memo, useRef } from "react";
import ReactQuill from "react-quill";
import { FetchApi } from "../api/FetchAPI";
import { STRINGS } from "../constants/Strings";
import "react-quill/dist/quill.snow.css";

const Quill = memo((props) => {
  const quill = useRef();

  React.useEffect(() => {
    quill.current.editor.enable(!props.disabled);
  }, []);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      const range = quill.current.getEditor().getSelection();
      let imgurl = "";
      let result = await FetchApi.uploadFile(file);
      if (result?.fileUrl) {
        imgurl = result.fileUrl;
      } else {
        message.info(STRINGS.upload_img_failed);
      }
      quill.current.getEditor().insertEmbed(range.index, "image", imgurl);
      quill.current.editor.setSelection(range.index + 1);
    };
  };

  const onChange = (e) => {
    if (
      !props?.value?.trim() &&
      !quill.current?.getEditor()?.getText()?.trim()
    ) {
      props.onChange && props.onChange(undefined);
      return;
    }
    props.onChange && props.onChange(e, quill.current?.getEditor()?.getText());
  };

  return (
    <ReactQuill
      className={props.className}
      ref={quill}
      style={{ height: 150, ...props.style }}
      theme="snow"
      defaultValue={props.value}
      onChange={onChange}
      modules={{
        toolbar: {
          container: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean", "image"], // remove formatting button
          ],
          handlers: {
            image: imageHandler,
          },
        },
      }}
    />
  );
});

export default Quill;
