import "./step-nine.css";
import { FormWrapper } from "../FormWrapper/FormWrapper";

type UserData = {
  privacy: string;
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

export const StepNine = ({ privacy, updateFields }: UserFormProps) => {
  return (
    <FormWrapper>
      <div className="steps">
        <div className="profile-pic">
          <img src="/images/SignIn/ProfileImage.png" alt="profile image" />
        </div>
        <h3 className="step-seven-h">Select your privacy settings</h3>
        <p>Choose who sees your profile:</p>
        <div className="step-nine">
          <label
            className={`interest-item ${
              privacy === "friends" ? "selected" : ""
            }`}
            onClick={() => updateFields({ privacy: "friends" })}
          >
            <input
              type="radio"
              name="privacy"
              value="friends"
              checked={privacy === "friends"}
              onChange={(e) => updateFields({ privacy: e.target.value })}
            />
            My Friends
          </label>
          <label
            className={`interest-item ${
              privacy === "public" ? "selected" : ""
            }`}
            onClick={() => updateFields({ privacy: "public" })}
          >
            <input
              type="radio"
              name="privacy"
              value="public"
              checked={privacy === "public"}
              onChange={(e) => updateFields({ privacy: e.target.value })}
            />
            Public
          </label>
          <label
            className={`interest-item ${
              privacy === "only-me" ? "selected" : ""
            }`}
            onClick={() => updateFields({ privacy: "only-me" })}
          >
            <input
              type="radio"
              name="privacy"
              value="only-me"
              checked={privacy === "only-me"}
              onChange={(e) => updateFields({ privacy: e.target.value })}
            />
            Only me
          </label>
        </div>
      </div>
    </FormWrapper>
  );
};
