import React, { Suspense, useEffect, useState } from "react";
import AfterAuth from "../HOC/AfterAuth";
import { Button, Card, Table } from "react-bootstrap";
import TableNavbar from "../components/TableNavbar";
import NewClientAdd from "../components/Document/NewClientAdd";
import { getDocumentList } from "../helper/API/document";
import { getAllDocumentsList, getContactList } from "../helper/API/contact";
import { contactTableData } from "../recoil/Atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import Loader from "../components/Loader";
import ContactTable from "../components/Contact/ContactTable";
import { contactPaginationData, toReloadContactData } from "../recoil/PaginationAtoms/Contact";
import { PAGE_LIMIT } from "../config";


const ClientData = ({
  search,
  tableRow,
  refresh,
  setRefresh,
  setTableRow,
  searchResult,
  setSearchResult,
  filterVal,
  active,
  setActive,
}) => {
  const tableData = useRecoilValue(
    contactPaginationData(searchResult ? search : (search = ""))
  );

  const [reloadVal, reloadData] = useRecoilState(toReloadContactData);
  const totalPage = Math.ceil((tableData?.totalFindData || 1) / PAGE_LIMIT);
  const [table, setTable] = useRecoilState(contactTableData);


  useEffect(() => {
    reloadData(reloadVal + 1);
    setSearchResult(false);
  }, [refresh]);
  useEffect(() => {
    // setTable(tableData?.findData);
    setTableRow(tableData?.findData);
  }, [tableData]);

  useEffect(() => {
    handleToggle();
  }, [filterVal])

  const handleToggle = () => {
    if (filterVal === "Pending") {
      setActive({
        pending: true,
        approved: false,
        all: false,
      });

      const newData = tableData?.findData.filter((obj) => {
        if (obj.contactApprove === "pending") {
          return obj;
        }
      });
      setTableRow(newData);
    } else if (filterVal === "Approved") {
      setActive({
        pending: false,
        approved: true,
        all: false,
      });
      const newData = tableData?.findData.filter((obj) => {
        if (obj.contactApprove === "approved") {
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
      setTableRow(tableData?.findData);
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <ContactTable
        tableRow={tableRow}
        refresh={refresh}
        setRefresh={setRefresh}
        tableDataArray={tableData}
        totalPage={totalPage}
      />
    </Suspense>
  );

};


const Clients = () => {
  const [tableRow, setTableRow] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState({
    pending: false,
    approved: false,
    all: true,
  });
  const [filterVal, setFilterVal] = useState("All");

  const [search, setSearch] = useState();

  const [searchResult, setSearchResult] = useState(false);

  const [show, setShow] = useState(false);

  const [newTableRow, setNewtableRow] = useState([]);

  const [table, setTable] = useRecoilState(contactTableData);

  useEffect(() => {
    setLoading(true);
    const submitData = {
      search,
    };
    getContactList(submitData).then((res) => {
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

  const onEnter = (e) => {
    if (e.key === "Enter") {
      setSearchResult(true);
    } else {
      // setSearch("");
      setSearchResult(false);
    }
  };


  const [showNovaClientButtonClick, setshowNovaClientButtonClick] =
    useState(false);

  const handleOpenNovaClientButtonClick = () => {
    setshowNovaClientButtonClick(true);
  };

  return (
    <>
      <AfterAuth>
        <div className="d-flex align-items-center justify-content-between mt-3 mx-md-5 mx-3">
          <h2 className="">Clientes</h2>
          <button
            onClick={() => handleOpenNovaClientButtonClick()}
            className="py-2 px-3"
            style={{
              background: "#0068FF",
              border: "0",
              borderRadius: "6px",
              color: "white",
              fontWeight: 700,
            }}
          >
            + Novo cliente
          </button>
        </div>
        <Card className="mx-0 mx-md-5 my-md-3 p-3 px-md-4 cardComponent">
          {/* <NAVBAR /> */}
          <TableNavbar
            title={"Clients"}
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
                className={`fs-color mx-2 border-0 ${active.pending ? "activeBtnTable" : "inActiveBtnTable"
                  }`}
                onClick={(e) => setFilterVal("Pending")}
              >
                Pendentes
              </Button>
              <Button
                className={`fs-color  mx-2 border-0 ${active.approved ? "activeBtnTable" : "inActiveBtnTable"
                  }`}
                onClick={(e) => setFilterVal("Approved")}
              >
                Respondidas
              </Button>
              <Button
                className={`fs-color px-4 border-0 ${active.all ? "activeBtnTable" : "inActiveBtnTable"
                  }`}
                onClick={(e) => setFilterVal("All")}
              >
                Todos
              </Button>
            </div>
          </TableNavbar>
          <Suspense fallback={<Loader />}>
            <ClientData
              tableRow={tableRow}
              refresh={refresh}
              setRefresh={setRefresh}
              search={search}
              setTableRow={setTableRow}
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              filterVal={filterVal}
              active={active}
              setActive={setActive}
            />
          </Suspense>
        </Card>
        {showNovaClientButtonClick && (
          <NewClientAdd
            show={setshowNovaClientButtonClick}
            refresh={refresh}
            setRefresh={setRefresh}
            handleClose={() => setshowNovaClientButtonClick(false)}
          />
        )}
      </AfterAuth>
    </>
  );
};

export default Clients;
