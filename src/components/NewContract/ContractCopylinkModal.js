import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";

const ContractCopylinkModal = ({ show, onHide }) => {
  const [showImageModel, setshowImageModel] = useState(false);

  const handleImageModel = () => {
    setshowImageModel(true);
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={onHide} centered className="zindex">
        <div className="" style={{ position: "relative", padding: "30px" }}>
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
          <div
            style={{ height: "280px", overflowY: "scroll" }}
            className="mt-3 px-3"
          >
            <Row>
              <Col
                lg={4}
                md={6}
                style={{ position: "relative" }}
                className="d-flex justify-content-center justify-content-md-start p-0 mb-2"
              >
                <img
                  style={{ height: "250px" }}
                  src="/assets/img/Document.svg"
                />
              </Col>
              <Col
                lg={4}
                md={6}
                style={{ position: "relative" }}
                className="d-flex justify-content-center justify-content-md-start p-0 mb-2"
              >
                <img
                  style={{ height: "250px" }}
                  onClick={() => handleImageModel()}
                  src="/assets/img/DocumentAdd.svg"
                />
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <h6
              style={{
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              Link para compartilhar com o cliente
            </h6>
          </div>
          <div style={{ width: "50%" }}>
            <InputGroup className="mb-3" style={{ borderRadius: "6px" }}>
              <Form.Control
                className="p-2 border-0 fw-bold shadow-none"
                style={{ backgroundColor: "#F4F6F8" }}
              />
            </InputGroup>
          </div>
          <Row>
            <Col md={6}>
              <div className="d-flex">
                <div className="d-flex align-items-center">
                  <h6
                    style={{
                      fontWeight: "600",
                      fontSize: "12px",
                      color: "#85A6A2",
                    }}
                  >
                    Enviar com:
                  </h6>
                  <img
                    // style={{ height: "60px", width: "60px" }}
                    src="/assets/img/whatsApp.svg"
                  />
                  <img
                    // style={{ height: "39px", width: "39px" }}
                    src="/assets/img/mail.png"
                  />
                  <img
                    // style={{ height: "39px", width: "39px" }}
                    src="/assets/img/sms.png"
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex justify-content-md-end justify-content-center mt-md-4">
                <button
                  className="px-4 py-2"
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    background: "#0068FF",
                    border: "0",
                    borderRadius: "6px",
                    color: "white",
                    fontWeight: 800,
                  }}
                >
                  Copiar&nbsp;link
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default ContractCopylinkModal;
