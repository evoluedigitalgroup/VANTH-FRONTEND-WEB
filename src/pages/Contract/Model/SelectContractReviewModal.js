import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { contractModels, contractNewFileSelected } from "../../../recoil/Atoms";
import {
  openPDFEditor,
  openPreviewContract,
  resetModels,
} from "../../../recoil/helpers/contractModels";
import { templatesListAtom, selectedTemplatesAtom } from '../../../recoil/ContractAtoms/Templates';
import { generateContractDownloadLink, getTemplates } from "../../Contract/api";

const SelectContractReviewModal = ({ show, onHide, templatesData }) => {
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useRecoilState(contractModels);
  const [selectedFile, setSelectedFile] = useRecoilState(
    contractNewFileSelected
  );

  const handleContractSelected = (item) => {
    console.log("templatesData", templatesData.data.contractDocumentIds);

    console.log("item", item);

    const submitData = {
      contractId: templatesData.data.id,
      documentId: templatesData.data.contractDocumentIds.find((obj) => obj.template.id === item.id).documentId
    }

    console.log("submitData", submitData)

    generateContractDownloadLink(submitData).then((res) => {
      console.log("res", res);
    }).catch((err) => {
      console.log("err", err);
    });

  };

  const DocumentBlock = ({ data, onClick = () => { } }) => {
    return (
      <Col md={6} xs={6} className="p-0 mb-2" onClick={onClick} style={{ cursor: "pointer" }}>
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
      <Modal size="md" show={show} onHide={onHide} centered className="zindex">
        <div className="" style={{ position: "relative", padding: "20px" }}>
          <div className="d-flex justify-content-between">
            <h6 className="fw-bold mt-1">
              Selecione o modelo de contrato para revisar
            </h6>
            {/* <Button onClick={onHide} className="bg-white border-0 text-dark"> */}
            <img
              onClick={onHide}
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

              {templatesData?.templatesList?.map((item, index) => (
                <DocumentBlock key={index} data={item} onClick={() => {
                  handleContractSelected(item)
                }} />
              ))}
              {templatesData?.templatesList?.length === 0 && (
                <div className="text-center w-100">
                  <img src="/assets/img/empty.png" style={{ height: "50px" }} />
                  <h6 className="mt-3">Nenhum modelo encontrado</h6>
                </div>
              )}
            </Row>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SelectContractReviewModal;
