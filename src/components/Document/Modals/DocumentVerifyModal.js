import React, { useRef, useState } from "react";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { approvedDocumentList } from "../../helper/API/document";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
const DocumentVerifyModal = ({
	open,
	handleClose,
	document,
	refresh,
	setRefresh,
}) => {
	const [imagePreview, setImagePreview] = useState(
		document?.addressProof?.url
	);

	const handleSubmit = (action) => {
		const submitData = {
			id: document.id,
			type: document.type,
			action,
		};
		approvedDocumentList(submitData).then((res) => {
			if (res.success) {
				toast.success(res.message);
				setRefresh(refresh + 1);
				handleClose();
			} else {
				toast.error(res.message);
			}
		});
		// console.log("submitData", submitData);
	};
	pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	function changePage(offset) {
		setPageNumber((prevPageNumber) => prevPageNumber + offset);
	}

	function previousPage() {
		changePage(-1);
	}

	function nextPage() {
		changePage(1);
	}

	return (
		<div>
			<Modal show={open} onHide={handleClose} centered className='zindex'>
				<Row className='p-3 px-3'>
					<Col md={10}>
						<h5 className='fw-bold mt-1'>
							Analisar documentos enviados
						</h5>
					</Col>
					<Col>
						<Button
							onClick={handleClose}
							className='bg-white border-0 text-dark'>
							<img src='assets/img/close.png'></img>
						</Button>
					</Col>
				</Row>
				<Row>
					<Col className='mx-4'>
						<div
							className='border position-relative rounded-2 mb-4'
							style={{ height: "360px" }}>
							<>
								<Document
									file={imagePreview}
									// options={{ workerSrc: "/pdf.worker.js" }}
									loading={"Carregando..."}
									noData='Nenhum arquivo PDF especificado.'
									onLoadSuccess={onDocumentLoadSuccess}
									className='react-pdf-doc'>
									<Page
										pageNumber={pageNumber}
										className='react-pdf-page-class'
										error='Falha ao carregar a página.'
										loading={() => {
											return (
												<>
													<div
														className='d-flex justify-content-center align-items-center'
														style={{
															height: "40vh",
														}}>
														<span className=''>
															Página de
															carregamento…
														</span>
													</div>
												</>
											);
										}}
									/>
								</Document>
								<div>
									{numPages > 1 && (
										<div className='d-flex justify-content-around align-items-center mt-3'>
											<button
												type='button'
												disabled={pageNumber <= 1}
												onClick={previousPage}
												className='btn-next-prev'>
												<i class='bi bi-caret-left-fill'></i>
											</button>
											<p className='text-center p-0 m-0'>
												Página{" "}
												{pageNumber ||
													(numPages ? 1 : "--")}{" "}
												de {numPages || "--"}
											</p>
											<button
												type='button'
												disabled={
													pageNumber >= numPages
												}
												onClick={nextPage}
												className='btn-next-prev'>
												<i className='bi bi-caret-right-fill'></i>
											</button>
										</div>
									)}
								</div>
							</>
						</div>
						<div>
							<a
								href={document?.addressProof?.url}
								target='_blank'
								style={{ textDecoration: "none" }}>
								<Button
									style={{
										position: "absolute",
										backgroundColor: "#1C3D59",
										right: "2%",
										bottom: "12%",
										zIndex: 10000,
									}}>
									<i className='bi bi-cloud-arrow-down-fill'></i>
								</Button>
							</a>
						</div>
					</Col>
				</Row>
				<Row className='px-4 gx-2 my-2'>
					<Col>
						<Button
							className='w-100 p-0 py-2 border-0'
							style={{ background: "#C4CCD2" }}
							disabled={document?.addressProof?.approved}
							onClick={() => handleSubmit("reject")}>
							<i className='bi bi-x'></i>Solicitar outra foto
						</Button>
					</Col>
					<Col>
						<Button
							className='p-0 py-2 w-100 border-0'
							style={{ backgroundColor: "#1C3D59" }}
							disabled={document?.addressProof?.approved}
							onClick={() => handleSubmit("approved")}>
							<i className='bi bi-check'></i>Aprovar documento
						</Button>
					</Col>
				</Row>
			</Modal>
		</div>
	);
};

export default DocumentVerifyModal;
