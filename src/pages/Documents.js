import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import AfterAuth from "../HOC/AfterAuth";
import TableNavbar from "../components/TableNavbar";
import DocumentTable from "../components/Document/DocumentTable";
import { getDocumentList } from "../helper/API/document";
import Loader from "../components/Loader";
import { documentTableData } from "../recoil/Atoms";
import { useRecoilState } from "recoil";
import NewMemberAdd from "../components/Document/NewMemberAdd";

const Documents = () => {
  const [tableRow, setTableRow] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useRecoilState(documentTableData);
  const [active, setActive] = useState({
    pending: false,
    approved: false,
    all: true,
  });
  const [search, setSearch] = useState();
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  const [idArray, setIdArray] = useState([]);
  const [show, setShow] = useState(false);

  // console.log('search', search)

  useEffect(() => {
    setLoading(true);
    const submitData = {
      search,
    };
    getDocumentList(submitData).then((res) => {
      //   console.log("res contact :: ", res);
      if (res.success) {
        setTable(res.data.findContactData);
        setTableRow(res.data.findContactData);
        setLoading(false);
        // res.data?.filter((obj, index) => {
        // 	setIdArray((old) => [...old, obj.id]);
        // });
      } else {
        setTableRow([]);
        setLoading(false);
      }
    });
  }, [refresh]);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      // console.log("clicked enter");
      setLoading(true);
      const submitData = {
        search,
      };
      getDocumentList(submitData).then((res) => {
        // console.log("res contact :: ", res);
        if (res.success) {
          setTableRow(res.data);
          setLoading(false);
        } else {
          setTableRow([]);
          setLoading(false);
        }
      });
    }
  };

  const handleToggle = (status) => {
    if (status === "Pending") {
      setActive({
        pending: true,
        approved: false,
        all: false,
      });

      const newData = table.filter((obj) => {
        if (obj.allStatus === "pending") {
          return obj;
        }
      });
      setTableRow(newData);
    } else if (status === "Approved") {
      setActive({
        pending: false,
        approved: true,
        all: false,
      });
      const newData = table.filter((obj) => {
        if (obj.allStatus === "approved") {
          return obj;
        }
      });
      setTableRow(newData);
    } else {
      setActive({
        pending: false,
        approved: false,
        all: true,
      });
      setTableRow(table);
    }
  };

  const handleShowRow = (id) => {
    setOpen(!open);
    setId(id);

    if (idArray.includes(id)) {
      var index = idArray.indexOf(id);
      if (index !== -1) {
        idArray.splice(index, 1);
      }
    } else {
      setIdArray((old) => [...old, id]);
    }
  };

  return (
    <>
      <AfterAuth>
        <h2 className="mt-3 ms-md-5 ms-3">Documentos</h2>
        <Card className="mx-3 mx-md-5 my-3 p-3 px-4">
          <div style={{ paddingRight: "2%" }}>
            <TableNavbar
              title={"Documentos"}
              btn1Text="Concluídos"
              btn2Text="Pendentes"
              btn3Text="Todas"
              setSearch={setSearch}
              onEnter={onEnter}
              refresh={refresh}
              setRefresh={setRefresh}
              search={search}
            >
              <Button
                className={`fs-color  mx-1 border-0 ${
                  active.approved ? "activeBtnTable" : "inActiveBtnTable"
                }`}
                onClick={(e) => handleToggle("Approved")}
              >
                Concluídos
              </Button>
              <Button
                className={`fs-color  mx-1 border-0 ${
                  active.pending ? "activeBtnTable" : "inActiveBtnTable"
                }`}
                onClick={(e) => handleToggle("Pending")}
              >
                Pendentes
              </Button>
              <Button
                className={`fs-color px-4 mx-1 border-0 ${
                  active.all ? "activeBtnTable" : "inActiveBtnTable"
                }`}
                onClick={(e) => handleToggle("All")}
              >
                Todas
              </Button>
              <Button
                onClick={() => {
                  setShow(true);
                }}
                style={{
                  backgroundColor: "#0068FF",
                  marginLeft: "2.5rem",
                }}
                className="fw-bold align-items-center border-0"
              >
                + Novo cliente
              </Button>
            </TableNavbar>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <DocumentTable
              tableRow={tableRow}
              refresh={refresh}
              setRefresh={setRefresh}
              id={id}
              setId={setId}
              open={open}
              setOpen={setOpen}
              handleShowRow={handleShowRow}
              idArray={idArray}
            />
          )}
        </Card>
        {show && (
          <NewMemberAdd
            show={show}
            handleClose={() => setShow(false)}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
      </AfterAuth>
    </>
  );
};

export default Documents;
