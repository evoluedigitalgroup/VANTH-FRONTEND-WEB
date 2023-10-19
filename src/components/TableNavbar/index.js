import React from "react";
import { Button, Form, InputGroup, Nav, Navbar } from "react-bootstrap";

const TableNavbar = ({
	children,
	title,
	setSearch,
	onEnter,
	refresh,
	setRefresh,
	search,
	setActive,
	active,
}) => {
	const onClose = () => {
		setSearch("");
		setRefresh(refresh + 1);
	};
	return (
		<div>
			<Navbar className='my-2 px-2 ps-1' expand='lg'>
				<Navbar.Brand className='fw-bolder'>
					{title}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbarScroll' />
				<Navbar.Collapse id='navbarScroll'>
					<Nav
						className='me-auto my-2 my-lg-0'
						style={{ maxHeight: "100px" }}
						navbarScroll>
						<InputGroup className='rounded-2'>
							<InputGroup.Text
								id='basic-addon1'
								className='border-0'
								style={{ background: "#F4F4F4" }}>
								<i className='bi bi-search'></i>
							</InputGroup.Text>

							<Form.Control
								type='text'
								placeholder='Procurar....'
								aria-label='Search'
								aria-describedby='basic-addon1'
								className='border-0 ps-0'
								value={search}
								name='search'
								onChange={(e) => setSearch(e.target.value)}
								onKeyPress={onEnter}
							/>
							{!search == "" && (
								<InputGroup.Text
									onClick={onClose}
									id='basic-addon2'
									className='border-0'>
									<i class='bi bi-x'></i>
								</InputGroup.Text>
							)}
						</InputGroup>
					</Nav>
					{children}
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default TableNavbar;
