import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { LINK_URL } from "../../config";
import { generateLink } from "../../helper/API/contact";
import copy from "copy-to-clipboard";

const GenerateLinkModal = ({
	open,
	handleClose,
	editData,
	refresh,
	setRefresh,
}) => {
	const [copyText, setCopyText] = useState(false);
	const [formValues, setFormValues] = useState({
		CPF: true,
		socialContract: true,
		proofOfAddress: true,
		CNPJ: true,
	});

	const link = `${LINK_URL}${editData.id}/${editData.documentRequest.id}`;
	// console.log("link", link);

	const handleCheck = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.checked,
		});
	};

	const submitForm = () => {
		const submitData = {
			permission: {
				...formValues,
			},
			contactId: editData.id,
			requestId: editData.documentRequest.id,
			generateLink: link,
		};
		generateLink(submitData).then((res) => {
			if (res.success) {
				setRefresh(refresh + 1);
				toast.success(res.message);
				copy(link);
				handleClose();
			} else {
				toast.error(res.message);
			}
		});
	};

	// const handleCopy = (code) => {
	// 	if (code) {
	// 		copy(code);
	// 		setCopyText(true);
	// 		setTimeout(() => {
	// 			setCopyText(false);
	// 			console.log("called time out");
	// 		}, 1000);
	// 	}
	// };

	return (
		<div>
			<Modal
				className='d-flex mt-5 align-items-center zindex'
				show={open}
				onHide={handleClose}>
				<Row className='p-3 px-4 mt-2'>
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
				<Row className='flex-column px-4'>
					<Col>
						<h6>De quais documentos você precisa?</h6>
					</Col>
					<Col className='mt-2 '>
						<Form className='d-flex align-items-center'>
							<Form.Check
								className='chack-item input-check fs-5 border-0'
								type='switch'
								id='custom-switch'
								checked
								name='CPF'
								defaultChecked={formValues.cpf}
							/>
							<label>CPF</label>
						</Form>
					</Col>
					<Col className='mt-2 '>
						<Form className='d-flex align-items-center'>
							<Form.Check
								className='chack-item input-check fs-5 border-0'
								type='switch'
								id='custom-switch'
								checked
								name='CNPJ'
								defaultChecked={formValues.cnpj}
							/>
							<label>CNPJ</label>
						</Form>
					</Col>
					<Col className='mt-2 '>
						<Form className='d-flex align-items-center'>
							<Form.Check
								className='fs-5 border-0 input-check'
								type='switch'
								id='custom-switch'
								name='socialContract'
								onChange={handleCheck}
								defaultChecked={formValues.socialContract}
							/>
							<label>Contrato social</label>
						</Form>
					</Col>
					<Col className='mt-2 '>
						<Form className='d-flex align-items-center'>
							<Form.Check
								className='fs-5 border-0 input-check'
								type='switch'
								id='custom-switch'
								name='proofOfAddress'
								onChange={handleCheck}
								defaultChecked={formValues.proofOfAddress}
							/>
							<label>Comprovante de residência</label>
						</Form>
					</Col>
					<Col className='mt-3'>
						<h6>Link para compartilhar com o cliente</h6>
					</Col>
					<Col className='p-2'>
						<InputGroup className='border-0 rounded '>
							<Form.Control
								className='border-0 p-3 fw-bold'
								value={link}
							/>
							{/* <InputGroup.Text
								id='basic-addon2'
								className='border-0 c-point fw-normal'
								style={{ color: "#85A6A2" }}
								onClick={() => handleCopy(link)}>
								{copyText ? "Copiada" : "Copiar"}
							</InputGroup.Text> */}
						</InputGroup>
					</Col>
					<Col className='my-4 w-100 d-flex justify-content-center'>
						<Button
							className='border-0'
							style={{ background: "#1C3D59" }}
							onClick={submitForm}>
							{/* Encaminhar */}
							Copiar
						</Button>
					</Col>
				</Row>
			</Modal>
		</div>
	);
};

export default GenerateLinkModal;
