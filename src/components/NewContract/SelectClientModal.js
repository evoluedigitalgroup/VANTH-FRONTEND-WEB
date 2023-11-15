import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import SelectTemplateModal from "./SelectTemplateModal";

const SelectClientModal = ({ show, onHide }) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowTamplateModal = () => {
    setShowModal(true);
    onHide();
  };

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
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
          <div>
            {selectedOption == null ? (
              <button
                disabled
                className="py-2 px-5"
                style={{
                  background: "#FC671A",
                  border: "0",
                  width: "200px",
                  borderRadius: "6px",
                  color: "white",
                  fontWeight: 700,
                  position: "absolute",
                  bottom: "30px",
                  right: "30px",
                  opacity: 0.5,
                }}
              >
                Próximo
              </button>
            ) : (
              <button
                onClick={handleShowTamplateModal}
                className="py-2 px-5"
                style={{
                  background: "#FC671A",
                  border: "0",
                  width: "200px",
                  borderRadius: "6px",
                  color: "white",
                  fontWeight: 700,
                  position: "absolute",
                  bottom: "30px",
                  right: "30px",
                }}
              >
                Próximo
              </button>
            )}
          </div>
        </div>
      </Modal>
      <div>
        <SelectTemplateModal
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      </div>
    </>
  );
};

export default SelectClientModal;
