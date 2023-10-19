import React, { useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";

import Table from "react-bootstrap/Table";
import Pagination from "../Pagination";
import RecordFound from "../RecordFound";
import GenerateLinkModal from "./GenerateLinkModal";

const ContactTable = ({ tableRow, refresh, setRefresh }) => {
	const [openLinkModal, setOpenLinkModal] = useState(false);
	// console.log("tableRow", tableRow);
	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [editData, setEditData] = useState(null);
	const [tableData, setTableData] = useState(tableRow);
	const [idArray, setIdArray] = useState([]);
	let PageSize = 10;

	// let ab = [];

	// console.log("idArray", idArray);
	useEffect(() => {
		setTableData(tableRow);

		// tableRow?.filter((obj, index) => {
		// 	// console.log("obj", obj.status === "pending");
		// 	if (obj.status === "pending") {
		// 		setIdArray((old) => [...old, obj.id]);
		// 	}
		// });
	}, [tableRow]);

	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return tableData?.slice(firstPageIndex, lastPageIndex);
	}, [tableData, currentPage]);

	const handleShowRow = (id) => {
		setId(id);
		// console.log("id", id);
		setOpen(!open);
		// const index = idArray.findIndex((i) => i === id);
		if (idArray.includes(id)) {
			var index = idArray.indexOf(id);
			if (index !== -1) {
				idArray.splice(index, 1);
			}
		} else {
			setIdArray((old) => [...old, id]);
		}

		// console.log("index ::", index);
	};

	const handleShowLinkModal = (val) => {
		setOpenLinkModal(true);
		setEditData(val);
	};

	// console.log("idArray", idArray);
	return (
		<div>
			<Table responsive>
				{currentTableData.length ? (
					<thead>
						<tr style={{ color: "#B5B6B7", fontSize: "12px" }}>
							<th width={"25%"}>Nome</th>
							<th>CPF</th>
							<th>CNPJ</th>
							<th>Email/Telefone</th>
							{/* <th>Data</th> */}
							<th>Hora</th>
							<th width={"10%"}>Status</th>
						</tr>
					</thead>
				) : (
					""
				)}
				{currentTableData.length ? (
					<tbody>
						{currentTableData?.map((obj, i) => (
							<tr
								style={{
									position: "relative",
									fontSize: "14px",
								}}
								height={
									idArray.includes(obj.id) ? "100px" : ""
								}>
								<td
									className='fw-bold'
									onClick={
										obj.status === "pending"
											? () => handleShowRow(obj.id)
											: null
									}>
									{obj.name}
								</td>
								<td
									onClick={
										obj.status === "pending"
											? () => handleShowRow(obj.id)
											: null
									}>
									{obj.CPF}
								</td>
								<td
									onClick={
										obj.status === "pending"
											? () => handleShowRow(obj.id)
											: null
									}>
									{obj.CNPJ}
								</td>
								<td
									onClick={
										obj.status === "pending"
											? () => handleShowRow(obj.id)
											: null
									}>
									{obj.email ? obj.email : obj.phone}
								</td>
								{/* <td onClick={
									obj.status === "pending"
										? () => handleShowRow(obj.id)
										: null
								}>{obj.date}</td> */}
								<td
									onClick={
										obj.status === "pending"
											? () => handleShowRow(obj.id)
											: null
									}>
									{obj.time}
								</td>
								<td className='position-relative'>
									<Button
										className='py-0 px-0 fw-bold text-white'
										style={{
											width: "100px",
											fontSize: "12px",
										}}
										variant={
											obj.status === "pending"
												? "warning"
												: "success"
										}
										onClick={
											obj.status === "pending"
												? () => handleShowRow(obj.id)
												: null
										}>
										{obj.status === "pending"
											? "Aguardando"
											: "Aprovado"}
									</Button>
								</td>
								{
									obj.status === "pending" &&
									// <div>
									(idArray.includes(obj.id) ? (
										// <Row
										// 	style={{
										// 		width: "600px",
										// 		position: "absolute",
										// 		right: "-15.3%",
										// 		bottom: "0%",
										// 	}}>
										// 	{/* <Row> */}
										// 	<Col
										// 		md={4}
										// 		className='opacity-25 px-1'
										// 		style={{
										// 			textAlign: "right",
										// 		}}>
										// 		Entrar em contato por:
										// 	</Col>

										// 	{obj?.phone && (
										// 		<Col
										// 			md={1}
										// 			className='px-1'>
										// 			<Button
										// 				style={{
										// 					background:
										// 						"#1C3D59",
										// 				}}>
										// 				<a
										// 					href={`https://wa.me/${obj.phone}`}
										// 					target='_blank'
										// 					style={{
										// 						textDecoration:
										// 							"none",
										// 						color: "#fff",
										// 					}}>
										// 					<i class='bi bi-whatsapp'></i>
										// 				</a>
										// 			</Button>
										// 		</Col>
										// 	)}
										// 	{obj?.email && (
										// 		<Col
										// 			md={1}
										// 			className='px-1'>
										// 			<Button
										// 				style={{
										// 					background:
										// 						"#1C3D59",
										// 				}}>
										// 				<a
										// 					href={`mailto:${obj.email}`}
										// 					target='_blank'
										// 					style={{
										// 						textDecoration:
										// 							"none",
										// 						color: "#fff",
										// 					}}>
										// 					<i class='bi bi-envelope'></i>
										// 				</a>
										// 			</Button>
										// 		</Col>
										// 	)}
										// 	<Col
										// 		md={1}
										// 		className='opacity-25 text-center'>
										// 		ou
										// 	</Col>
										// 	<Col md={3} className='ps-0'>
										// 		<Button
										// 			onClick={() =>
										// 				handleShowLinkModal(
										// 					obj
										// 				)
										// 			}
										// 			className='border-0'
										// 			style={{
										// 				background:
										// 					"#1C3D59",
										// 				width: "100%",
										// 			}}>
										// 			Gerar link
										// 		</Button>
										// 	</Col>
										// 	{/* </Row> */}
										// </Row>
										<div className='d-flex justify-content-end' style={{ position: 'absolute', top: '45%', right: '0%', paddingRight: '1%', marginRight: '2px' }}>
											<h6 style={{ color: "#B5B6B7" }} className="d-flex mt-1 align-items-center"> Entrar em contato por:</h6>
											<div className='px-3'>
												{obj?.phone && (
													<Button style={{ background: '#1C3D59' }} className="border-0" >
														<a
															href={`https://wa.me/${obj.phone}`}
															target='_blank'
															style={{
																textDecoration:
																	"none",
																color: "#fff",
															}}>
															<i class='bi bi-whatsapp'></i>
														</a>
													</Button>
												)}
												{obj?.email && (
													<Button style={{ background: '#1C3D59' }} className="border-0">
														<a
															href={`mailto:${obj.email}`}
															target='_blank'
															style={{
																textDecoration:
																	"none",
																color: "#fff",
															}}>
															<i class='bi bi-envelope'></i>
														</a>
													</Button>
												)}
											</div>
											<div>
												<h6 style={{ color: "#B5B6B7" }} className="mt-1">ou</h6>
											</div>
											<div className='ps-3'>
												<Button className='border-0 px-4' onClick={() => handleShowLinkModal(obj)} style={{ background: '#1C3D59', width: '100%' }} >Gerar link</Button>
											</div>
										</div >
									) : (
										""
									))
									// </div>
								}
							</tr>
						))}
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
			{openLinkModal && (
				<GenerateLinkModal
					open={openLinkModal}
					handleClose={() => setOpenLinkModal(false)}
					editData={editData}
					refresh={refresh}
					setRefresh={setRefresh}
				/>
			)}
		</div>
	);
};

export default ContactTable;
