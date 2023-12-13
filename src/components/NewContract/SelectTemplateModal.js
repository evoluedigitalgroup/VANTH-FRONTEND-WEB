import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import ContractCopylinkModal from "./ContractCopylinkModal";

const SelectTemplateModal = ({ show, onHide }) => {
  const [showCopyLink, setShowCopyLink] = useState(false);
  const handleClick = () => {
    setShowCopyLink(true);
    onHide();
  };
  return (
    <>
      <Modal size="md" show={show} onHide={onHide} centered className="zindex">
        <div className="" style={{ position: "relative", padding: "20px" }}>
          <div className="d-flex justify-content-between">
            <h6 className="fw-bold mt-1">
              Selecione um modelo para solicitar assinatura
            </h6>
            {/* <Button onClick={onHide} className="bg-white border-0 text-dark"> */}
            <img
              onClick={onHide}
              src="assets/img/close.png"
              style={{ height: "15px", width: "15px", cursor: "pointer" }}
            ></img>
            {/* </Button> */}
          </div>
          <div
            className="mt-3 px-3"
            style={{ height: "380px", width: "100%", overflowY: "scroll" }}
          >
            <Row>
              <Col
                md={6}
                xs={6}
                style={{ position: "relative" }}
                className="d-flex justify-content-center p-0 mb-2"
              >
                <img
                  style={{ height: "200px" }}
                  src="/assets/img/Document.svg"
                />
                <input
                  type="checkbox"
                  style={{ position: "absolute", top: "3px", right: "12px" }}
                />
              </Col>
              <Col
                md={6}
                xs={6}
                style={{ position: "relative" }}
                className="d-flex justify-content-center p-0 mb-2"
              >
                <img
                  style={{ height: "200px" }}
                  src="/assets/img/Document.svg"
                />
                <input
                  type="checkbox"
                  style={{ position: "absolute", top: "3px", right: "12px" }}
                />
              </Col>
              <Col
                xs={6}
                md={6}
                style={{ position: "relative" }}
                className="d-flex justify-content-center p-0 mb-2"
              >
                <img
                  style={{ height: "200px" }}
                  src="/assets/img/Document.svg"
                />
                <input
                  type="checkbox"
                  style={{ position: "absolute", top: "3px", right: "12px" }}
                />
              </Col>
              <Col
                md={6}
                xs={6}
                style={{ position: "relative" }}
                className="d-flex justify-content-center p-0 mb-2"
              >
                <img
                  style={{ height: "200px" }}
                  src="/assets/img/Document.svg"
                />
                <input
                  type="checkbox"
                  style={{ position: "absolute", top: "3px", right: "12px" }}
                />
              </Col>
              <Col
                md={6}
                xs={6}
                style={{ position: "relative" }}
                className="d-flex justify-content-center p-0 mb-2"
              >
                <img
                  style={{ height: "200px" }}
                  src="/assets/img/Document.svg"
                />
                <input
                  type="checkbox"
                  style={{ position: "absolute", top: "3px", right: "12px" }}
                />
              </Col>
              <Col
                md={6}
                xs={6}
                style={{ position: "relative" }}
                className="d-flex justify-content-center p-0 mb-2"
              >
                <img
                  style={{ height: "200px" }}
                  src="/assets/img/Document.svg"
                />
                <input
                  type="checkbox"
                  style={{ position: "absolute", top: "3px", right: "12px" }}
                />
              </Col>
              <Col
                md={6}
                xs={6}
                style={{ position: "relative" }}
                className="d-flex justify-content-center p-0 mb-2"
              >
                <img
                  style={{ height: "200px" }}
                  src="/assets/img/Document.svg"
                />
                <input
                  type="checkbox"
                  style={{ position: "absolute", top: "3px", right: "12px" }}
                />
              </Col>
              <Col
                md={6}
                xs={6}
                style={{ position: "relative" }}
                className="d-flex justify-content-center p-0 mb-2"
              >
                <img
                  style={{ height: "200px" }}
                  src="/assets/img/Document.svg"
                />
                <input
                  type="checkbox"
                  style={{ position: "absolute", top: "3px", right: "12px" }}
                />
              </Col>
            </Row>
          </div>
          <div className="mt-4">
            <Row>
              <Col md={6}>
                <button
                  className="px-4 py-2 w-100"
                  style={{
                    fontSize: "14px",
                    border: "1px solid #0068FF",
                    color: "#0068FF",
                    background: "#fff",
                    borderRadius: "6px",
                    fontWeight: 700,
                  }}
                >
                  Criar&nbsp;modelo
                </button>
              </Col>
              <Col md={6} className="mt-2 mt-md-0">
                <button
                  onClick={handleClick}
                  className="text-center py-2 w-100"
                  style={{
                    fontSize: "14px",
                    background: "#0068FF",
                    border: "0",
                    borderRadius: "6px",
                    color: "white",
                    fontWeight: 800,
                  }}
                >
                  Escolher&nbsp;modelo
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
      <div>
        <ContractCopylinkModal
          show={showCopyLink}
          onHide={() => setShowCopyLink(false)}
        />
      </div>
    </>
  );
};

export default SelectTemplateModal;
