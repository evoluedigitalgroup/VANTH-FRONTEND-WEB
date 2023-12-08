import React from "react";
import { Button, Col } from "react-bootstrap";

const CpfNumber = ({ obj, handleShowImageModal }) => {
	return (
		// <Col
		// 	md={4}
		// 	style={{
		// 		margin: "1rem 0rem",
		// 	}}>
		// 	<Col
		// 		style={{
		// 			color: "#B5B6B7",
		// 		}}>
		// 		CPF
		// 	</Col>
		// 	<Col className=''>
		// 		<Button className='w-100 p-0' variant='outline-success'>
		// 			<i class='bi bi-check-lg fs-2'></i>
		// 			<h6
		// 				style={{
		// 					color: "#C4CCD2",
		// 					fontSize: "11px",
		// 				}}>
		// 				Já aprovada, visualizar?
		// 			</h6>
		// 		</Button>
		// 	</Col>
		// </Col>
		<Col
			md={4}
			style={{
				margin: "1rem 0rem",
			}}>
			<Col
				style={{
					color: "#B5B6B7",
				}}>
				CPF
			</Col>
			<Col>
				{obj?.CPFDOC === null && !obj?.docStatus?.CPFDOC && (
					<Button
						className='w-100 p-0 ms-0'
						onClick={
							obj?.CPFDOC === null
								? null
								: () => handleShowImageModal(obj, "CPFDOC")
						}
						variant='outline-secondary'>
						<label
							style={{
								rotate: "45deg",
							}}>
							<i className='bi bi-paperclip fs-2'></i>
						</label>
						<h6
							style={{
								color: "#C4CCD2",
								fontSize: "11px",
							}}>
							Arraste e solte aqui ou importe dos seus arquivos
						</h6>
					</Button>
				)}
				{obj?.CPFDOC && !obj?.CPFDOC?.approved && (
					<Button
						className='w-100 p-0 ms-0'
						onClick={
							obj?.CPFDOC === null
								? null
								: () => handleShowImageModal(obj, "CPFDOC")
						}
						variant='outline-warning'>
						<i className='bi bi-clock-fill fs-2'></i>

						<h6
							style={{
								color: "#C4CCD2",
								fontSize: "11px",
							}}>
							Aguardando análise, visualizar?
						</h6>
					</Button>
				)}

				{obj?.CPFDOC && obj?.CPFDOC?.approved && (
					<Button
						className='w-100 p-0 ms-0'
						onClick={
							obj?.abcCurve === null
								? null
								: () => handleShowImageModal(obj, "CPFDOC")
						}
						variant='outline-success'>
						<i className='bi bi-check-lg fs-2'></i>

						<h6
							style={{
								color: "#C4CCD2",
								fontSize: "11px",
							}}>
							Já aprovada, visualizar?
						</h6>
					</Button>
				)}
				{obj?.CPFDOC === null && obj?.docStatus?.CPFDOC && (
					<Button
						className='w-100  p-0 ms-0 reject-card'
						onClick={
							obj?.CPFDOC === null
								? null
								: () => handleShowImageModal(obj, "CPFDOC")
						}
						// variant='outline-danger'
						style={{ border: "1px solid #E97F1E" }}>
						<i className='bi bi-x-lg fs-2 fw-bold rejected-cross'></i>
						{/* <img style={{ height: '50px' }} src="assets/img/raject.org.png" /> */}
						<h6
							style={{
								color: "#C4CCD2",
								fontSize: "11px",
							}}>
							Aguardando reenvio de documentação
						</h6>
					</Button>
				)}
			</Col>
		</Col>
	);
};

export default CpfNumber;
