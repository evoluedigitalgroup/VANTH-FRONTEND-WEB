import React from "react";
import { Col, Form } from "react-bootstrap";
import { removeDocumentType } from "../../../pages/Clients/api";
import { toast } from "react-toastify";

export default function PermissionSwitch({
	label,
	name,
	defaultChecked,
	handleCheck,
	disabled,
	refreshDocumentTypes
}) {
	const onRemoveOtherInfo = async (permissionName) => {
		const keyname = permissionName.split(" ").join("_").toLowerCase();

		const permissionObj = {
			key: keyname,
			title: permissionName,
		};

		const newDocumentResult = await removeDocumentType(permissionObj);

		if (newDocumentResult.success) {
			refreshDocumentTypes()
			toast.success(newDocumentResult.message);
		} else {
			toast.error(newDocumentResult.message);
		}
	}

	return (
		<Col md={6}>
			<Form className='d-flex '>
				<Form.Check
					className='chack-item input-check fs-5 border-0'
					type='switch'
					id='custom-switch'
					name={name}
					defaultChecked={defaultChecked}
					onChange={handleCheck}
					disabled={disabled}
				/>
				<label
					style={{
						color: "#272B30",
						fontWeight: "600",
					}}>
					{label}
				</label>
				<h6 style={{ cursor: 'pointer', marginLeft: '10px', marginTop: '2px', color: '#1C3D59' }} onClick={() => onRemoveOtherInfo(label)}>X</h6>
			</Form>
		</Col>
	);
};
