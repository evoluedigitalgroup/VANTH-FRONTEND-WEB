import React, { useEffect, useMemo, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Pagination from "../Pagination";
import RecordFound from "../RecordFound";
import { formatarCPF, formatarCNPJ, formatarHorario } from "../../library/contentformater/ContentFormater";

const ProfileTable = ({ tableRow }) => {
  const [tableData, setTableData] = useState(tableRow);

  useEffect(() => {
    setTableData(tableRow);
  }, [tableRow]);

  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return tableData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className="table-responsive">
      <Table className="p-3 table-fit text-wrap tbl-color-text" responsive striped bordered hover>
        {currentTableData.length ? (
          <thead>
            <tr style={{ fontSize: "12px" }}>
              <th className="tbl-head-color" width="25%">Nome</th>
              <th className="tbl-head-color">CPF</th>
              <th className="tbl-head-color">CNPJ</th>
              <th className="tbl-head-color">Email</th>
              <th className="tbl-head-color text-center">Data de criação</th>
              <th className="tbl-head-color text-center">Status</th>
            </tr>
          </thead>
        ) : (
          ""
        )}
        {currentTableData.length ? (
          <tbody>
            {currentTableData.map((obj, i) => (
              <tr key={i} style={{ fontSize: "14px" }}>
                <td className="fw-bold">{obj.name}</td>
                <td>{formatarCPF(obj.CPF)}</td>
                <td>{formatarCNPJ(obj.CNPJ)}</td>
                <td>{obj.email}</td>
                <td className="text-center">{formatarHorario(obj.createdAt)}</td>
                <td className="text-center">
                  <Button
                    variant="success"
                    style={{
                      width: "100px",
                      fontSize: "14px",
                    }}
                    className="p-0"
                    size="md"
                  >
                    Ativo
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <RecordFound label="Nenhum Registro Encontrado" />
        )}
      </Table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={tableData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
  ;
};

export default ProfileTable;
