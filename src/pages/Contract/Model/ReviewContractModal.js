import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Loader from "../../../components/Loader";
import { useRecoilState } from "recoil";
import { contractModels } from "../../../recoil/Atoms";
import { openReviewTemplateSelect, resetModels } from "../../../recoil/helpers/contractModels";

const ReviewContractModal = ({
  show,
  onHide,
  url,
  handleSubmit,
  showButtons,
  data,
  setReviewTemplates
}) => {

  const [models, setModels] = useRecoilState(contractModels);

  const [reload, setReload] = useState(false);

  const [imagePreview, setImagePreview] = useState(url);

  useEffect(() => {
    setImagePreview(url);
  }, [url]);


  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const handleReload = () => {
    setReload(true);
    setTimeout(() => {
      setReload(false);
    }, 3000);
  };

  const changeBack = () => {
    setReviewTemplates(data);
    setModels(resetModels());
    setModels(openReviewTemplateSelect());
  }

  return (
    <div>
      <Modal show={show} onHide={onHide} centered className="zindex">
        <Row className="p-3 px-3">
          <Col xs={1}>
            <button className="bg-white border-0" onClick={changeBack}>
              <img src="/assets/img/leftArrow.svg" />
            </button>
          </Col>
          <Col xs={9}>
            <h6 className="fw-bold mt-1">Analisar documentos enviados</h6>
          </Col>

          <Col xs={2}>
            <Button
              onClick={onHide}
              className="bg-white border-0 text-dark"
            >
              <img src="/assets/img/close.png"></img>
            </Button>
          </Col>
          <div>
            <Button
              className="border-0"
              style={{
                position: "absolute",
                backgroundColor: "#1C3D59",
                right: "2%",
                top: "12%",
                zIndex: 10000,
              }}
              onClick={handleReload}
            >
              <i className="bi bi-arrow-clockwise"></i>
            </Button>
          </div>
        </Row>
        <Row>
          <Col className="mx-4">
            <div
              className="border d-flex align-items-center justify-content-center  position-relative rounded-2 mb-4"
              style={{ height: "400px" }}
            >
              {reload || !imagePreview ? (
                <div className="d-flex align-items-center justify-content-center h-100 ">
                  <Loader />
                </div>
              ) : (
                <embed
                  src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${imagePreview}`}
                  style={{
                    height: imagePreview ? "100%" : "",
                    width: imagePreview ? "100%" : "",
                    // padding: "0px 15px",
                  }}
                ></embed>
              )}
            </div>
            <div>
              <a
                href={url}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Button
                  style={{
                    position: "absolute",
                    backgroundColor: "#1C3D59",
                    right: "2%",
                    bottom: "12%",
                    zIndex: 10000,
                  }}
                >
                  <i className="bi bi-cloud-arrow-down-fill"></i>
                </Button>
              </a>
            </div>
          </Col>
        </Row>
        {!showButtons ? null : (
          <Row className="px-4 gx-2 my-2">
            <Col>
              <Button
                className="w-100 p-0 py-2 border-0 fw-bold "
                style={{
                  background: "#1C3D59",
                  fontSize: "14px",
                }}
                onClick={() => handleSubmit("rejected")}
              >
                <img src="/assets/img/X.png" />
                &nbsp;Reprovar&nbsp;documento
              </Button>
            </Col>
            <Col>
              <Button
                className="p-0 py-2 w-100 border-0 fw-bold"
                style={{
                  backgroundColor: "#1C3D59",
                  fontSize: "14px",
                }}
                onClick={() => handleSubmit("approved")}
              >
                <img src="/assets/img/Right.png" />
                Aprovar documento
              </Button>
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
};

export default ReviewContractModal;
