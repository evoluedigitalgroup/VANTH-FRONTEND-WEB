import React from "react";
import { Button, Col } from "react-bootstrap";

const ReviewContractBtn = ({ onClick, obj, md }) => {
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
						className='px-4'
						onClick={onClick}
						style={{
							background: 'transparent',
							color: '#0068FF',
							border: "1px solid #0068FF",
							width: "100%",
						}}>
						Revisar contrato
					</Button>
				</div>
			</Col>
		</>
	);
};

export default ReviewContractBtn;
