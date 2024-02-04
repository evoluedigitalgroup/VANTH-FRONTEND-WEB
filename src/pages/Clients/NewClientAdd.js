import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "react-bootstrap";
import {
  contactForm,
} from "./api";
import { toast } from "react-toastify";

const NewClientAdd = ({
  show,
  handleClose,
  refresh,
  setRefresh
}) => {
  const [characterLimit] = useState(25);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    CPF: "",
    CNPJ: "",
  });

  const [otherInformation, setOtherInformation] = useState([]);
  const [otherInfo, setOtherInfo] = useState(undefined);


  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitData = () => {
    console.log('formValues : ', formValues);
    console.log('otherInformation : ', otherInformation);
    const submitData = {
      ...formValues,
      otherInformation
    }
    console.log('submitData : ', submitData);
    setLoading(true);
    contactForm(submitData).then((res) => {
      if (res.success) {
        setRefresh(refresh + 1);
        toast.success(res.message);
        setLoading(false);
        handleClose();
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    });
  };

  const onClickOtherInfo = (e) => {
    setOtherInfo(null);
  }

  const onSubmitOtherInfo = (e) => {
    if (otherInfo) {
      if (otherInfo.key) {
        setOtherInformation([
          ...otherInformation, otherInfo
        ]);
        setOtherInfo(undefined);
      } else {
        toast.error("Por favor insira o tipo de informação")
      }
    } else {
      toast.error("Por favor insira o tipo de informação")
    }
  }

  const onClickRemove = (index) => {
    setOtherInformation(otherInformation.filter((obj, i) => i !== index));
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="zindex"
      size="xl"
      centered
    >
      <ModalHeader
        className="border-0 mx-3 mt-3 mb-0 fw-bolder fs-6"
        closeButton
      >
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </ModalHeader>
      <ModalBody className="p-4 pt-0">
        <h5 className="fw-bolder">Criar novo cliente</h5>
        <Row className="mt-3">
          <Col md={4} xs={12}>
            <Form>
              <Form.Label className="Doc-Font-Color">
                Nome completo do cleinte
              </Form.Label>
              <FormGroup className="" style={{ position: "relative" }}>
                <Badge className="bg-f4f4f4 text-dark badge-absolute bg-white">
                  {formValues.name.length}/{characterLimit}
                </Badge>
                <InputGroup className="mb-3 rounded">
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
                    maxLength={25}
                    placeholder="Ana Júlia Garcia"
                    type="text"
                    name="name"
                    className="Cardinput border-0  badge-relative "
                    // value={data?.name}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
          <Col md={4} xs={12}>
            <Form>
              <Form.Label className="Doc-Font-Color">Telefone</Form.Label>
              <InputGroup className="mb-3 rounded">
                <InputGroup.Text
                  id="basic-addon1"
                  className="border-0"
                  style={{
                    background: "#F4F6F8",
                  }}
                >
                  <i className="bi bi-telephone link-icon"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="(00)00000-0000"
                  type="text"
                  name="phone"
                  className="Cardinput border-0"
                  // value={data?.email}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form>
          </Col>
          <Col md={4} xs={12}>
            <Form>
              <Form.Label className="Doc-Font-Color">CPF</Form.Label>
              <InputGroup className="mb-3 rounded">
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
                  name="CPF"
                  className="Cardinput border-0"
                  // value={data?.CpfOrCnpj}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md={4} xs={12}>
            <Form>
              <Form.Label className="Doc-Font-Color">CNPJ</Form.Label>
              <InputGroup className="mb-3 rounded">
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
                  name="CNPJ"
                  className="Cardinput border-0"
                  // value={data?.CpfOrCnpj}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form>
          </Col>
          <Col md={8} xs={12}>
            <Form>
              <Form.Label className="Doc-Font-Color">Email</Form.Label>
              <InputGroup className="mb-3 rounded">
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
                  placeholder="fulano@gmail.com"
                  type="text"
                  name="email"
                  className="Cardinput border-0"
                  // value={data?.CpfOrCnpj}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <h5 className="mt-4">Solicitar outras informações do cliente</h5>
        <Row>
          {otherInformation.map((obj, index) => (
            <Col key={`${index}`} md={4} xs={12}>
              <Form>
                <Form.Label className="Doc-Font-Color">
                  {obj.key}
                </Form.Label>
                <FormGroup className="" style={{ position: "relative" }}>
                  <InputGroup className="mb-3 rounded">
                    <InputGroup.Text
                      id="basic-addon1"
                      className="border-0"
                      style={{
                        background: "#F4F6F8",
                      }}
                    >
                      <i className="bi bi-info-circle-fill link-icon"></i>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Sua informação"
                      type="text"
                      value={obj.value}
                      name="name"
                      className="Cardinput border-0"
                      // value={data?.name}
                      onChange={handleChange}
                    />
                    <InputGroup.Text
                      id="basic-addon1"
                      className="border-0"
                      style={{
                        background: "#F4F6F8",
                      }}
                      onClick={() => {
                        onClickRemove(index)
                      }}
                    >
                      <i style={{ color: "#0068FF" }} className="bi bi-x-lg link-icon"></i>
                    </InputGroup.Text>
                  </InputGroup>
                </FormGroup>
              </Form>
            </Col>
          ))}
          <Col md={4} xs={12}>
            {
              otherInfo === undefined ? (
                <>
                  <Form.Label className="Doc-Font-Color">
                    &nbsp;&nbsp;
                  </Form.Label>
                  <button type="button" style={{ width: '100%', border: 0, background: '#F4F6F8' }} onClick={onClickOtherInfo}>
                    <InputGroup.Text className="border-0">
                      <i
                        className="bi bi-plus-circle fs-4"
                        style={{ color: "#0068FF" }}
                      ></i>
                      <h6 className="ms-4 mt-2" style={{ fontSize: "14px" }}>
                        Solicitar mais informações
                      </h6>
                    </InputGroup.Text>
                  </button>
                </>
              ) : null
            }
            {
              otherInfo === null || (otherInfo && !otherInfo.saved) ? (
                <>
                  <Form.Label className="Doc-Font-Color">
                    &nbsp;&nbsp;
                  </Form.Label>
                  <div
                    style={{
                      width: '100%',
                      border: 0,
                      background: '#F4F6F8'
                    }}
                  >
                    <InputGroup.Text className="border-0">
                      <i
                        className="bi bi-dash-circle fs-4"
                        style={{ color: "#0068FF" }}
                        onClick={() => setOtherInfo(undefined)}
                      ></i>
                      <input
                        className="ms-2"
                        style={{
                          fontSize: "14px",
                          width: '100%',
                          background: 'transparent',
                          border: 0
                        }}
                        onChange={(e) => {
                          setOtherInfo({
                            key: e.target.value,
                            value: otherInfo?.value,
                            saved: false
                          })
                        }}
                        placeholder="Digite o tipo de informação..."
                      />
                      <i
                        className="bi bi-check-lg fs-4"
                        style={{ color: "#0068FF" }}
                        onClick={() => {
                          setOtherInfo({
                            key: otherInfo?.key,
                            value: otherInfo?.value,
                            saved: true
                          })
                        }}
                      ></i>
                    </InputGroup.Text>
                  </div>
                </>
              ) : null
            }
            {
              otherInfo != null && (otherInfo && otherInfo.saved) ? (
                <Form>
                  <Form.Label className="Doc-Font-Color">
                    {otherInfo?.key}
                  </Form.Label>
                  <FormGroup className="" style={{ position: "relative" }}>
                    <InputGroup className="mb-3 rounded">
                      <InputGroup.Text
                        id="basic-addon1"
                        className="border-0"
                        style={{
                          background: "#F4F6F8",
                        }}
                      >
                        <i className="bi bi-info-circle-fill link-icon"></i>
                      </InputGroup.Text>
                      <Form.Control
                        maxLength={25}
                        placeholder="Sua informação"
                        type="text"
                        name="name"
                        className="Cardinput border-0"
                        // value={data?.name}
                        onChange={(e) => {
                          setOtherInfo({
                            ...otherInfo,
                            key: otherInfo.key,
                            value: e.target.value,
                          })
                        }}
                      />
                      <InputGroup.Text
                        id="basic-addon1"
                        className="border-0"
                        style={{
                          background: "#F4F6F8",
                        }}
                      >
                        <i onClick={onSubmitOtherInfo} style={{ color: "#0068FF" }} className="bi bi-check-lg link-icon"></i>
                      </InputGroup.Text>
                    </InputGroup>
                  </FormGroup>
                </Form>
              ) : null
            }
          </Col>
        </Row>
        <div className="d-flex mt-4 mt-md-0 justify-content-md-end justify-content-center">
          <Button
            onClick={handleSubmitData}
            className="border-0"
            style={{ background: "#0068FF" }}
          >
            <span>Criar cliente</span>
            {loading && (
              <Spinner
                animation="grow"
                variant="light"
                className="ms-3 fw-bold fs-5"
              />
            )}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default NewClientAdd;
