import React, { useEffect } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { profileData } from "../helper/API/Profile";
import { profileAtom } from "../recoil/Atoms";

const NavbarCom = () => {
  const [profileItem, setProfileItem] = useRecoilState(profileAtom);

  useEffect(() => {
    profileData().then((res) => {
      if (res.success) {
        setProfileItem(res.data);
      }
    });
  }, []);
  // console.log(profileItem);

  let pathName = window.location.pathname;

  return (
    <>
      <Navbar className="nav p-0">
        <Row className="w-100 p-0 m-0">
          <Col md={2} lg={2} sm={1} xs={3} className="bg-white">
            <Navbar.Brand
              href="#home"
              className="ps-0 d-md-flex align-items-center h-100 w-100 justify-content-center d-none"
            >
              <img
                // style={{ width: "300px" }}
                src="/assets/img/vancehDigital1.svg"
              ></img>
            </Navbar.Brand>
            <div className="ps-0 d-flex align-items-center h-100 justify-content-center d-md-none">
              <img
                src="/assets/img/menuList.svg"
                style={{ width: "32px" }}
              ></img>
            </div>
          </Col>
          <Col md={10} lg={10} sm={10} xs={9} className="py-1">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Navbar.Brand className="ps-0 d-md-none align-items-center justify-content-center">
                <img src="/assets/img/vancehDigital1.svg"></img>
              </Navbar.Brand>
              <Nav className="me-auto"></Nav>
              <Nav className="mx-md-1 mx-md-5 px-md-3">
                <NavLink style={{ textDecoration: "none" }} to={"/perfil"}>
                  <div
                    className={`${
                      pathName == "/perfil" && "Nav-after"
                    } text-white d-flex align-items-center`}
                  >
                    <span className="d-none d-md-flex me-2">
                      {profileItem?.name}
                    </span>
                    <i
                      class="bi bi-bell-fill d-flex d-md-none me-2"
                      style={{ color: "#6F767E", fontSize: 16 }}
                    ></i>
                    <NavLink to={"/perfil"}>
                      <img
                        className={`${pathName == "/perfil" && "Imgborder"}`}
                        src={
                          profileItem.profileImage
                            ? profileItem.profileImage
                            : "assets/img/noUser.png"
                        }
                        alt=""
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                          objectFit: "contain",
                        }}
                      />
                    </NavLink>
                  </div>
                </NavLink>
                {/* <div
                  style={{
                    border: "1px solid gray",
                    marginBlock: "20px",
                    marginInline: "10px",
                  }}
                ></div>
                <div style={{ marginTop: 20 }}>
                  <i class="bi bi-bell-fill text-white"></i>
                </div> */}
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Navbar>
    </>
  );
};

export default NavbarCom;
