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
import { getDocumentList } from "../../helper/API/document";
import {
  contactForm,
  generateLink,
  getAllDocumentsList,
} from "../../helper/API/contact";
import { LINK_URL } from "../../config";
import Loader from "../Loader";
import PermissionSwitchTable from "./documents/PermissionSwitchTable";
import { toast } from "react-toastify";

const NewClientAdd = ({
  show,
  handleClose,
  // switchesData,
  // editData,
  // editSwitchesData,
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

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // const link = `${LINK_URL}${editData.id}/${editData.documentRequest.id}`;

  // const [formData, setFormData] = useState({});

  // const handleCheck = (e) => {
  //   console.log("e.target.name", e.target.name);
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.checked,
  //   });
  // };

  // const setFormValuesData = async () => {
  //   if (editSwitchesData) {
  //     const editSwitchesDataCopy = {};
  //     Object.keys(editSwitchesData).map((key) => {
  //       if (editData.docs[key]) {
  //         if (editData.docs[key].approved) {
  //           editSwitchesDataCopy[key] = true;
  //         } else {
  //           editSwitchesDataCopy[key] = false;
  //         }
  //       } else {
  //         editSwitchesDataCopy[key] = false;
  //       }
  //       if (editSwitchesData[key] === true) {
  //         editSwitchesDataCopy[key] = true;
  //       }
  //     });
  //     setFormData(editSwitchesDataCopy);
  //   } else {
  //     const formDataVal = {};
  //     switchesData.map((obj) => {
  //       console.log(obj.label + " : " + editData.docs[obj.label]);
  //       if (editData.docs[obj.label]) {
  //         if (editData.docs[obj.label].approved) {
  //           formDataVal[obj.label] = true;
  //         } else {
  //           formDataVal[obj.label] = false;
  //         }
  //       } else {
  //         formDataVal[obj.label] = false;
  //       }
  //     });
  //     setFormData(formDataVal);
  //   }
  // };

  // useEffect(() => {
  //   console.log("formData", formData);
  // }, [formData]);

  // useEffect(() => {
  //   setFormValuesData();
  // }, []);

  const handleSubmitData = () => {
    setLoading(true);
    contactForm(formValues).then((res) => {
      //   console.log("first form", res);
      if (res.success) {
        toast.success(res.message);
        setLoading(false);
        handleClose();
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
        {/* <Row className="px-1 pt-3">
          <Col md={12}>
            <h6>Solicitar outros documentos</h6>
          </Col>
          {loading ? (
            <Loader />
          ) : (
            <PermissionSwitchTable
              handleCheck={handleCheck}
              formValues={formValues}
              editData={editData}
              switchesData={switchesData}
            />
          )}
        </Row> */}
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
