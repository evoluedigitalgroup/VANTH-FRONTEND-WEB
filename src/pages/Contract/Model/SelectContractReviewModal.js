import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { contractModels, contractNewFileSelected } from "../../../recoil/Atoms";
import {
  openContractReview,
} from "../../../recoil/helpers/contractModels";
import { templatesListAtom, selectedTemplatesAtom, contractApprovalDataAtom } from '../../../recoil/ContractAtoms/Templates';
import { getTemplates } from "../../Contract/api";
import { set } from "react-hook-form";

const SelectContractReviewModal = ({ show, onHide, templatesData }) => {
  const [loading, setLoading] = useState(true);
  const setContractApprovalData = useSetRecoilState(contractApprovalDataAtom)
  const [models, setModels] = useRecoilState(contractModels);
  const [selectedFile, setSelectedFile] = useRecoilState(
    contractNewFileSelected
  );

  const handleContractSelected = (item) => {
    console.log('item', item)
    const selectedDocument = templatesData.data.contractDocumentIds.find((obj) => obj.template.id === item.template.id);
    console.log('selectedDocument', selectedDocument)
    const url = selectedDocument.signedDocumentUrl;
    const documentId = selectedDocument.documentId;


    const isAnyRejected = templatesData.data.contractDocumentIds.some((obj) => obj.isApproved === "rejected");
    console.log('isAnyRejected', isAnyRejected)

    setContractApprovalData({
      data: templatesData,
      id: templatesData.data.id,
      uuid: templatesData.data.uuid,
      documentId,
      url: templatesData.signedDocumentUrl,
      showButtons: false,
    });
    setModels(openContractReview());
  };

  const DocumentBlock = ({ data, onClick = () => { } }) => {
    return (
      <Col md={12} xs={12} className="p-0 mb-2 position-relative" onClick={onClick} style={{ cursor: "pointer" }}>
        <div
          className="d-flex align-items-start justify-content-between px-2 py-1"
          style={{
            backgroundColor: "#58a43d",
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
            <a href={data?.signedDocument} target="__blank" style={{
              color: "white",
            }}>
              {data?.template?.originalFileName}
            </a>
          </h6>
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
          </div>
          <div
            className="mt-3 px-3"
            style={{ height: "380px", width: "100%", overflowY: "scroll" }}
          >
            <Row>
              {templatesData?.data?.contractDocumentIds?.map((item, index) => (
                <>
                  <DocumentBlock key={index} data={item} onClick={() => {
                    handleContractSelected(item)
                  }} />
                </>
              ))}
              {templatesData?.data?.contractDocumentIds?.length === 0 && (
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
