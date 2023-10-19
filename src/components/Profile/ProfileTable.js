import React, { useEffect, useMemo, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Pagination from "../Pagination";
import RecordFound from "../RecordFound";

const ProfileTable = ({ tableRow }) => {
	const [tableData, setTableData] = useState(tableRow);

	useEffect(() => {
		setTableData(tableRow);
	}, [tableRow]);
	// console.log("tableRow", tableRow);

	let PageSize = 10;
	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return tableData.slice(firstPageIndex, lastPageIndex);
	}, [currentPage]);

	// console.log("currentTableData", currentTableData);

	return (
		<>
			<Table
				className='p-3 table-fit text-wrap tbl-color-text'
				responsive>
				{currentTableData.length ? (
					<thead>
						<tr style={{ fontSize: "12px" }}>
							<th className='tbl-head-color ' width={"25%"}>
								Nome{" "}
							</th>
							<th className='tbl-head-color '>CPF</th>
							<th className='tbl-head-color '>CNPJ</th>
							<th className='tbl-head-color '>Email </th>
							{/* <th className='tbl-head-color '>Data</th> */}
							<th className='tbl-head-color text-center'>
								Hora{" "}
							</th>
							<th className='tbl-head-color text-center'>
								Status{" "}
							</th>
						</tr>
					</thead>
				) : (
					""
				)}
				{currentTableData.length ? (
					<tbody>
						{currentTableData?.map((obj, i) => (
							<tr style={{ fontSize: "14px" }}>
								<td className='fw-bold'>{obj.name}</td>
								<td>{obj.CPF}</td>
								<td>{obj.CNPJ}</td>
								<td>{obj.email}</td>
								{/* <td>{obj.date}</td> */}
								<td className='text-center'>{obj.time}</td>
								<td className='text-end'>
									<Button
										variant='success'
										style={{
											width: "100px",
											fontSize: "14px",
										}}
										className='border-0 p-0'
										size='md'>
										Respondido
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				) : (
					<RecordFound label='Nenhum Registro Encontrado' />
				)}
				<Pagination
					className='pagination-bar'
					currentPage={currentPage}
					totalCount={tableData.length}
					pageSize={PageSize}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</Table>
		</>
	);
};

export default ProfileTable;
