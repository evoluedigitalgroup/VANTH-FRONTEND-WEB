import React, { useEffect, useRef, useState, useMemo } from "react";
import Button from "react-bootstrap/Button";

import Table from "react-bootstrap/Table";
import Pagination from "../Pagination";
import RecordFound from "../RecordFound";
import PermissonTooltip from "./PermissonTooltip";


const PermissonTable = ({ tableRow, refresh, setRefresh }) => {
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);
	const [editData, setEditData] = useState(null);
	const [tableData, setTableData] = useState(tableRow);

	const ref = useRef(null);
	let PageSize = 10;
	useEffect(() => {
		setTableData(tableRow);
	}, [tableRow]);

	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return tableData.slice(firstPageIndex, lastPageIndex);
	}, [currentPage]);

	const handleClick = (event, val, type, prmsn) => {
		setShow(!show);
		setTarget(event.target);
		setEditData({
			...val,
			type,
			prmsn,
		});
	};

	const handleClose = () => {
		setShow(false);
	};

	return (
		<div>
			<Table
				className='p-3 table-fit text-wrap tbl-color-text'
				responsive>
				{currentTableData.length ? (
					<thead>
						<tr>
							<th className='tbl-head-color' width={"25%"}>
								Nome{" "}
							</th>
							<th className='tbl-head-color'>Email/Telefone </th>
							<th className='tbl-head-color'>Função </th>
							<th className='tbl-head-color'>Contatos</th>
							<th className='tbl-head-color'>Documentos</th>
							<th className='tbl-head-color'>Nova conta </th>
						</tr>
					</thead>
				) : (
					""
				)}
				{currentTableData.length ? (
					<tbody>
						{currentTableData.map((val, i) => {
							return (
								<tr key={i} style={{ fontSize: "14px" }}>
									<td className='fw-bold'>{val.name}</td>
									<td>{val.email}</td>
									<td>{val.designation}</td>
									<td>
										{val.permissions.contact ? (
											<Button
												onClick={(e) =>
													handleClick(
														e,
														val,
														"contact",
														true
													)
												}
												variant=' success'
												size='lg'
												style={{ fontSize: "14px" }}
												className='p-0 fw-bolder text-success border-0'>
												<span className='d-flex align-items-center'>
													<img
														src='/assets/img/right 2.png'
														className='px-1'
													/>
													Autorizar
												</span>
											</Button>
										) : (
											<Button
												onClick={(e) =>
													handleClick(
														e,
														val,
														"contact",
														false
													)
												}
												variant='danger'
												size='lg'
												style={{ fontSize: "14px" }}
												className='p-0 fw-bolder text-danger button-red'>
												<span
													className='d-flex align-items-center'
													style={{
														color: "#A43D3D",
													}}>
													<img
														src='/assets/img/wrong.png'
														className='px-1'
													/>
													Remover
												</span>
											</Button>
										)}
									</td>

									<td>
										{val.permissions.document ? (
											<Button
												onClick={(e) =>
													handleClick(
														e,
														val,
														"document",
														true
													)
												}
												variant=' success'
												size='lg'
												style={{ fontSize: "14px" }}
												className='align-items-center d-flex p-0 fw-bolder text-success  border-0'>
												<img
													src='/assets/img/right 2.png'
													className='px-1'
												/>
												Autorizar
											</Button>
										) : (
											<Button
												onClick={(e) =>
													handleClick(
														e,
														val,
														"document",
														false
													)
												}
												variant='danger'
												size='lg'
												style={{
													color: "#A43D3D",
													fontSize: "14px",
												}}
												className='p-0 fw-bolder       align-items-center d-flex button-red'>
												<img
													src='/assets/img/wrong.png'
													className='px-1'
												/>
												Remover
											</Button>
										)}
									</td>
									<td>
										{val.permissions.newUser ? (
											<Button
												onClick={(e) =>
													handleClick(
														e,
														val,
														"admin",
														true
													)
												}
												variant=' success'
												size='lg'
												style={{ fontSize: "14px" }}
												className='p-0 fw-bolder text-success  border-0'>
												<span className='d-flex align-items-center'>
													<img
														src='/assets/img/right 2.png'
														className='px-1'
													/>
													Autorizar
												</span>
											</Button>
										) : (
											<Button
												onClick={(e) =>
													handleClick(
														e,
														val,
														"admin",
														false
													)
												}
												variant='danger'
												size='lg'
												style={{ fontSize: "14px" }}
												className='p-0 fw-bolder text-danger button-red'>
												<span
													className='d-flex align-items-center'
													style={{
														color: "#A43D3D",
													}}>
													<img
														src='/assets/img/wrong.png'
														className='px-1'
													/>
													Remover
												</span>
											</Button>
										)}
										<PermissonTooltip
											show={show}
											target={target}
											ref={ref}
											handleClose={handleClose}
											editData={editData}
											refresh={refresh}
											setRefresh={setRefresh}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				) : (
					<RecordFound label='Nenhum Registro Encontrado' />
				)}
			</Table>
			<Pagination
				className='pagination-bar'
				currentPage={currentPage}
				totalCount={tableData.length}
				pageSize={PageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
};

export default PermissonTable;
