import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";

const RegisterForm = ({
	handleRegisterForm,
	registerUser,
	hidePassword,
	hidePwd,
	hideCnfrmPassword,
	hideCnfrmPwd,
	confirmPassword,
	setConfirmPassword,
	loading,
	registerFormValues,
	getDesignaition,
}) => {
	return (
		<div>
			<form onSubmit={registerUser}>
				<Row>
					<Col md={12} className='mt-3'>
						<Form.Label className='fs-6 fw-bold'>
							Código para criação
						</Form.Label>
						<InputGroup className='mb-3'>
							<InputGroup.Text id='basic-addon1' className='p-2'>
								<i
									class='bi bi-hash'
									style={{ color: "#CED4DB" }}></i>
							</InputGroup.Text>
							<Form.Control
								placeholder=' Código que você recebeu'
								className='ps-0'
								name='code'
								onChange={handleRegisterForm}
								aria-describedby='basic-addon1'
								onBlur={getDesignaition}
							/>
						</InputGroup>

						<Form.Label className='fs-6 fw-bold'>
							Seu cargo
						</Form.Label>
						<InputGroup className='mb-3'>
							<InputGroup.Text id='basic-addon1' className='p-2'>
								<i
									class='bi bi-bag-dash-fill'
									style={{ color: "#CED4DB" }}></i>
							</InputGroup.Text>
							<Form.Control
								placeholder='Sua função'
								name='designation'
								className='ps-0'
								onChange={handleRegisterForm}
								disabled
								defaultValue={registerFormValues.designation}
								aria-describedby='basic-addon1'
							/>
						</InputGroup>

						<Form.Label className='fs-6 fw-bold'>Nome</Form.Label>
						<InputGroup className='mb-3'>
							<InputGroup.Text id='basic-addon1' className='p-2'>
								<i
									class='bi bi-person-fill'
									style={{ color: "#CED4DB" }}></i>
							</InputGroup.Text>
							<Form.Control
								placeholder='Seu primeiro e último nome'
								className='ps-0'
								name='name'
								onChange={handleRegisterForm}
								aria-describedby='basic-addon1'
							/>
						</InputGroup>

						<Form.Label className='fs-6 fw-bold'>E-mail</Form.Label>
						<InputGroup className='mb-3'>
							<InputGroup.Text id='basic-addon1' className='p-2'>
								<i
									class='bi bi-envelope'
									style={{ color: "#CED4DB" }}></i>
							</InputGroup.Text>
							<Form.Control
								placeholder='E-mail'
								className='ps-0'
								name='email'
								onChange={handleRegisterForm}
								aria-describedby='basic-addon1'
							/>
						</InputGroup>

						<Form.Label className='fs-6 fw-bold'>Senha</Form.Label>
						<InputGroup className='mb-3'>
							<InputGroup.Text id='basic-addon1' className='p-2'>
								<i
									class='bi bi-lock-fill'
									style={{ color: "#CED4DB" }}></i>
							</InputGroup.Text>
							<Form.Control
								placeholder='Sua senha'
								className='eye-logo ps-0'
								name='password'
								type={hidePassword ? "text" : "password"}
								onChange={handleRegisterForm}
								aria-describedby='basic-addon1'
							/>
							<InputGroup.Text id='basic-addon1' className='p-2'>
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

						<Form.Label className='fs-6 fw-bold'>
							Repetir senha
						</Form.Label>
						<InputGroup className='mb-3'>
							<InputGroup.Text id='basic-addon1' className='p-2'>
								<i
									class='bi bi-lock-fill'
									style={{ color: "#CED4DB" }}></i>
							</InputGroup.Text>
							<Form.Control
								placeholder='Sua senha'
								className='eye-logo ps-0'
								aria-describedby='basic-addon1'
								name='confirmPassword'
								type={hideCnfrmPassword ? "text" : "password"}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							/>
							<InputGroup.Text id='basic-addon1' className='p-2'>
								{hideCnfrmPassword && (
									<i
										class='bi bi-eye-slash-fill'
										style={{ color: "#CED4DB" }}
										onClick={hideCnfrmPwd}></i>
								)}

								{!hideCnfrmPassword && (
									<i
										class='bi bi-eye-fill'
										style={{ color: "#CED4DB" }}
										onClick={hideCnfrmPwd}></i>
								)}
							</InputGroup.Text>
						</InputGroup>
					</Col>
					<Col className='d-flex mt-1 justify-content-center'>
						<Button
							className='login-btn px-5 py-2 fw-bold fs-4'
							onClick={registerUser}
							disabled={loading}
							type='submit'>
							Criar conta
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

export default RegisterForm;
