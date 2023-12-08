import React from "react";
import PermissionSwitch from "./PermissionSwitch";

const PermissionSwitchTable = ({ formValues, handleCheck, editData, switchesData }) => {
  return (
    <>
      {
        switchesData.map((obj, index) => {
          return (
            <PermissionSwitch
              key={index}
              name={obj?.label}
              label={obj?.title}
              defaultChecked={formValues[obj?.label] || (editData?.docs?.[obj?.label] && editData?.docs?.[obj?.label]?.approved)}
              disabled={editData?.docs?.[obj?.label] && editData?.docs?.[obj?.label]?.approved}
              handleCheck={handleCheck}
            />
          )
        })
      }
    </>
  );
};

export default PermissionSwitchTable;
