import React, { useState, useContext } from "react";
import { MdEmail } from "react-icons/md";
import { BsLockFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { authenticate, provider } from "../firebase/Firebase";
import { authContext } from "../../contexts/AuthContext";
import Input from "../../common/Input";
import Icon from "../icon/Icon";
import Button from "../../common/Button";
import Header from "../header/Header";
import auth from "./auth.module.css";

function Login({ history }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const authCont = useContext(authContext);

  const handleChange = ({ target: input }) => {
    const newData = { ...data };

    newData[input.name] = input.value;

    setData(newData);
  };

  const handleError = () => {
    const { email, password } = data;
    if (!email || !password) return "Incorrect username or password";

    return null;
  };

  const handleForm = () => {
    const errorMessage = handleError();

    if (errorMessage) return setError(errorMessage);
    setError("");
    handleLogin();
  };

  const handleLogin = async () => {
    const { email, password } = data;
    try {
      await authenticate.signInWithEmailAndPassword(email, password);
      authCont.validateAuth(true);
      history.replace("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await authenticate.signInWithPopup(provider);
      authCont.validateAuth(true);
      history.replace("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={auth.container}>
      <Header label="login" className={auth.header} />

      <div className={auth.formInput}>
        <Input name="email" value={data.email} onChange={handleChange} />
        <Icon label={<MdEmail />} myClass={auth.icon} />
      </div>

      <div className={auth.formInput}>
        <Input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />

        <Icon label={<BsLockFill />} myClass={auth.icon} />
      </div>

      <div className={auth.formInput}>
        <Button label="Login" onClick={handleForm} />
      </div>

      <div className={auth.formInput}>
        <div className={`${auth.orSection} ${auth.underline}`}></div>
        <div className={`${auth.orSection} ${auth.or}`}>OR</div>
        <div className={`${auth.orSection} ${auth.underline}`}></div>
      </div>

      <div className={auth.formInput}>
        <p className="error">{error}</p>
      </div>

      <div className={auth.formInput}>
        <Button
          label="Continue with Google"
          className={auth.gBtn}
          onClick={signInWithGoogle}
        />
        <Icon label={<FcGoogle />} myClass={`${auth.gIcon}`} />
      </div>
    </div>
  );
}
export default Login;
