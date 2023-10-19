import React, { useEffect, useRef, useState, useMemo } from "react";
import Button from "react-bootstrap/Button";

import Table from "react-bootstrap/Table";
import Pagination from "../Pagination";
import RecordFound from "../RecordFound";
import PermissonTooltip from "./PermissonTooltip";

const data = [
	{
		id: 1,
		first_name: "Jessamyn",
		last_name: "Espinazo",
		email: "jespinazo0@chicagotribune.com",
		phone: "162-166-0977",
	},
	{
		id: 2,
		first_name: "Isac",
		last_name: "Tooher",
		email: "itooher1@psu.edu",
		phone: "655-567-3619",
	},
	{
		id: 3,
		first_name: "Tabbatha",
		last_name: "Proschke",
		email: "tproschke2@weibo.com",
		phone: "327-612-4850",
	},
	{
		id: 4,
		first_name: "Ninetta",
		last_name: "Mabb",
		email: "nmabb3@canalblog.com",
		phone: "971-296-0911",
	},
	{
		id: 5,
		first_name: "Danni",
		last_name: "Wallentin",
		email: "dwallentin4@comcast.net",
		phone: "983-297-0506",
	},
	{
		id: 6,
		first_name: "Neely",
		last_name: "Purkins",
		email: "npurkins5@mediafire.com",
		phone: "379-119-4237",
	},
	{
		id: 7,
		first_name: "Jessika",
		last_name: "Kinkaid",
		email: "jkinkaid6@eventbrite.com",
		phone: "771-888-6284",
	},
	{
		id: 8,
		first_name: "Julianna",
		last_name: "Swindall",
		email: "jswindall7@aol.com",
		phone: "252-614-0486",
	},
	{
		id: 9,
		first_name: "Corrinne",
		last_name: "Geeve",
		email: "cgeeve8@wisc.edu",
		phone: "450-872-8646",
	},
	{
		id: 10,
		first_name: "Trumann",
		last_name: "Flux",
		email: "tflux9@census.gov",
		phone: "249-892-1585",
	},
	{
		id: 11,
		first_name: "Annalise",
		last_name: "Keinrat",
		email: "akeinrata@i2i.jp",
		phone: "659-283-4601",
	},
	{
		id: 12,
		first_name: "Cal",
		last_name: "Haverson",
		email: "chaversonb@multiply.com",
		phone: "689-567-9516",
	},
	{
		id: 13,
		first_name: "Erik",
		last_name: "McGillivrie",
		email: "emcgillivriec@theglobeandmail.com",
		phone: "334-579-0995",
	},
	{
		id: 14,
		first_name: "Cherilyn",
		last_name: "Tuddenham",
		email: "ctuddenhamd@indiegogo.com",
		phone: "408-721-4575",
	},
	{
		id: 15,
		first_name: "Merola",
		last_name: "MacDowal",
		email: "mmacdowale@omniture.com",
		phone: "863-234-5628",
	},
	{
		id: 16,
		first_name: "Olenolin",
		last_name: "O'Shiels",
		email: "ooshielsf@smh.com.au",
		phone: "646-127-1652",
	},
	{
		id: 17,
		first_name: "Donnie",
		last_name: "Oliphant",
		email: "doliphantg@i2i.jp",
		phone: "975-457-5826",
	},
	{
		id: 18,
		first_name: "Carly",
		last_name: "Bulleyn",
		email: "cbulleynh@fc2.com",
		phone: "938-211-6682",
	},
	{
		id: 19,
		first_name: "Walt",
		last_name: "Meace",
		email: "wmeacei@printfriendly.com",
		phone: "688-775-4039",
	},
	{
		id: 20,
		first_name: "Debbie",
		last_name: "Rockhall",
		email: "drockhallj@weebly.com",
		phone: "120-270-4052",
	},
];

