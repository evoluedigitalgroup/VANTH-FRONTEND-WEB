import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<>
			<Row>
				<Col className='frame-img d-flex align-items-center flex-column'>
					<img src='/assets/img/error.png' className='img m-2' />
					<Button
						className='my-5 btn-bg'
						onClick={() => navigate(-1)}>
						Voltar
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default ErrorPage;
