import "./register-page.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { InputInterface } from "../../components/Input/InputInterface";
import { useMultistepForm } from "../../CustomHooks/useMultistepForm";
import { StepOne } from "../../components/StepOne/StepOne";
import { StepTwo } from "../../components/StepTwo/StepTwo";
import { StepThree } from "../../components/StepThree/StepThree";
import { StepFour } from "../../components/StepFour/StepFour";
import { StepFive } from "../../components/StepFive/StepFive";
import { StepSix } from "../../components/StepSix/StepSix";
import { StepSeven } from "../../components/StepSeven/StepSeven";
import { StepNine } from "../../components/StepNine/StepNine";
import { StepEight } from "../../components/StepEight/StepEight";

export type FormData = {
  user_type: string;
  interests: string[];
  tutorial: string;
  subscription_type: string;
  username: string;
  password: string;
  confirmPassword: string;
  bio: string;
  nickname: string;
  cultures: string[];
  recommendations: string[];
  privacy: string;
  notification: string;
};

const USER_DATA: FormData = {
  user_type: "",
  interests: [],
  tutorial: "",
  subscription_type: "",
  username: "",
  password: "",
  confirmPassword: "",
  bio: "",
  nickname: "",
  cultures: [],
  recommendations: [],
  privacy: "",
  notification: "",
};

const RegisterPage = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState(USER_DATA);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  const handleFormEmail = (event: any) => {
    const email = event.target.value;
    setEmailInput(email);
    setEmailValid(emailPattern.test(email));
  };

  const handleFormPassword = (event: any) => {
    const password = event.target.value;
    setPasswordInput(password);
    setPasswordValid(passwordPattern.test(password));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setEmailValid(emailPattern.test(emailInput));
    setPasswordValid(passwordPattern.test(passwordInput));

    if (emailInput && passwordInput && emailValid && passwordValid) {
      const emailAndPass = { email: emailInput, password: passwordInput };
      localStorage.setItem("email&pass", JSON.stringify(emailAndPass));
      setIsModalOpen(true);
    }
  };

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));

    switch (currentStepIndex) {
      case 0:
        if (fields.user_type) setErrorMessage("");
        break;
      case 1:
        if (fields.interests && fields.interests.length > 0)
          setErrorMessage("");
        break;
      case 2:
        if (fields.tutorial) setErrorMessage("");
        break;
      case 3:
        if (fields.subscription_type) setErrorMessage("");
        break;
      case 4:
        if (fields.username || fields.password || fields.confirmPassword)
          setErrorMessage("");
        break;
      case 5:
        if (fields.cultures && fields.cultures.length > 0) setErrorMessage("");
        break;
      case 6:
        if (fields.recommendations && fields.recommendations.length > 0)
          setErrorMessage("");
        break;
      case 7:
        if (fields.notification) setErrorMessage("");
        break;
      case 8:
        if (fields.privacy) setErrorMessage("");
        break;
      default:
        break;
    }
  }

  const { step, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <StepOne {...data} updateFields={updateFields} />,
      <StepTwo {...data} updateFields={updateFields} />,
      <StepThree {...data} updateFields={updateFields} />,
      <StepFour {...data} updateFields={updateFields} />,
      <StepFive {...data} updateFields={updateFields} />,
      <StepSix {...data} updateFields={updateFields} />,
      <StepSeven {...data} updateFields={updateFields} />,
      <StepEight {...data} updateFields={updateFields} />,
      <StepNine {...data} updateFields={updateFields} />,
    ]);

  const validateStep = () => {
    switch (currentStepIndex) {
      case 0:
        if (data.user_type === "") {
          setErrorMessage("Please select a user type!");
          return false;
        }
        break;
      case 1:
        if (data.interests.length === 0) {
          setErrorMessage("Please select at least one interest!");
          return false;
        }
        break;
      case 2:
        if (data.tutorial === "") {
          setErrorMessage("Please choose how you wish to engage with Kinemoe!");
          return false;
        }
        break;
      case 3:
        if (data.subscription_type === "") {
          setErrorMessage("Please choose your subscription type!");
          return false;
        }
        break;
      case 4:
        if (
          data.username === "" ||
          data.password === "" ||
          data.confirmPassword === "" ||
          data.confirmPassword !== data.password
        ) {
          setErrorMessage("Please fill all the inputs to setup your profile!");
          return false;
        }
        break;
      case 5:
        if (data.cultures.length === 0) {
          setErrorMessage("Please select at least one culture!");
          return false;
        }
        break;
      case 6:
        if (data.recommendations.length === 0) {
          setErrorMessage("Please select at least one movie recommendation!");
          return false;
        }
        break;
      case 7:
        if (data.notification === "") {
          setErrorMessage("Please select how you want to be notified!");
          return false;
        }
        break;
      case 8:
        if (data.privacy === "") {
          setErrorMessage("Please select your privacy!");
          return false;
        }
        break;
      default:
        setErrorMessage("");
        return true;
    }
    setErrorMessage("");
    return true;
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }
    if (!isLastStep) {
      return next();
    }
    localStorage.setItem("user", JSON.stringify(data));
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleNext = () => {
    if (validateStep()) {
      setErrorMessage("");
      next();
    }
  };

  const handleBack = () => {
    setErrorMessage("");
    back();
  };

  const inputProps: InputInterface = {
    inputItems: [
      {
        name: "email",
        type: "email",
        placeholder: "Email address",
        value: emailInput,
        onChange: handleFormEmail,
        errorMsg: "Please enter a valid email address!",
        pattern: emailPattern.source,
      },
      {
        name: "password",
        type: "password",
        placeholder: "Password",
        value: passwordInput,
        onChange: handleFormPassword,
        errorMsg: "Password with 8-20 characters, one letter and one number!",
        pattern: passwordPattern.source,
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
            <h5>Create your account</h5>
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
            <div className="login mb-4">
              <div className="login-inner">
                <img src="./images/SignIn/Icons/icon7.png" alt="apple icon" />
                <p>Sign up With Apple</p>
              </div>
            </div>
            <div className="horizontal">
              <hr className="horizontal-line" />
              <span>or</span>
              <hr className="horizontal-line" />
            </div>
            <form onSubmit={handleSubmit}>
              <Input {...inputProps} />
              <button type="submit" className="form-btn">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="form-container">
          <div className="form-inner">
            <form onSubmit={onSubmit}>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {step}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isFirstStep) {
                      setIsModalOpen(false);
                    } else {
                      handleBack();
                    }
                  }}
                >
                  <img src="/images/SignIn/Icons/icon8.png" alt="icon8" />
                  <span>Back</span>
                </button>
                <button
                  type={isLastStep ? "submit" : "button"}
                  onClick={handleNext}
                >
                  <span> {isLastStep ? "Set my profile" : "Next"}</span>
                  {!isLastStep && (
                    <img src="/images/SignIn/Icons/icon9.png" alt="icon9" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
