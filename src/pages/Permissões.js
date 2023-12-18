import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import AfterAuth from "../HOC/AfterAuth";
import TableNavbar from "../components/TableNavbar";
import PermissonTable from "../components/Permisson/PermissonTable";
import { permissonTable } from "../helper/API/Permisson";
import Loader from "../components/Loader";

const Permissões = () => {
  let active = 2;
  let items = [];
  for (let number = 1; number <= 3; number++) {
    items.push(
      <Pagination.Item
        key={number}
        style={{ color: "red" }}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  const [tableRow, setTableRow] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState();

  useEffect(() => {
    setLoading(true);
    const submitData = {
      search,
    };
    permissonTable(submitData).then((res) => {
      if (res.success) {
        setTableRow(res.data.adminList);
        setLoading(false);
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
      permissonTable(submitData).then((res) => {
        if (res.success) {
          setTableRow(res.data.adminList);
          setLoading(false);
        } else {
          setTableRow([]);
          setLoading(false);
        }
      });
    }
  };

  return (
    <>
      <AfterAuth>
        <h2 className="mt-3 ms-md-5 ms-3">Permissões</h2>
        <Card className="p-md-3 mx-md-5 mx-3 my-3 cardComponent">
          <Row>
            <Col className="m-md-2">
              {/* <NAVBAR /> */}
              <TableNavbar
                title={"Permissões"}
                btn1Text="Pendentes"
                btn2Text="Respondidas"
                btn3Text="Todas"
                setSearch={setSearch}
                onEnter={onEnter}
                refresh={refresh}
                setRefresh={setRefresh}
                search={search}
              />
            </Col>
            {/* table */}
            <Col md={12} className="m-2">
              {loading ? (
                <Loader />
              ) : (
                <PermissonTable
                  tableRow={tableRow}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              )}
            </Col>
            {/* pagination */}
          </Row>
        </Card>
      </AfterAuth>
    </>
  );
};

export default Permissões;
