import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
//
import {
  openSelectTemplate,
  resetModels,
} from "../../../recoil/helpers/contractModels";
import {
  selectedTemplatesAtom,
  templatesListAtom,
} from "../../../recoil/ContractAtoms/Templates";
import { generateContractLink, getContractList } from "../api";
import { CONTRACT_LINK_URL } from "../../../config";
import {
  contractModels,
  contractSelectedUsers,
  profileAtom,
  contractSelectedInvitors,
} from "../../../recoil/Atoms";
import copyToClipboard from "copy-text-to-clipboard";

const ContractCopylinkModal = ({
  show,
  onHide,
  selectedOption,
  refresh,
  setRefresh,
  link,
}) => {
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState([link]);
  const [documents, setDocuments] = useState([]);
  const profile = useRecoilValue(profileAtom);

  const selectionList = useRecoilValue(contractSelectedUsers);
  const setSelectionList = useSetRecoilState(contractSelectedUsers);

  const [invitors, setInvitors] = useRecoilState(contractSelectedInvitors);
  const setInvitorsList = useSetRecoilState(contractSelectedInvitors);

  const allTemplatesList = useRecoilValue(templatesListAtom);
  const [selectedTemplates, setSelectedTemplates] = useRecoilState(
    selectedTemplatesAtom
  );

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [models, setModals] = useRecoilState(contractModels);

  const [generateLinkClicked, setGenerateLinkClicked] = useState(false);

  const [showAddNewDocument, setShowAddNewDocument] = useState(true);

  useEffect(() => {
    setGeneratedLink(link);
  }, [link]);

  const clearCurrentStates = () => {
    setGeneratedLink(null);
    setSelectionList([]);
    setInvitorsList([]);
    setShowAddNewDocument(true); // Reset showAddNewDocument
  };

  const handleOnHide = () => {
    onHide();
    clearCurrentStates();
  };

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
          className="d-flex align-items-start justify-content-between px-2 py-1"
          style={{
            backgroundColor: "white",
            border: "1px solid #00000040",
          }}
        >
          <h6
            className="mb-0"
            style={{
              fontSize: "12px",
              overflowWrap: "anywhere",
            }}
          >
            {data?.originalFileName}
          </h6>
          <i
            className="bi bi-x p-0 m-0"
            style={{
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => {
              removeSelectedTemplates(data.id);
            }}
          ></i>
        </div>
      </Col>
    );
  };

  const AddNewDocument = () => {
    return (
      <Col lg={3} md={3} xs={6}>
        <img
          alt="Add new document"
          style={{
            height: "200px",
            width: "100%",
            objectFit: "contain",
          }}
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
    let generatedLinks = [];

    setLoading(true);

    let submitClientIdList = [];
    selectionList.forEach((item) => submitClientIdList.push(item.value));

    const submitData = {
      selectedTemplates: selectedTemplates,
      selectedContacts: submitClientIdList,
      visitorsBody: invitors.length > 0 ? invitors : undefined,
    };

    generateContractLink(submitData).then((res) => {
      if (res.success) {
        let generatedLinkValue;

        res.data.recipient.forEach((value) => {
          if (!submitClientIdList.includes(value)) {
            submitClientIdList.push(value);
          }
        });

        submitClientIdList.forEach((item, index) => {
          generatedLinkValue = `${CONTRACT_LINK_URL}${profile.company}/${res.data.uuid}/${res.data.docusignEnvelopeId}/${item}`;

          res.contacts.forEach((contact) => {
            if (contact.id === item) {
              generatedLinks.push({
                name: contact.name,
                link: generatedLinkValue,
              });
            }
          });

          setGeneratedLink(generatedLinks);
        });

        setGeneratedLink(generatedLinks);
      } else {
        toast.error(res.message);
      }
      setLoading(false);
      setRefresh(refresh + 1);
    });
  };

  const handleGenerateLinkClick = () => {
    setGenerateLinkClicked(true);
    setShowAddNewDocument(false); // Hide AddNewDocument when generating link
    onGenerateLink();
  };

  const submitForm = () => {
    copy(generatedLink);
    toast.success("Link copiado com sucesso");
  };

  const onCopyLink = (link) => {
    try {
      copyToClipboard(link);

      toast.success("Link copiado com sucesso");
    } catch (error) {
      toast.error("Erro ao copiar o link, tente novamente");
    }
  };

  const LinkBlocks = () => {
    return !!generatedLink ? (
      <>
        <Row>
          <Col md={8}>
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <h6
                  style={{
                    fontWeight: "600",
                    fontSize: "15px",
                    color: "#85A6A2",
                  }}
                >
                  Os links foram enviados para o e-mail de cada participante!
                </h6>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="d-flex justify-content-md-end justify-content-center mt-md-4"></div>
          </Col>
        </Row>
      </>
    ) : null;
  };

  const GenerateLinkBlock = ({ onGenerateLinkClick }) => {
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
              onClick={onGenerateLinkClick}
            >
              Gerar&nbsp;link
              {loading ? (
                <Spinner
                  animation="grow"
                  variant="light"
                  className="ms-3 fw-bold fs-5"
                />
              ) : null}
            </button>
          </div>
        </Col>
      </Row>
    ) : null;
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleOnHide}
        centered
        className="zindex"
      >
        <div className="" style={{ position: "relative", padding: "30px" }}>
          <div className="d-flex justify-content-between">
            <h5 className="fw-bold mt-1">Gerar nova assinatura</h5>
            <Button
              onClick={handleOnHide}
              className="bg-white border-0 text-dark"
            >
              <img src="/assets/img/close.png"></img>
            </Button>
          </div>
          <div
            style={{ height: "280px", overflowY: "scroll" }}
            className="mt-3 px-3"
          >
            <Row>
              {allTemplatesList
                .filter((obj) => selectedTemplates.indexOf(obj.id) > -1)
                .map((item, index) => (
                  <DocumentBlock key={index} data={item} />
                ))}
              {showAddNewDocument && <AddNewDocument />}
            </Row>
          </div>
          <LinkBlocks />
          <GenerateLinkBlock onGenerateLinkClick={handleGenerateLinkClick} />
        </div>
      </Modal>
    </>
  );
};

export default ContractCopylinkModal;
