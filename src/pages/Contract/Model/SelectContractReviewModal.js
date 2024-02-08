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
    const url = selectedDocument.signedDocument;
    const documentId = selectedDocument.documentId;


    const isAnyRejected = templatesData.data.contractDocumentIds.some((obj) => obj.isApproved === "rejected");
    console.log('isAnyRejected', isAnyRejected)

    const isApproved = selectedDocument.isApproved === "approved";
    const isRejected = selectedDocument.isApproved === "rejected";

    setContractApprovalData({
      data: templatesData,
      id: templatesData.data.id,
      documentId,
      url,
      showButtons: (!isApproved && !isRejected) && !isAnyRejected
    });
    setModels(openContractReview());
  };

  const DocumentBlock = ({ data, onClick = () => { } }) => {
    return (
      <Col md={6} xs={6} className="p-0 mb-2 position-relative" onClick={onClick} style={{ cursor: "pointer" }}>
        <div
          className="d-flex align-items-start justify-content-between px-2 py-1 me-3"
          style={{
            backgroundColor: data.isApproved === 'approved'
              ? "#58a43d"
              : data.isApproved === 'rejected' ? "#ae2424" : "white",
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
            <a href={data?.signedDocument} target="__blank" style={{
              color: data.isApproved === 'pending'
                ? "black" : "white",
            }}>
              {data?.template?.originalFileName}
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
            src={data?.template?.templatePreviewImageFile}
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
