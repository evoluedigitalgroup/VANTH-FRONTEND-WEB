import React from "react";
import { Button } from "bootstrap";

const SocialContractBtn = ({ handleShowImageModal, obj }) => {
	return (
		<>
			{obj?.socialContract === null && (
				<Button
					className='w-100 p-0 ms-0'
					onClick={() => handleShowImageModal(obj, "socialContract")}
					variant=''>
					<i class='bi bi-check-lg fs-1'></i>

					<h6
						style={{
							color: "#C4CCD2",
							fontSize: "11px",
						}}>
						Já anexada, visualizar?
					</h6>
				</Button>
			)}
			{!obj?.socialContract?.approved && (
				<Button
					className='w-100 p-0 ms-0'
					onClick={() => handleShowImageModal(obj, "socialContract")}
					variant='outline-warning'>
					<i class='bi bi-clock-fill fs-1'></i>

					<h6
						style={{
							color: "#C4CCD2",
							fontSize: "11px",
						}}>
						Aguardando análise, visualizar?
					</h6>
				</Button>
			)}
			{obj?.socialContract?.approved && (
				<Button
					className='w-100 p-0 ms-0'
					onClick={() => handleShowImageModal(obj, "socialContract")}
					variant='outline-success'>
					<label
						style={{
							rotate: "45deg",
						}}>
						<i class='bi bi-paperclip fs-1'></i>
					</label>

					<h6
						style={{
							color: "#C4CCD2",
							fontSize: "11px",
						}}>
						Aguardando análise, visualizar?
					</h6>
				</Button>
			)}
		</>
	);
};

export default SocialContractBtn;
