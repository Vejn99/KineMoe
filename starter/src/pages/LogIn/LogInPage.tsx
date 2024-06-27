import "./log-in.css";
import { useState } from "react";
import { Input } from "../../components/Input/Input";
import { InputInterface } from "../../components/Input/InputInterface";
import { useUserStore } from "../../store/user-store";
import { Link, useNavigate } from "react-router-dom";

const LogInPage = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const navigate = useNavigate();

  const handleFormEmail = (event: any) => setEmailInput(event.target.value);
  const handleFormPassword = (event: any) =>
    setPasswordInput(event.target.value);

  const formValidator = () => emailInput.length > 0 && passwordInput.length > 0;

  const resetForm = () => {
    setEmailInput("");
    setPasswordInput("");
  };

  const setUser = useUserStore((state: any) => state.setUser);

  const handleLogin = (event: any) => {
    event.preventDefault();

    const storedUser = localStorage.getItem("email&pass");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (
      parsedUser &&
      emailInput === parsedUser.email &&
      passwordInput === parsedUser.password
    ) {
      setUser(parsedUser);
      resetForm();
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  const inputProps: InputInterface = {
    inputItems: [
      {
        type: "text",
        placeholder: "Email address",
        name: "email",
        value: emailInput,
        onChange: handleFormEmail,
        errorMsg: "Ве замолуваме да внесете валиден имејл!",
        pattern: "",
      },
      {
        type: "password",
        placeholder: "Password",
        name: "password",
        value: passwordInput,
        onChange: handleFormPassword,
        errorMsg: "Внесете валиден пасворд!",
        pattern: "",
      },
    ],
  };

  return (
    <>
      <div className="banner-container">
        <div className="banner-inner">
          <div className="left-side">
            <div className="logo">
              <h1>
                Kine<span>moe</span>
              </h1>
            </div>
          </div>
          <div className="right-side">
            <h5>Welcome !</h5>
            <span>Join us!</span>
            <form onSubmit={handleLogin}>
              <Input {...inputProps} />
              <button
                disabled={!formValidator()}
                type="submit"
                className="form-btn"
              >
                Log in
              </button>
            </form>
            <div className="horizontal mt-4">
              <hr className="horizontal-line" />
              <span>or</span>
              <hr className="horizontal-line" />
            </div>
            <div className="login mb-4">
              <div className="login-inner">
                <img src="./images/SignIn/Icons/icon5.png" alt="google icon" />
                <p>Sign up With Google</p>
              </div>
            </div>
            <div className="login mb-4">
              <div className="login-inner">
                <img
                  src="./images/SignIn/Icons/icon6.png"
                  alt="facebook icon"
                />
                <p>Sign up With Facebook</p>
              </div>
            </div>
            <Link to="/register" className="create-acc">
              Create a new accout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInPage;
