import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row, Spinner } from "react-bootstrap";
import ReviewAndInformationModal from "./ReviewAndInformationModal";
import { contractModels, profileAtom } from "../../recoil/Atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openSelectTemplate,
  resetModels,
} from "../../recoil/helpers/contractModels";
import {
  selectedTemplatesAtom,
  templatesListAtom,
} from "../../recoil/ContractAtoms/Templates";
import { click } from "@testing-library/user-event/dist/click";
import { generateContractLink } from "../../helper/API/contract";
import Loader from "../Loader";
import { CONTRACT_LINK_URL } from "../../config";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

const ContractCopylinkModal = ({ show, onHide, selectedOption }) => {
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState(false);
  const [documents, setDocuments] = useState([]);
  const profile = useRecoilValue(profileAtom);

  const allTemplatesList = useRecoilValue(templatesListAtom);
  const [selectedTemplates, setSelectedTemplates] = useRecoilState(
    selectedTemplatesAtom
  );

  // const [documents, setDocuments] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [models, setModals] = useRecoilState(contractModels);

  const handlePdfSelect = (file) => {
    setSelectedPdf(file);
  };

  const [showReviewAndInformationModal, setShowReviewaAndInformationModal] =
    useState(false);

  const handleClickReview = () => {
    setShowReviewaAndInformationModal(true);
    onHide();
  };

  const removeSelectedTemplates = (clickId) => {
    setSelectedTemplates(
      selectedTemplates.filter((value) => {
        return value !== clickId;
      })
    );
  };

  const DocumentBlock = ({ data }) => {
    return (
      <Col md={3} xs={6} className="p-0 mb-2">
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
          <i
            class="bi bi-x p-0 m-0"
            style={{
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => {
              removeSelectedTemplates(data.id);
            }}
          ></i>
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

  const AddNewDocument = () => {
    return (
      <Col
        lg={3}
        md={3}
        xs={6}
      // style={{ position: "relative" }}
      // className="d-flex justify-content-center justify-content-md-start p-0 mb-2"
      >
        {/* <input
          type="file"
          style={{
            background: "red",
            position: "absolute",
            height: 250,
            width: 200,
            opacity: 0,
          }}
          accept=".pdf"
          onChange={(e) => {
            handlePdfSelect(e.target.files[0]);
          }}
        /> */}
        <img
          style={{ height: "200px", width: "100%", objectFit: "contain" }}
          onClick={() => {
            setModals(resetModels());
            setModals(openSelectTemplate());
          }}
          src="/assets/img/DocumentAdd.svg"
        />
      </Col>
    );
  };

  const onGenerateLink = () => {
    const submitData = {
      selectedTemplates: selectedTemplates,
      selectedContact: selectedOption.value,
    };
    console.log(submitData);
    setLoading(true)
    generateContractLink(submitData).then((res) => {
      console.log('res : ', res);
      if (res.success) {
        const generatedLinkValue = `${CONTRACT_LINK_URL}${profile.company}/${res.data.uuid}/${res.data.docusignEnvelopeId}`;
        setGeneratedLink(generatedLinkValue);
      } else {
        toast.error(res.message)
      }
      setLoading(false)
    });
  }

  const submitForm = () => {
    copy(generatedLink);
    toast.success("Link copiado com sucesso");
  }

  const LinkBlocks = () => {
    return !!generatedLink ? (
      <>
        <>
          <div className="mt-4">
            <h6
              style={{
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              Link para compartilhar com o cliente
            </h6>
          </div>
          <Row>
            <Col md={6}>
              <InputGroup className="mb-3" style={{ borderRadius: "6px" }}>
                <Form.Control
                  className="p-2 border-0 fw-bold shadow-none"
                  style={{ backgroundColor: "#F4F6F8" }}
                  value={generatedLink}
                />
              </InputGroup>
            </Col>
          </Row>
        </>
        <Row>
          <Col md={8}>
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <h6
                  style={{
                    fontWeight: "600",
                    fontSize: "12px",
                    color: "#85A6A2",
                  }}
                >
                  Enviar com:
                </h6>
                <a href={`https://wa.me/?text=${encodeURI(generatedLink)}`}>
                  <img
                    // style={{ height: "60px", width: "60px" }}
                    src="/assets/img/whatsApp.svg"
                  />
                </a>
                <a href={`mailto:?body=${generatedLink}`}>
                  <img
                    // style={{ height: "39px", width: "39px" }}
                    src="/assets/img/mail.png"
                  />
                </a>
                <a href={`sms:?body=${generatedLink}`}>
                  <img
                    // style={{ height: "39px", width: "39px" }}
                    src="/assets/img/sms.png"
                  />
                </a>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="d-flex justify-content-md-end justify-content-center mt-md-4">
              <button
                className="py-2"
                style={{
                  width: "100%",
                  fontSize: "12px",
                  fontWeight: 400,
                  background: "#0068FF",
                  border: "0",
                  borderRadius: "6px",
                  color: "white",
                  fontWeight: 800,
                }}
                onClick={submitForm}
              >
                Copiar&nbsp;link
              </button>
            </div>
          </Col>
        </Row>
      </>
    ) : null
  }

  const GenerateLinkBlock = () => {
    return !generatedLink ? (
      <Row>
        <Col md={8}></Col>
        <Col xs={12} md={4}>
          <div className="d-flex justify-content-md-end justify-content-center mt-md-4">
            <button
              className="py-2"
              style={{
                width: "100%",
                fontSize: "12px",
                fontWeight: 400,
                background: "#0068FF",
                border: "0",
                borderRadius: "6px",
                color: "white",
                fontWeight: 800,
              }}
              disabled={loading}
              onClick={onGenerateLink}
            >
              Gerar&nbsp;link

              {loading
                ? <Spinner
                  animation="grow"
                  variant="light"
                  className="ms-3 fw-bold fs-5"
                />
                : null
              }
            </button>
          </div>
        </Col>
      </Row>
    ) : null;
  }

  return (
    <>
      <Modal size="lg" show={show} onHide={onHide} centered className="zindex">
        <div className="" style={{ position: "relative", padding: "30px" }}>
          <div className="d-flex justify-content-between">
            <h5 className="fw-bold mt-1">
              Link para solicitar assinatura de contrato
            </h5>
            <Button onClick={onHide} className="bg-white border-0 text-dark">
              <img src="assets/img/close.png"></img>
            </Button>
          </div>
          <div
            className="mt-2 selctedUserNameAndTelephoneLabel"
          >
            <div
              className="p-2"
              style={{ border: "1px solid #C7C7C7", borderRadius: "8px" }}
            >
              <div className="d-flex justify-content-between mx-4">
                <div>
                  <i
                    className="bi bi-person-fill px-1"
                    style={{ color: "#0068FF" }}
                  ></i>
                  {selectedOption?.label}
                </div>
                <div>
                  <i
                    className="bi bi-telephone-fill px-1"
                    style={{ color: "#0068FF" }}
                  ></i>
                  {selectedOption?.phoneNumber}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ height: "280px", overflowY: "scroll" }}
            className="mt-3 px-3"
          >
            <Row>
              {allTemplatesList
                .filter((obj) => selectedTemplates.indexOf(obj.id) > -1)
                .map((item, index) => (
                  <DocumentBlock data={item} />
                ))}
              <AddNewDocument />
            </Row>
          </div>

          <LinkBlocks />
          <GenerateLinkBlock />
        </div>
      </Modal>
    </>
  );
};

export default ContractCopylinkModal;
