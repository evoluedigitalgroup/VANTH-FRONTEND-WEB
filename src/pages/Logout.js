import React from "react";
import { useNavigate } from "react-router-dom";
import { profileAtom } from '../recoil/Atoms';
import { useSetRecoilState } from "recoil";

const Logout = () => {
  const setProfile = useSetRecoilState(profileAtom);

  const Logouts = () => {
    setProfile("")
    let navigate = useNavigate();
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return <>{Logouts()}</>;
};

export default Logout;
