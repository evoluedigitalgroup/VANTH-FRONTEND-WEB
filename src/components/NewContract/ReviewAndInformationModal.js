import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import PDFEditor from "../../library/pdfme/PDFEditor";
import Loader from "../Loader";
import { createContract, getTemplates } from "../../helper/API/contract";
import { useSetRecoilState } from "recoil";
import { templatesListAtom } from "../../recoil/ContractAtoms/Templates";
import { openSelectTemplate, resetModels } from "../../recoil/helpers/contractModels";
import { contractModels } from "../../recoil/Atoms";

const ReviewAndInformationModal = ({ title, show, onHide, selectedPdf, selectedOption }) => {
  const [base64, setBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const setContractTemplates = useSetRecoilState(templatesListAtom);
  const setModals = useSetRecoilState(contractModels);

  useEffect(() => {
    if (show) {
      const data = window.URL.createObjectURL(selectedPdf);
      setBase64(data);
    }
  }, [selectedPdf, show]);


  const onReadyForSignature = async (templates) => {
    setLoading(true);
    const previewFile = new File([templates.previewFile], templates.previewFile.name, { type: "application/pdf" });
    const usableFile = new File([templates.usableFile], templates.usableFile.name, { type: "application/pdf" });
    const formData = new FormData();
    formData.append("user", selectedOption.value);
    formData.append("originalFileName", selectedPdf.name);
    formData.append("originalFile", selectedPdf);
    formData.append("previewFile", previewFile);
    formData.append("usableFile", usableFile);
    formData.append("schema", JSON.stringify(templates.schema));
    await createContract(formData);
    const templatesData = await getTemplates();
    setContractTemplates(templatesData?.data);

    setModals(resetModels());
    setModals(openSelectTemplate());
    setLoading(false);
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
            style={{ height: "80vh", width: "100%", alignItems: loading ? "center" : 'unset' }}
          >
            {(base64 && !loading) ? (
              <PDFEditor basePdf={base64} onReadyForSignature={onReadyForSignature} />
            ) : <Loader message={() => {
              return (
                <div>
                  Não feche, por favor aguarde.
                  <br />
                  Seu modelo está sendo gerado.
                </div>
              )
            }} showMessage />}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReviewAndInformationModal;