const PermissonTable = ({ tableRow, refresh, setRefresh }) => {
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);
	const [editData, setEditData] = useState(null);
	const [tableData, setTableData] = useState(tableRow);

	const ref = useRef(null);
	let PageSize = 10;
	useEffect(() => {
		setTableData(tableRow);
	}, [tableRow]);

	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return tableData.slice(firstPageIndex, lastPageIndex);
	}, [currentPage]);

	const handleClick = (event, val, type, prmsn) => {
		// console.log("id", type);
		setShow(!show);
		setTarget(event.target);
		setEditData({
			...val,
			type,
			prmsn,
		});
	};

	const handleClose = () => {
		setShow(false);
	};

	// console.log(tableRow);
	return (
		<div>
			<Table
				className='p-3 table-fit text-wrap tbl-color-text'
				responsive>
				{currentTableData.length ? (
					<thead>
						<tr>
							<th className='tbl-head-color' width={"25%"}>
								Nome{" "}
							</th>
							<th className='tbl-head-color'>Email/Telefone </th>
							<th className='tbl-head-color'>Função </th>
							<th className='tbl-head-color'>Contatos</th>
							<th className='tbl-head-color'>Documentos</th>
							<th className='tbl-head-color'>Nova conta </th>
						</tr>
					</thead>
				) : (
					""
				)}
				{currentTableData.length ? (
					<tbody>
						{currentTableData.map((val, i) => {
							return (
								<tr key={i} style={{ fontSize: "14px" }}>
									<td className='fw-bold'>{val.name}</td>
									<td>{val.email}</td>
									<td>{val.designation}</td>
									<td>
										{val.permissions.contact ? (
											<Button
												onClick={(e) =>
													handleClick(
														e,
														val,
														"contact",
														true
													)
												}
												variant=' success'
												size='lg'
												style={{ fontSize: "14px" }}
												className='p-0 fw-bolder text-success border-0'>
												<span className='d-flex align-items-center'>
													<img
														src='/assets/img/right 2.png'
														className='px-1'
													/>
													Autorizar
												</span>
											</Button>
										) : (
											<Button
												onClick={(e) =>
													handleClick(
														e,
														val,
														"contact",
														false
													)
												}
												variant='danger'
												size='lg'
												style={{ fontSize: "14px" }}
												className='p-0 fw-bolder text-danger button-red'>
												<span
													className='d-flex align-items-center'
													style={{
														color: "#A43D3D",
													}}>
													<img
														src='/assets/img/wrong.png'
														className='px-1'
													/>
													Remover
												</span>
											</Button>
										)}
									</td>

									<td>
										{val.permissions.document ? (
											<Button
												onClick={(e) =>
													handleClick(
														e,
														val,
														"document",
														true
													)
												}
												variant=' success'
												size='lg'
												style={{ fontSize: "14px" }}
												className='align-items-center d-flex p-0 fw-bolder text-success  border-0'>
												<img
													src='/assets/img/right 2.png'
													className='px-1'
												/>
												Autorizar
											</Button>
										) : (
											<Button
												onClick={(e) =>
													handleClick(
														e,
														val,
														"document",
														false
													)
												}
												variant='danger'
												size='lg'
												style={{
													color: "#A43D3D",
													fontSize: "14px",
												}}
												className='p-0 fw-bolder       align-items-center d-flex button-red'>
												<img
													src='/assets/img/wrong.png'
													className='px-1'
												/>
												Remover
											</Button>
										)}
									</td>
									<td>
										{val.permissions.newAdmin ? (
											<Button
												onClick={(e) =>
													handleClick(
														e,
														val,
														"admin",
														true
													)
												}
												variant=' success'
												size='lg'
												style={{ fontSize: "14px" }}
												className='p-0 fw-bolder text-success  border-0'>
												<span className='d-flex align-items-center'>
													<img
														src='/assets/img/right 2.png'
														className='px-1'
													/>
													Autorizar
												</span>
											</Button>
										) : (
											<Button
												onClick={(e) =>
													handleClick(
														e,
														val,
														"admin",
														false
													)
												}
												variant='danger'
												size='lg'
												style={{ fontSize: "14px" }}
												className='p-0 fw-bolder text-danger button-red'>
												<span
													className='d-flex align-items-center'
													style={{
														color: "#A43D3D",
													}}>
													<img
														src='/assets/img/wrong.png'
														className='px-1'
													/>
													Remover
												</span>
											</Button>
										)}
										<PermissonTooltip
											show={show}
											target={target}
											ref={ref}
											handleClose={handleClose}
											editData={editData}
											refresh={refresh}
											setRefresh={setRefresh}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				) : (
					<RecordFound label='Nenhum Registro Encontrado' />
				)}
			</Table>
			<Pagination
				className='pagination-bar'
				currentPage={currentPage}
				totalCount={tableData.length}
				pageSize={PageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
};

export default PermissonTable;
