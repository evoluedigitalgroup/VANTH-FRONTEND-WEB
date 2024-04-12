import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Helmet } from "react-helmet";
//
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { profileData } from "./Profile";
import {
  getDesignation,
  loginAdmin,
  registerAdmin,
} from "../../helper/API/auth";
import {
  afterAuthRedirect,
  jwtAtom,
  loginAtom,
  profileAtom,
  showTutorialAtom,
} from "../../recoil/Atoms";

const Login = () => {
  const [redirectAfterAuth, setRedirectAfterAuth] =
    useRecoilState(afterAuthRedirect);
  const [loginData, setLoginData] = useRecoilState(loginAtom);
  const [JWT, setJwt] = useRecoilState(jwtAtom);
  const [profileItem, setProfileItem] = useRecoilState(profileAtom);

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
    companyName: "",
    code: "",
    designation: "",
    name: "",
    email: "",
    password: "",
  });

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
    console.log("login 1");
    let login = localStorage.getItem("login");
    if (login) {
      localStorage.clear();
    }
  }, []);

  const hidePwd = () => {
    setHidePassword(!hidePassword);
  };

  const handleForm = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegisterForm = (e) => {
    setRegisterFormValues({
      ...registerFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const [startJoyRide, setStartJoyRide] = useRecoilState(showTutorialAtom);

  const ProLogin = (event) => {
    console.log("login ...");
    event.preventDefault();
    setLoading(true);
    loginAdmin(formValues).then(async (res) => {
      if (res.success) {
        setLoading(false);
        localStorage.setItem("login", true);
        setLoginData(res.data);
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.jwtTokens.accessToken)
        );
        setJwt(res.data.jwtTokens.accessToken);

        profileData().then((response) => {
          setProfileItem(response.data);
          toast.success(res.message);
        });
      } else {
        setLoading(false);
        toast.error(res.message);
      }
    });
  };

  const registerUser = (event, userType) => {
    setLoading(true);
    event.preventDefault();

    if (!registerFormValues.code && userType === "member") {
      toast.error("Por favor insira o código");
      setLoading(false);
    } else if (!registerFormValues.designation && userType === "member") {
      toast.error("Insira a designação");
      setLoading(false);
    } else if (!registerFormValues.companyName && userType === "company") {
      toast.error("Insira o nome da empresa");
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
        if (res.success) {
          setLoading(false);
          if (userType === "member") {
            setStartJoyRide({ run: true, index: 0 });
          }
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

  const [company, setCompany] = useState(true);
  const [member, setMember] = useState(false);

  const Company = () => {
    setCompany(true);
    setMember(false);
  };

  const Member = () => {
    setMember(true);
    setCompany(false);
  };

  useEffect(() => {
    console.log("login 2");
    if (profileItem?.name) {
      if (redirectAfterAuth) {
        console.log("login 3");
        const redirect = redirectAfterAuth;
        setRedirectAfterAuth(null);
        window.location.href = redirect;
      } else {
        console.log("login 4");
        window.location.href = "/insights";
        // navigate("/insights");
      }
    } else {
      console.log("login 4");
    }
  }, [profileItem]);

  return (
    <>
      <Helmet>
        <title>Vanth System | Entrar</title>
      </Helmet>
      <div className="Dashboard d-none d-md-flex align-items-center" style={{
        backgroundImage: login ? "url(/assets/backgrounds/login.png)" : "url(/assets/backgrounds/register.png)",
      }}>
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

      <div className="d-md-none d-block">
        <img
          src="/assets/img/vancehDigital.svg"
          style={{ height: "248px", width: "372px" }}
        />
        <div className="mx-3">
          {login ? (
            <>
              <h6
                className="actives"
                style={{ fontSize: 17, fontWeight: 900, width: "fit-content" }}
              >
                Acessar
              </h6>
              <h6 style={{ fontSize: 12, fontWeight: 600 }}>
                Digite seu e-mail e senha para entrar ou cadastre-se
              </h6>
              <LoginForm
                formValues={formValues}
                handleForm={handleForm}
                ProLogin={ProLogin}
                hidePassword={hidePassword}
                hidePwd={() => setHidePassword(!hidePassword)}
                loading={loading}
                login={Account}
              />
            </>
          ) : (
            <>
              <h6
                className="actives"
                style={{ fontSize: 17, fontWeight: 900, width: "fit-content" }}
              >
                Criar conta
              </h6>
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
                showLoginFrom={Login}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
