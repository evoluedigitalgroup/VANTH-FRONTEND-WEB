import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const ContractCopylinkModal = ({ show, onHide }) => {
  return (
    <>
      <Modal size="lg" show={show} onHide={onHide} centered className="zindex">
        <div
          className=""
          style={{ height: "540px", position: "relative", padding: "30px" }}
        >
          <div className="d-flex justify-content-between">
            <h5 className="fw-bold mt-1">
              Link para solicitar assinatura de contrato
            </h5>
            <Button onClick={onHide} className="bg-white border-0 text-dark">
              <img src="assets/img/close.png"></img>
            </Button>
          </div>
          <div className="mt-4" style={{ width: "60%" }}>
            <div
              className="p-2"
              style={{ border: "1px solid #C7C7C7", borderRadius: "8px" }}
            >
              dfgjj
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ContractCopylinkModal;
