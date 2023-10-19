import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileAtom } from "../../recoil/Atoms";
import { editProfile, profileData } from "../../helper/API/Profile";
import { toast } from "react-toastify";
const ProfilePicture = ({ open, handleClose }) => {
  const hiddenFileInput = React.useRef(null);
  const [images, setImages] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const [changeImg, setChangeImg] = useRecoilState(profileAtom);

  const handleImageChange = (event) => {
    const fileUploaded = event.target.files[0];
    if (event.target.files[0]) {
      setImages(event.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePreview(reader.result);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    hiddenFileInput.current.click();
  };

  const onEditProfile = () => {
    const formData = new FormData();
    formData.append("name", changeImg.name);
    formData.append("avatar", images);

    editProfile(formData).then((res) => {
      if (res.success) {
        profileData().then((res) => {
          if (res.success) {
            setChangeImg(res.data);
          }
        });
        toast.success(res.message);
        handleClose();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <Modal
        className="zindex mt-5"
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <Row>
            <Col className=" fs-5 my-3 ms-3 " style={{ fontWeight: 900 }}>
              Alterar foto
            </Col>
            <Col className="d-flex justify-content-end mb-2">
              <Button
                onClick={handleClose}
                className="border-0 text-dark p-0 mx-2 fs-4 bg-white"
              >
                <img
                  src="assets/img/close.png"
                  style={{ objectFit: "cover" }}
                ></img>
              </Button>
            </Col>
          </Row>
          <Row className="text-center">
            <Col
              sm={12}
              md={12}
              style={{ color: "#B5B6B7" }}
              className="d-flex justify-content-center"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={
                      changeImg.profileImage
                        ? changeImg.profileImage
                        : "assets/img/noUser.png"
                    }
                    style={{
                      height: "257px",
                      width: "257px",
                      borderRadius: "10px",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      marginTop: "1rem",
                    }}
                  >
                    {!imagePreview && (
                      <span>
                        <img src="assets/img/proImg.png"></img>
                      </span>
                    )}
                    {imagePreview && (
                      <img
                        src={
                          imagePreview
                            ? imagePreview
                            : "/assets/images/uploadImg.png"
                        }
                        className="imgPreview"
                      />
                    )}
                    <div className="yourBtn" onClick={handleClick}>
                      Selecionar dos arquivos
                    </div>
                  </div>

                  <div
                    style={{
                      height: "0px",
                      width: "0px",
                      overflow: "hidden",
                    }}
                  >
                    <input
                      id="upfile"
                      type="file"
                      ref={hiddenFileInput}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
            </Col>

            <Col className="mx-auto mb-3" sm={6}>
              <Button
                onClick={onEditProfile}
                className="fw-bolder fs-6 w-100 border-0 mt-2"
                style={{ backgroundColor: "#FC671A" }}
              >
                Atualizar
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfilePicture;
