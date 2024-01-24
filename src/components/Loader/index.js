import React from "react";
import Spinner from "react-bootstrap/Spinner";
const Loader = ({ message = () => { }, showMessage = false }) => {
	return (
		<div
			className='d-flex justify-content-center align-items-center'
			style={{
				height: "20vh",
				width: showMessage ? '100%' : 'unset',
				flexDirection: showMessage ? 'column' : 'unset'
			}}>
			<Spinner animation='border' role='status' style={{ color: "#85A6A2" }}>
				<span className='visually-hidden'>Em processamento...</span>
			</Spinner>
			{showMessage ? <div className='ms-2 mt-3 h4 text-center'>{message()}</div> : null}
		</div>
	);
};

export default Loader;
