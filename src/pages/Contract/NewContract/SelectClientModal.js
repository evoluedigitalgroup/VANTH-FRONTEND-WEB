import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  FormGroup,
  InputGroup,
} from "react-bootstrap";
import Select from "react-select";
import { useRecoilState } from "recoil";
//
import Loader from "../../../components/Loader";
import { getContactList } from "../../Clients/api";
import { contractSelectedUser, contractSelectedUsers, contractModels, contractSelectedInvitors } from "../../../recoil/Atoms";
import {
  openSelectTemplate,
  resetModels,
} from "../../../recoil/helpers/contractModels";
import { toast } from "react-toastify";

const SelectClientModal = ({ show, onHide }) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
  ];

  const [selectedOption, setSelectedOption] =
    useRecoilState(contractSelectedUser);
  const [models, setModals] = useRecoilState(contractModels);
  const [contactsData, setContactsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectionList, setSelectionList] = useRecoilState(contractSelectedUsers)
  const [invitors, setInvitors] = useRecoilState(contractSelectedInvitors)

  const handleShowTamplateModal = () => {
    if (selectionList.length != 0) {
      setModals(resetModels());
      setModals(openSelectTemplate());
    } else {
      toast.error('Você precisa selecionar pelo menos um cliente!')
    }
  };

  useEffect(() => {
    setLoading(true);
    getContactList(1, "", "all", 9999999).then((res) => {
      if (res.success) {
        let optionsData = res.data.findData.map((item) => {
          return {
            value: item.id,
            uuid: item.uuid,
            label: item.name,
            phoneNumber: item.phone,
          };
        });
        setContactsData(optionsData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  const formatPhoneNumber = (number) => {
    if (number != undefined && number != null) {
      const clearNumber = number.replace(/\D/g, '')
      return clearNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
    } else {
      return number
    }
  }

  const handleSelectChange = (option) => {
    if (!option) {
      return;
    }

    setSelectedOption(option);
    if (!selectionList.some(item => item.label === option.label)) {
      setSelectionList([...selectionList, option]);
    }
  }

  const [invitor, setInvitor] = useState({
    name: "",
    email: "",
  });

  const handleAddInvitor = (invitor) => {
    if (invitor.name === "" || invitor.email === "") {
      return;
    }
    setInvitor({ name: "", email: "" });
    setInvitors([...invitors, invitor]);
  };


  const formatOptionLabel = ({ label, phoneNumber }) => (
    <div className="d-flex justify-content-between mx-md-4">
      <div>
        <i className="bi bi-person-fill px-1" style={{ color: "#BAC4C8" }}></i>
        {label}
      </div>
      <div>
        <i
          className="bi bi-telephone-fill px-1"
          style={{ color: "#BAC4C8" }}
        ></i>
        {formatPhoneNumber(phoneNumber)}
      </div>
    </div>
  );

  return (
    <>
      <Modal size="lg" show={show} onHide={onHide} centered className="zindex">
        <div
          className=""
          style={{ height: "540px", position: "relative", padding: "30px" }}
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="d-flex justify-content-between">
                <h5 id="link" className="fw-bold mt-1">
                  Link para solicitar assinatura de contrato
                </h5>
                <Button
                  onClick={onHide}
                  className="bg-white border-0 text-dark"
                >
                  <img src="/assets/img/close.png"></img>
                </Button>
              </div>
              <h5 style={{
                fontSize: "20px",
                fontWeight: "400",
                marginTop: "20px",
              }}>Adicionar novo assinante</h5>
              <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "1rem" }}>
                <Form style={{ width: "100%" }}>
                  <Form.Label className="Doc-Font-Color">
                    Nome
                  </Form.Label>
                  <FormGroup className="" style={{ position: "relative" }}>
                    <InputGroup className="mb-3 rounded">
                      <Form.Control
                        placeholder="Ana Júlia Garcia"
                        type="text"
                        name="name"
                        className="Cardinput border-0  badge-relative"
                        value={invitor.name}
                        onChange={(e) =>
                          setInvitor({ ...invitor, name: e.target.value })
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
                <Form style={{ width: "100%" }}>
                  <Form.Label className="Doc-Font-Color">
                    Email
                  </Form.Label>
                  <FormGroup className="" style={{ position: "relative" }}>
                    <InputGroup className="mb-3 rounded">
                      <Form.Control
                        placeholder="ana@email.com"
                        type="e-mail"
                        name="email"
                        className="Cardinput border-0  badge-relative"
                        value={invitor.email}
                        onChange={(e) =>
                          setInvitor({ ...invitor, email: e.target.value })
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
                <Button onClick={() => handleAddInvitor(invitor)}>
                  Adicionar
                </Button>
              </div>
              <h5 style={{
                fontSize: "20px",
                fontWeight: "400",
                marginTop: "20px",
              }}>Adicionar cliente como assinante</h5>
              <div
                id="selectUserNameAndTelephone"
                className="mt-3 selctedUserNameAndTelephoneLabel"
              >
                <Select
                  defaultValue={selectedOption}
                  formatOptionLabel={formatOptionLabel}
                  onChange={handleSelectChange}
                  options={contactsData}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      backgroundColor: "white",
                      border: "1px solid #BAC4C8",
                      borderRadius: "6px",
                      height: "50px",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }),
                    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                      return {
                        ...styles,
                        backgroundColor: isDisabled
                          ? null
                          : isSelected
                            ? "#0068FF"
                            : isFocused
                              ? "#0068FF"
                              : null,
                        color: isDisabled
                          ? "#ccc"
                          : isSelected
                            ? "white"
                            : isFocused
                              ? "white"
                              : "black",
                        cursor: isDisabled ? "not-allowed" : "default",
                        ":active": {
                          ...styles[":active"],
                          backgroundColor: !isDisabled && (isSelected ? "#0053cc" : "#dcdcdc"),
                        },
                      };
                    },
                  }}
                />
              </div>
              <div>

                <div className="my-4">
                  {Boolean(selectionList.length) && (
                    <>
                      <h6 className="font-bold">Clientes Selecionados</h6>
                      {selectionList.map((item, index) => {
                        return (
                          <div key={index} className="d-flex align-items-center align-center gap-4">
                            <div className="d-flex align-items-center">
                              <i className="bi bi-person-fill px-1" style={{ color: "#BAC4C8" }}></i>
                              {item.label} <i> - </i>  {formatPhoneNumber(item.phoneNumber)}
                            </div>
                            <h6 style={{ color: 'blue', cursor: 'pointer' }} className="m-0" onClick={() => { setSelectionList(selectionList.filter((k) => k.label !== item.label)) }}>X</h6>
                          </div>
                        )
                      })}
                    </>
                  )}
                  {Boolean(invitors.length) && (
                    <>
                      <h6 className="font-bold">Assinantes Adicionados</h6>
                      {invitors.map((item, index) => {
                        return (
                          <div key={index} className="d-flex align-items-center align-center gap-4">
                            <div className="d-flex align-items-center">
                              <i className="bi bi-person-fill px-1" style={{ color: "#BAC4C8" }}></i>
                              {` ${item.name} - ${item.email} `}
                            </div>
                            <h6 style={{ color: 'blue', cursor: 'pointer' }} className="m-0" onClick={() => { setInvitors(invitors.filter((k) => k.name !== item.name)) }}>X</h6>
                          </div>
                        )
                      })}
                    </>
                  )}
                </div>

              </div>
              <div>
                <button
                  onClick={handleShowTamplateModal}
                  disabled={selectedOption == null}
                  cLink
                  para
                  solicitar
                  assinatura
                  de
                  contratolassName="py-2 px-6"
                  style={{
                    background: "#0068FF",
                    border: "0",
                    width: "200px",
                    borderRadius: "6px",
                    color: "white",
                    fontWeight: 700,
                    position: "absolute",
                    bottom: "30px",
                    right: "30px",
                    opacity: selectedOption == null ? 0.5 : 1,
                  }}
                >
                  Próximo
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SelectClientModal;
