import React from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileAtom, afterAuthRedirect } from "../recoil/Atoms";
import { setRedirectAfterAuth } from "../recoil/helpers/redirectHelper";

function Protected(props) {
	const setAfterAuthRedirect = useSetRecoilState(afterAuthRedirect);
	const location = useLocation();

	const { Component, requiredPlan, captureUrlToRedirect } = props;
	const profile = useRecoilValue(profileAtom);
	const navigate = useNavigate();
	useEffect(() => {
		console.log('location : ', location)

		let login = localStorage.getItem("login");

		if (!login) {

			if (captureUrlToRedirect) {
				setAfterAuthRedirect(setRedirectAfterAuth(location.pathname));
			}

			navigate("/login");
		}

		if (requiredPlan) {
			if (!profile?.companyData?.selectedPlan) {
				navigate("/profile/my-plan")
			}
		}

		// else{
		//   navigate('/Insights')
		// }
	}, [profile]);
	return <Component />;
}

export default Protected;
