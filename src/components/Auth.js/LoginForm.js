import React from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";

const LoginForm = ({
	formValues,
	handleForm,
	ProLogin,
	hidePassword,
	hidePwd,
	loading,
}) => {
	return (
		<div>
			<form method='POST' onSubmit={ProLogin}>
				<Row>
					<Col md={12} className='mt-4'>
						<Form.Group className='mb-3' controlId='formBasicEmail'>
							<Form.Label className='fs-5 fw-bold'>
								Email
							</Form.Label>
							<InputGroup className='mb-4'>
								<InputGroup.Text
									id='basic-addon1'
									className='p-2'>
									<i
										class='bi bi-person-fill'
										style={{ color: "#CED4DB" }}></i>
								</InputGroup.Text>
								<Form.Control
									type='text'
									name='email'
									placeholder='Email'
									onChange={handleForm}
									value={formValues.email}
									className='ps-0'
									controlId='formBasicEmail'
								/>
							</InputGroup>
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='formBasicPassword'>
							<Form.Label className='fs-5 fw-bold'>
								Senha
							</Form.Label>
							<InputGroup className='mb-4'>
								<InputGroup.Text
									id='basic-addon1'
									className='p-2'>
									<i
										class='bi bi-lock-fill'
										style={{ color: "#CED4DB" }}></i>
								</InputGroup.Text>
								<Form.Control
									placeholder='Sua senha'
									className='eye-logo ps-0'
									name='password'
									type={hidePassword ? "text" : "password"}
									value={formValues.password}
									onChange={handleForm}
								/>
								<InputGroup.Text
									id='basic-addon1'
									className='p-2'>
									{hidePassword && (
										<i
											class='bi bi-eye-slash-fill'
											style={{ color: "#CED4DB" }}
											onClick={hidePwd}></i>
									)}

									{!hidePassword && (
										<i
											class='bi bi-eye-fill'
											style={{ color: "#CED4DB" }}
											onClick={hidePwd}></i>
									)}
								</InputGroup.Text>
							</InputGroup>
						</Form.Group>
						<Form.Group
							className='mb-4'
							controlId='formBasicCheckbox'>
							<Form.Check type='checkbox' label='Lembrar' />
						</Form.Group>
					</Col>
					<Col className='d-flex mt-5 justify-content-center'>
						<Button
							className='login-btn px-5 py-2 fw-bold fs-4 d-flex align-items-center'
							type='submit'
							disabled={loading}>
							Enviar
							{loading && (
								<Spinner
									animation='grow'
									variant='light'
									className='ms-3 py-2 fw-bold fs-4'
								/>
							)}
						</Button>
					</Col>
				</Row>
			</form>
		</div>
	);
};

export default LoginForm;
