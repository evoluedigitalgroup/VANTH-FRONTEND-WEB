import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import SelectTemplateModal from "./SelectTemplateModal";
import Loader from "../Loader";
import { getContactList } from "../../helper/API/contact";

const SelectClientModal = ({ show, onHide }) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contactsData, setContactsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleShowTamplateModal = () => {
    setShowModal(true);
    onHide();
  };

  useEffect(() => {
    setLoading(true);
    getContactList(1, "", 9999999).then((res) => {
      if (res.success) {
        let optionsData = res.data.findData.map((item) => {
          return {
            value: item.id,
            label: item.name,
            phoneNumber: item.phone,
          };
        });
        setContactsData(optionsData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  const formatOptionLabel = ({ label, phoneNumber }) => (
    <div className="d-flex justify-content-between mx-4">
      <div>
        <i className="bi bi-person-fill px-1" style={{ color: "#BAC4C8" }}></i>
        {label}
      </div>
      <div>
        <i
          className="bi bi-telephone-fill px-1"
          style={{ color: "#BAC4C8" }}
        ></i>
        {phoneNumber}
      </div>
    </div>
  );

  return (
    <>
      <Modal size="lg" show={show} onHide={onHide} centered className="zindex">
        <div
          className=""
          style={{ height: "540px", position: "relative", padding: "30px" }}
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="d-flex justify-content-between">
                <h5 className="fw-bold mt-1">
                  Link para solicitar assinatura de contrato
                </h5>
                <Button
                  onClick={onHide}
                  className="bg-white border-0 text-dark"
                >
                  <img src="assets/img/close.png"></img>
                </Button>
              </div>
              <div className="mt-3" style={{ width: "60%" }}>
                <Select
                  defaultValue={selectedOption}
                  formatOptionLabel={formatOptionLabel}
                  onChange={setSelectedOption}
                  options={contactsData}
                />
              </div>
              <div>
                <button
                  onClick={handleShowTamplateModal}
                  disabled={selectedOption == null}
                  cLink
                  para
                  solicitar
                  assinatura
                  de
                  contratolassName="py-2 px-5"
                  style={{
                    background: "#0068FF",
                    border: "0",
                    width: "200px",
                    borderRadius: "6px",
                    color: "white",
                    fontWeight: 700,
                    position: "absolute",
                    bottom: "30px",
                    right: "30px",
                    opacity: selectedOption == null ? 0.5 : 1,
                  }}
                >
                  Próximo
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
      <div>
        <SelectTemplateModal
          selectedOption={selectedOption}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      </div>
    </>
  );
};

export default SelectClientModal;
