import React, { FC, useEffect } from "react";
import Input from "../../components/Input";
import "./RegisterForm.css";

const validations: any = {
  username: {
    minlength: {
      value: 8,
      message: "username must be 8 characters and above",
    },
  },
  password: {
    minlength: {
      value: 8,
      message: "password must be 8 characters and above",
    },
  },
  confirmPass: {
    custom: {
      isValid: (touched: any, data: any) => {
        return (
          (touched.password || touched.confirmPass) &&
          data.password !== data.confirmPass
        );
      },
      message: "confirm password should be equal to the password",
    },
  },
};

interface RegisterFormProps {}

const RegisterForm: FC<RegisterFormProps> = () => {
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
    for (const key in validations) {
      const value = data[key];
      const validation = validations[key];

      // Min length validation
      if (validation?.minlength?.value) {
        if (
          touched[key] &&
          (!value || value.length < validation.minlength.value)
        ) {
          setErrors((prevErrors: any) => ({
            ...prevErrors,
            [key]: validation.minlength.message,
          }));
        } else {
          setErrors((prevErrors: any) => ({
            ...prevErrors,
            [key]: null,
          }));
        }
      }

      // Custom validation
      if (validation?.custom?.isValid) {
        if (touched[key] && validation.custom.isValid(touched, data)) {
          setErrors((prevErrors: any) => ({
            ...prevErrors,
            [key]: validation.custom.message,
          }));
        } else {
          setErrors((prevErrors: any) => ({
            ...prevErrors,
            [key]: null,
          }));
        }
      }
    }
  }, [data, touched]);

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
      <ul>
        {Object.keys(errors).map((key: string) => {
          return errors[key] ? <li key={key}>{errors[key]}</li> : null;
        })}
      </ul>
      <form className="registration-wrapper">
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
};

export default RegisterForm;
