import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDesignation, loginAdmin, registerAdmin } from "../helper/API/auth";
import LoginForm from "./Auth.js/LoginForm";
import RegisterForm from "./Auth.js/RegisterForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { jwtAtom, loginAtom } from "../recoil/Atoms";

const Login = () => {
  const [loginData, setLoginData] = useRecoilState(loginAtom);
  const [JWT, setJwt] = useRecoilState(jwtAtom);

  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [registerFormValues, setRegisterFormValues] = useState({
    code: "",
    designation: "",
    name: "",
    email: "",
    password: "",
  });
  // console.log('registerFormValues', registerFormValues)
  const Login = () => {
    setLogin(true);
    setAccount(false);
  };

  const Account = () => {
    setAccount(true);
    setLogin(false);
  };

  let navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      navigate("/Insights");
    }
  }, []);

  const hidePwd = () => {
    setHidePassword(!hidePassword);
  };

  const handleForm = (e) => {
    // console.log("handleForm", e.target.value);
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegisterForm = (e) => {
    // console.log("handleForm", e.target.value);
    setRegisterFormValues({
      ...registerFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const ProLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    loginAdmin(formValues).then((res) => {
      // console.log("res", res);
      if (res.success) {
        setLoading(false);
        localStorage.setItem("login", true);
        setLoginData(res.data);
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.jwtTokens.accessToken)
        );
        setJwt(res.data.jwtTokens.accessToken);
        navigate("/Insights");
        toast.success(res.message);
      } else {
        setLoading(false);
        toast.error(res.message);
      }
    });
  };
  const registerUser = (event) => {
    setLoading(true);
    event.preventDefault();
    if (!registerFormValues.code) {
      toast.error("Por favor insira o código");
      setLoading(false);
    } else if (!registerFormValues.designation) {
      toast.error("Insira a designação");
      setLoading(false);
    } else if (!registerFormValues.name) {
      toast.error("Por favor, insira o nome");
      setLoading(false);
    } else if (!registerFormValues.email) {
      toast.error("Por favor, insira o e-mail");
      setLoading(false);
    } else if (!registerFormValues.password) {
      toast.error("Por favor, digite a senha");
      setLoading(false);
    } else if (!confirmPassword) {
      toast.error("Por favor, digite a senha de confirmação");
      setLoading(false);
    } else if (registerFormValues.password !== confirmPassword) {
      toast.error("Senha não corresponde");
      setLoading(false);
    } else {
      registerAdmin(registerFormValues).then((res) => {
        // console.log("res", res);
        if (res.success) {
          setLoading(false);
          Login();
          toast.success(res.message);
          navigate("/login");
          setRegisterFormValues({
            ...registerFormValues,
            designation: "",
          });
        } else {
          setLoading(false);
          toast.error(res.message);
        }
      });
    }
  };

  const getDesignaition = () => {
    const submitData = { code: registerFormValues.code };

    getDesignation(submitData).then((res) => {
      // console.log("res", res);
      if (res.success) {
        setRegisterFormValues({
          ...registerFormValues,
          designation: res.data.designation,
        });
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <div className="Dashboard d-flex align-items-center ">
        <Row className="w-100 m-1 d-flex align-items-center justify-content-center">
          <Col
            md={4}
            sm={4}
            xs={12}
            className="d-flex mb-3 justify-content-start"
          >
            <div className="TBA-Logo d-flex align-items-center justify-content-center">
              <img src="/assets/img/vancehDigital.svg"></img>
            </div>
          </Col>
          <Col md={4} sm={4} xs={12} className="Login p-4">
            <Row>
              <Col md={3} sm={6} xs={4}>
                {login && (
                  <div className="login-enter fw-bold fs-4 actives">Entrar</div>
                )}
                {account && (
                  <div
                    className="login-enter fw-bold fs-4 inactive"
                    onClick={Login}
                  >
                    Entrar
                  </div>
                )}
              </Col>
              <Col md={9} sm={6} xs={6}>
                {login && (
                  <div
                    className="login-enter fw-bold fs-4 inactive"
                    onClick={Account}
                  >
                    Criar conta
                  </div>
                )}
                {account && (
                  <div className="login-enter fw-bold fs-4 actives">
                    Criar conta
                  </div>
                )}
              </Col>
            </Row>

            {login && (
              <LoginForm
                formValues={formValues}
                handleForm={handleForm}
                ProLogin={ProLogin}
                hidePassword={hidePassword}
                hidePwd={() => setHidePassword(!hidePassword)}
                loading={loading}
              />
            )}
            {account && (
              <RegisterForm
                handleRegisterForm={handleRegisterForm}
                registerUser={registerUser}
                hidePassword={hidePassword}
                hidePwd={() => setHidePassword(!hidePassword)}
                hideCnfrmPassword={hideConfirmPassword}
                hideCnfrmPwd={() =>
                  setHideConfirmPassword(!hideConfirmPassword)
                }
                registerFormValues={registerFormValues}
                setConfirmPassword={setConfirmPassword}
                confirmPassword={confirmPassword}
                loading={loading}
                getDesignaition={getDesignaition}
              />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
