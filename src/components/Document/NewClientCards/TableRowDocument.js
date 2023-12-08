import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import AbcCurve from "./AbcCurve";
import BalanceIncome from "./BalanceIncome";
import BalanceSheet from "./BalanceSheet";
import BillingCustomer from "./BillingCustomer";
import CnpjNumber from "./CnpjNumber";
import CompanyPhotos from "./CompanyPhotos";
import CpfNumber from "./CpfNumber";
import ExtractBusiestBank from "./ExtractBusiestBank";
import PartnerDocument from "./PartnerDocument";
import ProofOfAddress from "./ProofOfAddress";
import SpouseDocument from "./SpouseDocument";
import UpdatedBankDebt from "./UpdatedBankDebt";
import PartnerIncome from "./PartnerIncome";

const TableRowDocument = ({ data, images, handleFileChange }) => {
	return (
		<>
			<CpfNumber images={images} handleFileChange={handleFileChange} />
			<CnpjNumber images={images} handleFileChange={handleFileChange} />

			<ProofOfAddress
				images={images}
				handleFileChange={handleFileChange}
			/>

			<BalanceIncome
				images={images}
				handleFileChange={handleFileChange}
			/>

			<BalanceSheet images={images} handleFileChange={handleFileChange} />

			<BillingCustomer
				images={images}
				handleFileChange={handleFileChange}
			/>

			<PartnerIncome
				images={images}
				handleFileChange={handleFileChange}
			/>

			<UpdatedBankDebt
				images={images}
				handleFileChange={handleFileChange}
			/>

			<PartnerDocument
				images={images}
				handleFileChange={handleFileChange}
			/>

			<SpouseDocument
				images={images}
				handleFileChange={handleFileChange}
			/>

			<CompanyPhotos
				images={images}
				handleFileChange={handleFileChange}
			/>

			<ExtractBusiestBank
				images={images}
				handleFileChange={handleFileChange}
			/>

			<AbcCurve images={images} handleFileChange={handleFileChange} />
		</>
	);
};

export default TableRowDocument;
