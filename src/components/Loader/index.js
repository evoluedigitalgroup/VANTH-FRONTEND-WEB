import React from "react";
import Spinner from "react-bootstrap/Spinner";
const Loader = () => {
	return (
		<div
			className='d-flex justify-content-center align-items-center'
			style={{ height: "20vh" }}>
			<Spinner animation='border' role='status' style={{ color: "#85A6A2" }}>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		</div>
	);
};

export default Loader;
