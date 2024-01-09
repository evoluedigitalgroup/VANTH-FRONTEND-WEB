import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ContractCopylinkModal from "./ContractCopylinkModal";

const ReviewAndInformationModal = ({ show, onHide, showPdfEditor }) => {
  return (
    <>
      <Modal size="xl" show={show} onHide={onHide} centered className="zindex">
        <div className="" style={{ position: "relative", padding: "20px" }}>
          <div className="d-flex justify-content-between">
            <h6 className="fw-bold mt-1">Revisar modelo e informações</h6>
            <img
              onClick={onHide}
              src="assets/img/close.png"
              style={{ height: "15px", width: "15px", cursor: "pointer" }}
            ></img>
          </div>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "70vh" }}
          >
            {/* <iframe src=""></iframe> */}
            <h6 className="fw-bold">&lt; iframe docusign &gt;</h6>
          </div>
          <div className="d-flex align-items-center justify-content-end mt-4">
            <button
              className=" px-4 py-2"
              style={{
                fontSize: "14px",
                border: "1px solid #0068FF",
                color: "#FFFFFF",
                background: "#0068FF",
                borderRadius: "6px",
                fontWeight: 700,
              }}
            >
              Prosseguir para assinatura
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReviewAndInformationModal;
