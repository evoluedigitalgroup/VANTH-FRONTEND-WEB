import React, { useState } from "react";
import {
  Badge,
  Button,
  Col,
  Form,
  FormGroup,
  InputGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "react-bootstrap";

import { toast } from "react-toastify";
import {
  contactForm,
} from "../../pages/Clients/api";
import ReactInputMask from "react-input-mask";
import removeNonNumericChars from "../../utils/remove-non-numeric-chars";

const NewMemberAdd = ({ show, handleClose }) => {
  const [characterLimit] = useState(25);
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    CPF: "",
    CNPJ: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let valueFormatted = value;

    if (["phone", "CPF", "CNPJ"].includes(name)) {
      valueFormatted = removeNonNumericChars(value);
    }

    setFormValues({
      ...formValues,
      [name]: valueFormatted,
    });
  };

  const submitDocumentForm = () => {
    setLoading(true);
    contactForm(formValues).then((res) => {
      if (res.success) {
        toast.success(res.message);
        setLoading(false);
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    });
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="zindex"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader className="border-0 mx-3 mt-2 d-flex justify-content-end fw-bolder">
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ cursor: "pointer" }}
          onClick={handleClose}
        >
          <img src="/assets/img/close.png"></img>
        </Modal.Title>
      </ModalHeader>
      <ModalBody className="p-4 pt-0">
        <h5 className="fw-bolder">Criar novo cliente</h5>
        <Row className="mt-3">
          <Col md={6} xs={12}>
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
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
          <Col md={6} xs={12}>
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
                  placeholder="(00) 00000-0000"
                  type="text"
                  name="phone"
                  className="Cardinput border-0"
                  as={ReactInputMask}
                  mask="(99) 99999-9999"
                  onChange={handleChange}
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
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
                  as={ReactInputMask}
                  mask="999.999.999-99"
                  onChange={handleChange}
                />
              </InputGroup>
            </Form>
          </Col>
          <Col md={6} xs={12}>
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
                  as={ReactInputMask}
                  mask="99.999.999/9999-99"
                  onChange={handleChange}
                />
              </InputGroup>
            </Form>
          </Col>
          <Col md={12} xs={12}>
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
                  onChange={handleChange}
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button
            onClick={submitDocumentForm}
            className="mt-4 px-5 p-3 fw-bold border-0"
            disabled={loading}
            style={{
              width: "fit-content",
              background: "#1C3D59",
            }}
          >
            Criar cliente
            {loading && (
              <Spinner
                animation="grow"
                variant="light"
                className="ms-3 py-1 fw-bold fs-3"
              />
            )}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default NewMemberAdd;
