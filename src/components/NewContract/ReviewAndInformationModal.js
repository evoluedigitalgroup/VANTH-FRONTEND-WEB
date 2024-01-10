import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ContractCopylinkModal from "./ContractCopylinkModal";
import PDFEditor from "../../library/pdfme/PDFEditor";
import Loader from "../Loader";
import { createContract } from "../../helper/API/contract";

const ReviewAndInformationModal = ({ title, show, onHide, selectedPdf, selectedOption }) => {
  const [base64, setBase64] = useState(null);

  useEffect(() => {
    if (show) {
      const data = window.URL.createObjectURL(selectedPdf);
      setBase64(data);
    }
  }, [selectedPdf, show]);


  const onReadyForSignature = async (templates) => {
    const previewFile = new File([templates.previewFile], templates.previewFile.name, { type: "application/pdf" });
    const usableFile = new File([templates.usableFile], templates.usableFile.name, { type: "application/pdf" });
    const formData = new FormData();
    formData.append("user", selectedOption.value);
    formData.append("originalFileName", selectedPdf.name);
    formData.append("previewFile", previewFile);
    formData.append("usableFile", usableFile);
    formData.append("schema", JSON.stringify(templates.schema));
    await createContract(formData);
  }

  return (
    <>
      <Modal size="xl" show={show} onHide={onHide} centered className="zindex">
        <div className="" style={{ position: "relative", padding: "20px" }}>
          <div className="d-flex justify-content-between">
            <h6 className="fw-bold mt-1">{title}</h6>
            <img
              onClick={onHide}
              src="assets/img/close.png"
              style={{ height: "15px", width: "15px", cursor: "pointer" }}
            ></img>
          </div>
          <div
            className="d-flex"
            style={{ height: "80vh" }}
          >
            {base64 ? (
              <PDFEditor basePdf={base64} onReadyForSignature={onReadyForSignature} />
            ) : <Loader />}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReviewAndInformationModal;
