import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
// import "./pagination.scss";
const Pagination = (props) => {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		className,
	} = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1];

	return (
		<ul
			className={classnames("pagination-container", {
				[className]: className,
			})}>
			{currentPage !== 1 ? (
				<li className='pagination-btn' onClick={onPrevious}>
					<div>
						<i className='bi bi-arrow-left-short fs-5 pagination-btn-shadow'></i>
					</div>
				</li>
			) : (
				<li className='pagination-btn opacity-50'>
					<div>
						<i className='bi bi-arrow-left-short fs-5 pagination-btn-shadow'></i>
					</div>
				</li>
			)}
			{paginationRange.map((pageNumber) => {
				if (pageNumber === DOTS) {
					return <li className='pagination-item'>&#8230;</li>;
				}

				return (
					<li
						className={
							currentPage === pageNumber
								? "active-page pagination-item"
								: "pagination-item"
						}
						onClick={() => onPageChange(pageNumber)}>
						{pageNumber}
					</li>
				);
			})}
			{currentPage !== lastPage ? (
				<li className='pagination-btn' onClick={onNext}>
					<div>
						<i className='bi bi-arrow-right-short fs-5 pagination-btn-shadow'></i>
					</div>
				</li>
			) : (
				<li className='pagination-btn opacity-50'>
					<div>
						<i className='bi bi-arrow-right-short fs-5 pagination-btn-shadow'></i>
					</div>
				</li>
			)}
		</ul>
	);
};

export default Pagination;
