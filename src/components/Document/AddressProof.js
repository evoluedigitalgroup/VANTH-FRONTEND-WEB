import { Button } from "bootstrap";
import React from "react";
import { Col } from "react-bootstrap";

const AddressProof = ({
	handleShowAddressModal,
	obj,
	handlePending2,
	handlePendingAddress,
}) => {
	return (
		<div>
			<Col>
				<Col
					style={{
						color: "#B5B6B7",
					}}>
					Comprovante de residência
				</Col>
				<Col>
					<Button
						className='w-100 p-0'
						// variant={handlePending2(obj)}
						onClick={() =>
							handleShowAddressModal(obj, "addressProof")
						}>
						{/* <label
																	style={{
																		rotate: "45deg",
																	}}>
																	<i class='bi bi-paperclip fs-1'></i>
																</label> */}
						{/* {handlePendingAddress(obj) === "outline-success" && ( */}
						<i class='bi bi-check-lg fs-1'></i>
						{/* )}
						{handlePendingAddress(obj) === "outline-warning" && (
							<i class='bi bi-clock-fill fs-1'></i>
						)}
						{handlePendingAddress(obj) === "outline-secondary" && (
							<label
								style={{
									rotate: "45deg",
								}}>
								<i class='bi bi-paperclip fs-1'></i>
							</label>
						)} */}
						<h6
							style={{
								color: "#C4CCD2",
								fontSize: "11px",
							}}>
							Arraste e solte aqui ou importe dos seus arquivos
						</h6>
					</Button>
				</Col>
			</Col>
		</div>
	);
};

export default AddressProof;
