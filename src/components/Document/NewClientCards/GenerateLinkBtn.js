import React from "react";
import { Button, Col } from "react-bootstrap";

const GenerateLinkBtn = ({ onClick, obj, md }) => {
	// console.log("obj", obj);
	return (
		<>
			<Col
				md={md}
				className='d-flex justify-content-end mb-2 '
				style={{
					position: "relative",
					zIndex: 1001,
				}}>
				<div>
					<h6
						style={{
							color: "#B5B6B7",
						}}
						className='mt-1'>
						ou
					</h6>
				</div>
				<div className='ps-3'>
					<Button
						className='border-0 px-4'
						onClick={onClick}
						style={{
							background: "#1C3D59",
							width: "100%",
						}}>
						Gerar link
					</Button>
				</div>
			</Col>
		</>
	);
};

export default GenerateLinkBtn;
