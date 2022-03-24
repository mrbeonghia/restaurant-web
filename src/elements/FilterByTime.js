import { Col, DatePicker, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { STRINGS } from "../constants/Strings";
import "moment/locale/ja";
import locale from "antd/es/date-picker/locale/ja_JP";
import { Svgs } from "../constants/Svgs";

const FilterByTime = ({
  onChange,
  picker,
  placeholder,
  label,
  labelStyle,
  value,
  format,
  style,
  showTime,
  formatOnChange,
  onOk,
  allowClear = true,
  disabled,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const valueC = value ? moment(value, format) : moment();

  let props = {
    onChange: (e) => {
      if (formatOnChange) {
        onChange && onChange(moment(e).format(formatOnChange));
      } else {
        onChange && onChange(e);
      }
    },
  };

  if (onOk) {
    props = {
      onOk: (e) => {
        if (formatOnChange) {
          onChange && onChange(moment(e).format(formatOnChange));
        } else {
          onChange && onChange(e);
        }
      },
    };
  }

  return (
    <Col>
      <Row style={labelStyle}>{label || STRINGS.filter_by_time}</Row>
      <DatePicker
        onMouseEnter={() => setIsFocus(true)}
        onMouseLeave={() => setIsFocus(false)}
        locale={locale}
        suffixIcon={isFocus ? null : Svgs.datepicker()}
        style={{
          width: 170,
          borderRadius: 4,
          padding: "6px 10px",
          ...style,
        }}
        showTime={showTime}
        format={format || undefined}
        picker={picker || "year"}
        placeholder={placeholder || ""}
        defaultValue={valueC}
        allowClear={allowClear}
        disabled={disabled}
        {...props}
      />
    </Col>
  );
};

export { FilterByTime };
