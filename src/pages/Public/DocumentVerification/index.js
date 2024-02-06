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
import { toast } from "react-toastify";
import TableRowDocument from "../../../components/Document/table/TableRowDocument";
import { attachDocument, getAllDocumentsList, getAllDocumentsPublicList } from "../../Clients/api";
import { getDocument } from "../../../helper/API/document";
import { incrementCounter } from "../../../helper/API/auth";

const DocumentVerification = () => {
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
    setNumPages(numPages);
  }
  // *******************NEW PDF PREVIEW ************ //

  const { companyId, contactId, requestId } = useParams();

  const getAllDocumentsListData = async () => {
    const documentList = await getAllDocumentsPublicList({ company: companyId });
    console.log("documentList : ", documentList);
    setDocumentListData(documentList.data);
  };

  const incrementVisiterCounter = () => {
    const submitData = {
      company: companyId
    }

    incrementCounter(submitData);
  }

  useEffect(() => {
    incrementVisiterCounter();
  }, []);

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

  const handleSubmit = () => {
    setLoading(true);

    let submitCallArray = Object.keys(images).map((key, i) => {
      const formData = new FormData();
      formData.append("addressProof", images[key]);
      formData.append("id", contactId);
      formData.append("type", key);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          attachDocument(formData).then((res) => {
            resolve(res);
          }).catch((err) => {
            reject(err)
          });
        }, i * 1000);
      });
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
            <img alt="Vanth Logo" src="/assets/img/vancehDigital.svg" style={{ height: 200 }} />
          </div>
          <Card className="m-2 p-4" style={{ width: "80%" }}>
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
              </div>
            </>
          </Card>
        </Col>
      </div>
    </>
  );
};

export default DocumentVerification;
