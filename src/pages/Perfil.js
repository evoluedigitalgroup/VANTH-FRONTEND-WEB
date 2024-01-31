import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import AfterAuth from "../HOC/AfterAuth";
import { useNavigate } from 'react-router-dom'
import ProfilePicture from "../components/Profile/ProfilePicture";
import ChangePassword from "../components/Profile/ChangePassword";
import AddUser from "../components/Profile/AddUser";
import ProfileCard from "../components/Profile/ProfileCard";
import { useRecoilValue } from "recoil";
import { loginAtom } from "../recoil/Atoms";
import { usageAtom } from "../recoil/UsageAtoms/Usage";

const Perfil = () => {

  const navigate = useNavigate();

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const usage = useRecoilValue(usageAtom);

  const [profilePicture, setProfilePicture] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const login = useRecoilValue(loginAtom);
  const permissions = login?.permissions;

  const showProfilePicture = () => {
    setProfilePicture(true);
  };
  const showChangePassword = () => {
    setChangePassword(true);
  };
  const showAddUser = () => {
    if (permissions.newUser) {
      if (usage?.totalUsers?.percent === 100) {
        navigate('/perfil/my-plan');
      } else {
        setAddUser(true);
      }
    }
  };

  return (
    <>
      <AfterAuth>
        <h3 className="mx-4 mx-md-5 mt-3" style={{ fontWeight: 900 }}>
          Meu perfil
        </h3>
        <ProfileCard
          showProfilePicture={showProfilePicture}
          showChangePassword={showChangePassword}
          showAddUser={showAddUser}
          permissions={permissions}
        />
        {profilePicture && (
          <ProfilePicture
            open={profilePicture}
            handleClose={() => setProfilePicture(false)}
          />
        )}
        {changePassword && (
          <ChangePassword
            open={changePassword}
            handleClose={() => setChangePassword(false)}
          />
        )}
        {addUser && (
          <AddUser open={addUser} handleClose={() => setAddUser(false)} />
        )}
      </AfterAuth>
    </>
  );
};

export default Perfil;
