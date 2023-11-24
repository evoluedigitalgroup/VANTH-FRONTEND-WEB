import React from "react";
import {
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
} from "react-bootstrap";

const NewClientAdd = ({ show, handleClose }) => {
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
          <Col md={4}>
            <Form>
              <Form.Label className="Doc-Font-Color">
                Nome completo do cleinte
              </Form.Label>
              <FormGroup>
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
                    placeholder="Ana Júlia Garcia"
                    type="text"
                    className="border-0 Cardinput badge-relative"
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
          <Col md={4}>
            <Form>
              <Form.Label className="Doc-Font-Color">CPF/CNPJ</Form.Label>
              <FormGroup>
                <InputGroup className="mb-3 rounded">
                  <InputGroup.Text
                    className="border-0"
                    style={{ backgroundColor: "#F4F6F8" }}
                  >
                    <i className="bi bi-person-fill link-icon"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="000.000.000-00"
                    className="border-0 Cardinput badge-relative"
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
          <Col md={4}>
            <Form>
              <Form.Label className="Doc-Font-Color">Email/telefone</Form.Label>
              <FormGroup>
                <InputGroup className="mb-3 rounded">
                  <InputGroup.Text
                    className="border-0"
                    style={{ backgroundColor: "#F4F6F8" }}
                  >
                    <i className="bi bi-envelope-fill link-icon"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="anajuliamarques@tba.com"
                    type="emailOrPhone"
                    className="border-0 Cardinput badge-relative"
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <h5 className="mt-4">Solicitar outras informações do cliente</h5>
        <Row>
          <Col md={4}>
            <Form>
              <InputGroup className="rounded">
                <InputGroup.Text className="border-0">
                  <i
                    class="bi bi-plus-circle fs-4"
                    style={{ color: "#0068FF" }}
                  ></i>
                  <h6 className="ms-4 mt-2" style={{ fontSize: "14px" }}>
                    Solicitar mais informações
                  </h6>
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <h6 className="mt-5 fw-bolder">Solicitar outros documentos</h6>
        <Row className="px-1">
          <Col md={6}>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <Form.Check
                  className="chack-item input-check fs-5 border-0"
                  type="switch"
                  id="custom-switch"
                  checked
                  name="CPF"
                />
                <label>CNPJ</label>
              </Form>
            </Col>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <Form.Check
                  className="chack-item input-check fs-5 border-0"
                  type="switch"
                  id="custom-switch"
                  checked
                  name="CNPJ"
                />
                <label>Contrato social</label>
              </Form>
            </Col>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <Form.Check
                  className="fs-5 border-0 input-check"
                  type="switch"
                  id="custom-switch"
                  name="socialContract"
                  checked
                  // onChange={handleCheck}
                  // defaultChecked={formValues.socialContract}
                />
                <label>
                  Balancete 2021, 2022 (assinado contador e cliente)
                </label>
              </Form>
            </Col>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <Form.Check
                  className="fs-5 border-0 input-check"
                  type="switch"
                  id="custom-switch"
                  name="proofOfAddress"
                />
                <label>
                  Faturamento 2020,2021 e 2022 (assinado contador e cliente)
                </label>
              </Form>
            </Col>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <Form.Check
                  className="fs-5 border-0 input-check"
                  type="switch"
                  checked
                  id="custom-switch"
                  name="proofOfAddress"
                />
                <label>Endividamento bancário atualizado</label>
              </Form>
            </Col>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <Form.Check
                  className="fs-5 border-0 input-check"
                  type="switch"
                  id="custom-switch"
                  name="proofOfAddress"
                />
                <label style={{ color: "#B5B6B7" }}>
                  Digite o documento que deseja solicitar...
                </label>
              </Form>
            </Col>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <Form.Check
                  className="fs-5 border-0 input-check"
                  type="switch"
                  id="custom-switch"
                  name="proofOfAddress"
                />
                <label style={{ color: "#B5B6B7" }}>
                  Digite o documento que deseja solicitar...
                </label>
              </Form>
            </Col>
          </Col>
          <Col md={6}>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <Form.Check
                  className="chack-item input-check fs-5 border-0"
                  type="switch"
                  id="custom-switch"
                  checked
                  name="CPF"
                />
                <label>CPF dos sócios</label>
              </Form>
            </Col>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <Form.Check
                  className="chack-item input-check fs-5 border-0"
                  type="switch"
                  id="custom-switch"
                  checked
                  name="CNPJ"
                />
                <label>
                  Balanço / DRE 2021, 2022( assinado contador e cliente)
                </label>
              </Form>
            </Col>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <Form.Check
                  className="fs-5 border-0 input-check"
                  type="switch"
                  id="custom-switch"
                  name="socialContract"
                  // onChange={handleCheck}
                  // defaultChecked={formValues.socialContract}
                />
                <label style={{ color: "#B5B6B7" }}>
                  Digite o documento que deseja solicitar...
                </label>
              </Form>
            </Col>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <Form.Check
                  className="fs-5 border-0 input-check"
                  type="switch"
                  id="custom-switch"
                  checked
                  name="proofOfAddress"
                />
                <label>Documentos sócios (CNH ou RG)</label>
              </Form>
            </Col>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <Form.Check
                  className="fs-5 border-0 input-check"
                  type="switch"
                  id="custom-switch"
                  name="proofOfAddress"
                />
                <label style={{ color: "#B5B6B7" }}>
                  Digite o documento que deseja solicitar...
                </label>
              </Form>
            </Col>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <Form.Check
                  className="fs-5 border-0 input-check"
                  type="switch"
                  id="custom-switch"
                  name="proofOfAddress"
                />
                <label style={{ color: "#B5B6B7" }}>
                  Extrato dos últimos 30 dias do banco que mais movimenta
                </label>
              </Form>
            </Col>
            <Col className="mt-2 ">
              <Form className="d-flex align-items-center">
                <i
                  class="bi bi-plus-circle fs-4"
                  style={{ color: "#0068FF" }}
                ></i>
                <label className="ms-3" style={{ fontSize: "14px" }}>
                  Adicionar mais
                </label>
              </Form>
            </Col>
          </Col>
        </Row>
        <h6 className="mt-4 px-1">Link para compartilhar com o cliente</h6>
        <div className="d-flex justify-content-between">
          <div style={{ width: "35%" }}>
            <InputGroup className="border-0 rounded ">
              <Form.Control className="border-0 p-2 fw-bold" />
              {/* <InputGroup.Text
                id="basic-addon2"
                className="border-0 c-point fw-normal"
                style={{ color: "#85A6A2" }}
              >
              </InputGroup.Text> */}
            </InputGroup>
          </div>
          <div>
            <Button className="border-0 me-3" style={{ background: "#0068FF" }}>
              Copiar link
            </Button>
            <Button className="border-0" style={{ background: "#0068FF" }}>
              Criar cliente
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default NewClientAdd;
