import React from "react";
import { Button, Col } from "react-bootstrap";
import Dropzone from "react-dropzone";

const BalanceSheet = ({ obj, handleShowImageModal }) => {
	return (
		<Col
			md={4}
			style={{
				margin: "1rem 0rem",
			}}>
			<Col
				style={{
					color: "#B5B6B7",
				}}>
				Balancete 2021, 2022
			</Col>
			<Col>
				{obj?.balanceSheet === null && !obj?.docStatus?.balanceSheet && (
					<Button
						className='w-100 p-0 ms-0'
						onClick={
							obj?.balanceSheet === null
								? null
								: () =>
									handleShowImageModal(
										obj,
										"balanceSheet"
									)
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
				{obj?.balanceSheet && !obj?.balanceSheet?.approved && (
					<Button
						className='w-100 p-0 ms-0'
						onClick={
							obj?.balanceSheet === null
								? null
								: () =>
									handleShowImageModal(
										obj,
										"balanceSheet"
									)
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

				{obj?.balanceSheet && obj?.balanceSheet?.approved && (
					<Button
						className='w-100 p-0 ms-0'
						onClick={
							obj?.balanceSheet === null
								? null
								: () =>
									handleShowImageModal(
										obj,
										"balanceSheet"
									)
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
				{obj?.balanceSheet === null && obj?.docStatus?.balanceSheet && (
					<Button
						className='w-100  p-0 ms-0 reject-card'
						onClick={
							obj?.balanceSheet === null
								? null
								: () => handleShowImageModal(obj, "balanceSheet")
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

export default BalanceSheet;
