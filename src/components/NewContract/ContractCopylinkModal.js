import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { getContactList } from "../../helper/API/contact";

const ContractCopylinkModal = ({ show, onHide, selectedOption }) => {
  const [documents, setDocuments] = useState([]);
  // const [documents, setDocuments] = useState([]);
  const [showPdfEditor, setShowPdfEditor] = useState(null);

  const handlePdfSelect = (file) => {
    setShowPdfEditor(file);
  };

  const DocumentBlock = () => {
    return (
      <Col
        lg={4}
        md={6}
        style={{ position: "relative" }}
        className="d-flex justify-content-center justify-content-md-start p-0 mb-2"
      >
        <img style={{ height: "250px" }} src="/assets/img/Document.svg" />
      </Col>
    );
  };

  const AddNewDocument = () => {
    return (
      <Col
        lg={4}
        md={6}
        style={{ position: "relative" }}
        className="d-flex justify-content-center justify-content-md-start p-0 mb-2"
      >
        <input
          type="file"
          style={{
            background: "red",
            position: "absolute",
            height: 250,
            width: 200,
            opacity: 0,
          }}
          accept=".pdf"
          onChange={(e) => {
            handlePdfSelect(e.target.files[0]);
          }}
        />
        <img
          style={{ height: 250, width: 200 }}
          src="/assets/img/DocumentAdd.svg"
        />
      </Col>
    );
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
          <div className="mt-2" style={{ width: "60%" }}>
            <div
              className="p-2"
              style={{ border: "1px solid #C7C7C7", borderRadius: "8px" }}
            >
              <div className="d-flex justify-content-between mx-4">
                <div>
                  <i
                    className="bi bi-person-fill px-1"
                    style={{ color: "#0068FF" }}
                  ></i>
                  {selectedOption?.label}
                </div>
                <div>
                  <i
                    className="bi bi-telephone-fill px-1"
                    style={{ color: "#0068FF" }}
                  ></i>
                  {selectedOption?.phoneNumber}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ height: "280px", overflowY: "scroll" }}
            className="mt-3 px-3"
          >
            <Row>
              {documents.map((item, index) => (
                <DocumentBlock key={index} />
              ))}
              <AddNewDocument />
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
          <Row>
            <Col md={6}>
              <InputGroup className="mb-3" style={{ borderRadius: "6px" }}>
                <Form.Control
                  className="p-2 border-0 fw-bold shadow-none"
                  style={{ backgroundColor: "#F4F6F8" }}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
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
            <Col xs={12} md={4}>
              <div className="d-flex justify-content-md-end justify-content-center mt-md-4">
                <button
                  className="py-2"
                  style={{
                    width: "100%",
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
