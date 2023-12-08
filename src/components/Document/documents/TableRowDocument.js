import React from "react";
import DocsBlock from "../Cards/DocsBlock";

const TableRowDocument = ({
	obj,
	handleShowImageModal,
	handleShowAddressModal,
	documentListData,
	permission,
	withInput = false,
	handleFileChange = () => { }
}) => {

	return (
		<>
			{
				documentListData.map((item, index) => {
					return permission?.[item.label] ? (
						<DocsBlock
							obj={obj}
							permission={permission}
							item={item}
							handleShowImageModal={handleShowImageModal}
							withInput={withInput}
							handleFileChange={handleFileChange}
						/>
					) : null
				})
			}
		</>
	);
};

export default TableRowDocument;
