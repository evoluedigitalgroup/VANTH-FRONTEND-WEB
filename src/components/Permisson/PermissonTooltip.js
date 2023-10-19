import React, { useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { toast } from "react-toastify";
import { changePermission } from "../../helper/API/Permisson";

const PermissonTooltip = ({
	show,
	target,
	ref,
	handleClose,
	editData,
	refresh,
	setRefresh,
}) => {
	// console.log("editData", editData);

	const handleAuth = () => {
		var submitData;
		if (editData.type === "contact") {
			submitData = {
				id: editData.id,
				permissions: {
					contact: true,
					document: editData.permissions.document,
					newAdmin: editData.permissions.newAdmin,
				},
			};
		} else if (editData.type === "document") {
			submitData = {
				id: editData.id,
				permissions: {
					contact: editData.permissions.contact,
					document: true,
					newAdmin: editData.permissions.newAdmin,
				},
			};
		} else {
			submitData = {
				id: editData.id,
				permissions: {
					contact: editData.permissions.contact,
					document: editData.permissions.document,
					newAdmin: true,
				},
			};
		}
		changePermission(submitData).then((res) => {
			if (res.success) {
				toast.success(res.message);
				setRefresh(refresh + 1);
				handleClose();
			} else {
				toast.error(res.message);
				handleClose();
			}
		});
	};

	const handleRemove = () => {
		var submitData;
		if (editData.type === "contact") {
			submitData = {
				id: editData.id,
				permissions: {
					contact: false,
					document: editData.permissions.document,
					newAdmin: editData.permissions.newAdmin,
				},
			};
		} else if (editData.type === "document") {
			submitData = {
				id: editData.id,
				permissions: {
					contact: editData.permissions.contact,
					document: false,
					newAdmin: editData.permissions.newAdmin,
				},
			};
		} else {
			submitData = {
				id: editData.id,
				permissions: {
					contact: editData.permissions.contact,
					document: editData.permissions.document,
					newAdmin: false,
				},
			};
		}
		// console.log("submitData", submitData);
		changePermission(submitData).then((res) => {
			if (res.success) {
				toast.success(res.message);
				setRefresh(refresh + 1);
				handleClose();
			} else {
				toast.error(res.message);
				handleClose();
			}
		});
	};

	const translator = (data) => {
		if (data === "document") {
			return "Documentos";
		} else if (data === "contact") {
			return "Contatos";
		} else {
			return "Nova conta";
		}
	};

	return (
		<div>
			<div ref={ref}>
				<Overlay
					show={show}
					target={target}
					placement='bottom'
					container={ref}
					containerPadding={10}>
					<Popover id='popover-contained'>
						<Popover.Body>
							<Row>
								<Col
									md={12}
									className='d-flex justify-content-end'>
									<img
										onClick={handleClose}
										src='assets/img/close.png'></img>
								</Col>
								<Col md={4}>
									<div
										style={{
											width: "80px",
											height: "80px",
											borderRadius: "50%",
											objectFit: "cover",
											display: "flex",
										}}>
										<img
											src={
												editData?.profileImage
													? editData?.profileImage
													: "/assets/img/noUser.png"
											}
											style={{
												width: "80px",
												borderRadius: "50%",
											}}
										/>
									</div>
								</Col>
								<Col md={8}>
									<label
										className='mt-2'
										style={{ fontSize: "12px" }}>
										Autorizar{" "}
										<span className='fw-bold'>
											{editData?.name}
										</span>{" "}
										a ter acesso aos{" "}
										<span className='fw-bold'>
											{translator(editData?.type)}
										</span>{" "}
										da empresa?
									</label>
								</Col>
							</Row>
							<Row className='gx-2'>
								<Col
									md={12}
									className='d-flex justify-content-center'>
									<hr className='w-25' />
								</Col>
								<Col md={6}>
									<Button
										variant='danger'
										onClick={handleRemove}
										className='w-100 px-0 fw-bold'
										style={{ fontSize: "14px" }}>
										<img
											style={{ marginTop: "-5px" }}
											src='/assets/img/X.png'></img>{" "}
										Não autorizar
									</Button>
								</Col>
								<Col md={6}>
									<Button
										onClick={handleAuth}
										variant='success'
										className='w-100 px-0 fw-bold'
										style={{ fontSize: "14px" }}>
										<img src='/assets/img/Right.png'></img>{" "}
										Autorizar
									</Button>
								</Col>
							</Row>
						</Popover.Body>
					</Popover>
				</Overlay>
			</div>
		</div>
	);
};

export default PermissonTooltip;
