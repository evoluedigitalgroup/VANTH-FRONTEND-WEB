import React, { useState, useEffect, Suspense } from "react";
import { Card, Button } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { PAGE_LIMIT } from "../../config";
import AfterAuth from "../../HOC/AfterAuth";
import DocumentTable from "./DocumentTable";
import Loader from "../../components/Loader";
import TableNavbar from "../../components/TableNavbar";
import { showTutorialAtom } from "../../recoil/Atoms";
import NewMemberAdd from "../../components/Document/NewMemberAdd";
import {
  documentPaginationData,
  toReloadDocumentData,
} from "../../recoil/PaginationAtoms/Document";
import { Helmet } from "react-helmet";

function DocumentData({
  search,
  status,
  tableRow,
  refresh,
  setRefresh,
  setTableRow,
  id,
  setId,
  idArray,
  open,
  setOpen,
  handleShowRow,
}) {
  const tableData = useRecoilValue(
    documentPaginationData({
      search,
      status,
    })
  );

  const [reloadVal, reloadData] = useRecoilState(toReloadDocumentData);

  const totalPage = Math.ceil(
    (tableData?.count || 1) / PAGE_LIMIT
  );

  useEffect(() => {
    reloadData(reloadVal + 1);
  }, [refresh]);

  useEffect(() => {
    setTableRow(tableData?.contacts);
  }, [tableData]);

  return (
    <Suspense fallback={<Loader />}>
      <DocumentTable
        tableRow={tableRow}
        refresh={refresh}
        setRefresh={setRefresh}
        id={id}
        setId={setId}
        open={open}
        tableDataArray={tableData}
        totalPage={totalPage}
        setOpen={setOpen}
        handleShowRow={handleShowRow}
        idArray={idArray}
      />
    </Suspense>
  );
};

export default function Documents() {
  const [tableRow, setTableRow] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const [status, setStatus] = useState("all") // all, pending, approved
  const [search, setSearch] = useState(""); // search value

  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  const [idArray, setIdArray] = useState([]);
  const [show, setShow] = useState(false);
  const [tutorialValue, setTutorialValue] = useRecoilState(showTutorialAtom);

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
    setTutorialValue({ ...tutorialValue, index: 9 });
  };

  const handleChangeStatus = (status) => {
    setStatus(status);
  };

  return (
    <>
      <Helmet>
        <title>Vanth System | Documentos</title>
      </Helmet>
      <AfterAuth>
        <h2 className="mt-3 ms-md-5 ms-3">Documentos</h2>
        <Card className="mx-0 mx-md-5 my-3 p-3 px-4 cardComponent">
          <div style={{ paddingRight: "2%" }}>
            <TableNavbar
              title="Documents"
              setSearch={setSearch}
              refresh={refresh}
              setRefresh={setRefresh}
              search={search}
            >
              <StatusToggle value={status} onChange={handleChangeStatus} />
            </TableNavbar>
          </div>
          <Suspense fallback={<Loader />}>
            <DocumentData
              tableRow={tableRow}
              refresh={refresh}
              setRefresh={setRefresh}
              search={search}
              setTableRow={setTableRow}
              status={status}
              id={id}
              setId={setId}
              idArray={idArray}
              open={open}
              setOpen={setOpen}
              handleShowRow={handleShowRow}
            />
          </Suspense>
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


function StatusSelectorButton({ active, onClick, children }) {
  return (
    <Button
      className={`fs-color  mx-1 border-0 ${active ? "activeBtnTable" : "inActiveBtnTable"}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function StatusToggle({ value, onChange }) {
  const options = [
    { key: "all", label: "Todas" },
    { key: "approved", label: "Aprovado" },
    { key: "pending", label: "Reprovado" },
  ];

  return (
    <div id="documentTableNavBarButton">
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