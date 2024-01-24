import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import ContractCopylinkModal from "./ContractCopylinkModal";
import ReviewAndInformationModal from "./ReviewAndInformationModal";
import { contractModels, contractNewFileSelected } from "../../recoil/Atoms";
import { useRecoilState } from "recoil";
import {
  openPDFEditor,
  resetModels,
} from "../../recoil/helpers/contractModels";
import { getTemplates } from "../../helper/API/contract";

const SelectTemplateModal = ({ show, onHide, selectedOption }) => {
  // const [options, setOptions] = useState([1, 1, 1, 1, 1, 1, 1, 1]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useRecoilState(contractModels);
  const [selectedFile, setSelectedFile] = useRecoilState(
    contractNewFileSelected
  );

  const [showCopyLink, setShowCopyLink] = useState(false);

  const handlePdfSelect = (file) => {
    setSelectedFile(file);
    setModels(resetModels());
    setModels(openPDFEditor());
  };

  useEffect(() => {
    getTemplates().then((res) => {
      console.log("data ::: ", res?.data);
      setOptions(res?.data);
      setLoading(false);
    });
  }, []);

  const DocumentBlock = ({ data }) => {
    return (
      <Col md={6} xs={6} className="p-0 mb-2">
        <div
          className="d-flex align-items-start justify-content-between px-2 py-1 me-3"
          style={{
            backgroundColor: "white",
            borderRadius: "5px 5px 0 0",
            border: "1px solid #00000040",
          }}
        >
          <h6
            className="mb-0"
            style={{
              fontSize: "12px",
              // overflow-wrap: break-word;
              overflowWrap: "anywhere",
            }}
          >
            {data?.originalFileName}
          </h6>
          <input
            type="checkbox"
            style={{ height: "10px", width: "10px", marginTop: "2px" }}
          />
        </div>
        <div
          className="p-2 me-3"
          style={{
            height: "174px",
            backgroundColor: "#0000001A",
            borderRadius: "0px 0px 5px 5px",
            border: "1px solid #00000040",
          }}
        >
          <img
            style={{ height: "100%", width: "100%" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ44ag4leeBZ0yztHUoIH2BWM4kRbncizZeg&usqp=CAU"
          />
        </div>
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
              {options?.map((item, index) => (
                <DocumentBlock key={index} data={item} />
              ))}
              {options?.length === 0 && (
                <div className="text-center w-100">
                  <img src="/assets/img/empty.png" style={{ height: "50px" }} />
                  <h6 className="mt-3">Nenhum modelo encontrado</h6>
                </div>
              )}
            </Row>
          </div>
          <div className="mt-4">
            <Row>
              <Col md={6} style={{ position: "relative", overflow: "clip" }}>
                <input
                  type="file"
                  style={{
                    overflow: "clip",
                    position: "absolute",
                    background: "red",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                  }}
                  accept=".pdf"
                  onChange={(e) => {
                    handlePdfSelect(e.target.files[0]);
                  }}
                />
                <button
                  className="px-4 py-2 w-100"
                  disabled
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
                  disabled={options.length === 0}
                  // onClick={handleClick}
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
    </>
  );
};

export default SelectTemplateModal;
