import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { profileAtom } from "../recoil/Atoms";

function Protected(props) {
	const { Component, requiredPlan } = props;
	const profile = useRecoilValue(profileAtom);
	const navigate = useNavigate();
	useEffect(() => {
		let login = localStorage.getItem("login");

		if (!login) {
			navigate("/login");
		}

		if (requiredPlan) {
			if (!profile?.companyData?.selectedPlan) {
				navigate("/perfil/my-plan")
			}
		}

		// else{
		//   navigate('/Insights')
		// }
	}, [profile]);
	return <Component />;
}

export default Protected;
