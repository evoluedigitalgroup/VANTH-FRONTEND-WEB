import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

const ModalCardRow = ({ handleClose, editData, switchesData }) => {
	return (
		<div>
			<Row className='p-3 px-4'>
				<Col md={10} xs={9}>
					<h5 className='fw-bolder'>
						Link para solicitação de documentos
					</h5>
				</Col>
				<Col className='text-end'>
					<img
						style={{ cursor: "pointer" }}
						onClick={handleClose}
						src='assets/img/close.png'></img>
				</Col>
			</Row>
			<Row className='px-4'>
				<Col md={12}>
					<h6>Documentos já enviados e aprovados</h6>
				</Col>
				{
					Object.keys(editData?.docs).map((key, index) => {
						if (editData?.docs[key]) {
							if (editData?.docs[key].approved) {
								return (
									<Col md={6} key={index}>
										<img src='assets/img/right1.png'></img>
										<span className='ps-2' style={{ fontWeight: "500" }}>
											{switchesData.find((obj) => obj.label === key)?.title}
										</span>
									</Col>
								);
							}
						}
					})
				}
			</Row>
		</div>
	);
};

export default ModalCardRow;
