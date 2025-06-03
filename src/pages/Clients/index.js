import { Suspense, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useRecoilState, useRecoilValue } from "recoil";
import Loader from "../../components/Loader";
import TableNavbar from "../../components/TableNavbar";
import { PAGE_LIMIT } from "../../config";
import AfterAuth from "../../HOC/AfterAuth";
import { contactTableData } from "../../recoil/Atoms";
import {
  contactPaginationData,
  toReloadContactData,
} from "../../recoil/PaginationAtoms/Contact";
import { getContactList } from "./api";
import ContactTable from "./ContactTable";
import NewClientAdd from "./NewClientAdd";

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

  const totalPage = Math.ceil((tableData?.count || 1) / PAGE_LIMIT);

  useEffect(() => {
    if (tableData?.clients?.length > 0) {
      console.log("Updating table row from Recoil data");
      setTableRow(tableData.clients);
    }
  }, [tableData, setTableRow]);

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
  const [loading, setLoading] = useState(true);

  const [table, setTable] = useRecoilState(contactTableData);
  const [reloadVal, reloadData] = useRecoilState(toReloadContactData);

  useEffect(() => {
    console.log("Initializing client data...");
    setLoading(true);

    // First load with direct API call
    getContactList(1, search, status)
      .then((res) => {
        if (res.success) {
          console.log("Client data loaded successfully:", res.data);
          setTable(res.data.findData || []);
          setTableRow(res.data.findData || []);

          // Important: trigger Recoil state update
          reloadData(reloadVal + 1);
        } else {
          console.error("Failed to load client data");
          setTable([]);
          setTableRow([]);
        }
      })
      .catch((error) => {
        console.error("Error loading client data:", error);
        setTable([]);
        setTableRow([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh, search, status]);

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
}

function StatusSelectorButton({ active, onClick, children }) {
  return (
    <Button
      className={`fs-color mx-1 border-0 ${
        active ? "activeBtnTable" : "inActiveBtnTable"
      }`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function StatusToggle({ value, onChange }) {
  const options = [
    { key: "approved", label: "Aprovados" },
    { key: "rejected", label: "Reprovados" },
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
