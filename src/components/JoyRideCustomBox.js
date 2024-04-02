import React from "react";

export const JoyRideCustomBox = ({
  titleFirstBold = "",
  titleSecoudBold = "",
  subText = "",
}) => (
  <>
    <h6 className="m-0" style={{ fontWeight: "800", fontSize: "20px" }}>
      {titleFirstBold}
    </h6>
    <span style={{ fontWeight: "800", fontSize: "20px" }}>
      {titleSecoudBold}
    </span>
    <h6 className="pt-2" style={{ fontWeight: "400", fontSize: "20px" }}>
      {subText}
    </h6>
  </>
);
