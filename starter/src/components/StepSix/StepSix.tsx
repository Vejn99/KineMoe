import { useState } from "react";
import { FormWrapper } from "../FormWrapper/FormWrapper";
import "./step-six.css";

type UserData = {
  nickname: string;
  cultures: string[];
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

const cultureList = [
  "Macedonia",
  "Balkan",
  "European",
  "Mediteranean",
  "Global",
];

export const StepSix = ({
  cultures = [],
  nickname,
  updateFields,
}: UserFormProps) => {
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({ nickname: event.target.value });
  };

  const handleCheckboxChange = (culture: string) => {
    if (cultures.includes(culture)) {
      updateFields({
        cultures: cultures.filter((i) => i !== culture),
      });
    } else {
      updateFields({
        cultures: [...cultures, culture],
      });
    }
  };

  return (
    <FormWrapper>
      <div className="steps">
        <div className="nick-name">
          <img src="/images/SignIn/ProfileImage.png" alt="profile image" />
          <input
            type="text"
            name="username"
            placeholder="Nickname"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <h3>
          <span>5</span>
          Which cultures resonate with you?
        </h3>
        <p className="step-six-p">
          Your choices help us curate content just for you?
        </p>
        <div className="step-six">
          {cultures &&
            cultureList.map((culture) => (
              <label
                key={culture}
                className={`interest-item ${
                  cultures.includes(culture) ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={culture}
                  checked={cultures.includes(culture)}
                  onChange={() => handleCheckboxChange(culture)}
                />
                {culture}
              </label>
            ))}
        </div>
      </div>
    </FormWrapper>
  );
};
