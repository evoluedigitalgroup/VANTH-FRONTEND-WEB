import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { generateCode, inviteUser } from "../../helper/API/auth";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

const AddUser = ({ open, handleClose }) => {


  const permissionList1 = [
    {
      text: 'Insights',
      label: 'insights',
      value: false
    },
    {
      text: 'Clientes',
      label: 'clients',
      value: false
    },
    {
      text: 'Nova conta',
      label: 'newUser',
      value: false
    }
  ]


  const permissionList2 = [
    {
      text: 'Documentos',
      label: 'document',
      value: false
    },
    {
      text: 'Permissões',
      label: 'permissions',
      value: false
    },
    {
      text: 'Contratos',
      label: 'contract',
      value: false
    },
  ]




  const [designation, setDesignation] = useState("");
  const [permissions, setPermissions] = useState([permissionList1, permissionList2]);
  const [code, setCode] = useState(null);

  useEffect(() => {
    generateCode().then((res) => {
      if (res.success) {
        setCode(res.data);
      }
    });
  }, []);

  const submitAdmin = () => {

    const permissionsData = {};

    permissions.flat().map((item) => {
      permissionsData[item.label] = item.value;
    });

    const submitData = {
      designation: designation,
      permissions: permissionsData,
      code,
    };
    inviteUser(submitData).then((res) => {
      if (res.success) {
        toast.success(res.message);
        copy(code);
        handleClose();
      } else {
        toast.error(res.message);
      }
    });
  };



  const PermissionRow = ({ permissionList, index }) => {

    const onChangeValue = (i) => {
      const newPermissions = [...permissions];
      newPermissions[index][i].value = !newPermissions[index][i].value;
      setPermissions(newPermissions);
    }

    return (
      <Table className="border-white table-fit text-wrap tbl-color-text text-center mb-0">
        <thead className="border-white small fw-normal">
          <tr className="text-start">
            {permissionList.map((item, i) => (
              <th key={i} style={{ color: "#B5B6B7" }}>{item.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="text-start">
            {
              permissionList.map((item, i) => (
                <td className="fw-bold small p-0">
                  {item.value ? (
                    <Button
                      onClick={() => onChangeValue(i)}
                      variant=" success"
                      className=" button-green  fw-bold text-success p-0  border-0 "
                    >
                      <small className="d-flex align-items-center">
                        <i className="bi bi-check fw-bold fs-5"></i>
                        Autorizar
                      </small>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => onChangeValue(i)}
                      variant="danger"
                      className=" fw-bold small text-danger button-red p-0"
                    >
                      <small className="d-flex align-items-center">
                        <i className="bi bi-x fw-bold fs-5"></i>
                        Remover
                      </small>
                    </Button>
                  )}
                </td>
              ))
            }

          </tr>
        </tbody>
      </Table>
    )

  };

  return (
    <>
      <Modal
        className="mt-5 zindex"
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="">
          <div className="d-flex justify-content-between">
            <h6 className="fw-bolder fs-5 my-3">Gerar novo usuário</h6>
            <Button
              onClick={handleClose}
              className="border-0 text-dark p-0 mx-4 fs-5 bg-white "
            >
              <img src="/assets/img/close.png"></img>
            </Button>
          </div>
          {/* <Row>
            <Col md={10} className="fw-bolder fs-5 my-3 ">
              Código para nova conta
            </Col>
            <Col md={2} className="">
              <Button
                onClick={handleClose}
                className="border-0 text-dark p-0 mx-4 fs-4 bg-white "
              >
                <img src="assets/img/close.png"></img>
              </Button>
            </Col>
          </Row> */}
          <Row className="px-1 py-0">
            <Col md={12} className="">
              <p className="fs-6 fw-bold">Qual o cargo da pessoa?</p>
              <InputGroup
                className="mb-3 border-0 rounded "
                style={{ backgroundColor: "#F4F6F8" }}
              >
                <InputGroup.Text className=" border-0 ">
                  <img src="/assets/img/briefcase.png " />
                </InputGroup.Text>
                <Form.Control
                  style={{ backgroundColor: "#F4F6F8" }}
                  className="border-0 shadow-none"
                  placeholder="Digite o cargo"
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={12} className="mb-3">
              <p className="fw-bold fs-6 mt-3 mb-0">Autorizações</p>
              {permissions.map((permissionList, index) => (
                <PermissionRow key={index} index={index} permissionList={permissionList} />
              ))}
            </Col>
            <Col md={12}>
              <p className="fw-bold fs-6">Código para criação de conta</p>
              <InputGroup className="mb-3">
                <Form.Control
                  className="p-2 border-0 fw-bold shadow-none"
                  style={{ backgroundColor: "#F4F6F8" }}
                  value={code}
                />
                {/* <InputGroup.Text
									className='border-0 small fw-bold'
									style={{
										backgroundColor: "#F4F6F8",
										cursor: "pointer",
										color: "#85A6A2",
									}}
									onClick={() => handleCopy(code)}>
									{copyText ? "Copiada" : "Copiar"}
								</InputGroup.Text> */}
              </InputGroup>
            </Col>
            {/* button */}
            <Col className="text-center my-3">
              <Button
                onClick={submitAdmin}
                className="fw-bolder fs-6 w-50 border-0"
                style={{ backgroundColor: "#0068FF" }}
              >
                {/* Gerar código */}
                Copiar
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddUser;
