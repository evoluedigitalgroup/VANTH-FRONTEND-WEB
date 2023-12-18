import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import { profileAtom } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
import ProfileTable from "./ProfileTable";
import { profileHistory } from "../../helper/API/Profile";
import Loader from "../Loader";
import TableNavbar from "../TableNavbar";
import NewProgressbar from "../NewProgressbar";

const ProfileCard = ({
  showProfilePicture,
  showChangePassword,
  showAddAdmin,
  permissions,
}) => {
  const profile = useRecoilValue(profileAtom);
  const [search, setSearch] = useState();
  const [refresh, setRefresh] = useState(0);
  const [tableRow, setTableRow] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const submitData = {
      search,
    };
    profileHistory(submitData).then((res) => {
      if (res.success) {
        setLoading(false);
        setTableRow(res.data);
      } else {
        setTableRow([]);
        setLoading(false);
      }
    });
  }, [refresh]);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      const submitData = {
        search,
      };
      profileHistory(submitData).then((res) => {
        if (res.success) {
          setLoading(false);
          setTableRow(res.data);
        } else {
          setTableRow([]);
          setLoading(false);
        }
      });
    }
  };

  return (
    <div>
      <Card className="my-md-3 mx-md-5 p-3 px-4 cardComponent">
        <Row>
          <Col md={6}>
            <Row>
              {/* image */}
              <Col xs={12} sm={12} md={12} lg={5} className="mt-md-3">
                <div>
                  <img
                    src={
                      profile?.profileImage
                        ? profile?.profileImage
                        : "assets/img/noUser.png"
                    }
                    style={{
                      height: "180px",
                      width: "180px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                    className="position-relative px-0"
                  />
                  <div>
                    <Button
                      className=""
                      onClick={showProfilePicture}
                      style={{
                        position: "absolute",
                        backgroundColor: "#0068FF",
                        marginTop: "-25px",
                        marginLeft: "150px",
                        border: "0",
                      }}
                    >
                      <i className="bi bi-camera-fill"></i>
                    </Button>
                  </div>
                </div>
              </Col>
              {/* content */}
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={7}
                className="d-flex align-items-center"
              >
                <div className="mt-3 mt-md-0">
                  <div className="border-left px-2 mx-md-2">
                    <span>
                      <p className="fs-6 fw-bolder mb-0">{profile?.name}</p>
                      <p className="small  mb-0">CEO</p>
                      <p className="small  mb-0">{profile?.email}</p>
                    </span>
                  </div>
                  <Button
                    onClick={showChangePassword}
                    className="bg-white border-0 "
                    style={{
                      color: "#85A6A2",
                      fontSize: "12px",
                    }}
                  >
                    Alterar senha
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            md={6}
            className="text-md-end d-flex align-items-start align-items-md-end flex-column mt-md-3 mt-2"
          >
            {permissions.newAdmin && (
              <Button
                size="lg"
                onClick={showAddAdmin}
                className="border-0 shadow fs-6"
                style={{ backgroundColor: "#0068FF" }}
              >
                <i className="bi bi-link-45deg mx-1"></i>
                Gerar código pra nova conta
              </Button>
            )}
            <div className="text-start mt-2" style={{ width: "260px" }}>
              <div>
                <NewProgressbar
                  bgcolor="#0068FF"
                  title="Armazenamento"
                  title1="usados"
                  progress="30"
                />
                <span style={{ fontSize: "12px", color: "#97A7BA" }}>
                  10,47 GB de 25 GB usados
                </span>
              </div>
              <div className="mt-2">
                <img src="/assets/img/cloud.svg" />
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "12px",
                    color: "#0068FF",
                  }}
                >
                  Gerenciar plano
                </span>
              </div>
              <div className="mt-2">
                <NewProgressbar
                  bgcolor="#0068FF"
                  title="Contratos assinados"
                  progress="50"
                  title1=""
                />
                <span style={{ fontSize: "12px", color: "#97A7BA" }}>
                  10 de 20 contratos
                </span>
              </div>
              <div>
                <img src="/assets/img/file.svg" />
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "12px",
                    color: "#0068FF",
                  }}
                >
                  Ver pacotes
                </span>
              </div>
            </div>
          </Col>
        </Row>
        {/* tabel */}
        {permissions.document && (
          <Row>
            <Col md={12} className="my-4">
              <Row>
                <Col xs={12} sm={12} md={2} lg={2}>
                  <h4 className="fw-bolder mt-3">Histórico</h4>
                </Col>
                <Col xs={12} sm={12} md={10} lg={10}>
                  <TableNavbar
                    setSearch={setSearch}
                    onEnter={onEnter}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    search={search}
                  />
                </Col>
              </Row>
            </Col>
            {/* tabel */}
            <Col md={12}>
              {loading ? <Loader /> : <ProfileTable tableRow={tableRow} />}
            </Col>
            {/* pagination */}
            <Col className="d-flex justify-content-center me-auto " md={12}>
              {/* <Pagination>
              <Pagination.Prev />
              {items}
              <Pagination.Ellipsis />
              <Pagination.Next />
            </Pagination> */}
            </Col>
          </Row>
        )}
      </Card>
    </div>
  );
};

export default ProfileCard;
