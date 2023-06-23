import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Button, Form, Alert, FormGroup, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import app from "../firebase";

const PhoneLogIn = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const auth = getAuth(app); // Get the Firebase Authentication instance
  

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      console.log(number);  // log the phone number before parsing
      const phoneNumber = parsePhoneNumberFromString(number);
      if (!phoneNumber) {
        throw new Error("Phone number is not valid");
      }
      const response = await setUpRecaptha(phoneNumber.format('E.164'));
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      const verificationResult = await result.confirm(otp);
      if (verificationResult.user) {
        navigate("/home");
      } else {
        setError("Failed to verify OTP");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  


  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Phone Auth</h2>
        {error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
          <FormGroup className="mb-3" controlId="formBasicEmail">
            <PhoneInput
               country={"ke"}
              value={number}
              onChange={(value, data, event, formattedValue) => {
                setNumber(formattedValue);
              }}
              placeholder="Enter Phone Number"
            />
            <div id="recaptcha-container"></div>
          </FormGroup>
          <div className="button-right">
            <Link to="/">
              <Button color="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" color="primary">
              Send Otp
            </Button>
          </div>
        </Form>

        <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
          <FormGroup className="mb-3" controlId="formBasicOtp">
            <Input
              type="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
          </FormGroup>
          <div className="button-right">
            <Link to="/">
              <Button color="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" color="primary">
              Verify
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PhoneLogIn;
