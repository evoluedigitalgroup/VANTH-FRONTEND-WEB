import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import AfterAuth from "../HOC/AfterAuth";
import TableNavbar from "../components/TableNavbar";
import ContactTable from "../components/Contact/ContactTable";
import { getContactList } from "../helper/API/contact";
import Loader from "../components/Loader";
import { useRecoilState } from "recoil";
import { contactTableData } from "../recoil/Atoms";

const Contact = () => {
  const [tableRow, setTableRow] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState({
    pending: false,
    approved: false,
    all: true,
  });

  const [search, setSearch] = useState();
  const [newTableRow, setNewtableRow] = useState([]);
  const [table, setTable] = useRecoilState(contactTableData);
  // console.log("search", search);

  useEffect(() => {
    setLoading(true);
    const submitData = {
      search,
    };
    getContactList(submitData).then((res) => {
      //   console.log("res contact :: ", res);
      if (res.success) {
        setTable(res.data.findData);
        setTableRow(res.data.findData);
        setLoading(false);
      } else {
        setTable([]);
        setTableRow([]);
        setLoading(false);
      }
    });
  }, [refresh]);
  // console.log("tableRow", tableRow);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      // console.log("clicked enter");
      setLoading(true);
      const submitData = {
        search,
      };
      getContactList(submitData).then((res) => {
        // console.log("res contact :: enter ", res);
        if (res.success) {
          setTableRow(res.data);
          setLoading(false);
        } else {
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
        if (obj.status === "pending") {
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
        if (obj.status === "approved") {
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
  // console.log("table", table);
  return (
    <>
      <AfterAuth>
        <h2 className="mt-3 ms-md-5 ms-3">Contatos</h2>
        <Card className="m-5 mx-3 mx-md-5 my-3 p-3 px-4">
          {/* <NAVBAR /> */}
          <TableNavbar
            title={"Contatos"}
            setSearch={setSearch}
            onEnter={onEnter}
            refresh={refresh}
            setRefresh={setRefresh}
            search={search}
            setActive={setActive}
            active={active}
          >
            <div className="">
              <Button
                className={`fs-color mx-2 border-0 ${
                  active.pending ? "activeBtnTable" : "inActiveBtnTable"
                }`}
                onClick={(e) => handleToggle("Pending")}
              >
                Pendentes
              </Button>
              <Button
                className={`fs-color  mx-2 border-0 ${
                  active.approved ? "activeBtnTable" : "inActiveBtnTable"
                }`}
                onClick={(e) => handleToggle("Approved")}
              >
                Respondidas
              </Button>
              <Button
                className={`fs-color px-4 border-0 ${
                  active.all ? "activeBtnTable" : "inActiveBtnTable"
                }`}
                onClick={(e) => handleToggle("All")}
              >
                Todos
              </Button>
            </div>
          </TableNavbar>

          {loading ? (
            <Loader />
          ) : (
            <ContactTable
              tableRow={tableRow}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}
        </Card>
      </AfterAuth>
    </>
  );
};

export default Contact;
