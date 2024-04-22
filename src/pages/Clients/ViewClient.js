import React from "react";
import {
    Col,
    Form,
    FormGroup,
    InputGroup,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
} from "react-bootstrap";
import ReactInputMask from "react-input-mask";

export default function NewClientAdd({ show, onHide, client }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            className="zindex"
            size="xl"
            centered
        >
            <ModalHeader
                className="border-0 mx-3 mt-3 mb-0 fw-bolder fs-6"
                closeButton
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    {client.name}
                </Modal.Title>
            </ModalHeader>
            <ModalBody className="p-4 pt-0">
                <Row className="mt-3">
                    <Col md={4} xs={12}>
                        <Form>
                            <Form.Label className="Doc-Font-Color">
                                Nome Completo ou Razão Social
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
                                        <i className="bi bi-person-fill link-icon"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Ana Júlia Garcia"
                                        type="text"
                                        name="name"
                                        className="Cardinput border-0  badge-relative"
                                        value={client.name}
                                        readOnly
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
                                    placeholder="(00) 00000-0000"
                                    type="text"
                                    name="phone"
                                    className="Cardinput border-0"
                                    as={ReactInputMask}
                                    mask="(99) 99999-9999"
                                    readOnly
                                    value={client.phone}
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
                                    as={ReactInputMask}
                                    mask="999.999.999-99"
                                    readOnly
                                    value={client.cpf}
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
                                    as={ReactInputMask}
                                    mask="99.999.999/9999-99"
                                    readOnly
                                    value={client.CNPJ}
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
                                    value={client.email}
                                    readOnly
                                />
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
};
