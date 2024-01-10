import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import AfterAuth from "../HOC/AfterAuth";
import TableNavbar from "../components/TableNavbar";
import ContactTable from "../components/Contact/ContactTable";
import { getContactList } from "../helper/API/contact";
import Loader from "../components/Loader";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  contactTableData,
  contractModels,
  contractNewFileSelected,
  contractSelectedUser,
} from "../recoil/Atoms";
import SelectClientModal from "../components/NewContract/SelectClientModal";
import SelectTemplateModal from "../components/NewContract/SelectTemplateModal";
import {
  openSelectClient,
  resetModels,
} from "../recoil/helpers/contractModels";
import ContractCopylinkModal from "../components/NewContract/ContractCopylinkModal";
import ReviewAndInformationModal from "../components/NewContract/ReviewAndInformationModal";

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
  const [models, setModels] = useRecoilState(contractModels);
  const selectedOption = useRecoilValue(contractSelectedUser);
  const selectedPdf = useRecoilValue(contractNewFileSelected);

  useEffect(() => {
    // setLoading(true);
    // const submitData = {
    //   search,
    // };
    // getContactList(submitData).then((res) => {
    //   if (res.success) {
    //     setTable(res.data.findData);
    //     setTableRow(res.data.findData);
    //     setLoading(false);
    //   } else {
    //     setTable([]);
    //     setTableRow([]);
    //     setLoading(false);
    //   }
    // });

    console.log("selectedPdf : ", selectedPdf);
  }, [refresh, selectedPdf]);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      const submitData = {
        search,
      };
      getContactList(submitData).then((res) => {
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

  return (
    <>
      <AfterAuth>
        <div className="d-flex align-items-center justify-content-between mt-3 mx-md-5 ms-3">
          <h2 className="">Contatos</h2>
          <button
            onClick={() => setModels(openSelectClient())}
            className="py-2 px-3"
            style={{
              background: "#0068FF",
              border: "0",
              borderRadius: "6px",
              color: "white",
              fontWeight: 700,
            }}
          >
            Novo contrato
          </button>
        </div>
        <Card className="m-md-5 mx-md-5 my-md-3 p-3 px-md-4 cardComponent">
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
        <SelectClientModal
          show={models.selectClient}
          onHide={() => setModels(resetModels())}
        />
        <div>
          <SelectTemplateModal
            selectedOption={selectedOption}
            show={models.selectTemplate}
            onHide={() => setModels(resetModels())}
          />
        </div>
        <div>
          <ContractCopylinkModal
            selectedOption={selectedOption}
            show={models.previewContract}
            onHide={() => setModels(resetModels())}
          />
        </div>
        <div>
          <ReviewAndInformationModal
            show={models.pdfEditor}
            title={"Revisar modelo e informações"}
            selectedPdf={selectedPdf}
            onHide={() => setModels(resetModels())}
            selectedOption={selectedOption}
          />
        </div>
      </AfterAuth>
    </>
  );
};

export default Contact;
