import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import copyToClipboard from "copy-text-to-clipboard";
import { LINK_URL } from "../../config";
import {
  addNewDocumentType,
  generateLink,
  generateNewLink,
} from "../Clients/api";
import Loader from "../../components/Loader";
import { profileAtom } from "../../recoil/Atoms";
import ModalCardRow from "../../components/Document/table/ModalCardRow";
import PermissionSwitchTable from "../../components/Document/table/PermissionSwitchTable";
import { sendClientSms } from "./api";
import { FaWhatsapp } from "react-icons/fa";
import { FaSms } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";

export default function GenerateLinkModel({
  open,
  handleClose,
  editData,
  refresh,
  setRefresh,
  switchesData,
  refreshDocumentTypes,
  editSwitchesData = null,
}) {
  const [link, setLink] = useState(null);
  const profile = useRecoilValue(profileAtom);

  const [permission, setPermission] = useState([]);
  const [loading, setLoading] = useState(false);

  const [otherInformation, setOtherInformation] = useState([]);
  const [otherInfo, setOtherInfo] = useState(undefined);

  const [clientFormValues, setClientFormValues] = useState({
    name: editData?.name,
    email: editData?.email,
    phone: editData?.phone,
    CPF: editData?.CPF,
    CNPJ: editData?.CPNJ,
  });

  useEffect(() => {
    setLoading(true);
    generateNewLink().then((res) => {
      if (res.success) {
        setLoading(false);
        setPermission(res.data);

        console.log("editData: ", editData);
      } else {
        setLoading(false);
      }
    });
  }, []);

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
    const linkValue = `${LINK_URL}${profile.company}/${editData.id}/${editData.documentRequest.id}`;
    setLink(linkValue);
    setFormValuesData();
  }, []);

  const handleCheck = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.checked,
    });
  };

  const submitForm = (e) => {
    return new Promise(() => {
      if (
        Object.keys(formValues).filter((key) => formValues[key] === true)
          .length === 0
      ) {
        toast.error("Selecione pelo menos um documento para enviar");
        return;
      }

      const submitData = {
        permission: {
          ...formValues,
        },
        contactId: editData.id,
        requestId: editData.documentRequest.id,
        generateLink: link,
      };

      generateLink(submitData).then(async (res) => {
        if (res.success) {
          try {
            copyToClipboard(link);

            setRefresh(refresh + 1);
            toast.success(res.message);
            handleClose();
            console.log("Link copiado com sucesso");
          } catch (err) {
            console.error("Erro ao copiar o link: ", err);
            toast.error(
              "Erro ao copiar o link. Por favor, copie manualmente." +
              err.message
            );
          }
        } else {
          toast.error(res.message);
        }
      });
    });
  };

  const onSubmitOtherInfo = async (newPermission) => {
    const permissionName = newPermission.key.trim();

    const keyname = permissionName.split(" ").join("_").toLowerCase();

    const newPermissionObj = {
      key: keyname,
      title: permissionName,
    };

    const newDocumentResult = await addNewDocumentType(newPermissionObj);

    if (newDocumentResult.success) {
      refreshDocumentTypes();
      toast.success(newDocumentResult.message);
    } else {
      toast.error(newDocumentResult.message);
    }
  };

  const onClickWhatsApp = async () => {
    await submitForm();
    window.open(`https://api.whatsapp.com/send?text=${link}`, "_blank");
  };

  const onClickSms = async () => {
    const phone = clientFormValues.phone;
    const type = "sms";

    const submitData = {
      phone,
      link,
      type,
    };

    const res = await sendClientSms(submitData);

    if (res.success) {
      toast.success(res.message);
    } else {
      console.log(res);
      toast.error("Error!");
    }
  };

  const onClickEmail = async () => {
    const email = clientFormValues.email;
    const type = "email";

    const submitData = {
      email,
      link,
      type,
    };

    const res = await sendClientSms(submitData);

    if (res.success) {
      toast.success(res.message);
    } else {
      console.log(res);
      toast.error("Error!");
    }
  };

  const AddNewPermission = () => {
    const [otherInfo, setOtherInfo] = useState(undefined);

    const onClickOtherInfo = () => {
      setOtherInfo(null);
    };

    return (
      <Col md={6}>
        {otherInfo === undefined ? (
          <>
            <button
              type="button"
              style={{ width: "100%", border: 0, background: "transparent" }}
              onClick={onClickOtherInfo}
            >
              <InputGroup.Text className="border-0 p-0">
                <i
                  className="bi bi-plus-circle fs-4"
                  style={{ color: "#0068FF" }}
                ></i>
                <h6
                  className="ms-4"
                  style={{ fontSize: "14px", fontWeight: 600 }}
                >
                  Adicionar mais
                </h6>
              </InputGroup.Text>
            </button>
          </>
        ) : null}
        {otherInfo === null || (otherInfo && !otherInfo.saved) ? (
          <>
            <div
              style={{
                width: "100%",
                border: 0,
                background: "#F4F6F8",
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
                    width: "100%",
                    background: "transparent",
                    border: 0,
                  }}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setOtherInfo({
                      key: e.target.value,
                      value: "",
                      saved: false,
                    });
                  }}
                  value={otherInfo?.key}
                  placeholder="Nome do Documento..."
                />
                <i
                  className="bi bi-check-lg fs-4"
                  style={{ color: "#0068FF" }}
                  onClick={() => {
                    onSubmitOtherInfo(otherInfo);
                  }}
                ></i>
              </InputGroup.Text>
            </div>
          </>
        ) : null}
      </Col>
    );
  };

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
        <Row id="requestOtherDocuments" className="px-4 pt-3">
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
                refreshDocumentTypes={refreshDocumentTypes}
              />
              <AddNewPermission />
            </>
          )}
        </Row>
        <div className="px-4" style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '20px',
        }}>
          <h6>Link para compartilhar com o cliente</h6>
          <InputGroup className="border-0 rounded ">
            <Form.Control className="border-0 p-3 fw-bold" value={link} readOnly />
          </InputGroup>
        </div>
        <div className="px-4" style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '20px',
        }}>
          <h6>Escolha o meio de envio:</h6>
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '.5rem',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: "1rem",
              marginBottom: '20px',
            }}>
              <button
                onClick={onClickWhatsApp}
                style={{
                  width: '45px',
                  height: '45px',
                  background: "#58A43D",
                  border: 0,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaWhatsapp style={{ color: 'white' }} />
              </button>
              <button
                onClick={onClickEmail}
                style={{
                  width: '45px',
                  height: '45px',
                  background: "#888888",
                  border: 0,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaRegEnvelope style={{ color: 'white' }} />
              </button>
              <button
                onClick={onClickSms}
                style={{
                  width: '45px',
                  height: '45px',
                  background: "white",
                  border: '1px solid #2196F3',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaSms style={{ color: '#2196F3' }} />
              </button>
            </div>
            <Button
              disabled={loading}
              className="px-5"
              style={{ background: "#1C3D59", border: "none" }}
              onClick={() => {
                submitForm();
                onClickSms();
              }}
            >
              Copiar link &nbsp;
              {loading && (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                  style={{
                    color: "#85A6A2",
                  }}
                ></div>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
