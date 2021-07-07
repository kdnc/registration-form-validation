import React, { useState, useEffect } from "react";
import Input from "./components/Input";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [touched, setTouched] = React.useState<any>({});
  const [errors, setErrors] = React.useState<any>({
    username: null,
    password: null,
    confirmPass: null,
  });

  const isFormInvalid = Object.keys(errors).some(
    (key: string) => !!errors[key]
  );

  useEffect(() => {
    if (touched.username && (!username || username.length < 8)) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        username: "username must be 8 characters and above",
      }));
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        username: null,
      }));
    }

    if (touched.password && (!password || password.length < 8)) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        password: "password must be 8 characters and above",
      }));
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        password: null,
      }));
    }

    if ((touched.password || touched.confirmPass) && password !== confirmPass) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        confirmPass: "confirm password should be equal to the password",
      }));
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        confirmPass: null,
      }));
    }
  }, [username, password, confirmPass, touched]);

  return (
    <>
      {Object.keys(errors).map((key: string) => {
        return <div>{errors[key]}</div>;
      })}
      <form>
        <Input
          label="Username"
          inputType="text"
          onInputChange={(inputValue: string) => {
            setTouched({
              ...touched,
              username: true,
            });
            setUsername(inputValue);
          }}
        />
        <Input
          label="Password"
          inputType="password"
          onInputChange={(inputValue: string) => {
            setTouched({
              ...touched,
              password: true,
            });
            setPassword(inputValue);
          }}
        />
        <Input
          label="Confirm password"
          inputType="password"
          onInputChange={(inputValue: string) => {
            setTouched({
              ...touched,
              confirmPass: true,
            });
            setConfirmPass(inputValue);
          }}
        />
        <button type="submit" disabled={isFormInvalid}>
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
