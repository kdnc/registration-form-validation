import React, { useEffect } from "react";
import Input from "./components/Input";
import "./App.css";

function App() {
  const [touched, setTouched] = React.useState<any>({
    username: false,
    password: false,
    confirmPass: false,
  });
  const [data, setData] = React.useState<any>({
    username: null,
    password: null,
    confirmPass: null,
  });
  const [errors, setErrors] = React.useState<any>({
    username: null,
    password: null,
    confirmPass: null,
  });

  const isFormInvalid = Object.keys(errors).some(
    (key: string) => !touched[key] || !!errors[key]
  );

  useEffect(() => {
    if (touched.username && (!data.username || data.username.length < 8)) {
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

    if (touched.password && (!data.password || data.password.length < 8)) {
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

    if (
      (touched.password || touched.confirmPass) &&
      data.password !== data.confirmPass
    ) {
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
  }, [data.username, data.password, data.confirmPass, touched]);

  const handleInputChange = (inputName: string, inputValue: string) => {
    setTouched({
      ...touched,
      [inputName]: true,
    });
    setData({
      ...data,
      [inputName]: inputValue,
    });
  };

  return (
    <>
      <div>{JSON.stringify(data)}</div>
      {Object.keys(errors).map((key: string) => {
        return <div>{errors[key]}</div>;
      })}
      <form>
        <Input
          label="Username"
          inputName="username"
          inputType="text"
          onInputChange={handleInputChange}
        />
        <Input
          label="Password"
          inputName="password"
          inputType="password"
          onInputChange={handleInputChange}
        />
        <Input
          label="Confirm password"
          inputName="confirmPass"
          inputType="password"
          onInputChange={handleInputChange}
        />
        <button type="submit" disabled={isFormInvalid}>
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
