import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import { useRecoilState, useRecoilValue } from "recoil";
//  
import Packages from "./Packages";
import UpgradePlan from "./UpgradePlan";
import AfterAuth from "../../HOC/AfterAuth";
import { profileAtom } from "../../recoil/Atoms";
import { usageAtom } from "../../recoil/UsageAtoms/Usage";
import NewProgressbar from "../../components/NewProgressbar";
import { getPlanUsageData, plansListData } from "./api";

const MyPlan = () => {
  const [plansList, setPlansList] = useState(null);
  const [usage, setUsage] = useRecoilState(usageAtom);
  const profile = useRecoilValue(profileAtom);

  const getPlansData = () => {
    plansListData().then((res) => {
      setPlansList(res.data);
      console.log('res : ', res);
    })
  }

  const getPlanUsage = () => {
    getPlanUsageData().then((res) => {
      if (res.success) {
        setUsage(res.data)
      }
    }).catch((err) => {
      console.log('err : ', err);
    });
  }

  useEffect(() => {
    getPlansData();
    getPlanUsage();
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3, itemsToScroll: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const CustomLeftArrow = () => {
    return (
      <>
        <i className="bi bi-chevron-right"></i>
      </>
    );
  };

  const CustomRightArrow = () => {
    return (
      <div className="d-flex align-items-center">
        <i className="bi bi-chevron-right"></i>
      </div>
    );
  };

  const StorageBox = () => {
    return (
      <Col className="mt-2" xs={12} md={4}>
        <div style={{ width: "265px" }}>
          <NewProgressbar
            bgcolor="#0068FF"
            title="Armazenamento"
            progress={usage?.storage?.percent}
            title1="usados"
          />
          <span style={{ fontSize: "12px", color: "#97A7BA" }}>
            {new Intl.NumberFormat('pt-BR').format((usage?.storage?.existing / 1000))} {usage?.storage?.storageUnit} de {usage?.storage?.totalStorageAllowed} {usage?.storage?.storageUnit} usados
          </span>
        </div>
      </Col>
    )
  }

  const SignedContractsBox = () => {
    return (
      <Col xs={12} md={4} className="d-flex justify-content-md-center mt-2">
        <div style={{ width: "265px" }}>
          <NewProgressbar
            bgcolor="#0068FF"
            title="Contratos assinados"
            progress={usage?.digitalSignatures?.percent}
            title1=""
          />
          <span style={{ fontSize: "12px", color: "#97A7BA" }}>
            {usage?.digitalSignatures?.existing} de {usage?.digitalSignatures?.allowed} contratos
          </span>
        </div>
      </Col>
    )
  }

  const UsersBox = () => {
    return (
      <Col xs={12} md={4} className="d-flex justify-content-md-end mt-2">
        <div style={{ width: "265px" }}>
          <NewProgressbar
            bgcolor="#0068FF"
            title="Usuários do sistema"
            progress={usage?.totalUsers?.percent}
            title1=""
          />
          <span style={{ fontSize: "12px", color: "#97A7BA" }}>
            {usage?.totalUsers?.existing} de {usage?.totalUsers?.allowed} usuários
          </span>
        </div>
      </Col>
    )
  }

  const PackagesBox = () => {
    return (
      <div className="mt-5 mb-5 p-0">
        <h6>Pacotes adicionais</h6>
        <Row className="d-flex justify-content-center mt-3">
          <Carousel
            breakPoints={breakPoints}
            disableArrowsOnEnd={false}
            // renderArrow={myArrow}
            pagination={false}
          >
            <Packages />
            <Packages />
            <Packages />
            <Packages />
            <Packages />
          </Carousel>
        </Row>
      </div>
    )
  }

  const PlansBox = () => {
    return (
      <div className="mt-2 mb-3">
        <div className="d-flex gap-3">
          <h6>{profile?.companyData?.selectedPlan ? "Upgrade de plano" : "Plano de compra"}</h6>
          <a
            href="https://vanthdocs.com.br/planos"
            className="p-0 p-1"
            target="_blank"
            rel="noreferrer"
            style={{
              border: "1px solid #0068FF",
              background: "transparent",
              fontSize: "10px",
              color: "#0068FF",
              textDecoration: "none",
            }}
          >
            Ver site
          </a>
        </div>
        <Row className="justify-content-center mt-3">
          <Carousel
            className="d-md-none"
            breakPoints={breakPoints}
            disableArrowsOnEnd={false}
            pagination={false}
          >
            {
              plansList?.map((obj, index) => {
                return (
                  <UpgradePlan index={index} key={`${index}`} data={obj} isUpdate={!!profile?.companyData?.selectedPlan} />
                )
              })
            }
          </Carousel>
          {
            plansList?.map((obj, index) => {
              return (
                <Col key={`${index}`} md={4} className="d-md-flex d-none justify-content-center">
                  <UpgradePlan index={index} data={obj} isUpdate={!!profile?.companyData?.selectedPlan} />
                </Col>
              )
            })
          }
        </Row>
      </div>
    )
  }

  return (
    <AfterAuth>
      <div className="mx-3 mx-md-5 mt-3 d-flex align-items-center gap-4">
        {/* <img src="/assets/img/leftArrow.svg" /> */}
        <h3 className="pt-2">Meu plano</h3>
      </div>
      <Card className="my-3 mx-md-5 p-3 px-md-4 cardComponent">
        {
          profile?.companyData?.selectedPlan ? (
            <>
              <div className="fw-bold">Dash de uso</div>
              <Row>
                <StorageBox />
                <SignedContractsBox />
                <UsersBox />
              </Row>
            </>
          ) : null
        }
        {/* {
          profile?.companyData?.selectedPlan ? (
            <PackagesBox />
          ) : null
        } */}
        <PlansBox />
      </Card>
    </AfterAuth>
  );
};

export default MyPlan;