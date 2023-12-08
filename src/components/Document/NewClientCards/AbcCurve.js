import React, { useRef } from "react";
import { Button, Col } from "react-bootstrap";
import Dropzone from "react-dropzone";

const AbcCurve = ({ data, images, handleFileChange }) => {
	const inputRef = useRef(null);

	const hiddenFileInput = useRef(null);

	const handleClick = (event) => {
		hiddenFileInput.current.click();
	};

	return (
		<>
			<Col md={4} style={{ margin: '1rem 0rem' }} xs={12} onClick={handleClick}>
				{/* <Dropzone
					onDrop={(acceptedFiles, rejected, e) => {
						handleFileChange(acceptedFiles, rejected, inputRef.current.name);
					}}>
					{({ getRootProps, getInputProps }) => (
						<section className='wfp--dropzone'>
							<div
								{...getRootProps({
									className: "wfp--dropzone__input",
								})}>
								<input
									{...getInputProps()}
									accept={".pdf"}
									name='abcCurve'
									type='file'
									ref={inputRef}
								/> */}
				<div
					style={{
						height: "0px",
						width: "0px",
						overflow: "hidden",
					}}>
					<input
						id='upfile'
						type='file'
						accept={".pdf"}
						name='abcCurve'
						ref={hiddenFileInput}
						onChange={(e) => handleFileChange(e)}
						style={{ display: "none" }}
					/>
				</div>
				<h6
					style={{
						color: "#B5B6B7",
					}}>
					Curva ABC
				</h6>
				{images?.abcCurve ? (
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
							Aguardando análise, visualizar?
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
				{/* </div>
						</section>
					)}
				</Dropzone> */}
			</Col>
		</>
	);
};

export default AbcCurve;
