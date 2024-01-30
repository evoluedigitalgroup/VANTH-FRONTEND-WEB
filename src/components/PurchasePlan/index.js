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
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useForm } from "react-hook-form";
import { plansListData } from "../../helper/API/Plan";
import { useParams, Link } from "react-router-dom";
import { createPlanSubscription } from "../../helper/API/purchase";
import { toast } from "react-toastify";

const PurchasePlan = () => {
  const [planData, setPlanData] = useState(null);
  const params = useParams();
  const [focusedField, setFocusField] = useState(null);


  useEffect(() => {

    if (params.purchaseType === 'plan') {

      plansListData().then((res) => {
        const planValue = res.data.find((obj) => {
          return obj.id === params.purchaseId
        })
        setPlanData(planValue);
      })
    }
  }, []);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    const customerData = {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      cpf: data.cpf,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      zipCode: data.zipCode,
      city: data.city,
      state: data.state
    }

    const cardData = {
      cardNumber: data.cardNumber,
      nameOnCard: data.nameOnCard,
      cardMonth: data.cardMonth,
      cardYear: data.cardYear,
      cvc: data.cvc
    }

    const submitData = {
      customerData,
      cardData,
      purchaseType: params.purchaseType,
      purchaseId: params.purchaseId
    };

    const paymentRecord = await createPlanSubscription(submitData);

    if (paymentRecord.success) {
      toast.success('Plano comprado com sucesso');
    } else {
      toast.error('Algo deu errado');
    }

    console.log('data : ', data);
  };

  return (
    <AfterAuth>
      <div className="mx-3 mx-md-5 mt-3 d-flex  align-items-center gap-4">
        <Link to="/perfil/my-plan">
          <img className="d-none d-md-block" src="/assets/img/leftArrow.svg" />
        </Link>
        <h3 className="pt-2">Meu plano</h3>
      </div>
      <Card className="my-3 mx-3 mx-md-5 p-3 px-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-md-5 mx-md-5">
            <div className="d-flex align-items-center">
              <img className="shoppingImage" src="/assets/img/shopping.svg"></img>
              <div className="fw-bold fs-5 mx-1 ">Confirme sua compra:</div>
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

                  <Form.Label style={{ fontSize: "14px", fontWeight: 700 }}>
                    NOME
                  </Form.Label>
                  <FormGroup>
                    <InputGroup className="mb-3 rounded">
                      <InputGroup.Text
                        id="basic-addon1"
                        className="border-0"
                        style={{
                          background: "#F4F6F8",
                        }}
                      ></InputGroup.Text>
                      <Form.Control
                        {...register('fullName', {
                          required: "porfavor digite seu nome completo"
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
                    <span style={{ color: '#FF0000' }} className="mb-3">
                      {
                        errors?.fullName?.message
                          ? errors?.fullName?.message
                          : ''
                      }
                    </span>
                  </FormGroup>
                  <Form.Label style={{ fontSize: "14px", fontWeight: 700 }}>
                    E-MAIL
                  </Form.Label>
                  <FormGroup>
                    <InputGroup className="mb-3 rounded">
                      <InputGroup.Text
                        id="basic-addon1"
                        className="border-0"
                        style={{
                          background: "#F4F6F8",
                        }}
                      ></InputGroup.Text>
                      <Form.Control
                        {...register('email', {
                          required: "Por favor introduza o seu e-mail"
                        })}
                        placeholder="digite seu e-mail"
                        type="text"
                        className="border-0 Cardinput badge-relative"
                        style={{
                          fontSize: "14px",
                        }}
                      />
                    </InputGroup>
                    <span style={{ color: '#FF0000' }} className="mb-3">
                      {
                        errors?.email?.message
                          ? errors?.email?.message
                          : ''
                      }
                    </span>
                  </FormGroup>
                  <Form.Label style={{ fontSize: "14px", fontWeight: 700 }}>
                    CPF/CNPJ
                  </Form.Label>
                  <FormGroup>
                    <InputGroup className="mb-3 rounded">
                      <InputGroup.Text
                        id="basic-addon1"
                        className="border-0"
                        style={{
                          background: "#F4F6F8",
                        }}
                      ></InputGroup.Text>
                      <Form.Control
                        {...register('cpf', {
                          required: "Por favor insira seu cpf/cnpj"
                        })}
                        placeholder="CPF/CNPJ"
                        type="text"
                        className="border-0 Cardinput badge-relative"
                        style={{
                          fontSize: "14px",
                        }}
                      />
                    </InputGroup>
                    <span style={{ color: '#FF0000' }} className="mb-3">
                      {
                        errors?.cpf?.message
                          ? errors?.cpf?.message
                          : ''
                      }
                    </span>
                  </FormGroup>
                  <Form.Label style={{ fontSize: "14px", fontWeight: 700 }}>
                    CELULAR
                  </Form.Label>
                  <FormGroup>
                    <InputGroup className="mb-3 rounded">
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
                        {...register('phoneNumber', {
                          required: "Por favor insira seu celular"
                        })}
                        placeholder="00 00000-0000"
                        type="text"
                        className="border-0 Cardinput badge-relative"
                        style={{
                          fontSize: "14px",
                        }}
                      />
                    </InputGroup>
                    <span style={{ color: '#FF0000' }} className="mb-3">
                      {
                        errors?.phoneNumber?.message
                          ? errors?.phoneNumber?.message
                          : ''
                      }
                    </span>
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


                    <Form.Label style={{ fontSize: "14px", fontWeight: 700 }}>
                      Endereço Linha 1
                    </Form.Label>
                    <FormGroup>
                      <InputGroup className="mb-3 rounded">
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#F4F6F8",
                          }}
                        ></InputGroup.Text>
                        <Form.Control
                          {...register('addressLine1', {
                            required: "Por favor insira a linha de endereço 1"
                          })}
                          placeholder="Insira a linha de endereço 1"
                          type="text"
                          className="border-0 Cardinput badge-relative"
                          style={{
                            fontSize: "14px",
                          }}
                        />
                      </InputGroup>
                      <span style={{ color: '#FF0000' }} className="mb-3">
                        {
                          errors?.addressLine1?.message
                            ? errors?.addressLine1?.message
                            : ''
                        }
                      </span>
                    </FormGroup>


                    <Form.Label style={{ fontSize: "14px", fontWeight: 700 }}>
                      Endereço Linha 2
                    </Form.Label>
                    <FormGroup>
                      <InputGroup className="mb-3 rounded">
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#F4F6F8",
                          }}
                        ></InputGroup.Text>
                        <Form.Control
                          {...register('addressLine2', {
                            required: "Por favor insira a linha de endereço 2"
                          })}
                          placeholder="Insira a linha de endereço 2"
                          type="text"
                          className="border-0 Cardinput badge-relative"
                          style={{
                            fontSize: "14px",
                          }}
                        />
                      </InputGroup>
                      <span style={{ color: '#FF0000' }} className="mb-3">
                        {
                          errors?.addressLine2?.message
                            ? errors?.addressLine2?.message
                            : ''
                        }
                      </span>
                    </FormGroup>



                    <Form.Label style={{ fontSize: "14px", fontWeight: 700 }}>
                      CEP
                    </Form.Label>
                    <FormGroup>
                      <InputGroup className="mb-3 rounded">
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#F4F6F8",
                          }}
                        ></InputGroup.Text>
                        <Form.Control
                          {...register('zipCode', {
                            required: "Por favor insira a linha de endereço 1"
                          })}
                          placeholder="Por favor insira o CEP"
                          type="text"
                          className="border-0 Cardinput badge-relative"
                          style={{
                            fontSize: "14px",
                          }}
                        />
                      </InputGroup>
                      <span style={{ color: '#FF0000' }} className="mb-3">
                        {
                          errors?.zipCode?.message
                            ? errors?.zipCode?.message
                            : ''
                        }
                      </span>
                    </FormGroup>

                    <Form.Label style={{ fontSize: "14px", fontWeight: 700 }}>
                      Cidade
                    </Form.Label>
                    <FormGroup>
                      <InputGroup className="mb-3 rounded">
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#F4F6F8",
                          }}
                        ></InputGroup.Text>
                        <Form.Control
                          {...register('city', {
                            required: "Por favor insira o nome da cidade"
                          })}
                          placeholder="Digite o nome da cidade"
                          type="text"
                          className="border-0 Cardinput badge-relative"
                          style={{
                            fontSize: "14px",
                          }}
                        />
                      </InputGroup>
                      <span style={{ color: '#FF0000' }} className="mb-3">
                        {
                          errors?.city?.message
                            ? errors?.city?.message
                            : ''
                        }
                      </span>
                    </FormGroup>

                    <Form.Label style={{ fontSize: "14px", fontWeight: 700 }}>
                      Estado
                    </Form.Label>
                    <FormGroup>
                      <InputGroup className="mb-3 rounded">
                        <InputGroup.Text
                          id="basic-addon1"
                          className="border-0"
                          style={{
                            background: "#F4F6F8",
                          }}
                        ></InputGroup.Text>
                        <Form.Control
                          {...register('state', {
                            required: "Por favor insira o nome do estado"
                          })}
                          placeholder="Insira o nome do estado"
                          type="text"
                          className="border-0 Cardinput badge-relative"
                          style={{
                            fontSize: "14px",
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                    <span style={{ color: '#FF0000' }} className="mb-3">
                      {
                        errors?.state?.message
                          ? errors?.state?.message
                          : ''
                      }
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
                      marginBottom: 20
                    }}
                  >
                    DADOS DO CARTÃO
                  </h6>
                  <Cards
                    number={watch('cardNumber') ? `${watch('cardNumber')}` : ''}
                    expiry={
                      watch('cardMonth')?.length || watch('cardYear')?.length
                        ? `${watch('cardMonth')}/${watch('cardYear')}`
                        : ''}
                    cvc={watch('cvc') ? `${watch('cvc')}` : ''}
                    name={watch('nameOnCard') ? `${watch('nameOnCard')}` : ''}
                    focused={focusedField ? focusedField : ''}
                  />

                  <div className="ms-md-2 mt-3">
                    {/* <span
                      className="ms-md-2"
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      BANDEIRAS ACEITAS
                    </span>
                    <div
                      className="d-flex align-items-center justify-content-around mt-1 py-md-2"
                      style={{
                        border: "1px solid #00000080",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        className="debitCardSymbolImage"
                        src="/assets/img/visaCard.svg"
                      />
                      <img
                        className="debitCardSymbolImage"
                        src="/assets/img/masterCard.svg"
                      />
                      <img
                        className="debitCardSymbolImage"
                        src="/assets/img/hiperCard.svg"
                      />
                      <img
                        className="debitCardSymbolImage"
                        src="/assets/img/americanExpress.svg"
                      />
                      <img
                        className="debitCardSymbolImage"
                        src="/assets/img/diners.svg"
                      />
                      <img
                        className="debitCardSymbolImage"
                        src="/assets/img/eloCard.svg"
                      />
                    </div> */}
                    <div className="mt-2">
                      <Form.Label
                        className="ms-md-2 mt-3"
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        NÚMERO DO CARTÃO
                      </Form.Label>
                      <FormGroup>
                        <InputGroup className="mb-3 rounded">
                          <InputGroup.Text
                            id="basic-addon1"
                            className="border-0"
                            style={{
                              background: "#ECEFF3",
                            }}
                          ></InputGroup.Text>
                          <Form.Control
                            {...register('cardNumber', {
                              required: "Por favor insira o número do cartão"
                            })}
                            onFocus={(e) => setFocusField('number')}
                            onBlur={() => setFocusField(null)}
                            placeholder="digite o somente números do cartão"
                            type="text"
                            className="border-0 Cardinput badge-relative"
                            style={{
                              fontSize: "14px",
                            }}
                          />
                        </InputGroup>
                      </FormGroup>
                      <span style={{ color: '#FF0000' }} className="mb-3">
                        {
                          errors?.cardNumber?.message
                            ? errors?.cardNumber?.message
                            : ''
                        }
                      </span>
                    </div>
                    <div className="mt-2">
                      <Form.Label
                        className="ms-md-2"
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        NOME DO TITULAR
                      </Form.Label>
                      <FormGroup>
                        <InputGroup className="mb-3 rounded">
                          <InputGroup.Text
                            id="basic-addon1"
                            className="border-0"
                            style={{
                              background: "#ECEFF3",
                            }}
                          ></InputGroup.Text>
                          <Form.Control
                            {...register('nameOnCard', {
                              required: "Por favor insira o nome no cartão"
                            })}
                            onFocus={(e) => setFocusField('name')}
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
                      <span style={{ color: '#FF0000' }} className="mb-3">
                        {
                          errors?.nameOnCard?.message
                            ? errors?.nameOnCard?.message
                            : ''
                        }
                      </span>
                    </div>
                    <Row>
                      <Col xs={6} md={6}>
                        <div className="mt-md-2">
                          <Form.Label
                            className="ms-md-2"
                            style={{
                              fontSize: "14px",
                              fontWeight: 700,
                            }}
                          >
                            VALIDADE
                          </Form.Label>
                          <div className="d-flex gap-2">
                            <div style={{ width: "50%" }}>
                              <FormGroup>
                                <InputGroup className="mb-3 rounded">
                                  <Form.Control
                                    {...register('cardMonth', {
                                      required: "Por favor insira o mês de validade"
                                    })}
                                    onFocus={(e) => setFocusField('expiry')}
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
                                <InputGroup className="mb-3 rounded">
                                  <Form.Control
                                    {...register('cardYear', {
                                      required: "Por favor insira o ano de validade"
                                    })}
                                    onFocus={(e) => setFocusField('expiry')}
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
                            }}
                          >
                            CVC
                          </Form.Label>
                          <FormGroup>
                            <InputGroup
                              className="mb-3 rounded"
                              style={{ border: "1px solid #00000080" }}
                            >
                              <InputGroup.Text
                                id="basic-addon1"
                                style={{
                                  background: "#ECEFF3",
                                }}
                              >
                                <i
                                  className="bi bi-lock-fill ms-1 mt-1"
                                  style={{ color: "#00000080" }}
                                ></i>
                              </InputGroup.Text>
                              <Form.Control
                                {...register('cvc', {
                                  required: "Por favor insira o cvc"
                                })}
                                onFocus={(e) => setFocusField('cvc')}
                                onBlur={() => setFocusField(null)}
                                placeholder="digite o CVC do cartão"
                                type="password"
                                className="Cardinput badge-relative"
                                style={{
                                  fontSize: "14px",
                                }}
                              />
                            </InputGroup>
                          </FormGroup>
                        </div>
                      </Col>
                      <span style={{ color: '#FF0000' }} className="mb-3">
                        {
                          errors?.cardMonth?.message
                            ? errors?.cardMonth?.message
                            : errors?.cardYear?.message
                              ? errors?.cardYear?.message
                              : errors?.cvc?.message
                                ? errors?.cvc?.message
                                : ''
                        }
                      </span>
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
                      {
                        planData ? (
                          <FormGroup>
                            <InputGroup className="mb-3 rounded">
                              <Form.Control
                                readOnly
                                placeholder={`${params.purchaseType === 'plan' ? '1' : '1'} x de ${new Intl.NumberFormat('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
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
                                {/* <i
                              className="bi bi-caret-down-fill ms-1 mt-1"
                              style={{
                                color: "#00000080",
                              }}
                            ></i> */}
                              </InputGroup.Text>
                            </InputGroup>
                          </FormGroup>
                        ) : null
                      }
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
  );
};

export default PurchasePlan;
