import React, { useState, useEffect, useMemo } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import Table from "react-bootstrap/Table";
import Pagination from "../Pagination";
import RecordFound from "../RecordFound";
import AddressProofModal from "./AddressProofModal";
import GenerateLinkModal from "./GenerateLinkModal";
import ImageUploadModal from "./ImageUploadModal";
import NewMemberAdd from "./NewMemberAdd";
import SocialContractBtn from "./SocialContractBtn";

const DocumentTable = ({
	tableRow,
	refresh,
	setRefresh,
	id,
	setId,
	open,
	setOpen,
	handleShowRow,
	idArray,
}) => {
	const [openImageModal, setOpenImageModal] = useState(false);
	const [openLinkModal, setOpenLinkModal] = useState(false);
	const [editData, setEditData] = useState(null);
	const [tableData, setTableData] = useState(tableRow);
	const [document, setDocument] = useState();
	const [addDocument, setAddDocument] = useState();

	let PageSize = 10;
	useEffect(() => {
		setTableData(tableRow);
	}, [tableRow]);

	const [currentPage, setCurrentPage] = useState(1);
	const [openAddressModal, setOpenAddressModal] = useState(false);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return tableData.slice(firstPageIndex, lastPageIndex);
	}, [tableData, currentPage]);

	const handleShowImageModal = (data, type) => {
		if (data.socialContract) {
			setOpenImageModal(true);
			setDocument({
				...data,
				type,
			});
		}
	};

	const handleShowAddressModal = (data, type) => {
		if (data.addressProof) {
			setOpenAddressModal(true);
			setAddDocument({
				...data,
				type,
			});
		}
	};

	const handleShowLinkModal = (val) => {
		setOpenLinkModal(true);
		setEditData(val);
	};
	// console.log("idArray.includes(id)", idArray);
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
							<th>Status</th>
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
									cursor: "pointer",
									fontSize: "14px",
								}}
								className={
									idArray.includes(obj.id) ? "row-height" : ""
								}>
								<td
									onClick={() => handleShowRow(obj.id)}
									className='fw-bold'>
									{obj.name}
								</td>
								<td onClick={() => handleShowRow(obj.id)}>
									{obj.CPF}
								</td>
								<td onClick={() => handleShowRow(obj.id)}>
									{obj.CNPJ}
								</td>
								<td onClick={() => handleShowRow(obj.id)}>
									{obj.email ? obj.email : obj.phone}
								</td>
								{/* <td onClick={() => handleShowRow(obj.id)}>
									{obj.date}
								</td> */}
								<td onClick={() => handleShowRow(obj.id)}>
									{obj.time}
								</td>
								<td
									className='position-relative text-end'
									style={{ zIndex: 1000 }}>
									<Button
										className='text-white fw-bold p-0'
										style={{
											width: "100px",
											fontSize: "12px",
										}}
										variant={
											obj.allStatus === "pending"
												? "warning"
												: "success"
										}
										onClick={
											obj.allStatus === "pending"
												? () => handleShowLinkModal(obj)
												: null
										}>
										{obj.allStatus === "pending"
											? "Aguard. doc."
											: "Concluído"}
									</Button>
								</td>
								{(obj.allStatus === "pending" ||
									obj.allStatus === "approved") && (
										<div>
											{idArray.includes(obj.id) ? (
												<Row
													className='position-absolute'
													style={{
														left: "0",
														bottom: "0",
														width: "100%",
													}}>
													<Col>
														<Col
															style={{
																color: "#B5B6B7",
															}}>
															CPF/CNPJ
														</Col>
														<Col className=''>
															<Button
																className='w-100 p-0'
																variant='outline-success'>
																<i class='bi bi-check-lg fs-2'></i>
																<h6
																	style={{
																		color: "#C4CCD2",
																		fontSize:
																			"11px",
																	}}>
																	Já aprovada,
																	visualizar?
																</h6>
															</Button>
														</Col>
													</Col>
													<Col>
														<Col
															style={{
																color: "#B5B6B7",
															}}>
															Contrato social
														</Col>
														<Col>
															{obj?.socialContract ===
																null && (
																	<Button
																		className='w-100 p-0 ms-0'
																		onClick={() =>
																			handleShowImageModal(
																				obj,
																				"socialContract"
																			)
																		}
																		variant='outline-secondary'>
																		<label
																			style={{
																				rotate: "45deg",
																			}}>
																			<i class='bi bi-paperclip fs-2'></i>
																		</label>
																		<h6
																			style={{
																				color: "#C4CCD2",
																				fontSize:
																					"11px",
																			}}>
																			Arraste e
																			solte aqui
																			ou importe
																			dos seus
																			arquivos
																		</h6>
																	</Button>
																)}
															{obj?.socialContract &&
																!obj?.socialContract
																	?.approved && (
																	<Button
																		className='w-100 p-0 ms-0'
																		onClick={() =>
																			handleShowImageModal(
																				obj,
																				"socialContract"
																			)
																		}
																		variant='outline-warning'>
																		<i class='bi bi-clock-fill fs-2'></i>

																		<h6
																			style={{
																				color: "#C4CCD2",
																				fontSize:
																					"11px",
																			}}>
																			Aguardando
																			análise,
																			visualizar?
																		</h6>
																	</Button>
																)}

															{obj?.socialContract &&
																obj?.socialContract
																	?.approved && (
																	<Button
																		className='w-100 p-0 ms-0'
																		onClick={() =>
																			handleShowImageModal(
																				obj,
																				"socialContract"
																			)
																		}
																		variant='outline-success'>
																		<i class='bi bi-check-lg fs-2'></i>

																		<h6
																			style={{
																				color: "#C4CCD2",
																				fontSize:
																					"11px",
																			}}>
																			Aguardando
																			análise,
																			visualizar?
																		</h6>
																	</Button>
																)}
														</Col>
													</Col>
													<Col>
														<Col
															style={{
																color: "#B5B6B7",
															}}>
															Comprovante de
															residência
														</Col>
														<Col>
															{obj?.addressProof ===
																null && (
																	<Button
																		className='w-100 p-0 ms-0'
																		onClick={() =>
																			handleShowAddressModal(
																				obj,
																				"addressProof"
																			)
																		}
																		variant='outline-secondary'>
																		<label
																			style={{
																				rotate: "45deg",
																			}}>
																			<i class='bi bi-paperclip fs-2'></i>
																		</label>
																		<h6
																			style={{
																				color: "#C4CCD2",
																				fontSize:
																					"11px",
																			}}>
																			Arraste e
																			solte aqui
																			ou importe
																			dos seus
																			arquivos
																		</h6>
																	</Button>
																)}
															{obj?.addressProof &&
																!obj?.addressProof
																	?.approved && (
																	<Button
																		className='w-100 p-0 ms-0'
																		onClick={() =>
																			handleShowAddressModal(
																				obj,
																				"addressProof"
																			)
																		}
																		variant='outline-warning'>
																		<i class='bi bi-clock-fill fs-2'></i>

																		<h6
																			style={{
																				color: "#C4CCD2",
																				fontSize:
																					"11px",
																			}}>
																			Aguardando
																			análise,
																			visualizar?
																		</h6>
																	</Button>
																)}

															{obj?.addressProof &&
																obj?.addressProof
																	?.approved && (
																	<Button
																		className='w-100 p-0 ms-0'
																		onClick={() =>
																			handleShowAddressModal(
																				obj,
																				"addressProof"
																			)
																		}
																		variant='outline-success'>
																		<i class='bi bi-check-lg fs-2'></i>

																		<h6
																			style={{
																				color: "#C4CCD2",
																				fontSize:
																					"11px",
																			}}>
																			Aguardando
																			análise,
																			visualizar?
																		</h6>
																	</Button>
																)}
														</Col>
													</Col>

													<Row>
														<Col
															className='d-flex justify-content-center mt-2 ms-4'
															style={{
																color: "#C4CCD2",
																fontSize: "12px",
															}}>
															Responsável por esse
															cliente: Renata
															Vasconcelos
														</Col>
													</Row>
												</Row>
											) : (
												""
											)}
										</div>
									)}
							</tr>
						))}
					</tbody>
				) : (
					<RecordFound label='Nenhum Registro Encontrado' />
				)}
				{openImageModal && (
					<ImageUploadModal
						open={openImageModal}
						handleClose={() => setOpenImageModal(false)}
						document={document}
						refresh={refresh}
						setRefresh={setRefresh}
					/>
				)}
				{openAddressModal && (
					<AddressProofModal
						open={openAddressModal}
						handleClose={() => setOpenAddressModal(false)}
						document={addDocument}
						refresh={refresh}
						setRefresh={setRefresh}
					/>
				)}
				{openLinkModal && (
					<GenerateLinkModal
						open={openLinkModal}
						handleClose={() => setOpenLinkModal(false)}
						editData={editData}
						refresh={refresh}
						setRefresh={setRefresh}
					/>
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

export default DocumentTable;
