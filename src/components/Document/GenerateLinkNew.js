import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, InputGroup, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { LINK_URL } from "../../config";
import {
  addNewDocumentType,
  generateLink,
  generateNewLink,
  getAllDocumentsList,
} from "../../helper/API/contact";
import copy from "copy-to-clipboard";
import ModalCardRow from "./documents/ModalCardRow";
import PermissionSwith from "./documents/PermissionSwitch";
import Loader from "../Loader";
import PermissionSwitchTable from "./documents/PermissionSwitchTable";

const GenerateLinkNew = ({
  open,
  handleClose,
  editData,
  refresh,
  setRefresh,
  switchesData,
  refreshDocumentTypes,
  editSwitchesData = null,
}) => {

  const [permission, setPermission] = useState([]);
  const [loading, setLoading] = useState(false);

  const [otherPermissions, setOtherPermissions] = useState([]);

  useEffect(() => {
    setLoading(true);
    generateNewLink().then((res) => {
      if (res.success) {
        setLoading(false);
        setPermission(res.data);
      } else {
        setLoading(false);
      }
    });
  }, []);

  const [copyText, setCopyText] = useState(false);
  const [formValues, setFormValues] = useState({});

  const setFormValuesData = async () => {
    if (editSwitchesData) {
      const editSwitchesDataCopy = {};

      Object.keys(editSwitchesData).map((key) => {
        if (editData.docs[key]) {
          if (editData.docs[key].approved) {
            editSwitchesDataCopy[key] = true;
          } else {
            editSwitchesDataCopy[key] = false;
          }
        } else {
          editSwitchesDataCopy[key] = false;
        }

        if (editSwitchesData[key] === true) {
          editSwitchesDataCopy[key] = true;
        }
      });
      setFormValues(editSwitchesDataCopy);
    } else {
      const formDataVal = {};
      switchesData.map((obj) => {
        if (editData.docs[obj.label]) {
          if (editData.docs[obj.label].approved) {
            formDataVal[obj.label] = true;
          } else {
            formDataVal[obj.label] = false;
          }
        } else {
          formDataVal[obj.label] = false;
        }
      });
      setFormValues(formDataVal);
    }
  };

  useEffect(() => {
    setFormValuesData();
  }, []);

  const link = `${LINK_URL}${editData.id}/${editData.documentRequest.id}`;

  const handleCheck = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.checked,
    });
  };

  const submitForm = (e) => {
    const submitData = {
      permission: {
        ...formValues,
      },
      contactId: editData.id,
      requestId: editData.documentRequest.id,
      generateLink: link,
    };

    generateLink(submitData).then((res) => {
      if (res.success) {
        setRefresh(refresh + 1);
        toast.success(res.message);
        copy(link);
        handleClose();
      } else {
        toast.error(res.message);
      }
    });
  };


  const onSubmitOtherInfo = async (newPermission) => {
    const permissionName = newPermission.key.trim();
    const permissionValue = false;

    const keyname = permissionName.split(' ').join('_').toLowerCase();

    const newPermissionObj = {
      key: keyname,
      title: permissionName,
    }

    const newDocumentResult = await addNewDocumentType(newPermissionObj);

    if (newDocumentResult.success) {
      refreshDocumentTypes();
      toast.success(newDocumentResult.message);
    } else {
      toast.error(newDocumentResult.message);
    }

  }

  const AddNewPermission = () => {

    const [otherInfo, setOtherInfo] = useState(undefined);


    const onClickOtherInfo = () => {
      setOtherInfo(null);
    }

    return (
      <Col md={6}>
        {
          otherInfo === undefined ? (
            <>
              <button type="button" style={{ width: '100%', border: 0, background: 'transparent' }} onClick={onClickOtherInfo}>
                <InputGroup.Text className="border-0 p-0">
                  <i
                    class="bi bi-plus-circle fs-4"
                    style={{ color: "#0068FF" }}
                  ></i>
                  <h6 className="ms-4" style={{ fontSize: "14px", fontWeight: 600 }}>
                    Adicionar mais
                  </h6>
                </InputGroup.Text>
              </button>
            </>
          ) : null
        }
        {
          otherInfo === null || (otherInfo && !otherInfo.saved) ? (
            <>
              <div
                style={{
                  width: '100%',
                  border: 0,
                  background: '#F4F6F8'
                }}
              >
                <InputGroup.Text className="border-0">
                  <i
                    class="bi bi-dash-circle fs-4"
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
                      console.log('e.target.value', e.target.value);
                      setOtherInfo({
                        key: e.target.value,
                        value: "",
                        saved: false
                      })
                    }}
                    value={otherInfo?.key}
                    placeholder="Nome do Documento..."
                  />
                  <i
                    class="bi bi-check-lg fs-4"
                    style={{ color: "#0068FF" }}
                    onClick={() => {
                      onSubmitOtherInfo(otherInfo)
                    }}
                  ></i>
                </InputGroup.Text>
              </div>
            </>
          ) : null
        }
      </Col>
    )
  }


  return (
    <div>
      <Modal
        className="zindex"
        show={open}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <ModalCardRow
          handleClose={handleClose}
          id="contained-modal-title-vcenter"
          editData={editData}
          switchesData={switchesData}
        />
        <Row className="px-4 pt-3">
          <Col md={12}>
            <h6>Solicitar outros documentos</h6>
          </Col>
          {loading ? (
            <Loader />
          ) : (
            <>
              <PermissionSwitchTable
                handleCheck={handleCheck}
                formValues={formValues}
                editData={editData}
                switchesData={switchesData}
              />
              <AddNewPermission />
            </>
          )}
        </Row>
        <Row className="px-4">
          <Col md={12} className="mt-3">
            <h6>Link para compartilhar com o cliente</h6>
          </Col>
          <Col md={6} className="p-2">
            <InputGroup className="border-0 rounded ">
              <Form.Control className="border-0 p-3 fw-bold" value={link} />
            </InputGroup>
          </Col>
          <Col md={6} className="my-3 text-md-end text-center">
            <Button
              disabled={loading}
              className="px-5"
              style={{ background: "#1C3D59", border: "none" }}
              onClick={submitForm}
            >
              {/* Encaminhar */}
              Copiar link &nbsp;
              {loading && (
                <div
                  className="spinner-border spinner-border-sm "
                  role="status"
                  style={{
                    color: "#85A6A2",
                  }}
                ></div>
              )}
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default GenerateLinkNew;
