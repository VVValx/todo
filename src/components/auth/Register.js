import React, { useState } from "react";
import Joi from "joi";
import { MdEmail } from "react-icons/md";
import { BsLockFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import Input from "../../common/Input";
import Icon from "../icon/Icon";
import Button from "../../common/Button";
import Header from "../header/Header";
import auth from "./auth.module.css";

function Register() {
  const [data, setData] = useState({
    name: "",
    password: "",
    repassword: "",
    email: "",
  });

  const [error, setError] = useState({
    name: "",
    password: "",
    repassword: "",
    email: "",
  });

  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{5,30}$"))
      .required(),
    repassword: Joi.ref("password"),
    email: Joi.string().email({ tlds: {} }).required(),
  });

  const handleInput = ({ name, value }) => {
    if (!value) return `${name} cannot be empty`;

    if (name === "name") {
      if (value.length < 5) return `${name} cannot be less than 5`;
      if (value.length > 50) return `${name} cannot be greater than 50`;
    }

    if (name === "password") {
      if (value.length < 5) return `${name} cannot be less than 5`;
      if (value.length > 30) return `${name} cannot be greater than 30`;
    }
  };

  const handleChange = ({ target: input }) => {
    const inputData = { ...data };
    const errors = { ...error };

    const errorMessage = handleInput(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    inputData[input.name] = input.value;
    setData(inputData);
    setError(errors);
  };

  const handleForm = () => {
    const { error } = schema.validate(data, { abortEarly: false });
    const errors = {};

    error && error.details.map((err) => (errors[err.path[0]] = err.message));

    if (!error) return null;

    return errors;
  };

  const handleSubmit = () => {
    const errors = handleForm();
    if (errors) return setError(errors);

    handleRegister();
  };

  const handleRegister = () => {};

  return (
    <div className={auth.container}>
      <Header label="Sign up" className={auth.header} />

      <div className={auth.formInput}>
        <Input
          name="name"
          value={data.name}
          onChange={handleChange}
          error={error}
        />
        <Icon
          label={<FaUser />}
          myClass={auth.icon}
          style={error.name && { top: "31%", verticalAlign: "middle" }}
        />
      </div>

      <div className={auth.formInput}>
        <Input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={error}
        />

        <Icon
          label={<BsLockFill />}
          myClass={auth.icon}
          style={error.password && { top: "31%", verticalAlign: "middle" }}
        />
      </div>

      <div className={auth.formInput}>
        <Input
          type="password"
          name="repassword"
          value={data.repassword}
          onChange={handleChange}
          error={error}
        />

        <Icon
          label={<BsLockFill />}
          myClass={auth.icon}
          style={error.repassword && { top: "31%", verticalAlign: "middle" }}
        />
      </div>

      <div className={auth.formInput}>
        <Input
          name="email"
          value={data.email}
          onChange={handleChange}
          error={error}
        />
        <Icon
          label={<MdEmail />}
          myClass={auth.icon}
          style={error.email && { top: "31%", verticalAlign: "middle" }}
        />
      </div>

      <div className={auth.formInput}>
        <Button label="Login" onClick={handleSubmit} />
      </div>

      <div className={auth.formInput}>
        <div className={`${auth.orSection} ${auth.underline}`}></div>
        <div className={`${auth.orSection} ${auth.or}`}>OR</div>
        <div className={`${auth.orSection} ${auth.underline}`}></div>
      </div>

      <div className={auth.formInput}>
        <Button label="Continue with Google" className={auth.gBtn} />
        <Icon label={<FcGoogle />} myClass={`${auth.gIcon}`} />
      </div>
    </div>
  );
}
export default Register;
