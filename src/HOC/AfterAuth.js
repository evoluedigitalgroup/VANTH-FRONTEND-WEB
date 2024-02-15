import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavbarCom from "../components/NavbarCom";
import Sidebar from "../components/Sidebar";
import { getPlanUsageData } from "../pages/MyPlan/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { usageAtom } from "../recoil/UsageAtoms/Usage";
import { profileAtom } from "../recoil/Atoms";

const AfterAuth = ({ children }) => {
  const intervalRef = React.useRef();
  const [showSide, setShowSide] = useState(false);
  const [usage, setUsage] = useRecoilState(usageAtom);
  const profile = useRecoilValue(profileAtom);

  const getPlanUsage = () => {
    getPlanUsageData()
      .then((res) => {
        if (res.success) {
          setUsage(res.data);
        }
      })
      .catch((err) => {
        console.log("err : ", err);
      });
  };

  const fiveMinutes = 300000;

  const updatePlanUsage = () => {
    getPlanUsage();
    intervalRef.current = setInterval(() => {
      getPlanUsage();
    }, fiveMinutes);
  };

  useEffect(() => {
    if (profile?.companyData?.selectedPlan) {
      console.log("profile : ", profile);
      updatePlanUsage();
    }
  }, [profile?.companyData?.selectedPlan]);

  return (
    <div>
      <div
        style={{
          height: "7vh",
          position: "sticky",
          top: "0",
          zIndex: "5000",
        }}
      >
        <NavbarCom showSide={showSide} setShowSide={setShowSide} />
      </div>

      <div className="d-md-none p-0 m-0">
        {showSide ? (
          <>
            <div
              style={{
                width: "50%",
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "5001",
                height: "100vh",
              }}
            >
              <Sidebar
                showSide={showSide}
                setShowSide={() => {
                  setShowSide(false);
                }}
              />
            </div>
            <div
              style={{
                width: "50%",
                position: "fixed",
                top: "0",
                right: "0",
                zIndex: "5000",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
              }}
              onClick={() => setShowSide(false)}
            ></div>
          </>
        ) : null}
        <div>{children}</div>
      </div>

      <Row
        className="d-none d-md-flex afterAuthMainRow p-0 m-0"
        style={{ height: "93vh" }}
      >
        <Col
          md={2}
          id="sidebar-wrapper"
          className="px-0 afterAuthSidebar"
          style={{
            overflow: "hidden !important",
          }}
        >
          <Sidebar showSide={showSide} setShowSide={setShowSide} />
        </Col>
        <Col
          md={10}
          id="page-content-wrapper"
          className="pt-md-4 px-0 px-md-3 childrenHeight bgColor"
          style={{
            // backgroundColor: "#DCDFE5",
            overflowY: "scroll",
            overflowX: "hidden",
            // height: "100%",
          }}
        >
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default AfterAuth;
