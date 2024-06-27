import { useState, useEffect, useRef } from "react";
import { FormWrapper } from "../FormWrapper/FormWrapper";
import "./step-five.css";

type UserData = {
  username: string;
  password: string;
  confirmPassword: string;
  bio: string;
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

export const StepFive = ({
  username,
  password,
  confirmPassword,
  bio,
  updateFields,
}: UserFormProps) => {
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "/images/SignIn/ProfileImage.png"
  );

  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  useEffect(() => {
    setUsernameValid(username.length > 0);
    setPasswordValid(passwordPattern.test(password));
    setConfirmPasswordValid(password === confirmPassword);
  }, [username, password, confirmPassword]);

  const handleUsernameChange = (event: any) => {
    updateFields({ username: event.target.value });
  };

  const handlePasswordChange = (event: any) => {
    updateFields({ password: event.target.value });
  };

  const handleConfirmPasswordChange = (event: any) => {
    const confirmPasswordValue = event.target.value;
    updateFields({ confirmPassword: confirmPasswordValue });
    setConfirmPasswordValid(password === confirmPasswordValue);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProfileImage(reader.result);
          localStorage.setItem("profileImage", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelectPopup = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <FormWrapper>
      <div className="steps">
        <h1>
          <span>4</span>
          Setup Profile
        </h1>
        <div className="step-five">
          <div className="left-side">
            <div className="profileIcon" onClick={triggerFileSelectPopup}>
              <img src={profileImage} alt="Profile icon" />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <div className="upload">
                <p>Upload photo</p>
                <img src="/images/SignIn/Icons/icon10.png" alt="icon10" />
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                onBlur={() => setUsernameTouched(true)}
              />
              {!usernameValid && usernameTouched && (
                <p className="error-message">Please enter your username!</p>
              )}
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => setPasswordTouched(true)}
                pattern={passwordPattern.source}
              />
              {!passwordValid && passwordTouched && (
                <p className="error-message">
                  Password must be 8-20 characters, include one letter and one
                  number!
                </p>
              )}
            </div>
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={() => setConfirmPasswordTouched(true)}
              />
              {!confirmPasswordValid && confirmPasswordTouched && (
                <p className="error-message">Passwords do not match!</p>
              )}
            </div>
            <div className="input-group">
              <textarea
                name="bio"
                placeholder="Tell us about yourself..."
                value={bio}
                maxLength={70}
                onChange={(e) => updateFields({ bio: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};
