import React from "react";

const RecordFound = ({ label }) => {
	return (
		<div>
			<div
				className='d-flex justify-content-center align-items-center border'
				style={{ height: "20vh" }}>
				<h2>{label}</h2>
			</div>
		</div>
	);
};

export default RecordFound;
