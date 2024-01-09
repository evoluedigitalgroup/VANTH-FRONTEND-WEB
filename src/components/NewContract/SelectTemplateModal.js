import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import ContractCopylinkModal from "./ContractCopylinkModal";
import ReviewAndInformationModal from "./ReviewAndInformationModal";

const SelectTemplateModal = ({ show, onHide, selectedOption }) => {
  // const [options, setOptions] = useState([1, 1, 1, 1, 1, 1, 1, 1]);
  const [options, setOptions] = useState([]);
  const [showReviewAndInformationModal, setShowReviewaAndInformationModal] =
    useState(false);

  const handleClickReview = () => {
    setShowReviewaAndInformationModal(true);
    onHide();
  };

  const DocumentBlock = () => {
    return (
      <Col
        md={6}
        xs={6}
        style={{ position: "relative" }}
        className="d-flex justify-content-center p-0 mb-2"
      >
        <img style={{ height: "200px" }} src="/assets/img/Document.svg" />
        <input
          type="checkbox"
          style={{ position: "absolute", top: "3px", right: "12px" }}
        />
      </Col>
    );
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
              {options.map((item, index) => (
                <DocumentBlock key={index} />
              ))}
              {options.length === 0 && (
                <div className="text-center w-100">
                  <img src="/assets/img/empty.png" style={{ height: "50px" }} />
                  <h6 className="mt-3">Nenhum modelo encontrado</h6>
                </div>
              )}
            </Row>
          </div>
          <div className="mt-4">
            <Row>
              <Col md={6}>
                <button
                  className="px-4 py-2 w-100"
                  onClick={handleClickReview}
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
                  // disabled={options.length === 0}
                  onClick={handleClickReview}
                  className="text-center py-2 w-100"
                  style={{
                    fontSize: "14px",
                    background: "#0068FF",
                    border: "0",
                    borderRadius: "6px",
                    color: "white",
                    fontWeight: 800,
                    opacity: options.length === 0 ? 0.5 : 1,
                  }}
                >
                  Escolher&nbsp;modelo
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
      <div className="bg-info" style={{ width: "100vw" }}>
        <ReviewAndInformationModal
          selectedOption={selectedOption}
          show={showReviewAndInformationModal}
          onHide={() => setShowReviewaAndInformationModal(false)}
        />
      </div>
    </>
  );
};

export default SelectTemplateModal;
