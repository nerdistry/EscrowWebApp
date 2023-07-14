import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { Col, Container, Form, FormGroup, Label, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import useAuth from "../custom-hooks/useAuth";
import { toast } from "react-toastify";
import api from "../api/posts";
import userIcon from "../assets/images/user-icon.png";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const [disable, setDisable] = useState(true);
  const { currentUser } = useAuth();

  const [userInfo, setUserInfo] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  // const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userId = currentUser?.uid;
        const response = await api.get(`/user/${userId}`);
        if(response.status === "200") {setUserInfo(response.data.getaUser);}
        console.log(response.data.getaUser);

        setUsername(userInfo.username);
        setEmail(userInfo.email);
        setPhoneNo(userInfo.mobile);
        // setPhotoURL(userInfo.imageURL);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else {
          console.log(error.message);
        }
      }
    };

    getUser();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    
    //Not working yet
    try {

      await api.put("/user/edit-user/", {
        username: username,
        email: email,
        mobile: phoneNo,
      });

      await updateProfile(currentUser, {
        displayName: username,
        email: email,
        phoneNumber: phoneNo,
      });
      toast.success("Profile updated");

    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
      console.log(error.message);
    }

  };

  return (
    <Helmet title="Profile">
      <div>
        <section>
          <Container>
            <Row>
              <Col lg="8">
                <h3 className="mb-4 fw-bold">My Profile</h3>
                <Form className="billing_form" onSubmit={updateUser}>
                  <FormGroup className="form_group">
                    <Label for="username">Username</Label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Username"
                      disabled={disable}
                      value={username || ""}
                      onChange={(text) => {
                        setUsername(text.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <Label for="email">Email</Label>
                    <input
                      id="email"
                      type="text"
                      placeholder="Email"
                      disabled={disable}
                      value={email || ""}
                      onChange={(text) => {
                        setEmail(text.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <Label for="phone">Phone Number</Label>
                    <input
                      id="phone"
                      type="text"
                      placeholder="Phone Number"
                      disabled={disable}
                      value={phoneNo || ""}
                      onChange={(text) => {
                        setPhoneNo(text.target.value);
                      }}
                    />
                  </FormGroup>
                  {/* <FormGroup className="form_group">
                    <Label>Profile Photo</Label>
                    <input
                      type="file"
                      disabled={disable}
                      value={photoURL}
                      onChange={(text) => {
                        setPhotoURL(text.target.value);
                      }}
                    />
                  </FormGroup> */}

                  {disable === true ? (
                    <button
                      className="buy_button"
                      onClick={(e) => {
                        e.preventDefault();
                        setDisable(false);
                      }}
                    >
                      Enable Edit
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="buy_button"
                      onClick={(e) => {
                        setDisable(true);
                      }}
                    >
                      Update Profile
                    </button>
                  )}
                </Form>
              </Col>

              <Col lg="4 d-flex align-items-center">
                <img src={userIcon} alt="" />
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    </Helmet>
  );
};

export default Profile;
