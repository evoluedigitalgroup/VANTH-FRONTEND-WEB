import React, { useState, useEffect, Suspense } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
//
import { PAGE_LIMIT } from "../../config";
import AfterAuth from "../../HOC/AfterAuth";
import DocumentTable from "./DocumentTable";
import Loader from "../../components/Loader";
import TableNavbar from "../../components/TableNavbar";
import { documentTableData, showTutorialAtom } from "../../recoil/Atoms";
import NewMemberAdd from "../../components/Document/NewMemberAdd";
import {
  documentPaginationData,
  toReloadDocumentData,
} from "../../recoil/PaginationAtoms/Document";
import { Helmet } from "react-helmet";

const DocumentData = ({
  search,
  tableRow,
  refresh,
  setRefresh,
  setTableRow,
  searchResult,
  setSearchResult,
  filterVal,
  setActive,
  id,
  setId,
  idArray,
  open,
  setOpen,
  handleShowRow,
}) => {
  const tableData = useRecoilValue(
    documentPaginationData(searchResult ? search : (search = ""))
  );

  const [reloadVal, reloadData] = useRecoilState(toReloadDocumentData);

  const totalPage = Math.ceil(
    (tableData?.count || 1) / PAGE_LIMIT
  );
  const [table, setTable] = useRecoilState(documentTableData);

  useEffect(() => {
    reloadData(reloadVal + 1);
    setSearchResult(false);
  }, [refresh]);

  useEffect(() => {
    setTableRow(tableData?.contacts);
  }, [tableData]);

  useEffect(() => {
    handleToggle();
  }, [filterVal]);

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

  console.log(totalPage, "totalPage")
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
  const [active, setActive] = useState({
    pending: false,
    approved: false,
    all: true,
  });

  const [filterVal, setFilterVal] = useState("All");

  const [search, setSearch] = useState();

  const [searchResult, setSearchResult] = useState(false);

  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  const [idArray, setIdArray] = useState([]);
  const [show, setShow] = useState(false);
  const [tutorialValue, setTutorialValue] = useRecoilState(showTutorialAtom);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      setSearchResult(true);
    } else {
      setSearchResult(false);
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
    setTutorialValue({ ...tutorialValue, index: 9 });
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
              onEnter={onEnter}
              refresh={refresh}
              setRefresh={setRefresh}
              search={search}
            >
              <div id="documentTableNavBarButton">
                <Button
                  className={`fs-color  mx-1 border-0 ${active.approved ? "activeBtnTable" : "inActiveBtnTable"
                    }`}
                  onClick={() => setFilterVal("Approved")}
                >
                  Concluídos
                </Button>
                <Button
                  className={`fs-color  mx-1 border-0 ${active.pending ? "activeBtnTable" : "inActiveBtnTable"
                    }`}
                  onClick={() => setFilterVal("Pending")}
                >
                  Pendentes
                </Button>
                <Button
                  className={`fs-color px-4 mx-1 border-0 ${active.all ? "activeBtnTable" : "inActiveBtnTable"
                    }`}
                  onClick={() => setFilterVal("All")}
                >
                  Todas
                </Button>
              </div>
            </TableNavbar>
          </div>
          <Suspense fallback={<Loader />}>
            <DocumentData
              tableRow={tableRow}
              refresh={refresh}
              setRefresh={setRefresh}
              search={search}
              setTableRow={setTableRow}
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              filterVal={filterVal}
              active={active}
              id={id}
              setId={setId}
              idArray={idArray}
              open={open}
              setOpen={setOpen}
              handleShowRow={handleShowRow}
              setActive={setActive}
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
