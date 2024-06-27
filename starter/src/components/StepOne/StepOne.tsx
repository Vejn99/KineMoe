import "./step-one.css";
import { FormWrapper } from "../FormWrapper/FormWrapper";

type AccountData = {
  user_type: string;
};

type AccountFormProps = AccountData & {
  updateFields: (fields: Partial<AccountData>) => void;
};

export const StepOne = ({ user_type, updateFields }: AccountFormProps) => {
  return (
    <FormWrapper>
      <div className="steps">
        <h2>Join as viewer or artist:</h2>
        <div className="step-one mt-5">
          <div
            className={`radio-group ${
              user_type === "artist" ? "selected" : ""
            }`}
            onClick={() => updateFields({ user_type: "artist" })}
          >
            <input
              type="radio"
              name="user_type"
              value="artist"
              checked={user_type === "artist"}
              onChange={(e) => updateFields({ user_type: e.target.value })}
            />
            <div className="left-inner">
              <img src="/images/SignIn/Icons/icon1.png" alt="icon1" />
              <p>Sign up as Artist</p>
            </div>
            <div
              className={`right-inner ${
                user_type === "artist" ? "selected" : ""
              }`}
            ></div>
          </div>
          <div
            className={`radio-group ${
              user_type === "viewer" ? "selected" : ""
            }`}
            onClick={() => updateFields({ user_type: "viewer" })}
          >
            <input
              type="radio"
              name="user_type"
              value="viewer"
              checked={user_type === "viewer"}
              onChange={(e) => updateFields({ user_type: e.target.value })}
            />
            <div className="left-inner">
              <img src="/images/SignIn/Icons/icon2.png" alt="icon2" />
              <p>Sign up as Viewer</p>
            </div>
            <div
              className={`right-inner ${
                user_type === "viewer" ? "selected" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};
