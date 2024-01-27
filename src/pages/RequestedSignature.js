import React from "react";
import { Card } from "react-bootstrap";

const RequestedSignature = () => {
  return (
    <>
      <div className="Dashboard d-flex flex-column align-items-center justify-content-center h-100 py-3">
        <div className="TBA-Logo d-flex align-items-center justify-content-center">
          <img src="/assets/img/vancehDigital.svg" style={{ height: 200 }} />
        </div>
        <Card className="m-2 p-4" style={{ width: "80%" }}>
          <h6 className="fw-bold">
            Vanceh digital solicitou a assinatura do seguinte documento:
          </h6>
          <div
            className="d-flex"
            style={{
              height: "80vh",
              width: "100%",
            }}
          ></div>
        </Card>
      </div>
    </>
  );
};

export default RequestedSignature;
