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
import _ from 'lodash';
import TableRowDocument from "../../../components/Document/table/TableRowDocument";
import { attachDocument, getAllDocumentsList, getAllDocumentsPublicList, updateClientContact } from "../../Clients/api";
import { getDocument } from "../../../helper/API/document";
import { incrementCounter } from "../../../helper/API/auth";
import { formatarCNPJ, formatarCPF, formatarTelefone } from "../../../library/contentformater/ContentFormater";

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
  const [otherInfoForm, setOtherInfoForm] = useState([]);

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
        const setInfoValue = _.cloneDeep(res.data.otherInformation);
        setOtherInfoForm(setInfoValue);
        setData(res.data);
      } else {
      }
    });
  }, [refresh]);

  const handleFileChange = (e, name, remove = false) => {

    if (remove) {
      let dataValue = data;
      dataValue.docs[name] = null;
      setData(dataValue);

      let imageList = { ...images };
      imageList = _.omit(imageList, name);
      setImages(imageList);

      return;
    }

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


  const imageSubmitData = () => {

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

    console.log("submitCallArray : ", submitCallArray);

    return submitCallArray;
  }

  const textSubmitData = (submitCallArray) => {

    const blankValues = otherInfoForm.filter((info) => info.value === "");
    if (blankValues.length === 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const submitData = {
            companyId, contactId, requestId,
            otherInformation: otherInfoForm
          }

          updateClientContact(submitData).then((res) => {
            if (res.success) {
              resolve(res);
            } else {
              reject(res.message);
            }
          }).catch((err) => {
            reject(err)
          });
        }, submitCallArray.length * 1000);
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }

  }

  const handleSubmit = async () => {
    setLoading(true);


    const blankValues = otherInfoForm.filter((info) => info.value === "");

    if (blankValues.length > 0) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      setLoading(false);
      return
    }

    const submitImageCallArray = imageSubmitData();

    console.log("submitImageCallArray : ", submitImageCallArray)

    const submitTextCallArray = textSubmitData(submitImageCallArray);

    console.log("submitTextCallArray : ", submitTextCallArray)

    const finalArray = [...submitImageCallArray, submitTextCallArray];

    console.log("finalArray : ", finalArray);

    Promise.all(finalArray)
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

  const showButton = (() => {
    const savedBlankValues = data?.otherInformation ? data?.otherInformation?.filter((info) => info.value === "") : [];
    const blankValues = otherInfoForm.filter((info) => info.value === "");
    if (!disable || (blankValues.length != savedBlankValues.length)) {
      return true;
    } else {
      return false;
    }
  })()

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
              <Row>
                <Col md={6} xs={12}>
                  <h6 className="fw-bold">
                    Envie as seguintes informações:
                  </h6>
                </Col>
              </Row>
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
                            value={formatarTelefone(data?.phone)}
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
                <Row>
                  {data?.otherInformation?.map((info, index) => (
                    <Col key={`${index}`} md={6} xs={12}>
                      <Form>
                        <Form.Label>{info.key}</Form.Label>
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
                            type="text"
                            className="Cardinput"
                            placeholder={info?.placeholder ? info?.placeholder : "Sua informação"}
                            onChange={(e) => {
                              setOtherInfoForm((prev) => {
                                let temp = [...prev];
                                temp[index].value = e.target.value;
                                return temp;
                              });
                            }}
                            disabled={info?.value ? true : false}
                            value={info?.value ? info?.value : otherInfoForm[index].value}
                          />
                        </InputGroup>
                      </Form>
                    </Col>
                  ))}

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
                  handleShowImageModal={() => { }}
                />
              </Row>

              <Col md={6} xs={12}>
                  <div className="d-flex">
                    {(
                      <Button
                        onClick={handleSubmit}
                        className="p-3 px-4 fw-bold border-0"
                        disabled={loading || !showButton}
                        style={{
                          marginTop: '10px',
                          opacity: showButton ? 1 : 0.5,
                          width: "fit-content",
                          background: "#0068ff",
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
                </Col>

            </>
          </Card>
        </Col>
      </div>
    </>
  );
};

export default DocumentVerification;
