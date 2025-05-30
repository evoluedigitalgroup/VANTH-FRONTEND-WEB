import React, { useEffect, useState } from "react";
import AfterAuth from "../../HOC/AfterAuth";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useForm, Controller } from "react-hook-form";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
//  
import { getPlanUsageData, plansListData } from "../MyPlan/api";
import { createPlanSubscription } from "./api";
import { Helmet } from "react-helmet";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileAtom, showTutorialAtom } from "../../recoil/Atoms";
import { usageAtom } from "../../recoil/UsageAtoms/Usage";
import { profileData } from "../Login/Profile";
import removeNonNumericChars from "../../utils/remove-non-numeric-chars";
import ReactInputMask from "react-input-mask";

const PurchasePlan = () => {
  const [startJoyRide, setStartJoyRide] = useRecoilState(showTutorialAtom);
  const [profileItem, setProfileItem] = useRecoilState(profileAtom);
  const [usage, setUsage] = useRecoilState(usageAtom);
  const [planData, setPlanData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const [focusedField, setFocusField] = useState(null);
  const profile = useRecoilValue(profileAtom);

  useEffect(() => {
    if (params.purchaseType === "plan") {
      plansListData().then((res) => {
        const planValue = res.data.find((obj) => {
          return obj.id === params.purchaseId;
        });
        setPlanData(planValue);
      });
    }
  }, []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const redirectToInsights = () => {
    setTimeout(() => {
      if (!profile?.companyData?.selectedPlan) {
        setStartJoyRide({ ...startJoyRide, run: true });
      }
      window.location.href = "/insights";
    }, 2000);
  }

  const onSubmit = async (data) => {
    const customerData = {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: removeNonNumericChars(data.phoneNumber),
      cpf: removeNonNumericChars(data.cpf),
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      zipCode: data.zipCode,
      city: data.city,
      state: data.state.value,
    };

    const cardData = {
      cardNumber: data.cardNumber,
      nameOnCard: data.nameOnCard,
      cardMonth: data.cardMonth,
      cardYear: data.cardYear,
      cvc: data.cvc,
    };

    const submitData = {
      customerData,
      cardData,
      purchaseType: params.purchaseType,
      purchaseId: params.purchaseId,
    };

    const paymentRecord = await createPlanSubscription(submitData);

    if (paymentRecord.success) {


      profileData().then((res) => {
        if (res.success) {
          setProfileItem(res.data);

          getPlanUsageData()
            .then((res) => {
              if (res.success) {
                setUsage(res.data);

                try {
                  let tutorialState = JSON.parse(localStorage.getItem('recoil-persist')).login.permissions.tutorial;
                  tutorialState = true;

                  const localStorageData = JSON.parse(localStorage.getItem('recoil-persist'));
                  localStorageData.login.permissions.tutorial = tutorialState;
                  localStorage.setItem('recoil-persist', JSON.stringify(localStorageData));
                } catch (err) {
                  console.error('erro!', err)
                }

                toast.success("Plano comprado com sucesso");
                redirectToInsights();
              }
            })
            .catch((err) => {
              console.log("err : ", err);
            });

        }
      });
    } else {
      toast.error(paymentRecord.message);
    }
  };

  const stateOptions = [
    { label: "Acre", value: "AC" },
    { label: "Alagoas", value: "AL" },
    { label: "Amapá", value: "Ap" },
    { label: "Amazonas", value: "AM" },
    { label: "Bahia", value: "BA" },
    { label: "Ceará", value: "CE" },
    { label: "Distrito Federal", value: "DF" },
    { label: "Espírito Santo", value: "ES" },
    { label: "Goiás", value: "GO" },
    { label: "Maranhão", value: "Maranhão" },
    { label: "Mato Grosso", value: "MT" },
    { label: "Mato Grosso do Sul", value: "MS" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Pará", value: "PA" },
    { label: "Paraíba", value: "PB" },
    { label: "Paraná", value: "PR" },
    { label: "Pernambuco", value: "PE" },
    { label: "Piauí", value: "PI" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Rio Grande do Norte", value: "RN" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Rondônia", value: "RO" },
    { label: "Roraima", value: "RR" },
    { label: "Santa Catarina", value: "SC" },
    { label: "São Paulo", value: "SP" },
    { label: "Sergipe", value: "SE" },
    { label: "Tocantins", value: "TO" },
  ];

  return (
    <>
      <Helmet>
        <title>Vanth System | Meu plano</title>
      </Helmet>
      <AfterAuth>
        <div className="mx-3 mx-md-5 mt-3 d-flex  align-items-center gap-4">
          <Link to="/profile/my-plan">
            <img className="d-none d-md-block" src="/assets/img/leftArrow.svg" />
          </Link>
          <h3 className="pt-2">Meu plano</h3>
        </div>
        <Card className="my-3 mx-3 mx-md-5 p-3 px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-md-5 mx-md-5">
              <div className="d-flex align-items-center">
                <img
                  className="shoppingImage"
                  src="/assets/img/shopping.svg"
                ></img>
                <div className="fw-bold fs-5 mx-1 ">Insira os dados do seu cartão de pagamento:</div>
              </div>
              <Row>
                <Col sm={12} md={6}>
                  <div className="d-flex mt-md-5 mt-4">
                    <span className="d-flex align-items-center justify-content-center rounded-circle confirmYourPurchaseRound1And2">
                      1
                    </span>
                    <div className="d-flex align-items-center">
                      <span
                        className="mx-md-3 mx-2"
                        style={{
                          color: "#272B3080",
                          fontSize: "14px",
                        }}
                      >
                        DADOS PESSOAIS:
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 confirmYourPurchaseFrom">
                    <Form.Label
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: `${errors?.fullName?.message ? "#FF0000" : "black"
                          }`,
                      }}
                    >
                      NOME
                    </Form.Label>
                    <FormGroup>
                      <InputGroup
                        className={
                          errors?.fullName?.message ? "rounded" : "rounded mb-3"
                        }
                        style={{
                          border: `${errors?.fullName?.message ? "1px solid red" : ""
                            }`,
                        }}
                      >
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#F4F6F8",
                          }}
                        ></InputGroup.Text>
                        <Form.Control
                          {...register("fullName", {
                            required: "porfavor digite seu nome completo",
                          })}
                          placeholder="digite seu nome completo"
                          type="text"
                          className="border-0 Cardinput badge-relative"
                          style={{
                            fontSize: "14px",
                          }}
                          on
                        />
                      </InputGroup>
                      <div style={{ color: "#FF0000" }} className="mb-2">
                        {errors?.fullName?.message
                          ? errors?.fullName?.message
                          : ""}
                      </div>
                    </FormGroup>
                    <Form.Label
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: `${errors?.email?.message ? "#FF0000" : "black"}`,
                      }}
                    >
                      E-MAIL
                    </Form.Label>
                    <FormGroup>
                      <InputGroup
                        className={
                          errors?.email?.message ? "rounded" : "rounded mb-3"
                        }
                        style={{
                          border: `${errors?.email?.message ? "1px solid red" : ""
                            }`,
                        }}
                      >
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#F4F6F8",
                          }}
                        ></InputGroup.Text>
                        <Form.Control
                          {...register("email", {
                            required: "Por favor introduza o seu e-mail",
                          })}
                          placeholder="digite seu e-mail"
                          type="text"
                          className="border-0 Cardinput badge-relative"
                          style={{
                            fontSize: "14px",
                          }}
                        />
                      </InputGroup>
                      <div style={{ color: "#FF0000" }} className="mb-2">
                        {errors?.email?.message ? errors?.email?.message : ""}
                      </div>
                    </FormGroup>

                    <Form.Label
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: `${errors?.cpf?.message ? "#FF0000" : "black"}`,
                      }}
                    >
                      CPF/CNPJ
                    </Form.Label>
                    <FormGroup>
                      <InputGroup
                        className={
                          errors?.cpf?.message ? "rounded" : "rounded mb-3"
                        }
                        style={{
                          border: `${errors?.cpf?.message ? "1px solid red" : ""
                            }`,
                        }}
                      >
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#F4F6F8",
                          }}
                        ></InputGroup.Text>
                        <Form.Control
                          {...register("cpf", {
                            required: "Por favor insira seu cpf/cnpj",
                          })}
                          placeholder="CPF/CNPJ"
                          type="text"
                          className="border-0 Cardinput badge-relative"
                          style={{
                            fontSize: "14px",
                          }}
                        />
                      </InputGroup>
                      <div style={{ color: "#FF0000" }} className="mb-2">
                        {errors?.cpf?.message ? errors?.cpf?.message : ""}
                      </div>
                    </FormGroup>
                    <Form.Label
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: `${errors?.phoneNumber?.message ? "#FF0000" : "black"
                          }`,
                      }}
                    >
                      CELULAR
                    </Form.Label>
                    <FormGroup>
                      <InputGroup
                        className={
                          errors?.phoneNumber?.message
                            ? "rounded"
                            : "rounded mb-3"
                        }
                        style={{
                          border: `${errors?.phoneNumber?.message ? "1px solid red" : ""
                            }`,
                        }}
                      >
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#ECEFF3",
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <span style={{ fontSize: "14px", fontWeight: 900 }}>
                              +55
                            </span>
                            <i
                              className="bi bi-caret-down-fill ms-1 mt-1"
                              style={{ color: "#00000080" }}
                            ></i>
                          </div>
                        </InputGroup.Text>
                        <Form.Control
                          {...register("phoneNumber", {
                            required: "Por favor insira seu celular",
                          })}
                          placeholder="(00) 00000-0000"
                          type="text"
                          className="border-0 Cardinput badge-relative"
                          as={ReactInputMask}
                          mask="(99) 99999-9999"
                          style={{
                            fontSize: "14px",
                          }}
                        />
                      </InputGroup>
                      <div style={{ color: "#FF0000" }} className="mb-2">
                        {errors?.phoneNumber?.message
                          ? errors?.phoneNumber?.message
                          : ""}
                      </div>
                    </FormGroup>
                  </div>
                  <hr className="mt-md-5 mt-4" style={{ marginLeft: "30px" }} />

                  <>
                    <div className="d-flex mt-md-5 mt-2">
                      <span className="d-flex align-items-center justify-content-center rounded-circle confirmYourPurchaseRound1And2">
                        2
                      </span>
                      <div className="d-flex align-items-center">
                        <span
                          className="mx-md-3 mx-2"
                          style={{
                            color: "#272B3080",
                            fontSize: "14px",
                          }}
                        >
                          Detalhes do Endereço
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 confirmYourPurchaseFrom">
                      <Form.Label
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: `${errors?.addressLine1?.message ? "#FF0000" : "black"
                            }`,
                        }}
                      >
                        Endereço
                      </Form.Label>
                      <FormGroup>
                        <InputGroup
                          className={
                            errors?.addressLine1?.message
                              ? "rounded"
                              : "rounded mb-3"
                          }
                          style={{
                            border: `${errors?.addressLine1?.message ? "1px solid red" : ""
                              }`,
                          }}
                        >
                          <InputGroup.Text
                            id="basic-addon1"
                            className="border-0"
                            style={{
                              background: "#F4F6F8",
                            }}
                          ></InputGroup.Text>
                          <Form.Control
                            {...register("addressLine1", {
                              required: "Por favor, insira um endereço!",
                            })}
                            placeholder="Insira um Endereço"
                            type="text"
                            className="border-0 Cardinput badge-relative"
                            style={{
                              fontSize: "14px",
                            }}
                          />
                        </InputGroup>
                        <div style={{ color: "#FF0000" }} className="mb-2">
                          {errors?.addressLine1?.message
                            ? errors?.addressLine1?.message
                            : ""}
                        </div>
                      </FormGroup>

                      <Form.Label
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: `${errors?.addressLine2?.message ? "#FF0000" : "black"
                            }`,
                        }}
                      >
                        Complemento
                      </Form.Label>
                      <FormGroup>
                        <InputGroup
                          className={
                            errors?.addressLine2?.message
                              ? "rounded"
                              : "rounded mb-3"
                          }
                          style={{
                            border: `${errors?.addressLine2?.message ? "1px solid red" : ""
                              }`,
                          }}
                        >
                          <InputGroup.Text
                            id="basic-addon1"
                            className="border-0"
                            style={{
                              background: "#F4F6F8",
                            }}
                          ></InputGroup.Text>
                          <Form.Control
                            placeholder="Insira um complemento (opcional)"
                            type="text"
                            className="border-0 Cardinput badge-relative"
                            style={{
                              fontSize: "14px",
                            }}
                          />
                        </InputGroup>
                        <div style={{ color: "#FF0000" }} className="mb-2">
                          {errors?.addressLine2?.message
                            ? errors?.addressLine2?.message
                            : ""}
                        </div>
                      </FormGroup>

                      <Form.Label
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: `${errors?.zipCode?.message ? "#FF0000" : "black"
                            }`,
                        }}
                      >
                        CEP
                      </Form.Label>
                      <FormGroup>
                        <InputGroup
                          className={
                            errors?.zipCode?.message ? "rounded" : "rounded mb-3"
                          }
                          style={{
                            border: `${errors?.zipCode?.message ? "1px solid red" : ""
                              }`,
                          }}
                        >
                          <InputGroup.Text
                            id="basic-addon1"
                            className="border-0"
                            style={{
                              background: "#F4F6F8",
                            }}
                          ></InputGroup.Text>
                          <Form.Control
                            {...register("zipCode", {
                              required: "Por favor insira a linha de endereço 1",
                            })}
                            placeholder="Por favor insira o CEP"
                            type="text"
                            className="border-0 Cardinput badge-relative"
                            as={ReactInputMask}
                            mask="99999-999"
                            style={{
                              fontSize: "14px",
                            }}
                          />
                        </InputGroup>
                        <div style={{ color: "#FF0000" }} className="mb-2">
                          {errors?.zipCode?.message
                            ? errors?.zipCode?.message
                            : ""}
                        </div>
                      </FormGroup>

                      <Form.Label
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: `${errors?.city?.message ? "#FF0000" : "black"}`,
                        }}
                      >
                        Cidade
                      </Form.Label>
                      <FormGroup>
                        <InputGroup
                          className={
                            errors?.city?.message ? "rounded" : "rounded mb-3"
                          }
                          style={{
                            border: `${errors?.city?.message ? "1px solid red" : ""
                              }`,
                          }}
                        >
                          <InputGroup.Text
                            id="basic-addon1"
                            className="border-0"
                            style={{
                              background: "#F4F6F8",
                            }}
                          ></InputGroup.Text>
                          <Form.Control
                            {...register("city", {
                              required: "Por favor insira o nome da cidade",
                            })}
                            placeholder="Digite o nome da cidade"
                            type="text"
                            className="border-0 Cardinput badge-relative"
                            style={{
                              fontSize: "14px",
                            }}
                          />
                        </InputGroup>
                        <div style={{ color: "#FF0000" }} className="mb-2">
                          {errors?.city?.message ? errors?.city?.message : ""}
                        </div>
                      </FormGroup>

                      <Form.Label
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: `${errors?.state?.message ? "#FF0000" : "black"
                            }`,
                        }}
                      >
                        Estado
                      </Form.Label>

                      <Controller
                        name="state"
                        control={control}
                        rules={{
                          required: "Por favor insira o nome do estado",
                        }}
                        render={({ field }) => {
                          return (
                            <Select
                              {...field}
                              options={stateOptions}
                              menuPlacement="auto"
                            />
                          )
                        }}
                      />
                      <span style={{ color: "#FF0000" }} className="mb-3">
                        {errors?.state?.message ? errors?.state?.message : ""}
                      </span>
                    </div>
                  </>
                </Col>
                <Col sm={12} md={6}>
                  <div className="mt-md-5 mt-4 confirmYourPurchaseFrom">
                    <>
                      <div className="d-flex mt-md-5 mt-2">
                        <span className="d-flex align-items-center justify-content-center rounded-circle confirmYourPurchaseRound1And2">
                          3
                        </span>
                        <div className="d-flex align-items-center">
                          <span
                            className="mx-md-3 mx-2"
                            style={{
                              color: "#272B3080",
                              fontSize: "14px",
                            }}
                          >
                            DADOS DO PAGAMENTO
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 confirmYourPurchaseFrom">
                        <h6 style={{ fontSize: "14px", fontWeight: 700 }}>
                          PAGAR COM:
                        </h6>
                        <h6
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#272B3080",
                          }}
                        >
                          Escolha qual forma de pagamento você prefere usar.
                        </h6>
                        <div
                          className="d-flex position-relative"
                          style={{ width: "150px" }}
                        >
                          <img
                            style={{ position: "absolute", right: 3, top: 1 }}
                            src="/assets/img/right.svg"
                          />
                          <Button
                            className="mt-2 border-success"
                            style={{
                              fontSize: "12px",
                              background: "#FBFBFB",
                              color: "#272B3080",
                            }}
                          >
                            <i
                              className="bi bi-credit-card me-1"
                              style={{ color: "#58A43D" }}
                            ></i>
                            Cartão de credito
                          </Button>
                        </div>
                      </div>
                    </>
                    <h6
                      className="ms-md-4 pt-md-2"
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        marginTop: 30,
                        marginBottom: 20,
                      }}
                    >
                      DADOS DO CARTÃO
                    </h6>
                    <Cards
                      number={watch("cardNumber") ? `${watch("cardNumber")}` : ""}
                      expiry={
                        watch("cardMonth")?.length || watch("cardYear")?.length
                          ? `${watch("cardMonth")}/${watch("cardYear")}`
                          : ""
                      }
                      cvc={watch("cvc") ? `${watch("cvc")}` : ""}
                      name={watch("nameOnCard") ? `${watch("nameOnCard")}` : ""}
                      focused={focusedField ? focusedField : ""}
                    />

                    <div className="ms-md-2 mt-3">
                      <div className="mt-2">
                        <Form.Label
                          className="ms-md-2 mt-3"
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: `${errors?.cardNumber?.message ? "#FF0000" : ""
                              }`,
                          }}
                        >
                          NÚMERO DO CARTÃO
                        </Form.Label>
                        <FormGroup>
                          <InputGroup
                            className={
                              errors?.cardNumber?.message
                                ? "rounded"
                                : "rounded mb-3"
                            }
                            style={{
                              border: `${errors?.cardNumber?.message ? "1px solid red" : ""
                                }`,
                            }}
                          >
                            <InputGroup.Text
                              id="basic-addon1"
                              className="border-0"
                              style={{
                                background: "#ECEFF3",
                              }}
                            ></InputGroup.Text>
                            <Form.Control
                              {...register("cardNumber", {
                                required: "Por favor insira o número do cartão",
                              })}
                              onFocus={(e) => setFocusField("number")}
                              onBlur={() => setFocusField(null)}
                              placeholder="digite o somente números do cartão"
                              type="text"
                              className="border-0 Cardinput badge-relative"
                              as={ReactInputMask}
                              mask="9999 9999 9999 9999"
                              style={{
                                fontSize: "14px",
                              }}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div style={{ color: "#FF0000" }} className="mb-2">
                          {errors?.cardNumber?.message
                            ? errors?.cardNumber?.message
                            : ""}
                        </div>
                      </div>
                      <div className="mt-2">
                        <Form.Label
                          className="ms-md-2"
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: `${errors?.nameOnCard?.message ? "#FF0000" : ""
                              }`,
                          }}
                        >
                          NOME DO TITULAR
                        </Form.Label>
                        <FormGroup>
                          <InputGroup
                            className={
                              errors?.nameOnCard?.message
                                ? "rounded"
                                : "rounded mb-3"
                            }
                            style={{
                              border: `${errors?.nameOnCard?.message ? "1px solid red" : ""
                                }`,
                            }}
                          >
                            <InputGroup.Text
                              id="basic-addon1"
                              className="border-0"
                              style={{
                                background: "#ECEFF3",
                              }}
                            ></InputGroup.Text>
                            <Form.Control
                              {...register("nameOnCard", {
                                required: "Por favor insira o nome no cartão",
                              })}
                              onFocus={(e) => setFocusField("name")}
                              onBlur={() => setFocusField(null)}
                              placeholder="digite o nome completo impresso no cartão"
                              type="text"
                              className="border-0 Cardinput badge-relative pe-1"
                              style={{
                                fontSize: "14px",
                              }}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div style={{ color: "#FF0000" }} className="mb-2">
                          {errors?.nameOnCard?.message
                            ? errors?.nameOnCard?.message
                            : ""}
                        </div>
                      </div>
                      <Row>
                        <Col xs={6} md={6}>
                          <div className="mt-md-2">
                            <Form.Label
                              className="ms-md-2"
                              style={{
                                fontSize: "14px",
                                fontWeight: 700,
                                color: `${errors?.cardMonth?.message
                                  ? "#FF0000"
                                  : errors?.cardYear?.message
                                    ? "#FF0000"
                                    : ""
                                  }`,
                              }}
                            >
                              VALIDADE
                            </Form.Label>
                            <div className="d-flex gap-2">
                              <div style={{ width: "50%" }}>
                                <FormGroup>
                                  <InputGroup
                                    className={
                                      errors?.cardMonth?.message
                                        ? "rounded"
                                        : errors?.cardYear?.message
                                          ? "rounded"
                                          : errors?.cvc?.message
                                            ? "rounded"
                                            : "rounded mb-3"
                                    }
                                    style={{
                                      border: `${errors?.cardMonth?.message
                                        ? "1px solid #FF0000"
                                        : ""
                                        }`,
                                    }}
                                  >
                                    <Form.Control
                                      {...register("cardMonth", {
                                        required:
                                          "Por favor insira o mês de validade",
                                      })}
                                      onFocus={(e) => setFocusField("expiry")}
                                      onBlur={() => setFocusField(null)}
                                      placeholder="mês"
                                      type="text"
                                      className="border-0 Cardinput badge-relative"
                                      style={{
                                        width: "100%",
                                        fontSize: "14px",
                                        textAlign: "center",
                                      }}
                                    />
                                  </InputGroup>
                                </FormGroup>
                              </div>
                              <div style={{ width: "50%", gap: "20px" }}>
                                <FormGroup>
                                  <InputGroup
                                    className={
                                      errors?.cardMonth?.message
                                        ? "rounded"
                                        : errors?.cardYear?.message
                                          ? "rounded"
                                          : errors?.cvc?.message
                                            ? "rounded"
                                            : "rounded mb-3"
                                    }
                                    style={{
                                      border: `${errors?.cardYear?.message
                                        ? "1px solid #FF0000"
                                        : ""
                                        }`,
                                    }}
                                  >
                                    <Form.Control
                                      {...register("cardYear", {
                                        required:
                                          "Por favor insira o ano de validade",
                                      })}
                                      onFocus={(e) => setFocusField("expiry")}
                                      onBlur={() => setFocusField(null)}
                                      placeholder="ano"
                                      type="text"
                                      className="border-0 Cardinput badge-relative"
                                      style={{
                                        fontSize: "14px",
                                        textAlign: "center",
                                      }}
                                    />
                                  </InputGroup>
                                </FormGroup>
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col xs={6} md={6}>
                          <div className="mt-md-2">
                            <Form.Label
                              className="ms-md-2"
                              style={{
                                fontSize: "14px",
                                fontWeight: 700,
                                color: `${errors?.cvc?.message ? "#FF0000" : ""}`,
                              }}
                            >
                              CVC
                            </Form.Label>
                            <FormGroup>
                              <InputGroup
                                className={
                                  errors?.cardMonth?.message
                                    ? "rounded"
                                    : errors?.cardYear?.message
                                      ? "rounded"
                                      : errors?.cvc?.message
                                        ? "rounded"
                                        : "rounded mb-3"
                                }
                                style={{
                                  border: `${errors?.cvc?.message
                                    ? "1px solid #FF0000"
                                    : "1px solid #00000080"
                                    }`,
                                }}
                              >
                                <InputGroup.Text
                                  id="basic-addon1"
                                  style={{
                                    background: "#ECEFF3",
                                  }}
                                  className="border-0"
                                >
                                  <i
                                    className="bi bi-lock-fill ms-1 mt-1"
                                    style={{ color: "#00000080" }}
                                  ></i>
                                </InputGroup.Text>
                                <Form.Control
                                  {...register("cvc", {
                                    required: "Por favor insira o cvc",
                                  })}
                                  onFocus={(e) => setFocusField("cvc")}
                                  onBlur={() => setFocusField(null)}
                                  placeholder="digite o CVC do cartão"
                                  type="password"
                                  className="border-0 Cardinput badge-relative"
                                  style={{
                                    fontSize: "14px",
                                  }}
                                />
                              </InputGroup>
                            </FormGroup>
                          </div>
                        </Col>
                        <div style={{ color: "#FF0000" }} className="mb-2">
                          {errors?.cardMonth?.message
                            ? errors?.cardMonth?.message
                            : errors?.cardYear?.message
                              ? errors?.cardYear?.message
                              : errors?.cvc?.message
                                ? errors?.cvc?.message
                                : ""}
                        </div>
                      </Row>
                      <div className="mt-2">
                        <Form.Label
                          className="ms-md-2"
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                          }}
                        >
                          parcelamento do cartão
                        </Form.Label>
                        {planData ? (
                          <FormGroup>
                            <InputGroup className="mb-3 rounded">
                              <Form.Control
                                readOnly
                                placeholder={`${params.purchaseType === "plan" ? "1" : "1"
                                  } x de ${new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(planData.monthlyPlanPrice)}`}
                                type="text"
                                className="border-0 Cardinput badge-relative ps-3"
                                style={{
                                  fontSize: "14px",
                                }}
                              />
                              <InputGroup.Text
                                id="basic-addon1"
                                className="border-0"
                                style={{
                                  background: "#ECEFF3",
                                }}
                              >
                              </InputGroup.Text>
                            </InputGroup>
                          </FormGroup>
                        ) : null}
                      </div>
                    </div>
                    <hr style={{ marginTop: "30px" }} />
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="px-3 py-1 w-75"
                        style={{
                          background: "#0068FF",
                          color: "white",
                          border: "0",
                          borderRadius: "20px",
                          fontSize: "20px",
                          fontWeight: 700,
                        }}
                      >
                        Comprar agora
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </form>
        </Card>
      </AfterAuth>
    </>
  );
};

export default PurchasePlan;
