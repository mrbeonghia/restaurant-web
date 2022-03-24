import { Row, Select } from "antd";
import React from "react";

function DropdownCourse({
  comboDTOS,
  value,
  onChange,
  disabled,
  combosPicked,
}) {
  let dataRender = (comboDTOS || []).filter((value, index, self) => {
    return index === self.findIndex((t) => t.comboName === value.comboName);
  });

  return (
    <Select disabled={disabled} defaultValue={value} onChange={onChange}>
      {dataRender.map((item) => {
        const clone = [...combosPicked];
        clone.shift();
        const disabledItem = clone.includes(item.id);
        return (
          <Select.Option
            key={`${item.id}`}
            disabled={disabledItem}
            value={item.id}>
            <Row align="center">{item.comboName}</Row>
          </Select.Option>
        );
      })}
    </Select>
  );
}

export default DropdownCourse;
