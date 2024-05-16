import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { contractModels, contractNewFileSelected, contractSelectedInvitors, contractSelectedUsers } from "../../../recoil/Atoms";
import {
  openPDFEditor,
  openPreviewContract,
  resetModels,
} from "../../../recoil/helpers/contractModels";
import { templatesListAtom, selectedTemplatesAtom } from '../../../recoil/ContractAtoms/Templates';
import { getTemplates } from "../../Contract/api";

const SelectTemplateModal = ({ show, onHide, selectedOption }) => {
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useRecoilState(contractModels);
  const [selectedFile, setSelectedFile] = useRecoilState(
    contractNewFileSelected
  );
  const [selectedTemplates, setSelectedTemplates] = useRecoilState(selectedTemplatesAtom);
  const [templatesList, setTemplatesList] = useRecoilState(templatesListAtom);

  const [showCopyLink, setShowCopyLink] = useState(false);

  const setSelectionList = useSetRecoilState(contractSelectedUsers);
  const setInvitorsList = useSetRecoilState(contractSelectedInvitors);

  const clearCurrentStates = () => {
    setSelectionList([])
    setInvitorsList([])
  }

  const handleOnHide = () => {
    onHide()
    clearCurrentStates()
  }

  const handlePdfSelect = (file) => {
    setSelectedFile(file);
    setModels(resetModels());
    setModels(openPDFEditor());
  };

  useEffect(() => {
    getTemplates().then((res) => {
      console.log("data ::: ", res?.data);
      setTemplatesList(res?.data);
      setLoading(false);
    });
  }, []);

  const handleCheckbox = (data) => {
    if (selectedTemplates.indexOf(data.id) !== -1) {
      setSelectedTemplates(selectedTemplates.filter((item) => item !== data.id));
    } else {
      setSelectedTemplates([...selectedTemplates, data.id]);
    }
  };

  const handleClickChooseModel = () => {
    if (selectedTemplates.length === 0) return;
    setModels(resetModels());
    setModels(openPreviewContract());
  }

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
            <a href={data.originalFile} target="__blank" style={{ color: '#000000' }}>
              {data?.originalFileName}
            </a>
          </h6>
          <input
            type="checkbox"
            checked={selectedTemplates.indexOf(data.id) !== -1}
            onClick={() => handleCheckbox(data)}
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
            src={data?.templatePreviewImageFile}
          />
        </div>
      </Col>
    );
  };

  return (
    <>
      <Modal size="md" show={show} onHide={handleOnHide} centered className="zindex">
        <div className="" style={{ position: "relative", padding: "20px" }}>
          <div className="d-flex justify-content-between">
            <h6 className="fw-bold mt-1">
              Selecione um modelo para solicitar assinatura
            </h6>
            {/* <Button onClick={onHide} className="bg-white border-0 text-dark"> */}
            <img
              onClick={handleOnHide}
              src="/assets/img/close.png"
              style={{ height: "15px", width: "15px", cursor: "pointer" }}
            ></img>
            {/* </Button> */}
          </div>
          <div
            className="mt-3 px-3"
            style={{ height: "380px", width: "100%", overflowY: "scroll" }}
          >
            <Row>
              {templatesList?.map((item, index) => (
                <DocumentBlock key={index} data={item} />
              ))}
              {templatesList?.length === 0 && (
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
                  Anexar&nbsp;modelo
                </button>
              </Col>
              <Col md={6} className="mt-2 mt-md-0">
                <button
                  disabled={templatesList.length === 0}
                  onClick={handleClickChooseModel}
                  className="text-center py-2 w-100"
                  style={{
                    fontSize: "14px",
                    background: "#0068FF",
                    border: "0",
                    borderRadius: "6px",
                    color: "white",
                    fontWeight: 800,
                    opacity: templatesList.length === 0 ? 0.5 : 1,
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
