import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
// import {
// 	attachDocument,
// 	getDocument,
// 	submitAddressDocument,
// 	submitDocument,
// } from "../../helper/API/contact";
// import AddressProofModal from "./AddressProofModal";
// import SocialContractModal from "./SocialContractModal";
// import Dropzone from "react-dropzone";
// import SocialProofCard from "./SocialProofCard";
// import AddressProofCard from "./AddressProofCard";
import { toast } from "react-toastify";
import TableRowDocument from "../components/Document/documents/TableRowDocument";
import { attachDocument, getAllDocumentsList } from "../helper/API/contact";
import { getDocument } from "../helper/API/document";
// import { Document, Page } from "react-pdf";

const DocumentCrad = () => {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [open, setopen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [addressOpen, setAddressOpen] = useState(false);
  const [data, setData] = useState(null);
  const [disable, setDisable] = useState(true);
  const [images, setImages] = React.useState({});
  const [documentListData, setDocumentListData] = useState([]);
  const [addressImages, setAddressImages] = React.useState("");

  // *******************NEW PDF PREVIEW ************ //
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    // console.log("numPages", numPages);
    setNumPages(numPages);
  }
  // *******************NEW PDF PREVIEW ************ //

  const { contactId, requestId } = useParams();

  const getAllDocumentsListData = async () => {
    const documentList = await getAllDocumentsList();
    setDocumentListData(documentList.data);
  };

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  useEffect(() => {
    getAllDocumentsListData();
    const submitData = { contactId, requestId };
    getDocument(submitData).then((res) => {
      if (res.success) {
        setData(res.data);
      } else {
      }
    });
  }, [refresh]);

  const handleFileChange = (e, name) => {
    if (e.target.files[0].type !== "application/pdf") {
      toast.error("Por favor, selecione apenas arquivo pdf");
    } else {
      setDisable(false);
      setopen(true);
      if (e.target.files[0]) {
        let dataValue = data;
        dataValue.docs[name] = e.target.files[0];
        setData(dataValue);

        setImages({
          ...images,
          [name]: e.target.files[0],
        });
      }
    }
  };

  // console.log("images", images);

  const handleSubmit = () => {
    setLoading(true);

    let submitCallArray = Object.keys(images).map((key) => {
      const formData = new FormData();
      formData.append("addressProof", images[key]);
      formData.append("id", contactId);
      formData.append("type", key);
      return attachDocument(formData);
    });

    Promise.all(submitCallArray)
      .then((responses) => {
        if (responses) {
          toast.success("Anexo adicionado com sucesso");
          setLoading(false);
          setRefresh(refresh + 1);
          setDisable(true);
        }
      })
      .catch((err) => setDisable(true));
  };
  return (
    <>
      <div className="Dashboard DocumentCard d-flex align-items-center justify-content-center">
        <Col
          md={12}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <div className="TBA-Logo d-flex align-items-center justify-content-center">
            <img src="/assets/img/MAIN_LOGO.png" style={{ height: 200 }} />
          </div>
          <Card className="m-2 p-4" style={{ width: "80%" }}>
            {/* {data?.socialContract?.approved &&
						data?.addressProof?.approved ? (
							<div
								className='d-flex justify-content-center align-items-center'
								style={{ height: "20vh" }}>
								<h2>
									Você não tem nenhum documento para enviar
								</h2>
							</div>
						) : ( */}
            <>
              <h6 className="fw-bold">
                Prosperity solicitou as seguintes informações:
              </h6>
              <Row className="mt-3">
                <Row>
                  <Col md={6} xs={12}>
                    <Form>
                      <Form.Label>Nome</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#F4F6F8",
                          }}
                        >
                          <i className="bi bi-person-fill link-icon"></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Ana Júlia Garcia"
                          type="text"
                          className="Cardinput"
                          value={data?.name}
                          disabled
                        />
                      </InputGroup>
                    </Form>
                  </Col>
                  {data?.phone && (
                    <Col md={6} xs={12}>
                      <Form>
                        <Form.Label>Telefone</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text
                            id="basic-addon1"
                            className="border-0"
                            style={{
                              background: "#F4F6F8",
                            }}
                          >
                            <span className="bi bi-telephone link-icon"></span>
                            {/* <i className='bi bi-envelope-fill '></i> */}
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="Telefone"
                            type="text"
                            className="Cardinput"
                            value={data?.phone}
                            disabled
                          />
                        </InputGroup>
                      </Form>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col md={6} xs={12}>
                    <Form>
                      <Form.Label>CPF</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#F4F6F8",
                          }}
                        >
                          <i className="bi bi-person-vcard-fill link-icon"></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="000.000.000-00"
                          type="text"
                          className="Cardinput"
                          value={data?.CPF}
                          disabled
                        />
                      </InputGroup>
                    </Form>
                  </Col>
                  <Col md={6} xs={12}>
                    <Form>
                      <Form.Label>CNPJ</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#F4F6F8",
                          }}
                        >
                          <i className="bi bi-person-vcard-fill link-icon"></i>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="000.000.000-00"
                          type="text"
                          className="Cardinput"
                          value={data?.CNPJ}
                          disabled
                        />
                      </InputGroup>
                    </Form>
                  </Col>
                  {data?.email && (
                    <Col md={12} xs={12}>
                      <Form>
                        <Form.Label>Email</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text
                            id="basic-addon1"
                            className="border-0"
                            style={{
                              background: "#F4F6F8",
                            }}
                          >
                            <i className="bi bi-envelope-fill link-icon"></i>
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="anajuliamarques@tba.com"
                            type="email"
                            className="Cardinput"
                            value={data?.email}
                            disabled
                          />
                        </InputGroup>
                      </Form>
                    </Col>
                  )}
                </Row>
              </Row>
              <Row className="mt-3 gx-2">
                <TableRowDocument
                  obj={data}
                  permission={data?.requiredPermission}
                  documentListData={documentListData}
                  addressImages={addressImages}
                  images={images}
                  handleFileChange={handleFileChange}
                  inputRef={inputRef}
                  withInput={true}
                />
              </Row>
              <div className="d-flex justify-content-end">
                {/* {(data?.addressProof === null ||
										data?.socialContract === null) && ( */}
                {!disable && (
                  <Button
                    onClick={handleSubmit}
                    className="mt-4 m-2 p-3 px-4 fw-bold border-0"
                    disabled={loading}
                    style={{
                      width: "fit-content",
                      background: "#1C3D59",
                    }}
                  >
                    Encaminhar
                    {loading && (
                      <Spinner
                        animation="grow"
                        variant="light"
                        className="ms-3 py-2 fw-bold fs-4"
                      />
                    )}
                  </Button>
                )}
                {/* )} */}
              </div>
            </>
            {/* )} */}
          </Card>
        </Col>
      </div>
    </>
  );
};

export default DocumentCrad;
