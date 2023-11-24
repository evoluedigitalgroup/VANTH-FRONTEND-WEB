import React, { useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { approvedDocumentList } from "../../helper/API/document";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Loader from "../Loader";
const AddressProofModal = ({
  open,
  handleClose,
  document,
  refresh,
  setRefresh,
}) => {
  // console.log("document", document);

  const hiddenFileInput = useRef(null);
  const [images, setImages] = useState("");
  const [imagePreview, setImagePreview] = useState(document?.addressProof?.url);
  const [anchorEl, setAnchorEl] = useState(null);

  const [reload, setReload] = useState(false);

  const handleImageChange = (event) => {
    const fileUploaded = event.target.files[0];
    if (event.target.files[0]) {
      setImages(event.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePreview(reader.result);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    hiddenFileInput.current.click();
  };

  const handleSubmit = (action) => {
    const submitData = {
      id: document.id,
      type: document.type,
      action,
    };
    approvedDocumentList(submitData).then((res) => {
      if (res.success) {
        toast.success(res.message);
        setRefresh(refresh + 1);
        handleClose();
      } else {
        toast.error(res.message);
      }
    });
    // console.log("submitData", submitData);
  };
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

  return (
    <div>
      <Modal show={open} onHide={handleClose} centered className="zindex">
        <Row className="p-3 px-3">
          <Col md={10}>
            <h5 className="fw-bold mt-1">Analisar documentos enviados</h5>
          </Col>
          <Col>
            <Button
              onClick={handleClose}
              className="bg-white border-0 text-dark"
            >
              <img src="assets/img/close.png"></img>
            </Button>
          </Col>
          <div>
            <Button
              className="border-0"
              style={{
                position: "absolute",
                backgroundColor: "#0068FF",
                right: "2%",
                top: "12%",
                zIndex: 10000,
              }}
              onClick={handleReload}
            >
              <i class="bi bi-arrow-clockwise"></i>
            </Button>
          </div>
        </Row>
        <Row>
          <Col className="mx-4">
            <div
              className="border position-relative rounded-2 mb-4"
              style={{ height: "360px" }}
            >
              {/* <iframe
								src={
									imagePreview
										? imagePreview
										: "/assets/img/blankimg.png"
								}
								style={{
									height: imagePreview ? "100%" : "",
									width: imagePreview ? "100%" : "",
									// padding: "0px 15px",
								}}
							/>
							  <div> */}
              {reload ? (
                <div className="d-flex align-items-center justify-content-center h-100">
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

              <>
                {/* <Document
									file={imagePreview}
									options={{ workerSrc: "/pdf.worker.js" }}
									loading={"Carregando..."}
									noData='Nenhum arquivo PDF especificado.'
									onLoadSuccess={onDocumentLoadSuccess}
									className='react-pdf-doc'>
									<Page
										pageNumber={pageNumber}
										className='react-pdf-page-class'
										error='Falha ao carregar a página.'
										loading={() => {
											return (
												<>
													<div
														className='d-flex justify-content-center align-items-center'
														style={{
															height: "40vh",
														}}>
														<span className=''>
															Página de
															carregamento…
														</span>
													</div>
													<div
														className='d-flex justify-content-center align-items-center'
														height={"100%"}>
														Página de carregamento…
													</div>
												</>
											);
										}}
									/>
								</Document> */}
                <div>
                  {numPages > 1 && (
                    <div className="d-flex justify-content-around align-items-center mt-3">
                      <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                        className="btn-next-prev"
                      >
                        <i class="bi bi-caret-left-fill"></i>
                      </button>
                      <p className="text-center p-0 m-0">
                        Página {pageNumber || (numPages ? 1 : "--")} de{" "}
                        {numPages || "--"}
                      </p>
                      <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                        className="btn-next-prev"
                      >
                        <i class="bi bi-caret-right-fill"></i>
                      </button>
                    </div>
                  )}
                </div>
              </>
            </div>
            <div>
              <a
                href={document?.addressProof?.url}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Button
                  className="border-0"
                  style={{
                    position: "absolute",
                    backgroundColor: "#0068FF",
                    right: "2%",
                    bottom: "12%",
                    zIndex: 10000,
                  }}
                >
                  <i class="bi bi-cloud-arrow-down-fill"></i>
                </Button>
              </a>
            </div>
          </Col>
        </Row>
        <Row className="px-4 gx-2 my-2">
          <Col>
            <Button
              className="w-100 p-0 py-2 border-0"
              style={{ background: "#0068FF" }}
              disabled={document?.addressProof?.approved}
              onClick={() => handleSubmit("reject")}
            >
              <i class="bi bi-x"></i>Solicitar outra foto
            </Button>
          </Col>
          <Col>
            <Button
              className="p-0 py-2 w-100 border-0"
              style={{ backgroundColor: "#0068FF" }}
              disabled={document?.addressProof?.approved}
              onClick={() => handleSubmit("approved")}
            >
              <i class="bi bi-check"></i>Aprovar documento
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default AddressProofModal;
