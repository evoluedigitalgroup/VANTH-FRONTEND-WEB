import React from "react";
import { Button, Col } from "react-bootstrap";
import Dropzone from "react-dropzone";

const SocialProofCard = ({ handleFileChange, images, data }) => {
	return (
		<>
			{/* {data?.socialContract === null ? ( */}
			<Col md={3} xs={12}>
				<Dropzone onDrop={handleFileChange}>
					{({ getRootProps, getInputProps }) => (
						<section className='wfp--dropzone'>
							<div
								{...getRootProps({
									className: "wfp--dropzone__input",
								})}>
								<input
									// accept={"image/*"}
									{...getInputProps()}
									accept={".pdf"}
								/>
								<h6
									style={{
										color: "#B5B6B7",
									}}>
									Contrato social
								</h6>
								{images ? (
									<Button
										className='w-100 p-0 CardBtn'
										variant='outline-warning'>
										{/* <i className='bi bi-check-lg fs-1 right-icon'></i> */}
										<i className='bi bi-clock-fill fs-1 pending-icon'></i>
										<h6
											style={{
												color: "#C4CCD2",
												fontSize: "11px",
											}}>
											Arraste e solte aqui ou importe dos
											seus arquivos
										</h6>
									</Button>
								) : (
									<Button
										className='w-100 p-0 CardBtn'
										variant='outline-secondary'>
										<label
											style={{
												rotate: "45deg",
											}}>
											<i className='bi bi-paperclip fs-1 link-icon'></i>
										</label>
										<h6
											style={{
												color: "#C4CCD2",
												fontSize: "11px",
											}}>
											Arraste e solte aqui ou importe dos
											seus arquivos
										</h6>
									</Button>
								)}
							</div>
						</section>
					)}
				</Dropzone>
			</Col>
			{/* ):""} */}
		</>
	);
};

export default SocialProofCard;
