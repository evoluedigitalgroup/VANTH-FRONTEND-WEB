import React, { Suspense, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
//
import { getContactList } from "./api";
import ContactTable from "./ContactTable";
import { PAGE_LIMIT } from "../../config";
import AfterAuth from "../../HOC/AfterAuth";
import Loader from "../../components/Loader";
import TableNavbar from "../../components/TableNavbar";
import { contactTableData } from "../../recoil/Atoms";
import NewClientAdd from "./NewClientAdd";
import {
  contactPaginationData,
  toReloadContactData,
} from "../../recoil/PaginationAtoms/Contact";
import { Helmet } from "react-helmet";

const ClientData = ({
  search = "",
  tableRow,
  refresh,
  setRefresh,
  setTableRow,
  status,
}) => {
  const tableData = useRecoilValue(
    contactPaginationData({
      status,
      search,
    })
  );

  const [reloadVal, reloadData] = useRecoilState(toReloadContactData);

  const totalPage = Math.ceil(
    (tableData?.count || 1) / PAGE_LIMIT
  );

  useEffect(() => {
    reloadData(reloadVal + 1);
  }, [refresh]);

  useEffect(() => {
    setTableRow(tableData?.clients);
  }, [tableData]);

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

export default function Clients() {
  const [tableRow, setTableRow] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [status, setStatus] = useState("all"); // all, approved, reproved, pending
  const [search, setSearch] = useState("");

  const [table, setTable] = useRecoilState(contactTableData);

  useEffect(() => {
    getContactList(1, search).then((res) => {
      if (res.success) {
        setTable(res.data.findData);
        setTableRow(res.data.findData);
      } else {
        setTable([]);
        setTableRow([]);
      }
    });
  }, [refresh]);

  const [showNovaClientButtonClick, setShowNovaClientButtonClick] =
    useState(false);

  return (
    <>
      <Helmet>
        <title>Vanth System | Clientes</title>
      </Helmet>
      <AfterAuth>
        <div className="d-flex align-items-center justify-content-between mt-3 mx-md-5 mx-3">
          <h2 className="">Clientes</h2>
          <button
            id="newAddClient"
            onClick={() => {
              setShowNovaClientButtonClick(true);
            }}
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
          <TableNavbar
            title="Clientes"
            setSearch={setSearch}
            refresh={refresh}
            setRefresh={setRefresh}
            search={search}
          >
            <StatusToggle value={status} onChange={setStatus} />
          </TableNavbar>
          <Suspense fallback={<Loader />}>
            <ClientData
              tableRow={tableRow}
              refresh={refresh}
              setRefresh={setRefresh}
              search={search}
              setTableRow={setTableRow}
              status={status}
            />
          </Suspense>
        </Card>
        {showNovaClientButtonClick && (
          <NewClientAdd
            show={showNovaClientButtonClick}
            refresh={refresh}
            setRefresh={setRefresh}
            handleClose={() => setShowNovaClientButtonClick(false)}
          />
        )}
      </AfterAuth>
    </>
  );
};

function StatusSelectorButton({ active, onClick, children }) {
  return (
    <Button
      className={`fs-color mx-1 border-0 ${active ? "activeBtnTable" : "inActiveBtnTable"}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function StatusToggle({ value, onChange }) {
  const options = [
    { key: "approved", label: "Aprovados" },
    { key: "reproved", label: "Reprovados" },
    { key: "pending", label: "Aguardando" },
    { key: "all", label: "Todas" },
  ];

  return (
    <div>
      {options.map((option) => (
        <StatusSelectorButton
          key={option.key}
          active={value === option.key}
          onClick={() => onChange(option.key)}
        >
          {option.label}
        </StatusSelectorButton>
      ))}
    </div>
  );
}